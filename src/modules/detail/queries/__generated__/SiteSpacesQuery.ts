/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FixedCountry, SpaceSizeUnit, PriceType } from "./../../../../typings/graphql.types";

// ====================================================
// GraphQL query operation: SiteSpacesQuery
// ====================================================

export interface SiteSpacesQuery_spaces_edges_site_address_country {
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
}

export interface SiteSpacesQuery_spaces_edges_site_address {
  country: SiteSpacesQuery_spaces_edges_site_address_country;
}

export interface SiteSpacesQuery_spaces_edges_site {
  id: number;
  name_en: string | null;
  name_th: string | null;
  name_jp: string | null;
  name_kr: string | null;
  address: SiteSpacesQuery_spaces_edges_site_address | null;
}

export interface SiteSpacesQuery_spaces_edges_prices {
  id: number;
  price_per_month: number | null;
  type: PriceType;
  currency: string;
}

export interface SiteSpacesQuery_spaces_edges_space_type {
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

export interface SiteSpacesQuery_spaces_edges_features {
  id: number;
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
  icon: string | null;
}

export interface SiteSpacesQuery_spaces_edges {
  id: number;
  size: number;
  size_unit: SpaceSizeUnit;
  site: SiteSpacesQuery_spaces_edges_site;
  stock_available_until: any | null;
  available_units: number | null;
  width: number;
  length: number;
  prices: SiteSpacesQuery_spaces_edges_prices[];
  space_type: SiteSpacesQuery_spaces_edges_space_type | null;
  features: SiteSpacesQuery_spaces_edges_features[];
}

export interface SiteSpacesQuery_spaces {
  edges: SiteSpacesQuery_spaces_edges[];
}

export interface SiteSpacesQuery {
  spaces: SiteSpacesQuery_spaces;
}

export interface SiteSpacesQueryVariables {
  siteId: number;
  moveOutDate?: any | null;
  moveInDate?: any | null;
  country: FixedCountry;
}
