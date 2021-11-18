/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateSitePayload } from "./../../../../../../../typings/graphql.types";

// ====================================================
// GraphQL mutation operation: UpdateSite
// ====================================================

export interface UpdateSite_updateSite {
  modified: number;
}

export interface UpdateSite {
  updateSite: UpdateSite_updateSite;
}

export interface UpdateSiteVariables {
  siteId: number;
  payload: UpdateSitePayload;
}
