/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LoginTokenType } from "./../../../../typings/graphql.types";

// ====================================================
// GraphQL mutation operation: LoginQuery
// ====================================================

export interface LoginQuery_login {
  access_token: string;
  token_type: LoginTokenType;
  refresh_token: string;
  expires_at: string;
}

export interface LoginQuery {
  login: LoginQuery_login;
}

export interface LoginQueryVariables {
  username: string;
  otp: string;
  preferredLanguage: string;
}
