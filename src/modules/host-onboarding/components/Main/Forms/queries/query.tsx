import { gql } from '@apollo/client';

export const GET_COUNTRIES = gql`
  query GetCountries($limit: Int!, $offset: Int!) {
    countries(pagination: {
      limit: $limit,
      skip: $offset
    }) {
      page_info {
        has_more
        total
      }
      edges {
        id
        name_en
        name_th
        name_jp
        name_kr
        cities {
          id
          name_en
          name_th
          name_jp
          name_kr
          districts {
            id
            name_en
            name_th
            name_jp
            name_kr
          }
        }
      }
    }
  }
`;

export const GET_FEATURE_CATEGORIES = gql`
  query FeatureCategoriesQuery($limit: Int!, $offset: Int!, $isActive: Boolean!, $type: PlatformFeatureType!  ) {
    feature_categories(pagination: {
      limit: $limit,
      skip: $offset
    }, where: {
      type: {_eq: $type },
      is_active: {_eq: $isActive}
    }, sort_by: {name_en: asc}) {
      page_info {
        total,
        has_more,
        skip,
        limit
      }
      edges {
        id,
        name_en,
        name_th,
        name_jp,
        name_kr
        features {
          id,
          name_en,
          name_th,
          name_jp,
          name_kr,
          description_en,
          description_th,
          description_jp,
          description_kr,
          icon,
          type,
          is_active
        }
      }
    }
  }
`;

export const UPDATE_SITE = gql`
  mutation UpdateSite($siteId: Int!, $payload: UpdateSitePayload!) {
    updateSite(payload: $payload, where: { id: { _eq: $siteId } }) {
      modified
    }
  }
`;

export const CREATE_SPACE = gql`
  mutation CreateSpace(
    $siteID: Int!,
    $height: Float!,
    $width: Float!,
    $length: Float!,
    $size_unit: SpaceSizeUnit!,
    $price_per_month: Float!,
    $total_units: Int!,
    $features_id: [Int!]!
    $name: String
  ) {
    createSpace(
      payload: {
        site_id: $siteID,
        height: $height,
        width: $width,
        length: $length,
        size_unit: $size_unit,
        price_per_month: $price_per_month,
        total_units: $total_units,
        features_id: $features_id,
        name: $name,
      }
    ) {
      status,
      features {
        id,
        name_en,
        name_th
      }
      site {
        id,
        name,
        address {
          postal_code
        }
      },
      size,
      size_unit,
      height,
      width,
      length,
      total_units,
      prices {
        price_per_day,
        price_per_month,
        price_per_week,
        type
      }
      id
      name
    }
  }
`;

export const GET_PROPERTY_TYPES = gql`
  query GetPropertyTypes($skip: Int!, $limit: Int!, $name_en: SortBy! ) {
    property_types(pagination: {skip: $skip, limit: $limit},
      sort_by: {name_en: $name_en},
    ) {
      page_info {
        total,
        has_more,
        skip,
        limit
      }
      edges {
        id,
        name_en,
        name_th,
        name_jp,
        name_kr
      }
    }
  }
`;

export const CREATE_SITE = gql`
  mutation CreateSite(
    $name: String,
    $description: String,
    $property_type_id: Int!,
    $rules_id: [Int!]!,
    $features_id: [Int!]!,
    $policies_id: [Int!]!,
    $floor: Int,
    $provider_type: ProviderType!,
    $address: SiteAddressPayload
  ) {
    createSite(payload: {
      name: $name,
      description: $description,
      property_type_id: $property_type_id,
      rules_id: $rules_id,
      features_id: $features_id,
      policies_id: $policies_id,
      floor: $floor,
      provider_type: $provider_type,
      address: $address
    }) {
      id,
    }
  }
`;

export const UPDATE_SPACE = gql`
  mutation updateSpace($spaceId: Int!, $payload: UpdateSpacePayload!) {
    updateSpace(payload: $payload, where: { id: { _eq: $spaceId } }) {
      modified
    }
  }
`;

export const GET_SPACE_QUERY = gql`
  query getSpace($spaceId: Int!) {
    space(where: { id: { _eq: $spaceId } }) {
      id
      name
      height
      width
      length
      size_unit
      prices {
        price_per_month
      }
      total_units
      status
      features {
        id
        name_en
        name_th
        name_jp
        name_kr
      }
    }
  }
`;
