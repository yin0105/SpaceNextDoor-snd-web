import gql from 'graphql-tag';

export const FETCH_INVOICE_QUERY = gql`
query GetCustomerInvoiceQuery($transaction_id: Int!) {
  customer_invoice(where: {transaction_id: {_eq: $transaction_id}}) {
    start_date
    end_date
    issue_date
    transaction_short_id
    customer {
      name
      card_brand_name
      card_last_digits
      phone_number
      email
    }
    discount_amount
    paid_amount
    items {
      name
      qty
      discount
      amount
      currency
      currency_sign
    }
    currency_sign
    total_amount
    tax_amount
    sub_total_amount
    deposit_amount
    payment_schedule {
      from_date
      to_date
      total_amount
      sub_total_amount
      deposit_amount
      insurance_price
      service_price
      discounted_amount
      applied_promotion {
        id
        name_en
        name_th
        name_jp
        name_kr
        code
      }
    }
    applied_taxes {
      id
      tax_amount
      type
      value
      tax {
        name_en
        name_th
        name_jp
        name_kr
      }
    }
  }
}
`;
