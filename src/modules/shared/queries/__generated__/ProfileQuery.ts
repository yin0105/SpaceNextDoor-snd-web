/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProfileQuery
// ====================================================

export interface ProfileQuery_profile_provider_bank {
  id: number;
  name: string;
}

export interface ProfileQuery_profile_provider {
  id: number;
  tax_id: string | null;
  bank_account_number: string | null;
  bank_account_holder_name: string | null;
  bank: ProfileQuery_profile_provider_bank | null;
}

export interface ProfileQuery_profile_customer {
  stripe_customer_id: string | null;
  card_last_digits: string | null;
}

export interface ProfileQuery_profile {
  id: number;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone_number: string | null;
  image_url: string | null;
  facebook_user_id: string | null;
  google_user_id: string | null;
  provider: ProfileQuery_profile_provider | null;
  customer: ProfileQuery_profile_customer | null;
}

export interface ProfileQuery {
  profile: ProfileQuery_profile;
}
