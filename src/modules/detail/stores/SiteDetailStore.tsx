import {
  makeObservable, observable, action, computed, runInAction,
} from 'mobx';
import { initializeApollo } from 'apollo';
import { ApolloClient } from '@apollo/client';
import { ISite, ISpace } from 'shared/interfaces';
import convertSitesToGraphqlFormat from 'utilities/convertSitesToGraphqlFormat';
import elasticSearch, { IParams } from 'utilities/elasticSearch';
import getAvailableStock from 'utilities/getAvailableStock';
import getAvailableSites from 'utilities/getAvailableSites';
import { getElasticQuery } from 'utilities/getElasticQuery';
import { PLATFORM_SPACE_TYPES_QUERY } from 'modules/detail/queries/index';
import { FixedCountry, PriceType } from '../../../typings/graphql.types';
import { PlatformSpaceTypesQuery, PlatformSpaceTypesQueryVariables, PlatformSpaceTypesQuery_space_types_edges } from '../queries/__generated__/PlatformSpaceTypesQuery';

class SiteDetailStore {
  constructor() {
    makeObservable(this);
    this.apollo = initializeApollo();
  }

  private apollo: ApolloClient<any>;

  @observable space: ISpace;

  @observable site: ISite;

  @observable loading = false;

  @observable spaceTypes: PlatformSpaceTypesQuery_space_types_edges[] = [];

  @action setSelectedSpace(space: ISpace): void {
    this.space = space;
  }

  @computed get price(): string {
    const price = (this.space?.prices || []).filter((p) => p.type === PriceType.BASE_PRICE)[0];
    return `${price?.currency} ${(price?.price_per_month || 0).toFixed(2)}`;
  }

  @action
  getSiteDetails = async (
    siteId: number, moveInDate: string,
    country: { id: number, name: FixedCountry },
  ) => {
    this.loading = true;
    const spaceTypesRes = await this.apollo.query<PlatformSpaceTypesQuery,
    PlatformSpaceTypesQueryVariables>({
      query: PLATFORM_SPACE_TYPES_QUERY,
      variables: {
        siteId,
        country: country.name,
      },
    });
    const spaceTypes = spaceTypesRes?.data?.space_types?.edges;
    const query = getElasticQuery(
      { siteIds: [siteId], countryId: country.id },
      { numberOfSpaces: 3000 },
    );
    const requestParams: IParams = {
      query,
      fields: ['id'],
      _source: [
        'id',
        'address.country_id',
        'address.city_id',
        'address.district_id',
        'name',
        'description',
        'images',
        'address.geo_location',
        'features',
        'stock_management_type',
        'total_active_spaces',
      ],
      from: 0,
      size: 1,
    };

    const data = await elasticSearch.search(requestParams);
    const stockServiceParams = { site_ids: [siteId], move_in_date: moveInDate };
    const availableStock = await getAvailableStock(stockServiceParams);
    const res = await getAvailableSites(data.data, stockServiceParams);
    const sites = await convertSitesToGraphqlFormat(
      res,
      true,
      availableStock.data,
      spaceTypes,
    );
    const spaces = sites[0].spaces.edges;
    this.spaceTypes = spaceTypes.filter((st) => (
      !!spaces.filter((sp) => sp?.space_type?.id === st?.id).length
    ));
    runInAction(() => {
      this.loading = false;
      const [site] = sites;
      if (site) {
        this.site = site;
      }
    });
  };
}

export const SITE_DETAIL_STORE = 'store';

export default SiteDetailStore;
