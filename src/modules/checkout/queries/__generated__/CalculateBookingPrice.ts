/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PickupServiceDetailsCheckoutPricePayload, TaxEntityType, TaxType } from "./../../../../typings/graphql.types";

// ====================================================
// GraphQL mutation operation: CalculateBookingPrice
// ====================================================

export interface CalculateBookingPrice_calculateCheckOutPrice_public_promotion {
  id: number;
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
  code: string | null;
}

export interface CalculateBookingPrice_calculateCheckOutPrice_applied_promotion {
  id: number;
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
  code: string | null;
}

export interface CalculateBookingPrice_calculateCheckOutPrice_applied_taxes {
  name_en: string;
  name_th: string | null;
  name_jp: string | null;
  name_kr: string | null;
  entity_type: TaxEntityType;
  amount: number;
  type: TaxType;
  value: number;
}

export interface CalculateBookingPrice_calculateCheckOutPrice {
  deposit_amount: number | null;
  insurance_price: number | null;
  service_price: number | null;
  sub_total_amount: number | null;
  payable_amount: number;
  discounted_amount: number | null;
  promotion_error: string | null;
  currency_sign: string | null;
  /**
   * In case public promotion is applied OR will apply in future renewals indexes
   */
  public_promotion: CalculateBookingPrice_calculateCheckOutPrice_public_promotion | null;
  applied_promotion: CalculateBookingPrice_calculateCheckOutPrice_applied_promotion | null;
  total_tax: number;
  applied_taxes: CalculateBookingPrice_calculateCheckOutPrice_applied_taxes[];
}

export interface CalculateBookingPrice {
  calculateCheckOutPrice: CalculateBookingPrice_calculateCheckOutPrice;
}

export interface CalculateBookingPriceVariables {
  serviceId?: number | null;
  insuranceId?: number | null;
  moveInDate: any;
  moveOutDate?: any | null;
  spaceId: number;
  promotionId?: number | null;
  promoCode?: string | null;
  pickupDetails?: PickupServiceDetailsCheckoutPricePayload | null;
  quotationItemId?: number | null;
}
