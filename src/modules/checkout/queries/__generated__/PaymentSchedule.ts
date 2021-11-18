/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: PaymentSchedule
// ====================================================

export interface PaymentSchedule_paymentSchedule_applied_promotion {
  id: number;
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
  code: string | null;
}

export interface PaymentSchedule_paymentSchedule {
  from_date: any;
  to_date: any;
  total_amount: number;
  sub_total_amount: number | null;
  deposit_amount: number | null;
  insurance_price: number | null;
  service_price: number | null;
  discounted_amount: number | null;
  applied_promotion: PaymentSchedule_paymentSchedule_applied_promotion | null;
}

export interface PaymentSchedule {
  paymentSchedule: PaymentSchedule_paymentSchedule[];
}

export interface PaymentScheduleVariables {
  moveInDate: any;
  spaceId: number;
  moveOutDate?: any | null;
  serviceId?: number | null;
  insuranceId?: number | null;
  promotionId?: number | null;
  promoCode?: string | null;
  quotationItemId?: number | null;
}
