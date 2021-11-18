/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FixedCountry, SpaceSizeUnit } from "./../../../../typings/graphql.types";

// ====================================================
// GraphQL query operation: SpaceTypesQuery
// ====================================================

export interface SpaceTypesQuery_space_types_edges_country {
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
}

export interface SpaceTypesQuery_space_types_edges_features_category {
  id: number;
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
}

export interface SpaceTypesQuery_space_types_edges_features {
  id: number;
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
  category: SpaceTypesQuery_space_types_edges_features_category;
}

export interface SpaceTypesQuery_space_types_edges_spaces_edges_prices {
  price_per_month: number | null;
  currency: string;
  currency_sign: string;
}

export interface SpaceTypesQuery_space_types_edges_spaces_edges {
  id: number;
  prices: SpaceTypesQuery_space_types_edges_spaces_edges_prices[];
}

export interface SpaceTypesQuery_space_types_edges_spaces {
  edges: SpaceTypesQuery_space_types_edges_spaces_edges[];
}

export interface SpaceTypesQuery_space_types_edges {
  id: number;
  icon: string | null;
  size_from: number;
  size_to: number;
  unit: SpaceSizeUnit;
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
  country: SpaceTypesQuery_space_types_edges_country;
  features: SpaceTypesQuery_space_types_edges_features[] | null;
  spaces: SpaceTypesQuery_space_types_edges_spaces | null;
}

export interface SpaceTypesQuery_space_types {
  edges: SpaceTypesQuery_space_types_edges[];
}

export interface SpaceTypesQuery {
  space_types: SpaceTypesQuery_space_types;
}

export interface SpaceTypesQueryVariables {
  country: FixedCountry;
  siteId?: number | null;
  districtIds?: number[] | null;
}
