/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BookingsFilter, BookingStatus, SpaceSizeUnit } from "./../../../../typings/graphql.types";

// ====================================================
// GraphQL query operation: HostReservationsQuery
// ====================================================

export interface HostReservationsQuery_bookings_page_info {
  total: number;
  has_more: boolean | null;
  skip: number;
  limit: number;
}

export interface HostReservationsQuery_bookings_edges_customer {
  first_name: string | null;
  last_name: string | null;
  phone_number: string | null;
  email: string | null;
}

export interface HostReservationsQuery_bookings_edges_site_address_country {
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
}

export interface HostReservationsQuery_bookings_edges_site_address_city {
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
}

export interface HostReservationsQuery_bookings_edges_site_address {
  postal_code: string;
  country: HostReservationsQuery_bookings_edges_site_address_country | null;
  flat: string | null;
  street: string;
  city: HostReservationsQuery_bookings_edges_site_address_city | null;
}

export interface HostReservationsQuery_bookings_edges_orders_order_pick_up_service {
  amount: number;
}

export interface HostReservationsQuery_bookings_edges_orders {
  order_pick_up_service: HostReservationsQuery_bookings_edges_orders_order_pick_up_service | null;
}

export interface HostReservationsQuery_bookings_edges_renewals {
  insurance_amount: number | null;
}

export interface HostReservationsQuery_bookings_edges {
  id: number;
  short_id: string;
  status: BookingStatus;
  site_name: string;
  customer: HostReservationsQuery_bookings_edges_customer;
  site_address: HostReservationsQuery_bookings_edges_site_address;
  space_size: number | null;
  space_size_unit: SpaceSizeUnit | null;
  total_amount: number;
  sub_total_amount: number;
  site_description: string;
  move_in_date: any;
  move_out_date: any | null;
  customer_phone_number: string | null;
  deposited_amount: number;
  currency_sign: string;
  orders: HostReservationsQuery_bookings_edges_orders[];
  renewals: HostReservationsQuery_bookings_edges_renewals[];
}

export interface HostReservationsQuery_bookings {
  page_info: HostReservationsQuery_bookings_page_info;
  edges: HostReservationsQuery_bookings_edges[];
}

export interface HostReservationsQuery {
  bookings: HostReservationsQuery_bookings;
}

export interface HostReservationsQueryVariables {
  limit: number;
  skip: number;
  filters?: BookingsFilter | null;
}
