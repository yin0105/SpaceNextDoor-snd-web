import {
  PriceType, SpaceSizeUnit, SpaceStatus, StockManagementType,
} from 'typings/graphql.types';

export interface ILocalizedNames {
  id: number;
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
}

export interface ISiteAddress {
  lat: number;
  lng: number;
  city: ILocalizedNames;
  district: ILocalizedNames;
}

export interface ISpacePrice {
  currency_sign: string;
  price_per_month: number | null;
  type: PriceType;
  currency: string;
}

export interface ISpace {
  id: number;
  size: number;
  size_unit: SpaceSizeUnit;
  length: number;
  width: number;
  available_units: number | null;
  space_type?: ISpaceType;
  features: ILocalizedNames[];
  stock_available_until?: string;
  prices: ISpacePrice[];
  status: SpaceStatus;
}

export interface ISpaces {
  edges: ISpace[];
}

export interface ISite {
  id: number;
  name_en: string | null;
  name_th: string | null;
  name_kr: string | null;
  name_jp: string | null;
  description_en: string | null;
  description_th: string | null;
  description_jp: string | null;
  description_kr: string | null;
  images: string[] | null;
  is_featured: boolean;
  features?: IFeatures[];
  address: ISiteAddress | null;
  spaces: ISpaces;
  total_active_spaces: number;
  stock_management_type: StockManagementType;
}

export interface ISpaceType {
  id: number;
  icon: string | null;
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
  unit: SpaceSizeUnit;
  size_from: number;
  size_to: number;
}

export interface IFeatures {
  id: number;
  icon: string | null;
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
}

export interface IMapSite {
  id: number;
  name_en: string;
  name_th: string;
  name_kr: string;
  name_jp: string;
  images: string[];
  address: ISiteAddress;
  pricePerMonth: number;
  currencySign: string;
}
