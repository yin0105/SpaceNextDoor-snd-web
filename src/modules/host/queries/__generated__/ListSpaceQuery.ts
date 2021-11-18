/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SpaceSizeUnit, SpaceStatus } from "./../../../../typings/graphql.types";

// ====================================================
// GraphQL query operation: ListSpaceQuery
// ====================================================

export interface ListSpaceQuery_space_site_address_city {
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
}

export interface ListSpaceQuery_space_site_address_district {
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
}

export interface ListSpaceQuery_space_site_address {
  city: ListSpaceQuery_space_site_address_city;
  district: ListSpaceQuery_space_site_address_district;
}

export interface ListSpaceQuery_space_site {
  id: number;
  name: string | null;
  address: ListSpaceQuery_space_site_address | null;
}

export interface ListSpaceQuery_space_prices {
  price_per_month: number | null;
  currency: string;
  currency_sign: string;
}

export interface ListSpaceQuery_space_features {
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
}

export interface ListSpaceQuery_space {
  id: number;
  name: string | null;
  site: ListSpaceQuery_space_site;
  size: number;
  height: number;
  width: number;
  length: number;
  size_unit: SpaceSizeUnit;
  status: SpaceStatus;
  total_units: number;
  available_units: number | null;
  prices: ListSpaceQuery_space_prices[];
  features: ListSpaceQuery_space_features[];
}

export interface ListSpaceQuery {
  space: ListSpaceQuery_space;
}

export interface ListSpaceQueryVariables {
  listId: number;
}
