import gql from 'graphql-tag';
import SearchPopupFragment from '../../../components/Search/Popup/Popup.fragment';

export const SEARCH_LOCATIONS_QUERY = gql`
  query SearchLocationsQuery($search: StringFilter, $country: CountryFilter!) {
    locations(where: {
      country: $country
      name: $search 
    }) {
      edges {
        ...SearchLocationItemFragment
      }
    }
  }
  ${SearchPopupFragment}  
`;

export const PLATFORM_SPACE_TYPES_QUERY = gql`
  query SpaceTypesQuery($country: FixedCountry!) {
    space_types(pagination: {
      limit: 50,
      skip: 0
    }, where: {
      country:{
        _eq: $country
      }
    }) {
      edges {
        id
        icon
        size_from
        size_to
        unit
        name_en
        name_th
        name_jp
        name_kr
        country {
          name_en
          name_th
          name_jp
          name_kr
        }
      } 
    }
  }
`;

export const PLATFORM_FEATURES_QUERY = gql`
  query PlatformFeaturesQuery($type: PlatformFeatureTypeFilter) {
    feature_categories(pagination: {
      limit: 50,
      skip: 0
    }, where: {
      is_active: { _eq: true },
      type: $type
    }) {
      edges {
        id
        name_en
        name_kr
        name_jp
        name_th
        features {
          id
          name_en
          name_th
          name_jp
          name_kr
          description_en
          description_th
          description_kr
          description_jp
          icon
          type
        }
      }
    }
  }
`;
