import gql from 'graphql-tag';

export default gql`
  fragment SearchLocationItemFragment on Location {
    city {
      id
      name_en
      name_th
      name_kr
      name_jp
    }
    district {
      id
      name_en
      name_th
      name_kr
      name_jp
    }
    country {
      id
      name_en
      name_th
      name_kr
      name_jp
    }
  }
`;
