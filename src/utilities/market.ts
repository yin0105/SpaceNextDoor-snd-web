import { useRouter } from 'next/router';
// eslint-disable-next-line
import { countries, ICountry } from './countries';

export const getCountry = (defaultLocale?: string): ICountry => {
  let country: ICountry;
  country = countries.find((i) => i.defaultLocale === defaultLocale);
  if (!country) country = countries.find((i) => i.defaultLocale === 'en-US');
  return country;
};

/**
 * Warning: only use this hook inside of the body of a function component
 * @returns string
 */
export const useTranslatedCountryName = (): string => {
  const { locale, defaultLocale } = useRouter();
  const country = getCountry(defaultLocale);
  if (locale === 'en-US') return country.name;
  return country[`name_${locale}`];
};

/**
 * Warning: only use this hook inside of the body of a function component
 * @returns string
 */
export const useCurrentCountry = (): ICountry => {
  const { defaultLocale } = useRouter();
  return getCountry(defaultLocale);
};

/**
 * Use as hook only
 * @returns string
 */
export const useCountryShortCode = ():string => {
  const { defaultLocale } = useRouter();
  switch (defaultLocale) {
    case 'en-US':
      return 'SG';
    case 'th':
      return 'TH';
    case 'ja':
      return 'JP';
    case 'kr':
      return 'KR';
    default:
      return '';
  }
};

/**
 * NOTE: added third parameter "_locale",
 * in case this function is being call form a component which isn't yet rendered/mounted.
 * So we can avoid error of calling hooks in transition
 */
export const getTranslatedName = (data: any, fieldName: string, locale: string): string => {
  if (!fieldName
    || (data
      && !Object?.keys(data).some((item) => item.includes(fieldName)))) {
    return null;
  }

  switch (locale) {
    case 'en-US':
      return data ? data[`${fieldName}_en`] : '';
    case 'th':
      return data ? data[`${fieldName}_th`] : '';
    case 'ja':
      return data ? data[`${fieldName}_jp`] : '';
    case 'kr':
      return data ? data[`${fieldName}_kr`] : '';
    default:
      return data ? data[`${fieldName}_en`] : '';
  }
};

export const getSupportedCountries = () : ICountry[] => countries.filter((i) => i.enable === true);
