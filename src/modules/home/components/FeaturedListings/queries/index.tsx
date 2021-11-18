import gql from 'graphql-tag';

export const FEATURED_SITES_QUERY = gql`
  query FeaturedSitesQuery(
    $limit: Int!, $offset: Int!, $isFeatured: Boolean, $countryId: EntityIdFilter!
  ) {
    sites(pagination: {
      limit: $limit,
      skip: $offset
    }, where: {
      status: {_eq: ACTIVE}
      country_id: $countryId
      is_featured: $isFeatured
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
        images
        address {
          district {
            name_en
            name_th
            name_jp
            name_kr
          }
          country {
            name_en
            name_th
            name_jp
            name_kr
          }
          city {
            id
            name_en
            name_th
            name_jp
            name_kr
          }
        }
        spaces(
          pagination: { limit: 1, skip: 0 },
          where: {
            status: {
              _eq: ACTIVE
            }
          }
          sort_by: {
            price: asc
          }
        ) {
          edges {
            prices {
              price_per_month
              currency
              currency_sign
            }
          }
        }
      }
    }
  }
`;
