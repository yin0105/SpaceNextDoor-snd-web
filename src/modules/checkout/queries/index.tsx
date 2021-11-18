import gql from 'graphql-tag';

const BOOKING_FRAGMENT = gql`
  fragment BookingDetailsFragment on Booking {
    id
    auto_renewal
    move_in_date
    customer_phone_number
    move_out_date
    unit_id
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
    customer {
      first_name
      last_name
      email
      phone_number
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
    site_features {
      name_en 
      icon
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
    quotation_item {
      quotation {
        uuid
      }
    }
  }
`;

export const CREATE_BOOKING = gql`
  mutation CreateBooking(
    $name:          String!
    $phoneNumber:   String!
    $email:         String!
    $autoRenewal:   Boolean!
    $siteID:        Int!
    $spaceID:       Int!
    $moveInDate:    Date!
    $moveOutDate:   Date
    $promoCode:     String
    $promoId:       Int
    $preferredLanguage:String!
    $quotationItemId: Int
    ) {
    createBooking(payload: { 
      name: $name,
      phone_number: $phoneNumber
      email: $email
      auto_renewal: $autoRenewal
      site_id: $siteID
      space_id: $spaceID
      move_in_date: $moveInDate
      move_out_date: $moveOutDate
      promo_code: $promoCode
      promotion_id: $promoId
      quotation_item_id: $quotationItemId
      preferred_language: $preferredLanguage
    }) {
      ...BookingDetailsFragment
      auth {
        access_token
        refresh_token
      }
    }
  }
  ${BOOKING_FRAGMENT}
`;

export const UPDATE_BOOKING = gql`
  mutation UpdateBooking($insuranceId: Int!, $bookingId: Int!) {
    updateBooking(payload: {
      insurance_id: $insuranceId
    }, where: {
      id: {
        _eq: $bookingId
      }
    }) {
      edges {
        id 
      }
    }
  }
`;

export const GET_SPACE_BY_ID = gql`
  query GetSpaceQuery($id: Int!, $moveInDate: Date, $moveOutDate: Date, $country: FixedCountry!, $quotationId: String, $isQIdSet:Boolean!) {
    spaces(
      pagination: {
        skip: 0
        limit: 1
      }
      where:{
        id: {
          _eq: $id
        }
        move_in_date: {
          _eq: $moveInDate
        }
        move_out_date: {
          _eq: $moveOutDate
        }
        country: {  
          _eq: $country
        }
        quotation_uuid: $quotationId
      }
    ) {
      edges{
        id
        size
        size_unit
        available_units
        length
        width      
        quotation @include(if: $isQIdSet) {    
          id
          promotion {
            code  
          }
          public_promotion {
            id
          }      
          move_in_date
          user {
            id
            first_name
            last_name
            email
            phone_number
          }
          items {
            id
            price_per_month          
          }
        }  
        prices {
          price_per_month
          currency_sign
          type
        }
        site{
          id
          name
          images  
          source_site_link          
          stock_management_type        
          agreement {
            id
            content_en
            content_th
            content_jp
            content_kr
          }
          address {
            district {
              name_en
              name_th
              name_jp
              name_kr
            }
          }
        }
      }
    }
  }
`;

export const PAY_BOOKING = gql`
  mutation PayBooking($bookingId: Int!, $cardToken: String!) {
    payBooking(payload: {
      booking_id: $bookingId,
      token: $cardToken,
    }) {
      success 
    }
  }
`;

// TODO: CHANGED LIMIT TO 10, BUT WE NEED TO FIX THE PICK UP TIME AND ALLOW VISIBLE CONTROL ON BE
export const BOOKING_SERVICES_QUERY = gql`
  query BookingServicesQuery($country: CountryFilter!) {
    services(
      pagination: {
        limit: 10, skip: 0
      }
      where: {
          country: $country, status: { _eq: ACTIVE }
        }
    ) {
      edges {
        id
        type 
        title_en
        icon
        description_en
        fixed_price
        max_weight
        size_from
        weight_unit
        vehicle_title
        vehicle_code
      }
    }
  }
`;

export const BOOKING_INSURANCES_QUERY = gql`
  query BookingInsurancesQuery($country: FixedCountry!) {
    insurances(
    pagination: {
      limit: 20, skip: 0
    },
    where: { country: { _eq: $country } }) {
      edges {
        id
        covered_amount
        name_en
        name_th
        name_jp
        name_kr
        price_per_day
        country {
          currency
          currency_sign
        }
      }
    }
  }
`;

export const GET_BOOKING_QUERY = gql`
  query GetBookingDetailsQuery($bookingId: Int!) {
    booking(where: {
      id: {
        _eq: $bookingId
      } 
    }) {
      ...BookingDetailsFragment
    }
  }
  ${BOOKING_FRAGMENT}
`;

export const CREATE_ORDER = gql`
  mutation CreateOrder(
    $bookingId: Int!,
    $address: String!,
    $time: Date!,
    $serviceId: Int!
    $lat: Float!
    $lng: Float!
    $additional_requirements: LogisticsPriceAdditionalRequirements
  ) {
    createOrder(payload: {
      booking_id: $bookingId,
      pickup_service_details: {
        address: $address,
        lat: $lat,
        lng: $lng,
        pickup_time: $time,
        service_id: $serviceId,
        additional_requirements: $additional_requirements
      }
    }) {
      id 
      short_id
    }
  }
`;

export const GET_BOOKING_BY_ID = gql`
  query GetBookingQuery($id: Int!) {
    booking(
      where:{
        id: {
          _eq: $id
        }
      }
    ) {
      ...BookingDetailsFragment
    }
  }
  ${BOOKING_FRAGMENT}
`;

export const CALCULATE_PRICE = gql`
  mutation CalculateBookingPrice(
    $serviceId: Int,
    $insuranceId: Int,
    $moveInDate: Date!
    $moveOutDate: Date
    $spaceId: Int!
    $promotionId: Int
    $promoCode: String,
    $pickupDetails: PickupServiceDetailsCheckoutPricePayload,
    $quotationItemId: Int
  ) {
    calculateCheckOutPrice(payload: {
      pick_up_service_id: $serviceId,
      pickup_service_details: $pickupDetails,
      space_id: $spaceId,
      insurance_id: $insuranceId,
      move_in_date: $moveInDate,
      move_out_date: $moveOutDate,
      promotion_id:$promotionId,
      promo_code: $promoCode,
      quotation_item_id: $quotationItemId
    }) {
      deposit_amount
      insurance_price
      service_price
      sub_total_amount
      payable_amount
      discounted_amount
      promotion_error
      currency_sign
      public_promotion {
        id
        name_en
        name_th
        name_jp
        name_kr
        code
      }
      applied_promotion {
        id
        name_en
        name_th
        name_jp
        name_kr
        code
      }
      total_tax
      applied_taxes {
        name_en
        name_th
        name_jp
        name_kr
        entity_type
        amount
        type
        value
      }
    }
  }
`;

export const PAYMENT_SCHEDULE = gql`
  mutation PaymentSchedule(
    $moveInDate: Date!
    $spaceId: Int!
    $moveOutDate: Date
    $serviceId: Int,
    $insuranceId: Int,
    $promotionId: Int
    $promoCode: String,
    $quotationItemId: Int
  ) {
    paymentSchedule(payload: {
      move_in_date: $moveInDate,
      move_out_date: $moveOutDate,
      promotion_id:$promotionId,
      promo_code: $promoCode,
      space_id: $spaceId,
      insurance_id: $insuranceId,
      pick_up_service_id: $serviceId,
      quotation_item_id: $quotationItemId,
    }) {
      from_date
      to_date
      total_amount
      sub_total_amount,
      deposit_amount,
      insurance_price,
      service_price,
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
  }
`;

export const GET_PUBLIC_PROMOTIONS = gql`
  query GetPublicPromotionsQuery {
    promotions(
      where:{
        format: { _eq: PUBLIC }
      },
      pagination:{limit:20, skip:0}
    ) {
      edges {
        id
        name_en
        name_th
        name_jp
        description_en
        description_th
        description_jp
        customer_buys {
          id
          site_ids
        }
      }
    }
  }
`;
