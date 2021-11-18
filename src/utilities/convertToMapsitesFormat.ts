/* eslint no-underscore-dangle: 0 */
import axios from 'axios';
import { IMapSite } from 'shared/interfaces';
import { IElasticSite } from 'pages/api/es';

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

const convertToMapSitesFormat = async (
  elasticSites: IElasticSite[],
): Promise<IMapSite[]> => {
  const locations: ICountries[] = (await axios.get('/locations.json')).data;
  const sites: IMapSite[] = elasticSites.map((hit) => {
    const siteData = hit.fields;

    let city: ICities;
    let district: IDistricts;
    for (let i = 0; i < locations.length; i += 1) {
      if (siteData['address.country_id']?.[0] === locations[i]?.id) {
        for (let j = 0; j < locations[i].cities.length; j += 1) {
          if (siteData['address.city_id']?.[0] === locations[i].cities[j].id) {
            city = locations[i].cities[j];
            for (let k = 0; k < locations[i].cities[j].districts.length; k += 1) {
              if (
                siteData['address.district_id']?.[0]
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

    const site: IMapSite = {
      id: siteData?.id[0],
      images: siteData?.images,
      name_en: siteData['name.en'][0],
      name_th: siteData['name.th'][0],
      name_kr: siteData['name.kr'][0],
      name_jp: siteData['name.jp'][0],
      address: {
        lat: siteData['address.geo_location']?.[0]?.coordinates?.[1],
        lng: siteData['address.geo_location']?.[0]?.coordinates?.[0],
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
      pricePerMonth: siteData.spaces[0]['price.pre_month'][0],
      currencySign: siteData.spaces[0]['price.currency_sign'][0],
    };
    return site;
  });
  return sites;
};

export default convertToMapSitesFormat;
