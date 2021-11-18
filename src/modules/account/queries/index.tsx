import gql from 'graphql-tag';

export const UPDATE_PROFILE_MUTATION = gql`
  mutation updateProfile($payload: UpdateProfilePayload!) {
    updateProfile (payload: $payload) {
      edges {
        id
        first_name
        last_name
        email
        phone_number
        image_url
        preferred_language
        provider {
          bank_account_number
          bank_account_holder_name
          bank {
            id
            name
          }
        }
      }
    }
  }
`;

export const GET_BANKS_QUERY = gql`
  query getBanks {
    banks (pagination: {
      limit: 100,
      skip: 0,
    }) {
      edges {
        id
        name
      }
    }
  }
`;
