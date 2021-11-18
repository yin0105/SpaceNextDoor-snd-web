/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SpaceSizeUnit, PriceType } from "./../../../../../typings/graphql.types";

// ====================================================
// GraphQL fragment: SpaceItemFragment
// ====================================================

export interface SpaceItemFragment_features {
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
}

export interface SpaceItemFragment_prices {
  currency_sign: string;
  price_per_month: number | null;
  type: PriceType;
}

export interface SpaceItemFragment {
  id: number;
  size: number;
  size_unit: SpaceSizeUnit;
  length: number;
  width: number;
  available_units: number | null;
  features: SpaceItemFragment_features[];
  prices: SpaceItemFragment_prices[];
}
