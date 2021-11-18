/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: PayBooking
// ====================================================

export interface PayBooking_payBooking {
  success: boolean;
}

export interface PayBooking {
  payBooking: PayBooking_payBooking;
}

export interface PayBookingVariables {
  bookingId: number;
  cardToken: string;
}
