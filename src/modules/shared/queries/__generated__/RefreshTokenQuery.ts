/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LoginTokenType } from "./../../../../typings/graphql.types";

// ====================================================
// GraphQL mutation operation: RefreshTokenQuery
// ====================================================

export interface RefreshTokenQuery_refreshToken {
  access_token: string;
  token_type: LoginTokenType;
  refresh_token: string;
  expires_at: string;
}

export interface RefreshTokenQuery {
  refreshToken: RefreshTokenQuery_refreshToken;
}

export interface RefreshTokenQueryVariables {
  accessToken: string;
  refreshToken: string;
}
