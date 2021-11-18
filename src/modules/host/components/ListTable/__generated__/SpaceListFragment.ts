/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SpaceSizeUnit, SpaceStatus } from "./../../../../../typings/graphql.types";

// ====================================================
// GraphQL fragment: SpaceListFragment
// ====================================================

export interface SpaceListFragment_features {
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
}

export interface SpaceListFragment_space_type {
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
}

export interface SpaceListFragment {
  id: number;
  name: string | null;
  size: number;
  size_unit: SpaceSizeUnit;
  height: number;
  length: number;
  width: number;
  status: SpaceStatus;
  total_units: number;
  features: SpaceListFragment_features[];
  space_type: SpaceListFragment_space_type | null;
}
