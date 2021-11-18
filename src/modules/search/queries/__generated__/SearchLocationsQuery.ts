/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { StringFilter, CountryFilter } from "./../../../../typings/graphql.types";

// ====================================================
// GraphQL query operation: SearchLocationsQuery
// ====================================================

export interface SearchLocationsQuery_locations_edges_city {
  id: number;
  name_en: string;
  name_th: string;
  name_kr: string;
  name_jp: string;
}

export interface SearchLocationsQuery_locations_edges_district {
  id: number;
  name_en: string;
  name_th: string;
  name_kr: string;
  name_jp: string;
}

export interface SearchLocationsQuery_locations_edges_country {
  id: number;
  name_en: string;
  name_th: string;
  name_kr: string;
  name_jp: string;
}

export interface SearchLocationsQuery_locations_edges {
  city: SearchLocationsQuery_locations_edges_city;
  district: SearchLocationsQuery_locations_edges_district | null;
  country: SearchLocationsQuery_locations_edges_country;
}

export interface SearchLocationsQuery_locations {
  edges: SearchLocationsQuery_locations_edges[];
}

export interface SearchLocationsQuery {
  locations: SearchLocationsQuery_locations;
}

export interface SearchLocationsQueryVariables {
  search?: StringFilter | null;
  country: CountryFilter;
}
