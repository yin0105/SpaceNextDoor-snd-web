import { FixedCountry } from 'typings/graphql.types';
import { ICountries } from './convertSitesToGraphqlFormat';
import countries from '../../public/locations.json';

interface ISearchTerm {
  term?: string;
  country: FixedCountry;
  showCities?: boolean;
}
export interface ICity {
  id: number;
  name_en: string;
  name_th: string,
  name_jp: string;
  name_kr: string;
}
export interface IDistrict {
  id: number;
  name_en: string;
  name_th: string,
  name_jp: string;
  name_kr: string;
}
export interface ILocation {
  country_id?: number;
  city?: ICity;
  district?: IDistrict;
  places? :IPlaces[];
  search_en?: string;
  search_th?: string;
  search_jp?: string;
  search_kr?: string;
}

export interface IPlaces {
  name_en?: string;
  name_th?: string,
  name_jp?: string;
  name_kr?: string;
  search_value?: string;
}

/**
 *
 * @param searchQueries
 * @returns
 */
const searchTerm = (searchQueries: ISearchTerm, t = null): ILocation[] => {
  const result: ILocation[] = [];
  const { term, country, showCities } = searchQueries;
  const locations: ICountries[] = countries;
  const countryData = locations.find((data) => data.name_en === country);
  if (!countryData) {
    return result;
  }
  const flatternedLocations: ILocation[] = [];
  const citiesOnTop : ILocation[] = [];
  // flatten to district level
  countryData.cities.forEach((city) => {
    citiesOnTop.push({
      city: {
        id: city.id,
        name_en: city.name_en,
        name_th: city.name_th,
        name_jp: city.name_jp,
        name_kr: city.name_kr,
      },
      district: null,
      search_en: city.name_en,
      search_th: city.name_th,
      search_jp: city.name_jp,
      search_kr: city.name_kr,
    });
    city.districts.forEach((district) => {
      flatternedLocations.push({
        city: {
          id: city.id,
          name_en: city.name_en,
          name_th: city.name_th,
          name_jp: city.name_jp,
          name_kr: city.name_kr,
        },
        district: {
          id: district.id,
          name_en: district.name_en,
          name_th: district.name_th,
          name_jp: district.name_jp,
          name_kr: district.name_kr,
        },
        search_en: `${district.name_en}, ${city.name_en}`,
        search_th: `${district.name_th}, ${city.name_th}`,
        search_jp: `${district.name_jp}, ${city.name_jp}`,
        search_kr: `${district.name_kr}, ${city.name_kr}`,
      });
    });
  });
  const cityOnTop = {
    city: {
      id: flatternedLocations[0]?.city.id,
      name_en: flatternedLocations[0]?.city.name_en,
      name_th: flatternedLocations[0]?.city.name_th,
      name_jp: flatternedLocations[0]?.city.name_jp,
      name_kr: flatternedLocations[0]?.city.name_kr,
    },
    district: null,
    search_en: flatternedLocations[0]?.city.name_en,
    search_th: flatternedLocations[0]?.city.name_th,
    search_jp: flatternedLocations[0]?.city.name_jp,
    search_kr: flatternedLocations[0]?.city.name_kr,
  };

  const places = {
    places: [{
      name_en: t('typography4'),
      name_th: t('typography4'),
      name_jp: t('typography4'),
      name_kr: t('typography4'),
      search_value: 'districts',
    }],
  };
  // if request show all
  if ((showCities || (term && term.length < 2)) || !term) {
    // Always show city on the top
    citiesOnTop.unshift(places);
    return citiesOnTop.slice(0, 6);
  }
  // continue searching
  const search = (item) => {
    const lowerTerm = term.toLowerCase();
    return item.search_en.toLowerCase().includes(lowerTerm)
      || item.search_th.toLowerCase().includes(lowerTerm)
      || item.search_jp.toLowerCase().includes(lowerTerm)
      || item.search_kr.toLowerCase().includes(lowerTerm);
  };

  const searchWithTerm = flatternedLocations.filter(search);
  if (searchWithTerm.length < 1) {
    return result;
  }
  const slicedArray = searchWithTerm.slice(0, 4);
  // Always show city on the top
  slicedArray.unshift(cityOnTop);
  return slicedArray;
};

export default searchTerm;
