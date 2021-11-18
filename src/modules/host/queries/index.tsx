import gql from 'graphql-tag';
import ListItem from '../components/ListItem';
import ListTableFragment from '../components/ListTable/ListTable.fragment';

export const GET_SITES_QUERY = gql`
  query HostListingSitesQuery($limit: Int!, $offset: Int!, $search: String) {
    sites(
      pagination: {
        limit: $limit,
        skip: $offset
      },
      where: {
        name: {
          _iLike: $search
        }
      }
    ) {
      page_info {
        total,
        has_more,
        skip,
        limit
      }
      edges {
        ...SiteListFragment
      }
    }
  }

  ${ListItem.fragments.site}
`;

export const GET_SPACES_QUERY = gql`
  query HostSpacesQuery($limit: Int!, $offset: Int!, $siteId: Int!, $country: FixedCountry!) {
    spaces(
      pagination: {
        limit: $limit,
        skip: $offset
      },
      where: {
        site_id: {
          _eq: $siteId
        }
        country: {  
          _eq: $country
        }
      }
    ) {
      page_info {
        total,
        has_more,
        skip,
        limit
      }
      edges {
        ...SpaceListFragment
      }
    }
  }

  ${ListTableFragment.spaces}
`;

export const GET_SPACE_QUERY = gql`
  query ListSpaceQuery($listId: Int!) {
    space(where: { id: { _eq: $listId } }) {
      id
      name
      site {
        id
        name
        address {
          city {
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
        }
      }
      size
      height
      width
      length
      size_unit
      status
      total_units
      available_units
      prices {
        price_per_month
        currency
        currency_sign
      }
      features {
        name_en
        name_th
        name_jp
        name_kr
      }
    }
  }
`;
