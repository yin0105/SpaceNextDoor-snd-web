/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateBooking
// ====================================================

export interface UpdateBooking_updateBooking_edges {
  id: number;
}

export interface UpdateBooking_updateBooking {
  edges: UpdateBooking_updateBooking_edges[];
}

export interface UpdateBooking {
  updateBooking: UpdateBooking_updateBooking;
}

export interface UpdateBookingVariables {
  insuranceId: number;
  bookingId: number;
}
