import gql from 'graphql-tag';

export const GET_SPACE_TYPE = gql`
  query GetSpaceType($size: Int!, $country: FixedCountry!) {
    space_types(
      pagination: {
        skip: 0
        limit: 1
      }
      where:{
        size: {
          _eq: $size
        },
        country: {
          _eq: $country
        },
      }
    ) {
      edges{
        id
        name_en
        name_th
        name_jp
        name_kr
        unit
        size_to
        size_from
        size
        icon
      }
    }
  }
`;

export const GET_SPACE_PRICE_BY_TYPE = gql`
  query GetSpacePriceByType($spaceTypeId: Int!, $country: FixedCountry!) {
    spaces(
      pagination: {
        skip: 0
        limit: 1
      }
      where:{
        status: {_eq: ACTIVE}
        type_id: {
          _eq: $spaceTypeId
        },
        country: {  
          _eq: $country
        }
      }
      sort_by: {
        price: asc
      }
    ) {
      edges{
        prices {
          id
          price_per_month
          currency_sign
        }
      }
    }
  }
`;

export const GET_SPACE_CATEGORIES = gql`
  query GetSpaceCategoriesQuery {
    space_categories(
      pagination: {
        skip: 0
        limit: 100
      }
    ) {
      edges{
        id
        name_en
        name_th
        name_jp
        name_kr
        icon
        items {
          id
          name_en
          name_th
          name_jp
          name_kr
          height
          width
          dimension
          unit
        }
      }
    }
  }
`;
