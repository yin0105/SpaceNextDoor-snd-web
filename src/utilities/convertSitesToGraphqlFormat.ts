/* eslint no-underscore-dangle: 0 */

// ----------------------
// Since the whole app is set up in the graphql format, so this is a helper function to convert
// the data coming from ES to the graphql format, so we dont have to change a lot of files
// ----------------------

import axios from 'axios';
import {
  IFeatures, ISite, ISpace, ISpaceType,
} from 'shared/interfaces';
import { IElasticSite } from 'pages/api/es';
import { GRAPHQL_API } from 'config';
import { PlatformSpaceTypesQuery_space_types_edges } from 'modules/detail/queries/__generated__/PlatformSpaceTypesQuery';
import { IStockResponse } from './getAvailableSites';

export interface IDistricts {
  id: number;
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
}

export interface ICities {
  id: number;
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
  districts: IDistricts[];
}

export interface ICountries {
  id: number;
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
  code: string;
  currency: string;
  currency_sign: string;
  cities: ICities[];
}
// eslint-disable-next-line
const getFeatures = async (): Promise<IFeatures[]> => {
  try {
    const { data } = await axios.post(GRAPHQL_API, {
      query: `
      query{
        feature_categories(pagination:{
          skip:0,
          limit:100
        }, where:{
          is_active:{
            _eq:true
          }
        }){
          edges{
            id
            name_en
            name_th
            name_jp
            name_kr
            features{
              id
              icon
              name_en
              name_th
              name_jp
              name_kr
            }
          }
        }
      } `,
    });

    // Since now we have multiple features categories, we have to choose the one that's
    // for Sites and Spaces. For that a check on name_en has been applied since its consistent
    // across all API's as compared to Id's
    const featuresCategories = data.data.feature_categories.edges?.filter((cat) => cat?.name_en === 'General');
    return featuresCategories[0]?.features || [];
  } catch (error) {
    console.log(error);
  }
};

const convertSitesToGraphqlFormat = async (
  elasticSites: IElasticSite[],
  requireDetails = false,
  stockAvailability: IStockResponse = null,
  spaceTypes: PlatformSpaceTypesQuery_space_types_edges[] = [],
): Promise<ISite[]> => {
  const locations: ICountries[] = (await axios.get('/locations.json')).data;
  let features: IFeatures[];
  if (requireDetails) {
    features = await getFeatures();
  }
  const sites: ISite[] = elasticSites.map((hit) => {
    const siteSource = hit._source;
    let city: ICities;
    let district: IDistricts;
    for (let i = 0; i < locations.length; i += 1) {
      if (siteSource.address.country_id === locations[i]?.id) {
        for (let j = 0; j < locations[i].cities.length; j += 1) {
          if (siteSource.address.city_id === locations[i].cities[j].id) {
            city = locations[i].cities[j];
            for (let k = 0; k < locations[i].cities[j].districts.length; k += 1) {
              if (
                siteSource.address.district_id
                === locations[i].cities[j].districts[k].id
              ) {
                district = locations[i].cities[j].districts[k];
                break;
              }
            }
          }
        }
      }
    }
    const spaces: ISpace[] = siteSource.spaces.map((space) => {
      const s: ISpace = {
        id: space?.id,
        size: space?.size,
        size_unit: space?.size_unit,
        length: space?.length,
        width: space?.width,
        available_units: space?.available_units,
        features: [],
        status: space.status,
        prices: [
          {
            currency_sign: space?.price?.currency_sign,
            price_per_month: space?.price?.pre_month,
            type: space?.price.type,
            currency: space?.price?.currency,
          },
        ],
      };
      if (requireDetails) {
        const spaceType = spaceTypes.filter((sp) => sp.id === space.space_type);
        // eslint-disable-next-line
        if (spaceType[0]) s.space_type = spaceType[0];
        const feats: IFeatures[] = space?.features?.map((f) => (
          features.filter((feat) => feat.id === f)[0]
        ));
        // The available until is not coming from ES while available units are not correct
        // So we're picking these two values from stock service and mapping them to their
        // respective spaces
        s.features = feats?.filter((f) => f !== undefined) || [];
        const site = stockAvailability?.sites.filter((si) => si.id === siteSource?.id)[0];
        const availableUntil = site?.spaces.filter((sp) => sp.id === space.id)[0]?.available_until;
        const availableUnits = site?.spaces.filter((sp) => sp.id === space.id)[0]?.available_units;
        if (availableUntil) s.stock_available_until = availableUntil;
        s.available_units = availableUnits || 0;
      }
      return s;
    });

    const site: ISite = {
      id: siteSource?.id,
      images: siteSource?.images,
      name_en: siteSource?.name.en,
      name_th: siteSource?.name.th,
      name_kr: siteSource?.name.kr,
      name_jp: siteSource?.name.jp,
      description_en: siteSource?.description.en,
      description_th: siteSource?.description.th,
      description_kr: siteSource?.description.kr,
      description_jp: siteSource?.description.jp,
      is_featured: siteSource.is_featured,
      stock_management_type: siteSource.stock_management_type,
      total_active_spaces: siteSource.total_active_spaces,
      address: {
        lat: siteSource?.address.geo_location.lat,
        lng: siteSource?.address.geo_location.lon,
        district: {
          id: district?.id,
          name_en: district?.name_en,
          name_th: district?.name_th,
          name_jp: district?.name_jp,
          name_kr: district?.name_kr,
        },
        city: {
          id: city?.id,
          name_en: city?.name_en,
          name_th: city?.name_th,
          name_jp: city?.name_jp,
          name_kr: city?.name_kr,
        },
      },
      spaces: {
        edges: spaces,
      },
    };
    if (requireDetails) {
      const feats: IFeatures[] = siteSource.features.map((f) => (
        features.filter((s) => s.id === f)[0]
      ));

      site.features = feats.filter((f) => f !== undefined);
    }
    return site;
  });
  return sites;
};

export default convertSitesToGraphqlFormat;
