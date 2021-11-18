import { FixedCountry, SpaceSizeUnit } from 'typings/graphql.types';
import {
  APP_ENV, SEARCH_RADIUS_JP, SEARCH_RADIUS_SG, SEARCH_RADIUS_TH,
} from 'config';
import { ENQUIRY_FORM_ID, THAI_ENQUIRY_FORM_ID } from '../config';
import domains from '../../domain.config.json';
// eslint-disable-next-line
import { ICoords } from './getElasticQuery';

export interface ICountry {
  name: FixedCountry;
  name_en: string;
  name_ja: string;
  name_th: string;
  defaultLocale: string;
  id: number;
  sizeUnit: SpaceSizeUnit;
  formId: string;
  phoneCode: string;
  sizeUnitLength: string;
  currencySign: string;
  currency: string;
  defaultDomain?: string;
  enable: boolean;
  locales: string[];
  maxFilterPrice: number;
  code: string;
  center: ICoords,
  socialLink: ISocialLink,
  searchRadius: number[]
}
interface IDomain {
  domain: string;
  defaultLocale: string;
  locales: string[];
  enable: boolean;
}

interface ISocialLink {
  facebook: string;
  instagram: string;
  line: string;
  whatsapp: string;
}

const getActiveDomain = (defaultLocale: string): IDomain => {
  let env: string = APP_ENV;
  if (APP_ENV === 'prod') env = 'production';
  const activeDomain: IDomain[] = domains[env];
  return activeDomain.find((d) => d.defaultLocale === defaultLocale);
};

export const countries: ICountry[] = [
  {
    name: FixedCountry.Singapore,
    code: 'sg',
    defaultLocale: 'en-US',
    name_en: FixedCountry.Singapore,
    name_ja: 'シンガポール',
    name_th: 'สิงคโปร์',
    id: 1,
    sizeUnit: SpaceSizeUnit.sqft,
    sizeUnitLength: 'ft',
    formId: ENQUIRY_FORM_ID,
    phoneCode: '+65',
    currencySign: 'S$',
    currency: 'SGD',
    enable: true,
    defaultDomain: getActiveDomain('en-US').domain,
    locales: ['en-US'],
    maxFilterPrice: 1500,
    center: { lat: 1.3552, lon: 103.8772 },
    socialLink: {
      facebook: 'https://www.facebook.com/spacenextdoor',
      instagram: 'https://www.instagram.com/spacenextdoor',
      line: '',
      whatsapp: 'https://wa.me/message/FVEANL3K73S2F1',
    },
    searchRadius: SEARCH_RADIUS_SG,
  },
  {
    name: FixedCountry.Thailand,
    code: 'th',
    defaultLocale: 'th',
    name_en: FixedCountry.Thailand,
    name_ja: 'タイ',
    name_th: 'ประเทศไทย',
    id: 3,
    sizeUnit: SpaceSizeUnit.sqm,
    sizeUnitLength: 'm',
    phoneCode: '+66',
    formId: THAI_ENQUIRY_FORM_ID,
    currencySign: '฿',
    currency: 'THB',
    enable: true,
    defaultDomain: getActiveDomain('th').domain,
    locales: ['th', 'en-US'],
    maxFilterPrice: 99000,
    center: { lat: 13.736717, lon: 100.523186 },
    socialLink: {
      facebook: 'https://www.facebook.com/spacenextdoor.thailand',
      instagram: 'https://www.instagram.com/spacenextdoor.th/',
      line: 'https://lin.ee/fI0PvFu',
      whatsapp: '',
    },
    searchRadius: SEARCH_RADIUS_TH,
  },
  {
    name: FixedCountry.Japan,
    code: 'jp',
    defaultLocale: 'ja',
    name_en: FixedCountry.Japan,
    name_ja: '日本',
    name_th: 'ญี่ปุ่น',
    id: 2,
    sizeUnit: SpaceSizeUnit.tatami,
    sizeUnitLength: 'm',
    formId: ENQUIRY_FORM_ID,
    phoneCode: '+81',
    currencySign: '¥',
    currency: 'JPY',
    enable: APP_ENV !== 'prod',
    defaultDomain: getActiveDomain('ja').domain,
    locales: ['ja', 'en-US'],
    maxFilterPrice: 250000,
    center: { lat: 35.652832, lon: 139.839478 },
    socialLink: {
      facebook: 'https://www.facebook.com/spacenextdoor',
      instagram: 'https://www.instagram.com/spacenextdoor',
      line: '',
      whatsapp: '',
    },
    searchRadius: SEARCH_RADIUS_JP,
  },
];
