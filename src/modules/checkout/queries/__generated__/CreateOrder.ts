/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LogisticsPriceAdditionalRequirements } from "./../../../../typings/graphql.types";

// ====================================================
// GraphQL mutation operation: CreateOrder
// ====================================================

export interface CreateOrder_createOrder {
  id: number;
  short_id: string;
}

export interface CreateOrder {
  createOrder: CreateOrder_createOrder;
}

export interface CreateOrderVariables {
  bookingId: number;
  address: string;
  time: any;
  serviceId: number;
  lat: number;
  lng: number;
  additional_requirements?: LogisticsPriceAdditionalRequirements | null;
}
