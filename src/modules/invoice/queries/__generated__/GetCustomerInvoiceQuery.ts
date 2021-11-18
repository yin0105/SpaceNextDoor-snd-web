/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TaxType } from "./../../../../typings/graphql.types";

// ====================================================
// GraphQL query operation: GetCustomerInvoiceQuery
// ====================================================

export interface GetCustomerInvoiceQuery_customer_invoice_customer {
  name: string | null;
  card_brand_name: string | null;
  card_last_digits: string | null;
  phone_number: string | null;
  email: string | null;
}

export interface GetCustomerInvoiceQuery_customer_invoice_items {
  name: string;
  qty: number | null;
  discount: number | null;
  amount: number;
  currency: string;
  currency_sign: string;
}

export interface GetCustomerInvoiceQuery_customer_invoice_payment_schedule_applied_promotion {
  id: number;
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
  code: string | null;
}

export interface GetCustomerInvoiceQuery_customer_invoice_payment_schedule {
  from_date: any;
  to_date: any;
  total_amount: number;
  sub_total_amount: number | null;
  deposit_amount: number | null;
  insurance_price: number | null;
  service_price: number | null;
  discounted_amount: number | null;
  applied_promotion: GetCustomerInvoiceQuery_customer_invoice_payment_schedule_applied_promotion | null;
}

export interface GetCustomerInvoiceQuery_customer_invoice_applied_taxes_tax {
  name_en: string;
  name_th: string | null;
  name_jp: string | null;
  name_kr: string | null;
}

export interface GetCustomerInvoiceQuery_customer_invoice_applied_taxes {
  id: number;
  tax_amount: number;
  type: TaxType;
  value: number;
  tax: GetCustomerInvoiceQuery_customer_invoice_applied_taxes_tax;
}

export interface GetCustomerInvoiceQuery_customer_invoice {
  start_date: any | null;
  end_date: any | null;
  issue_date: any | null;
  transaction_short_id: string | null;
  customer: GetCustomerInvoiceQuery_customer_invoice_customer | null;
  discount_amount: number | null;
  paid_amount: number | null;
  items: GetCustomerInvoiceQuery_customer_invoice_items[];
  currency_sign: string;
  total_amount: number | null;
  tax_amount: number | null;
  sub_total_amount: number | null;
  deposit_amount: number | null;
  payment_schedule: GetCustomerInvoiceQuery_customer_invoice_payment_schedule[] | null;
  applied_taxes: GetCustomerInvoiceQuery_customer_invoice_applied_taxes[] | null;
}

export interface GetCustomerInvoiceQuery {
  customer_invoice: GetCustomerInvoiceQuery_customer_invoice;
}

export interface GetCustomerInvoiceQueryVariables {
  transaction_id: number;
}
