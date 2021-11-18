/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FixedCountry, SpaceSizeUnit } from "./../../../../typings/graphql.types";

// ====================================================
// GraphQL query operation: PlatformSpaceTypesQuery
// ====================================================

export interface PlatformSpaceTypesQuery_space_types_edges_country {
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
}

export interface PlatformSpaceTypesQuery_space_types_edges_features_category {
  id: number;
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
}

export interface PlatformSpaceTypesQuery_space_types_edges_features {
  id: number;
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
  category: PlatformSpaceTypesQuery_space_types_edges_features_category;
}

export interface PlatformSpaceTypesQuery_space_types_edges_spaces_edges_prices {
  price_per_month: number | null;
  currency: string;
  currency_sign: string;
}

export interface PlatformSpaceTypesQuery_space_types_edges_spaces_edges {
  id: number;
  prices: PlatformSpaceTypesQuery_space_types_edges_spaces_edges_prices[];
}

export interface PlatformSpaceTypesQuery_space_types_edges_spaces {
  edges: PlatformSpaceTypesQuery_space_types_edges_spaces_edges[];
}

export interface PlatformSpaceTypesQuery_space_types_edges {
  id: number;
  icon: string | null;
  size_from: number;
  size_to: number;
  unit: SpaceSizeUnit;
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
  image: string | null;
  country: PlatformSpaceTypesQuery_space_types_edges_country;
  features: PlatformSpaceTypesQuery_space_types_edges_features[] | null;
  spaces: PlatformSpaceTypesQuery_space_types_edges_spaces | null;
}

export interface PlatformSpaceTypesQuery_space_types {
  edges: PlatformSpaceTypesQuery_space_types_edges[];
}

export interface PlatformSpaceTypesQuery {
  space_types: PlatformSpaceTypesQuery_space_types;
}

export interface PlatformSpaceTypesQueryVariables {
  country: FixedCountry;
  siteId: number;
}
