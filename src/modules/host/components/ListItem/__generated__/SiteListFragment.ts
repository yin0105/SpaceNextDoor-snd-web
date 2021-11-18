/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: SiteListFragment
// ====================================================

export interface SiteListFragment_address_country {
  id: number;
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
}

export interface SiteListFragment_address_city {
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
}

export interface SiteListFragment_address_district {
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
}

export interface SiteListFragment_address {
  country: SiteListFragment_address_country;
  city: SiteListFragment_address_city;
  district: SiteListFragment_address_district;
}

export interface SiteListFragment {
  id: number;
  name: string | null;
  name_en: string | null;
  name_th: string | null;
  name_jp: string | null;
  name_kr: string | null;
  description: string | null;
  images: string[] | null;
  address: SiteListFragment_address | null;
}
