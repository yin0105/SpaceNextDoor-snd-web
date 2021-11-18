/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BookingStatus, SpaceSizeUnit, TaxType, OrderStatus, ServiceType, RenewalType, RenewalStatus } from "./../../../../typings/graphql.types";

// ====================================================
// GraphQL query operation: ReservationDetailQuery
// ====================================================

export interface ReservationDetailQuery_booking_payment_schedule_applied_promotion {
  id: number;
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
  code: string | null;
}

export interface ReservationDetailQuery_booking_payment_schedule {
  from_date: any;
  to_date: any;
  total_amount: number;
  sub_total_amount: number | null;
  deposit_amount: number | null;
  insurance_price: number | null;
  service_price: number | null;
  discounted_amount: number | null;
  applied_promotion: ReservationDetailQuery_booking_payment_schedule_applied_promotion | null;
}

export interface ReservationDetailQuery_booking_insurance_country {
  currency: string;
  currency_sign: string;
}

export interface ReservationDetailQuery_booking_insurance {
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
  covered_amount: number;
  price_per_day: number;
  third_party_provider: string;
  country: ReservationDetailQuery_booking_insurance_country;
}

export interface ReservationDetailQuery_booking_applied_taxes_tax {
  name_en: string;
  name_th: string | null;
  name_jp: string | null;
  name_kr: string | null;
}

export interface ReservationDetailQuery_booking_applied_taxes {
  id: number;
  tax_amount: number;
  type: TaxType;
  value: number;
  tax: ReservationDetailQuery_booking_applied_taxes_tax;
}

export interface ReservationDetailQuery_booking_space_features {
  icon: string | null;
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
}

export interface ReservationDetailQuery_booking_site_address_country {
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
}

export interface ReservationDetailQuery_booking_site_address_district {
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
}

export interface ReservationDetailQuery_booking_site_address_city {
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
}

export interface ReservationDetailQuery_booking_site_address {
  lat: number;
  lng: number;
  postal_code: string;
  flat: string | null;
  street: string;
  country: ReservationDetailQuery_booking_site_address_country | null;
  district: ReservationDetailQuery_booking_site_address_district | null;
  city: ReservationDetailQuery_booking_site_address_city | null;
}

export interface ReservationDetailQuery_booking_customer_customer {
  card_last_digits: string | null;
  card_brand_name: string | null;
  card_holder_name: string | null;
}

export interface ReservationDetailQuery_booking_customer {
  id: number;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone_number: string | null;
  customer: ReservationDetailQuery_booking_customer_customer | null;
}

export interface ReservationDetailQuery_booking_site_features {
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
  icon: string | null;
}

export interface ReservationDetailQuery_booking_original_site_address_country {
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
}

export interface ReservationDetailQuery_booking_original_site_address {
  country: ReservationDetailQuery_booking_original_site_address_country;
}

export interface ReservationDetailQuery_booking_original_site {
  images: string[] | null;
  id: number;
  address: ReservationDetailQuery_booking_original_site_address | null;
}

export interface ReservationDetailQuery_booking_original_space_space_type {
  icon: string | null;
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
  size_to: number;
}

export interface ReservationDetailQuery_booking_original_space {
  id: number;
  size: number;
  size_unit: SpaceSizeUnit;
  available_units: number | null;
  space_type: ReservationDetailQuery_booking_original_space_space_type | null;
}

export interface ReservationDetailQuery_booking_orders_order_pick_up_service_service {
  title_en: string;
  type: ServiceType;
}

export interface ReservationDetailQuery_booking_orders_order_pick_up_service {
  total_amount: number;
  pickup_time: any;
  address: string;
  service: ReservationDetailQuery_booking_orders_order_pick_up_service_service;
  amount: number;
}

export interface ReservationDetailQuery_booking_orders {
  id: number;
  short_id: string;
  status: OrderStatus;
  order_pick_up_service: ReservationDetailQuery_booking_orders_order_pick_up_service | null;
  currency: string;
  total_amount: number;
}

export interface ReservationDetailQuery_booking_transactions_booking_original_space_space_type {
  name_en: string;
}

export interface ReservationDetailQuery_booking_transactions_booking_original_space {
  size_unit: SpaceSizeUnit;
  size: number;
  space_type: ReservationDetailQuery_booking_transactions_booking_original_space_space_type | null;
}

export interface ReservationDetailQuery_booking_transactions_booking {
  original_space: ReservationDetailQuery_booking_transactions_booking_original_space | null;
}

export interface ReservationDetailQuery_booking_transactions {
  id: number;
  card_last_digits: string;
  card_brand_name: string | null;
  amount: number;
  currency: string;
  created_at: any;
  booking: ReservationDetailQuery_booking_transactions_booking | null;
}

export interface ReservationDetailQuery_booking_renewals {
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

export interface ReservationDetailQuery_booking {
  id: number;
  auto_renewal: boolean;
  short_id: string;
  unit_id: string | null;
  site_name: string;
  status: BookingStatus;
  space_size: number | null;
  space_size_unit: SpaceSizeUnit | null;
  total_amount: number;
  move_in_date: any;
  move_out_date: any | null;
  customer_phone_number: string | null;
  space_height: number | null;
  space_length: number | null;
  payment_schedule: ReservationDetailQuery_booking_payment_schedule[] | null;
  insurance: ReservationDetailQuery_booking_insurance | null;
  is_insured: boolean;
  space_price_per_month: number;
  currency: string;
  deposited_amount: number;
  is_deposit_refunded: boolean;
  deposit_refunded_date: any | null;
  currency_sign: string;
  base_amount: number;
  discount_amount: number;
  sub_total_amount: number;
  total_tax_amount: number;
  applied_taxes: ReservationDetailQuery_booking_applied_taxes[] | null;
  space_features: ReservationDetailQuery_booking_space_features[];
  site_address: ReservationDetailQuery_booking_site_address;
  customer: ReservationDetailQuery_booking_customer;
  site_features: ReservationDetailQuery_booking_site_features[];
  original_site: ReservationDetailQuery_booking_original_site | null;
  original_space: ReservationDetailQuery_booking_original_space | null;
  orders: ReservationDetailQuery_booking_orders[];
  transactions: ReservationDetailQuery_booking_transactions[];
  renewals: ReservationDetailQuery_booking_renewals[];
}

export interface ReservationDetailQuery {
  booking: ReservationDetailQuery_booking;
}

export interface ReservationDetailQueryVariables {
  id: number;
}
