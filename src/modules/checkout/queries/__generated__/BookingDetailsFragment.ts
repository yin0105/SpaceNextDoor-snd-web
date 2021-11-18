/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SpaceSizeUnit, BookingStatus, TaxType, OrderStatus, ServiceType, RenewalType, RenewalStatus } from "./../../../../typings/graphql.types";

// ====================================================
// GraphQL fragment: BookingDetailsFragment
// ====================================================

export interface BookingDetailsFragment_payment_schedule_applied_promotion {
  id: number;
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
  code: string | null;
}

export interface BookingDetailsFragment_payment_schedule {
  from_date: any;
  to_date: any;
  total_amount: number;
  sub_total_amount: number | null;
  deposit_amount: number | null;
  insurance_price: number | null;
  service_price: number | null;
  discounted_amount: number | null;
  applied_promotion: BookingDetailsFragment_payment_schedule_applied_promotion | null;
}

export interface BookingDetailsFragment_customer_customer {
  card_last_digits: string | null;
  card_brand_name: string | null;
  card_holder_name: string | null;
}

export interface BookingDetailsFragment_customer {
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone_number: string | null;
  id: number;
  customer: BookingDetailsFragment_customer_customer | null;
}

export interface BookingDetailsFragment_insurance_country {
  currency: string;
  currency_sign: string;
}

export interface BookingDetailsFragment_insurance {
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
  covered_amount: number;
  price_per_day: number;
  third_party_provider: string;
  country: BookingDetailsFragment_insurance_country;
}

export interface BookingDetailsFragment_applied_taxes_tax {
  name_en: string;
  name_th: string | null;
  name_jp: string | null;
  name_kr: string | null;
}

export interface BookingDetailsFragment_applied_taxes {
  id: number;
  tax_amount: number;
  type: TaxType;
  value: number;
  tax: BookingDetailsFragment_applied_taxes_tax;
}

export interface BookingDetailsFragment_space_features {
  icon: string | null;
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
}

export interface BookingDetailsFragment_site_features {
  name_en: string;
  icon: string | null;
}

export interface BookingDetailsFragment_site_address_country {
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
}

export interface BookingDetailsFragment_site_address_district {
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
}

export interface BookingDetailsFragment_site_address_city {
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
}

export interface BookingDetailsFragment_site_address {
  lat: number;
  lng: number;
  postal_code: string;
  flat: string | null;
  street: string;
  country: BookingDetailsFragment_site_address_country | null;
  district: BookingDetailsFragment_site_address_district | null;
  city: BookingDetailsFragment_site_address_city | null;
}

export interface BookingDetailsFragment_original_site_address_country {
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
}

export interface BookingDetailsFragment_original_site_address {
  country: BookingDetailsFragment_original_site_address_country;
}

export interface BookingDetailsFragment_original_site {
  images: string[] | null;
  id: number;
  address: BookingDetailsFragment_original_site_address | null;
}

export interface BookingDetailsFragment_original_space_space_type {
  icon: string | null;
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
  size_to: number;
}

export interface BookingDetailsFragment_original_space {
  id: number;
  size: number;
  size_unit: SpaceSizeUnit;
  space_type: BookingDetailsFragment_original_space_space_type | null;
}

export interface BookingDetailsFragment_orders_order_pick_up_service_service {
  title_en: string;
  type: ServiceType;
}

export interface BookingDetailsFragment_orders_order_pick_up_service {
  total_amount: number;
  pickup_time: any;
  address: string;
  service: BookingDetailsFragment_orders_order_pick_up_service_service;
}

export interface BookingDetailsFragment_orders {
  id: number;
  short_id: string;
  status: OrderStatus;
  order_pick_up_service: BookingDetailsFragment_orders_order_pick_up_service | null;
  currency: string;
  total_amount: number;
}

export interface BookingDetailsFragment_transactions_booking_original_space_space_type {
  name_en: string;
}

export interface BookingDetailsFragment_transactions_booking_original_space {
  size_unit: SpaceSizeUnit;
  size: number;
  space_type: BookingDetailsFragment_transactions_booking_original_space_space_type | null;
}

export interface BookingDetailsFragment_transactions_booking {
  original_space: BookingDetailsFragment_transactions_booking_original_space | null;
}

export interface BookingDetailsFragment_transactions {
  id: number;
  card_last_digits: string;
  card_brand_name: string | null;
  amount: number;
  currency: string;
  created_at: any;
  booking: BookingDetailsFragment_transactions_booking | null;
}

export interface BookingDetailsFragment_renewals {
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

export interface BookingDetailsFragment {
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
  payment_schedule: BookingDetailsFragment_payment_schedule[] | null;
  customer: BookingDetailsFragment_customer;
  insurance: BookingDetailsFragment_insurance | null;
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
  applied_taxes: BookingDetailsFragment_applied_taxes[] | null;
  space_features: BookingDetailsFragment_space_features[];
  site_features: BookingDetailsFragment_site_features[];
  site_address: BookingDetailsFragment_site_address;
  original_site: BookingDetailsFragment_original_site | null;
  original_space: BookingDetailsFragment_original_space | null;
  orders: BookingDetailsFragment_orders[];
  transactions: BookingDetailsFragment_transactions[];
  renewals: BookingDetailsFragment_renewals[];
}
