/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: SiteItemFragment
// ====================================================

export interface SiteItemFragment_address_city {
  id: number;
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
}

export interface SiteItemFragment_address_district {
  id: number;
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
}

export interface SiteItemFragment_address {
  lat: number;
  lng: number;
  city: SiteItemFragment_address_city;
  district: SiteItemFragment_address_district;
}

export interface SiteItemFragment {
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
  address: SiteItemFragment_address | null;
}
