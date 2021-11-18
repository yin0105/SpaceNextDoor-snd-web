/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FixedCountry } from "./../../../../typings/graphql.types";

// ====================================================
// GraphQL query operation: GetSpacePriceByType
// ====================================================

export interface GetSpacePriceByType_spaces_edges_prices {
  id: number;
  price_per_month: number | null;
  currency_sign: string;
}

export interface GetSpacePriceByType_spaces_edges {
  prices: GetSpacePriceByType_spaces_edges_prices[];
}

export interface GetSpacePriceByType_spaces {
  edges: GetSpacePriceByType_spaces_edges[];
}

export interface GetSpacePriceByType {
  spaces: GetSpacePriceByType_spaces;
}

export interface GetSpacePriceByTypeVariables {
  spaceTypeId: number;
  country: FixedCountry;
}
