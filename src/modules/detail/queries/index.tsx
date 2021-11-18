import gql from 'graphql-tag';
import SiteAmenities from '../components/SiteAmenities';

const SITE_REVIEWS_QUERY = gql`
  query SiteReviewsQuery($siteId: Int!) {
    sites(where: {
      id: {
        _eq: $siteId
      }
    }, pagination:{  limit: 1, skip: 0 }) {
      edges {
        id       
        google_reviews_widget_id
        reviews {
          total
          average_rating
        }
      }
    }
  }
`;

const SITE_SPACES_QUERY = gql`
  query SiteSpacesQuery($siteId: Int!, $moveOutDate: Date, $moveInDate: Date, $country: FixedCountry!) {
    spaces(where: {
      site_id: { _eq: $siteId }
      status: {
        _eq: ACTIVE
      }
      available_units: {
        _gt: 0
      }
      move_in_date: {
        _eq: $moveInDate,
      }
      move_out_date: {
        _eq: $moveOutDate
      }
      country: {  
        _eq: $country
      }
    },
    pagination: {
      skip: 0,
      limit: 800
    }) {
      edges {
        id
        size
        size_unit
        site {
          id          
          name_en
          name_th
          name_jp
          name_kr
          address {
            country {
              name_en
              name_th
              name_jp
              name_kr
            }
          }
        }
        stock_available_until
        available_units
        width
        length
        prices {
          id
          price_per_month
          type
          currency
        }
        space_type {
          id
          icon
          name_en
          name_th
          name_jp
          name_kr
          unit
          size_from
          size_to
        } 
        features {
          id
          name_en
          name_th
          name_jp
          name_kr
          icon
        }
      }
    }
  }
`;

const SIMILAR_STORAGE_QUERY = gql`
  query SimilarStorageQuery(
    $districtID: Int!
    $limit: Int!
    $skip: Int!
    ) {
    sites(where: {
      status: {
        _eq: ACTIVE
      }
      district_id: {
        _eq: $districtID
      }
    }, pagination:{  limit: $limit, skip: $skip }) {
      edges {
        id        
        name_en
        name_th
        name_jp
        name_kr       
        description_en
        description_jp
        description_th
        description_kr
        images
        address {
          lat
          lng
          country {
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
          district {
            name_en
            name_th
            name_jp
            name_kr
            id
          }
        }
        ...SiteAmenitiesDetailsFragment
      }
      page_info{
        has_more
        total
        limit
      }
    }
  }
  ${SiteAmenities.fragments.site}
`;

const PLATFORM_SPACE_TYPES_QUERY = gql`
query PlatformSpaceTypesQuery($country: FixedCountry!, $siteId: Int!) {
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
      description_en
      description_th
      description_jp
      description_kr
      image
      country {
        name_en
        name_th
        name_jp
        name_kr
      }
      features{
        id
        name_en
        name_th
        name_jp
        name_kr
        category{
            id
            name_en
            name_th
            name_jp
            name_kr
        }
      }
      spaces(
        where:{
          site_id:{
            _eq: $siteId
          }
        }
      ){
        edges{
          id
          prices{
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

export {
  SITE_REVIEWS_QUERY,
  SITE_SPACES_QUERY,
  SIMILAR_STORAGE_QUERY,
  PLATFORM_SPACE_TYPES_QUERY,
};
