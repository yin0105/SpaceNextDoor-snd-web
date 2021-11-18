/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProviderType, SiteAddressPayload } from "./../../../../../../../typings/graphql.types";

// ====================================================
// GraphQL mutation operation: CreateSite
// ====================================================

export interface CreateSite_createSite {
  id: number;
}

export interface CreateSite {
  createSite: CreateSite_createSite;
}

export interface CreateSiteVariables {
  name?: string | null;
  description?: string | null;
  property_type_id: number;
  rules_id: number[];
  features_id: number[];
  policies_id: number[];
  floor?: number | null;
  provider_type: ProviderType;
  address?: SiteAddressPayload | null;
}
