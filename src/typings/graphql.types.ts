/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum BookingStatus {
  ACTIVE = "ACTIVE",
  CANCELLED = "CANCELLED",
  COMPLETED = "COMPLETED",
  CONFIRMED = "CONFIRMED",
  RESERVED = "RESERVED",
  TERMINATED = "TERMINATED",
}

export enum FixedCountry {
  Japan = "Japan",
  Korea = "Korea",
  Singapore = "Singapore",
  Thailand = "Thailand",
}

export enum LoginTokenType {
  BEARER = "BEARER",
}

export enum OrderStatus {
  CANCELLED = "CANCELLED",
  COMPLETED = "COMPLETED",
  CONFIRMED = "CONFIRMED",
  PENDING = "PENDING",
}

export enum PlatformFeatureType {
  SITE = "SITE",
  SPACE = "SPACE",
  SPACE_TYPE = "SPACE_TYPE",
}

export enum PriceType {
  BASE_PRICE = "BASE_PRICE",
  DISCOUNTED_PRICE = "DISCOUNTED_PRICE",
}

export enum ProviderType {
  BUSINESS = "BUSINESS",
  INDIVIDUAL = "INDIVIDUAL",
}

export enum QuotationStatus {
  ACCEPTED = "ACCEPTED",
  ACTIVE = "ACTIVE",
  REJECTED = "REJECTED",
}

export enum RenewalStatus {
  FAILED = "FAILED",
  PAID = "PAID",
  UN_PAID = "UN_PAID",
}

export enum RenewalType {
  BOOKING = "BOOKING",
  FULL_SUBSCRIPTION = "FULL_SUBSCRIPTION",
  PARTIAL_SUBSCRIPTION = "PARTIAL_SUBSCRIPTION",
}

export enum ServiceType {
  PICK_UP = "PICK_UP",
}

export enum SiteStatus {
  ACTIVE = "ACTIVE",
  DRAFT = "DRAFT",
  INACTIVE = "INACTIVE",
  READY_TO_REVIEW = "READY_TO_REVIEW",
  REJECTED = "REJECTED",
}

export enum SortBy {
  asc = "asc",
  desc = "desc",
}

export enum SpaceCategoryItemSizeUnit {
  cm = "cm",
}

export enum SpaceSizeUnit {
  sqft = "sqft",
  sqm = "sqm",
  tatami = "tatami",
}

export enum SpaceStatus {
  ACTIVE = "ACTIVE",
  ARCHIVED = "ARCHIVED",
  DRAFT = "DRAFT",
  IN_ACTIVE = "IN_ACTIVE",
  READY_TO_REVIEW = "READY_TO_REVIEW",
  REJECTED = "REJECTED",
}

export enum StockManagementType {
  AFFILIATE = "AFFILIATE",
  SND = "SND",
  THIRD_PARTY = "THIRD_PARTY",
}

export enum TaxEntityType {
  INSURANCE = "INSURANCE",
  SERVICE = "SERVICE",
  SITE = "SITE",
}

export enum TaxType {
  ABSOLUTE = "ABSOLUTE",
  PERCENTAGE = "PERCENTAGE",
}

export interface BookingBaseAmountFilter {
  _gt?: number | null;
  _lt?: number | null;
}

export interface BookingStatusFilter {
  _eq?: BookingStatus | null;
  _in?: BookingStatus[] | null;
}

export interface BookingsFilter {
  status?: BookingStatusFilter | null;
  base_amount?: BookingBaseAmountFilter | null;
  move_in_date?: MoveInDateFilter | null;
  move_out_date?: MoveOutDateFilter | null;
}

export interface CheckoutLogisticsPickUpLocation {
  lat: number;
  lng: number;
}

export interface CountryFilter {
  _eq: FixedCountry;
}

export interface EntityIdFilter {
  _eq?: number | null;
  _in?: number[] | null;
}

export interface LogisticsPriceAdditionalRequirements {
  mover_count?: number | null;
}

export interface MoveInDateFilter {
  _gt?: any | null;
  _lt?: any | null;
}

export interface MoveOutDateFilter {
  _gt?: any | null;
  _lt?: any | null;
}

export interface PickupServiceDetailsCheckoutPricePayload {
  schedule_at: any;
  pick_up_location: CheckoutLogisticsPickUpLocation;
  additional_requirements?: LogisticsPriceAdditionalRequirements | null;
}

export interface PlatformFeatureTypeFilter {
  _eq?: PlatformFeatureType | null;
  _in?: PlatformFeatureType[] | null;
}

export interface ProviderUpdateBankPayload {
  bank_id: number;
  bank_account_number: string;
  bank_account_holder_name?: string | null;
}

export interface QuotationPayload {
  move_in_date: any;
  move_out_date?: any | null;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  preferred_language: string;
  promo_code?: string | null;
  promotion_id?: number | null;
  site_id?: number | null;
  space_id?: number | null;
  district_ids?: number[] | null;
  space_type_id?: number | null;
}

export interface SiteAddressPayload {
  lat: number;
  lng: number;
  country_id: number;
  city_id: number;
  district_id: number;
  street: string;
  flat?: string | null;
  postal_code: string;
}

export interface StringFilter {
  _eq?: string | null;
  _like?: string | null;
  _iLike?: string | null;
}

export interface UpdateProfilePayload {
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  customer_card_token?: string | null;
  preferred_language?: string | null;
  provider_bank?: ProviderUpdateBankPayload | null;
}

export interface UpdateSitePayload {
  name?: string | null;
  description?: string | null;
  property_type_id?: number | null;
  rules_id?: number[] | null;
  features_id?: number[] | null;
  policies_id?: number[] | null;
  floor?: number | null;
  provider_type?: ProviderType | null;
  address?: SiteAddressPayload | null;
  status?: SiteStatus | null;
  images?: string[] | null;
}

export interface UpdateSpacePayload {
  name?: string | null;
  height?: number | null;
  width?: number | null;
  length?: number | null;
  size_unit?: SpaceSizeUnit | null;
  price_per_month?: number | null;
  total_units?: number | null;
  images?: string[] | null;
  features_id?: number[] | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
