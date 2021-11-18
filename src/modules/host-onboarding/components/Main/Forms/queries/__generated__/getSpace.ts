/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SpaceSizeUnit, SpaceStatus } from "./../../../../../../../typings/graphql.types";

// ====================================================
// GraphQL query operation: getSpace
// ====================================================

export interface getSpace_space_prices {
  price_per_month: number | null;
}

export interface getSpace_space_features {
  id: number;
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
}

export interface getSpace_space {
  id: number;
  name: string | null;
  height: number;
  width: number;
  length: number;
  size_unit: SpaceSizeUnit;
  prices: getSpace_space_prices[];
  total_units: number;
  status: SpaceStatus;
  features: getSpace_space_features[];
}

export interface getSpace {
  space: getSpace_space;
}

export interface getSpaceVariables {
  spaceId: number;
}
