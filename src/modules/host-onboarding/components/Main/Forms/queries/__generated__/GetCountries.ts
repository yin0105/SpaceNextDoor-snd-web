/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCountries
// ====================================================

export interface GetCountries_countries_page_info {
  has_more: boolean | null;
  total: number;
}

export interface GetCountries_countries_edges_cities_districts {
  id: number;
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
}

export interface GetCountries_countries_edges_cities {
  id: number;
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
  districts: GetCountries_countries_edges_cities_districts[];
}

export interface GetCountries_countries_edges {
  id: number;
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
  cities: GetCountries_countries_edges_cities[];
}

export interface GetCountries_countries {
  page_info: GetCountries_countries_page_info;
  edges: GetCountries_countries_edges[];
}

export interface GetCountries {
  countries: GetCountries_countries;
}

export interface GetCountriesVariables {
  limit: number;
  offset: number;
}
