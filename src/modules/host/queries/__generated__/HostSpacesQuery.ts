/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FixedCountry, SpaceSizeUnit, SpaceStatus } from "./../../../../typings/graphql.types";

// ====================================================
// GraphQL query operation: HostSpacesQuery
// ====================================================

export interface HostSpacesQuery_spaces_page_info {
  total: number;
  has_more: boolean | null;
  skip: number;
  limit: number;
}

export interface HostSpacesQuery_spaces_edges_features {
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
}

export interface HostSpacesQuery_spaces_edges_space_type {
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
}

export interface HostSpacesQuery_spaces_edges {
  id: number;
  name: string | null;
  size: number;
  size_unit: SpaceSizeUnit;
  height: number;
  length: number;
  width: number;
  status: SpaceStatus;
  total_units: number;
  features: HostSpacesQuery_spaces_edges_features[];
  space_type: HostSpacesQuery_spaces_edges_space_type | null;
}

export interface HostSpacesQuery_spaces {
  page_info: HostSpacesQuery_spaces_page_info;
  edges: HostSpacesQuery_spaces_edges[];
}

export interface HostSpacesQuery {
  spaces: HostSpacesQuery_spaces;
}

export interface HostSpacesQueryVariables {
  limit: number;
  offset: number;
  siteId: number;
  country: FixedCountry;
}
