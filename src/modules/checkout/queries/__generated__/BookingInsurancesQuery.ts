/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FixedCountry } from "./../../../../typings/graphql.types";

// ====================================================
// GraphQL query operation: BookingInsurancesQuery
// ====================================================

export interface BookingInsurancesQuery_insurances_edges_country {
  currency: string;
  currency_sign: string;
}

export interface BookingInsurancesQuery_insurances_edges {
  id: number;
  covered_amount: number;
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
  price_per_day: number;
  country: BookingInsurancesQuery_insurances_edges_country;
}

export interface BookingInsurancesQuery_insurances {
  edges: BookingInsurancesQuery_insurances_edges[];
}

export interface BookingInsurancesQuery {
  insurances: BookingInsurancesQuery_insurances;
}

export interface BookingInsurancesQueryVariables {
  country: FixedCountry;
}
