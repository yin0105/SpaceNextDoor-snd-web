import { getTranslatedName } from './market';

interface ILocationCity {
  name_en: string;
  name_th: string;
  name_kr: string;
  name_jp: string;
}

interface ILocationDisctict {
  name_en: string;
  name_th: string;
  name_kr: string;
  name_jp: string;
}

interface ILocationCountry {
  name_en: string;
  name_th: string;
  name_kr: string;
  name_jp: string;
}

interface ILocation {
  city: ILocationCity;
  district: ILocationDisctict | null;
  country?: ILocationCountry;
}

export const getTranslatedPlace = (location: ILocation, locale?: string): string => (
  [getTranslatedName(location?.district, 'name', locale), getTranslatedName(location?.city, 'name', locale)].filter((s) => !!s).join(', ')
);
