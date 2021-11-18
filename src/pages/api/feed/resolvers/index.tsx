import dayjs from 'dayjs';
import { IElasticSite, IESResponse, ISearchbody } from 'pages/api/es';
import { ICountries, IDistricts } from 'utilities/convertSitesToGraphqlFormat';
import { ICities } from 'utilities/convertToMapsitesFormat';
import getAvailableSites from 'utilities/getAvailableSites';
import { Client } from '@elastic/elasticsearch';
import countries from '../../../../../public/locations.json';

const ELASTIC_SEARCH_URL = process.env.REACT_APP_ELASTIC_SEARCH_URL;

interface IName {
  name_en: string
  name_th: string
  name_jp: string
  name_kr: string
}

interface ISpace {
  price_per_month: number
  currency: string
}

interface ISite {
  id: number
  name_en: string
  name_th: string
  name_jp: string
  name_kr: string
  description_en: string
  description_th: string
  description_jp: string
  description_kr: string
  images: string[]
  address: {
    lat: number
    lng: number
    country: IName
    city: IName
    district: IName
    street: string
    postal_code: string
  },
  spaces: ISpace[]
}

const DEFAULT_SOURCE = [
  'id',
  'address',
  'name',
  'description',
  'images',
  'stock_management_type',
];

const convertSitesToGraphqlFormat = async (
  elasticSites: IElasticSite[],
): Promise<ISite[]> => {
  const locations: ICountries[] = countries;

  const sites: ISite[] = elasticSites.map((hit) => {
    // eslint-disable-next-line
    const siteSource = hit._source;
    let siteCity: ICities;
    let siteDistrict: IDistricts;
    let siteCountry: ICountries;

    locations.forEach((location) => {
      if (siteSource.address.country_id === location?.id) {
        siteCountry = location;
        location.cities.forEach((city) => {
          if (siteSource.address.city_id === city.id) {
            siteCity = city;
            city.districts.forEach((district) => {
              if (siteSource.address.district_id === district.id) {
                siteDistrict = district;
              }
            });
          }
        });
      }
    });
    const spaces = siteSource.spaces.map((space) => {
      const s: ISpace = {
        price_per_month: space?.price?.pre_month,
        currency: space?.price?.currency,
      };
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
      address: {
        lat: siteSource?.address.geo_location.lat,
        lng: siteSource?.address.geo_location.lon,
        district: {
          name_en: siteDistrict?.name_en,
          name_th: siteDistrict?.name_th,
          name_jp: siteDistrict?.name_jp,
          name_kr: siteDistrict?.name_kr,
        },
        city: {
          name_en: siteCity?.name_en,
          name_th: siteCity?.name_th,
          name_jp: siteCity?.name_jp,
          name_kr: siteCity?.name_kr,
        },
        postal_code: siteSource?.address.postal_code,
        street: siteSource?.address.street,
        country: {
          name_en: siteCountry?.name_en,
          name_th: siteCountry?.name_th,
          name_jp: siteCountry?.name_jp,
          name_kr: siteCountry?.name_kr,
        },
      },
      spaces,
    };
    return site;
  });
  return sites;
};

export const getSites = async (countryId: number) => {
  const params = {
    query: {
      bool: {
        must: [
          {
            match: {
              status: 'ACTIVE',
            },
          },
          {
            match: {
              'address.country_id': countryId,
            },
          },
          {
            nested: {
              path: 'spaces',
              query: {
                bool: {
                  must: [
                    {
                      match: {
                        'spaces.status': 'ACTIVE',
                      },
                    },
                  ],
                  must_not: [
                    {
                      match: {
                        stock_management_type: 'AFFILIATE',
                      },
                    },
                  ],
                },
              },
              inner_hits: {
                _source: [
                  'spaces.id',
                  'spaces.price.currency',
                  'spaces.price.pre_month',
                ],
                sort: [
                  {
                    'spaces.price.pre_month': {
                      order: 'asc',
                    },
                  },
                ],
                from: 0,
                size: 100,
              },
            },
          },
        ],
      },
    },
    fields: ['id'],
    // eslint-disable-next-line
    _source: DEFAULT_SOURCE,
    from: 0,
    size: 10000,
    sort: [],
  };

  const client = new Client({
    node: ELASTIC_SEARCH_URL,
  });

  const response = await client.search<IESResponse, ISearchbody>({
    body: params,
  });
  const siteIds = response.body.hits.hits.map((site) => site.fields?.id[0]);
  let sites: ISite[] = [];
  if (siteIds.length) {
    const stockServiceParams = {
      site_ids: siteIds,
      move_in_date: dayjs().add(1, 'day').format('YYYY-MM-DD'),
    };
    const availableSites = await getAvailableSites(response.body, stockServiceParams);
    sites = await convertSitesToGraphqlFormat(availableSites);
  }
  return sites;
};
