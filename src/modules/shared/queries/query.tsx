import { gql } from '@apollo/client';

export const SEND_OTP = gql`
  mutation SendOTPQuery($username: String!) {
    sendOTP(payload: {username: $username}) {
      isSent
    }
  }
`;

export const LOGIN = gql`
  mutation LoginQuery($username: String!, $otp: String!, $preferredLanguage:String!) {
    login(payload: {username: $username, otp: $otp, preferred_language: $preferredLanguage}) {
      access_token,
      token_type,
      refresh_token,
      expires_at
    }
  }
`;

export const REFRESH_TOKEN = gql`
  mutation RefreshTokenQuery($accessToken: String!, $refreshToken: String!) {
    refreshToken(payload: {access_token: $accessToken, refresh_token: $refreshToken}) {
      access_token,
      token_type,
      refresh_token,
      expires_at
    }
  }
`;

export const PROFILE = gql`
  query ProfileQuery {
    profile {
      id
      first_name
      last_name
      email
      phone_number
      image_url
      facebook_user_id
      google_user_id
      provider {
        id
        tax_id
        bank_account_number
        bank_account_holder_name
        bank {
          id
          name
        }
      }
      customer {
        stripe_customer_id
        card_last_digits
      }
    }
  }
`;
