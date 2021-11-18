/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SpaceSizeUnit, BookingStatus, TaxType, OrderStatus, ServiceType, RenewalType, RenewalStatus } from "./../../../../typings/graphql.types";

// ====================================================
// GraphQL mutation operation: CreateBooking
// ====================================================

export interface CreateBooking_createBooking_payment_schedule_applied_promotion {
  id: number;
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
  code: string | null;
}

export interface CreateBooking_createBooking_payment_schedule {
  from_date: any;
  to_date: any;
  total_amount: number;
  sub_total_amount: number | null;
  deposit_amount: number | null;
  insurance_price: number | null;
  service_price: number | null;
  discounted_amount: number | null;
  applied_promotion: CreateBooking_createBooking_payment_schedule_applied_promotion | null;
}

export interface CreateBooking_createBooking_customer_customer {
  card_last_digits: string | null;
  card_brand_name: string | null;
  card_holder_name: string | null;
}

export interface CreateBooking_createBooking_customer {
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone_number: string | null;
  id: number;
  customer: CreateBooking_createBooking_customer_customer | null;
}

export interface CreateBooking_createBooking_insurance_country {
  currency: string;
  currency_sign: string;
}

export interface CreateBooking_createBooking_insurance {
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
  covered_amount: number;
  price_per_day: number;
  third_party_provider: string;
  country: CreateBooking_createBooking_insurance_country;
}

export interface CreateBooking_createBooking_applied_taxes_tax {
  name_en: string;
  name_th: string | null;
  name_jp: string | null;
  name_kr: string | null;
}

export interface CreateBooking_createBooking_applied_taxes {
  id: number;
  tax_amount: number;
  type: TaxType;
  value: number;
  tax: CreateBooking_createBooking_applied_taxes_tax;
}

export interface CreateBooking_createBooking_space_features {
  icon: string | null;
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
}

export interface CreateBooking_createBooking_site_features {
  name_en: string;
  icon: string | null;
}

export interface CreateBooking_createBooking_site_address_country {
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
}

export interface CreateBooking_createBooking_site_address_district {
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
}

export interface CreateBooking_createBooking_site_address_city {
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
}

export interface CreateBooking_createBooking_site_address {
  lat: number;
  lng: number;
  postal_code: string;
  flat: string | null;
  street: string;
  country: CreateBooking_createBooking_site_address_country | null;
  district: CreateBooking_createBooking_site_address_district | null;
  city: CreateBooking_createBooking_site_address_city | null;
}

export interface CreateBooking_createBooking_original_site_address_country {
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
}

export interface CreateBooking_createBooking_original_site_address {
  country: CreateBooking_createBooking_original_site_address_country;
}

export interface CreateBooking_createBooking_original_site {
  images: string[] | null;
  id: number;
  address: CreateBooking_createBooking_original_site_address | null;
}

export interface CreateBooking_createBooking_original_space_space_type {
  icon: string | null;
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
  size_to: number;
}

export interface CreateBooking_createBooking_original_space {
  id: number;
  size: number;
  size_unit: SpaceSizeUnit;
  space_type: CreateBooking_createBooking_original_space_space_type | null;
}

export interface CreateBooking_createBooking_orders_order_pick_up_service_service {
  title_en: string;
  type: ServiceType;
}

export interface CreateBooking_createBooking_orders_order_pick_up_service {
  total_amount: number;
  pickup_time: any;
  address: string;
  service: CreateBooking_createBooking_orders_order_pick_up_service_service;
}

export interface CreateBooking_createBooking_orders {
  id: number;
  short_id: string;
  status: OrderStatus;
  order_pick_up_service: CreateBooking_createBooking_orders_order_pick_up_service | null;
  currency: string;
  total_amount: number;
}

export interface CreateBooking_createBooking_transactions_booking_original_space_space_type {
  name_en: string;
}

export interface CreateBooking_createBooking_transactions_booking_original_space {
  size_unit: SpaceSizeUnit;
  size: number;
  space_type: CreateBooking_createBooking_transactions_booking_original_space_space_type | null;
}

export interface CreateBooking_createBooking_transactions_booking {
  original_space: CreateBooking_createBooking_transactions_booking_original_space | null;
}

export interface CreateBooking_createBooking_transactions {
  id: number;
  card_last_digits: string;
  card_brand_name: string | null;
  amount: number;
  currency: string;
  created_at: any;
  booking: CreateBooking_createBooking_transactions_booking | null;
}

export interface CreateBooking_createBooking_renewals {
  type: RenewalType;
  status: RenewalStatus;
  next_renewal_date: any | null;
  renewal_start_date: any;
  renewal_end_date: any;
  base_amount: number;
  insurance_amount: number | null;
  total_amount: number;
  deposit_amount: number | null;
  discount_amount: number;
  sub_total_amount: number;
}

export interface CreateBooking_createBooking_auth {
  access_token: string;
  refresh_token: string;
}

export interface CreateBooking_createBooking {
  id: number;
  auto_renewal: boolean;
  move_in_date: any;
  customer_phone_number: string | null;
  move_out_date: any | null;
  unit_id: string | null;
  short_id: string;
  space_size: number | null;
  space_height: number | null;
  space_length: number | null;
  payment_schedule: CreateBooking_createBooking_payment_schedule[] | null;
  customer: CreateBooking_createBooking_customer;
  insurance: CreateBooking_createBooking_insurance | null;
  is_insured: boolean;
  space_size_unit: SpaceSizeUnit | null;
  space_price_per_month: number;
  currency: string;
  deposited_amount: number;
  is_deposit_refunded: boolean;
  deposit_refunded_date: any | null;
  status: BookingStatus;
  currency_sign: string;
  site_name: string;
  base_amount: number;
  total_amount: number;
  discount_amount: number;
  sub_total_amount: number;
  total_tax_amount: number;
  applied_taxes: CreateBooking_createBooking_applied_taxes[] | null;
  space_features: CreateBooking_createBooking_space_features[];
  site_features: CreateBooking_createBooking_site_features[];
  site_address: CreateBooking_createBooking_site_address;
  original_site: CreateBooking_createBooking_original_site | null;
  original_space: CreateBooking_createBooking_original_space | null;
  orders: CreateBooking_createBooking_orders[];
  transactions: CreateBooking_createBooking_transactions[];
  renewals: CreateBooking_createBooking_renewals[];
  auth: CreateBooking_createBooking_auth;
}

export interface CreateBooking {
  createBooking: CreateBooking_createBooking;
}

export interface CreateBookingVariables {
  name: string;
  phoneNumber: string;
  email: string;
  autoRenewal: boolean;
  siteID: number;
  spaceID: number;
  moveInDate: any;
  moveOutDate?: any | null;
  promoCode?: string | null;
  promoId?: number | null;
  preferredLanguage: string;
  quotationItemId?: number | null;
}
