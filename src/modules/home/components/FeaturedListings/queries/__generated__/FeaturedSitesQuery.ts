/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EntityIdFilter } from "./../../../../../../typings/graphql.types";

// ====================================================
// GraphQL query operation: FeaturedSitesQuery
// ====================================================

export interface FeaturedSitesQuery_sites_page_info {
  has_more: boolean | null;
  total: number;
}

export interface FeaturedSitesQuery_sites_edges_address_district {
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
}

export interface FeaturedSitesQuery_sites_edges_address_country {
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
}

export interface FeaturedSitesQuery_sites_edges_address_city {
  id: number;
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
}

export interface FeaturedSitesQuery_sites_edges_address {
  district: FeaturedSitesQuery_sites_edges_address_district;
  country: FeaturedSitesQuery_sites_edges_address_country;
  city: FeaturedSitesQuery_sites_edges_address_city;
}

export interface FeaturedSitesQuery_sites_edges_spaces_edges_prices {
  price_per_month: number | null;
  currency: string;
  currency_sign: string;
}

export interface FeaturedSitesQuery_sites_edges_spaces_edges {
  prices: FeaturedSitesQuery_sites_edges_spaces_edges_prices[];
}

export interface FeaturedSitesQuery_sites_edges_spaces {
  edges: FeaturedSitesQuery_sites_edges_spaces_edges[];
}

export interface FeaturedSitesQuery_sites_edges {
  id: number;
  name_en: string | null;
  name_th: string | null;
  name_jp: string | null;
  name_kr: string | null;
  images: string[] | null;
  address: FeaturedSitesQuery_sites_edges_address | null;
  spaces: FeaturedSitesQuery_sites_edges_spaces;
}

export interface FeaturedSitesQuery_sites {
  page_info: FeaturedSitesQuery_sites_page_info;
  edges: FeaturedSitesQuery_sites_edges[];
}

export interface FeaturedSitesQuery {
  sites: FeaturedSitesQuery_sites;
}

export interface FeaturedSitesQueryVariables {
  limit: number;
  offset: number;
  isFeatured?: boolean | null;
  countryId: EntityIdFilter;
}
