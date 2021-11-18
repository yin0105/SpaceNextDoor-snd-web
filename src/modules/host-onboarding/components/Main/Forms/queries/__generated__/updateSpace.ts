/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateSpacePayload } from "./../../../../../../../typings/graphql.types";

// ====================================================
// GraphQL mutation operation: updateSpace
// ====================================================

export interface updateSpace_updateSpace {
  modified: number;
}

export interface updateSpace {
  updateSpace: updateSpace_updateSpace;
}

export interface updateSpaceVariables {
  spaceId: number;
  payload: UpdateSpacePayload;
}
