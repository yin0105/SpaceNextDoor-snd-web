/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProviderType, SpaceSizeUnit, SpaceStatus } from "./../../../../typings/graphql.types";

// ====================================================
// GraphQL query operation: OnboardingSitesQuery
// ====================================================

export interface OnboardingSitesQuery_sites_edges_property_type {
  id: number;
}

export interface OnboardingSitesQuery_sites_edges_features {
  id: number;
}

export interface OnboardingSitesQuery_sites_edges_address_city {
  id: number;
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
}

export interface OnboardingSitesQuery_sites_edges_address_district {
  id: number;
}

export interface OnboardingSitesQuery_sites_edges_address_country {
  id: number;
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
}

export interface OnboardingSitesQuery_sites_edges_address {
  street: string;
  flat: string | null;
  postal_code: string;
  lat: number;
  lng: number;
  city: OnboardingSitesQuery_sites_edges_address_city;
  district: OnboardingSitesQuery_sites_edges_address_district;
  country: OnboardingSitesQuery_sites_edges_address_country;
}

export interface OnboardingSitesQuery_sites_edges_spaces_edges_prices {
  price_per_month: number | null;
}

export interface OnboardingSitesQuery_sites_edges_spaces_edges_features {
  id: number;
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
}

export interface OnboardingSitesQuery_sites_edges_spaces_edges {
  id: number;
  name: string | null;
  height: number;
  width: number;
  length: number;
  size_unit: SpaceSizeUnit;
  prices: OnboardingSitesQuery_sites_edges_spaces_edges_prices[];
  total_units: number;
  status: SpaceStatus;
  features: OnboardingSitesQuery_sites_edges_spaces_edges_features[];
}

export interface OnboardingSitesQuery_sites_edges_spaces {
  edges: OnboardingSitesQuery_sites_edges_spaces_edges[];
}

export interface OnboardingSitesQuery_sites_edges {
  id: number;
  name: string | null;
  name_en: string | null;
  name_th: string | null;
  name_kr: string | null;
  name_jp: string | null;
  description: string | null;
  description_en: string | null;
  description_kr: string | null;
  description_jp: string | null;
  description_th: string | null;
  images: string[] | null;
  provider_type: ProviderType;
  property_type: OnboardingSitesQuery_sites_edges_property_type;
  floor: number | null;
  features: OnboardingSitesQuery_sites_edges_features[];
  address: OnboardingSitesQuery_sites_edges_address | null;
  spaces: OnboardingSitesQuery_sites_edges_spaces;
}

export interface OnboardingSitesQuery_sites {
  edges: OnboardingSitesQuery_sites_edges[];
}

export interface OnboardingSitesQuery {
  sites: OnboardingSitesQuery_sites;
}

export interface OnboardingSitesQueryVariables {
  siteId?: number | null;
}
