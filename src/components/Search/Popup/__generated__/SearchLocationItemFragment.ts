/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: SearchLocationItemFragment
// ====================================================

export interface SearchLocationItemFragment_city {
  id: number;
  name_en: string;
  name_th: string;
  name_kr: string;
  name_jp: string;
}

export interface SearchLocationItemFragment_district {
  id: number;
  name_en: string;
  name_th: string;
  name_kr: string;
  name_jp: string;
}

export interface SearchLocationItemFragment_country {
  id: number;
  name_en: string;
  name_th: string;
  name_kr: string;
  name_jp: string;
}

export interface SearchLocationItemFragment {
  city: SearchLocationItemFragment_city;
  district: SearchLocationItemFragment_district | null;
  country: SearchLocationItemFragment_country;
}
