/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SpaceSizeUnit, SpaceStatus, PriceType } from "./../../../../../../../typings/graphql.types";

// ====================================================
// GraphQL mutation operation: CreateSpace
// ====================================================

export interface CreateSpace_createSpace_features {
  id: number;
  name_en: string;
  name_th: string;
}

export interface CreateSpace_createSpace_site_address {
  postal_code: string;
}

export interface CreateSpace_createSpace_site {
  id: number;
  name: string | null;
  address: CreateSpace_createSpace_site_address | null;
}

export interface CreateSpace_createSpace_prices {
  price_per_day: number | null;
  price_per_month: number | null;
  price_per_week: number | null;
  type: PriceType;
}

export interface CreateSpace_createSpace {
  status: SpaceStatus;
  features: CreateSpace_createSpace_features[];
  site: CreateSpace_createSpace_site;
  size: number;
  size_unit: SpaceSizeUnit;
  height: number;
  width: number;
  length: number;
  total_units: number;
  prices: CreateSpace_createSpace_prices[];
  id: number;
  name: string | null;
}

export interface CreateSpace {
  createSpace: CreateSpace_createSpace;
}

export interface CreateSpaceVariables {
  siteID: number;
  height: number;
  width: number;
  length: number;
  size_unit: SpaceSizeUnit;
  price_per_month: number;
  total_units: number;
  features_id: number[];
  name?: string | null;
}
