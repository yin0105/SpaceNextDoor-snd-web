/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FixedCountry, SpaceSizeUnit, PriceType, StockManagementType } from "./../../../../typings/graphql.types";

// ====================================================
// GraphQL query operation: GetSpaceQuery
// ====================================================

export interface GetSpaceQuery_spaces_edges_quotation_promotion {
  code: string | null;
}

export interface GetSpaceQuery_spaces_edges_quotation_public_promotion {
  id: number;
}

export interface GetSpaceQuery_spaces_edges_quotation_user {
  id: number;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone_number: string | null;
}

export interface GetSpaceQuery_spaces_edges_quotation_items {
  id: number;
  price_per_month: number | null;
}

export interface GetSpaceQuery_spaces_edges_quotation {
  id: number;
  promotion: GetSpaceQuery_spaces_edges_quotation_promotion | null;
  public_promotion: GetSpaceQuery_spaces_edges_quotation_public_promotion | null;
  move_in_date: any;
  user: GetSpaceQuery_spaces_edges_quotation_user;
  items: (GetSpaceQuery_spaces_edges_quotation_items | null)[];
}

export interface GetSpaceQuery_spaces_edges_prices {
  price_per_month: number | null;
  currency_sign: string;
  type: PriceType;
}

export interface GetSpaceQuery_spaces_edges_site_agreement {
  id: number;
  content_en: string;
  content_th: string;
  content_jp: string;
  content_kr: string;
}

export interface GetSpaceQuery_spaces_edges_site_address_district {
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
}

export interface GetSpaceQuery_spaces_edges_site_address {
  district: GetSpaceQuery_spaces_edges_site_address_district;
}

export interface GetSpaceQuery_spaces_edges_site {
  id: number;
  name: string | null;
  images: string[] | null;
  source_site_link: string | null;
  stock_management_type: StockManagementType | null;
  agreement: GetSpaceQuery_spaces_edges_site_agreement | null;
  address: GetSpaceQuery_spaces_edges_site_address | null;
}

export interface GetSpaceQuery_spaces_edges {
  id: number;
  size: number;
  size_unit: SpaceSizeUnit;
  available_units: number | null;
  length: number;
  width: number;
  quotation: GetSpaceQuery_spaces_edges_quotation | null;
  prices: GetSpaceQuery_spaces_edges_prices[];
  site: GetSpaceQuery_spaces_edges_site;
}

export interface GetSpaceQuery_spaces {
  edges: GetSpaceQuery_spaces_edges[];
}

export interface GetSpaceQuery {
  spaces: GetSpaceQuery_spaces;
}

export interface GetSpaceQueryVariables {
  id: number;
  moveInDate?: any | null;
  moveOutDate?: any | null;
  country: FixedCountry;
  quotationId?: string | null;
  isQIdSet: boolean;
}
