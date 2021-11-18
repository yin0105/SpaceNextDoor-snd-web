import gql from 'graphql-tag';

export const FETCH_RESERVATIONS_QUERY = gql`
  query HostReservationsQuery($limit: Int!, $skip: Int!, $filters: BookingsFilter) {
    bookings (
      pagination: {
        limit: $limit,
        skip: $skip
      },
      where: $filters
    ) {
      page_info {
        total
        has_more
        skip
        limit
      }
      edges {
        id
        short_id
        status
        site_name
        customer {
          first_name
          last_name
          phone_number
          email
        }
        site_address {
          postal_code
          country {
            name_en
            name_th
            name_jp
            name_kr
          }
          flat 
          street
          city {
            name_en
            name_th
            name_jp
            name_kr
          }
        }
        space_size
        space_size_unit
        total_amount
        sub_total_amount
        site_description
        move_in_date
        move_out_date
        customer_phone_number
        deposited_amount
        currency_sign
        orders {
          order_pick_up_service {
            amount
          }
        }
        renewals {
          insurance_amount
        }
      }
    }
  }
`;

export const GET_RESERVATION_QUERY = gql`
query ReservationDetailQuery ($id: Int!) {
  booking (
    where: {
      id: {
        _eq: $id
      }
    }
  ) {
    id
    auto_renewal
    short_id
    unit_id
    site_name
    status  
    space_size
    space_size_unit
    total_amount
    move_in_date
    move_out_date
    customer_phone_number
    short_id
    space_size
    space_height
    space_length
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
    insurance {
      name_en
      name_th
      name_jp
      name_kr
    }
    is_insured
    space_size_unit
    space_price_per_month
    currency
    deposited_amount
    is_deposit_refunded
    deposit_refunded_date
    status
    currency_sign
    site_name
    base_amount
    total_amount
    discount_amount
    sub_total_amount
    total_tax_amount
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
    space_features {
      icon
      name_en
      name_th
      name_jp
      name_kr
    }
    site_address {
      lat
      lng
      postal_code
      flat 
      street
      country {
        name_en
        name_th
        name_jp
        name_kr
      }
      district {
        name_en
        name_th
        name_jp
        name_kr
      }
      city {
        name_en
        name_th
        name_jp
        name_kr
      }
    }
    customer {
      id
      first_name
      last_name
      email
      phone_number
        customer {
         card_last_digits
         card_brand_name
         card_holder_name
        }
    }
    site_features {
      name_en
      name_th
      name_jp
      name_kr
      icon
    }
    original_site {
      images
      id
      address {
        country {
          name_en
          name_th
          name_jp
          name_kr
        }
      }
    }
    original_space {
      id
      size
      size_unit
      available_units
      space_type {
        icon
        name_en
        name_th
        name_jp
        name_kr
        size_to
      }
    }
    orders {
      id
      short_id
      status
      order_pick_up_service {
        total_amount
        pickup_time
        address
        service {
          title_en
          type
        }
      }
      currency
      total_amount
    }
    insurance {
      name_en
      name_th
      name_jp
      name_kr
      covered_amount
      price_per_day
      third_party_provider
      country {
        currency
        currency_sign
      }
    }
    transactions {
      id
      card_last_digits
      card_brand_name
      amount
      currency
      created_at
      booking {
        original_space {
          size_unit
          size
          space_type {
            name_en   
          }
        }
      }
    }
    renewals {
      type
      status
      next_renewal_date
      renewal_start_date
      renewal_end_date
      base_amount
      insurance_amount
      total_amount
      deposit_amount
      discount_amount
      sub_total_amount
    }
    sub_total_amount
    orders {
      total_amount
      order_pick_up_service {
        amount
      }
    }
  }
}
`;
