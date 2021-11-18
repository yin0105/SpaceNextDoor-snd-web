/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateBoooking
// ====================================================

export interface CreateBoooking_createBooking {
  id: number;
  site_name: string;
}

export interface CreateBoooking {
  createBooking: CreateBoooking_createBooking;
}

export interface CreateBoookingVariables {
  name: string;
  phoneNumber: string;
  email: string;
  autoRenewal: boolean;
  siteID: number;
  spaceID: number;
  moveInDate: any;
  moveOutDate: any;
}
