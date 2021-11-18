import gql from 'graphql-tag';

export const ONBOARDING_SITES_QUERY = gql`
  query OnboardingSitesQuery($siteId: Int) {
    sites(
      pagination: { limit: 1, skip: 0 },
      where: {
        id: {
          _eq: $siteId
        }
      }
    ) {
      edges {
        id
        name
        name_en
        name_th
        name_kr
        name_jp
        description
        description_en
        description_kr
        description_jp
        description_th
        images
        provider_type
        property_type {
          id
        }
        floor
        features {
          id
        }
        address {
          street
          flat
          postal_code
          lat
          lng
          city {
            id
            name_en
            name_th
            name_jp
            name_kr
          }
          district {
            id
          }
          country {
            id
            name_en
            name_th
            name_jp
            name_kr
          }
        }
        spaces {
          edges {
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
      } 
    }
  }
`;
