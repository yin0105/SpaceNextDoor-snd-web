/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateProfilePayload } from "./../../../../typings/graphql.types";

// ====================================================
// GraphQL mutation operation: updateProfile
// ====================================================

export interface updateProfile_updateProfile_edges_provider_bank {
  id: number;
  name: string;
}

export interface updateProfile_updateProfile_edges_provider {
  bank_account_number: string | null;
  bank_account_holder_name: string | null;
  bank: updateProfile_updateProfile_edges_provider_bank | null;
}

export interface updateProfile_updateProfile_edges {
  id: number;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone_number: string | null;
  image_url: string | null;
  preferred_language: string | null;
  provider: updateProfile_updateProfile_edges_provider | null;
}

export interface updateProfile_updateProfile {
  edges: updateProfile_updateProfile_edges[];
}

export interface updateProfile {
  updateProfile: updateProfile_updateProfile;
}

export interface updateProfileVariables {
  payload: UpdateProfilePayload;
}
