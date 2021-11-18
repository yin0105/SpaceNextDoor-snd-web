/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LoginTokenType } from "../../../../../../../typings/graphql.types";

// ====================================================
// GraphQL mutation operation: Login
// ====================================================

export interface Login_login {
  access_token: string;
  token_type: LoginTokenType;
  refresh_token: string;
  expires_at: string;
}

export interface Login {
  login: Login_login;
}

export interface LoginVariables {
  username: string;
  otp: string;
}
