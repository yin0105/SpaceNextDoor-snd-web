/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CountryFilter, ServiceType } from "./../../../../typings/graphql.types";

// ====================================================
// GraphQL query operation: BookingServicesQuery
// ====================================================

export interface BookingServicesQuery_services_edges {
  id: number;
  type: ServiceType;
  title_en: string;
  icon: string | null;
  description_en: string;
  fixed_price: number | null;
  max_weight: number | null;
  size_from: string | null;
  weight_unit: string | null;
  vehicle_title: string | null;
  vehicle_code: string | null;
}

export interface BookingServicesQuery_services {
  edges: BookingServicesQuery_services_edges[];
}

export interface BookingServicesQuery {
  services: BookingServicesQuery_services;
}

export interface BookingServicesQueryVariables {
  country: CountryFilter;
}
