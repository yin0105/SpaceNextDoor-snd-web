/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FixedCountry, SpaceSizeUnit } from "./../../../../typings/graphql.types";

// ====================================================
// GraphQL query operation: GetSpaceType
// ====================================================

export interface GetSpaceType_space_types_edges {
  id: number;
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
  unit: SpaceSizeUnit;
  size_to: number;
  size_from: number;
  size: number;
  icon: string | null;
}

export interface GetSpaceType_space_types {
  edges: GetSpaceType_space_types_edges[];
}

export interface GetSpaceType {
  space_types: GetSpaceType_space_types;
}

export interface GetSpaceTypeVariables {
  size: number;
  country: FixedCountry;
}
