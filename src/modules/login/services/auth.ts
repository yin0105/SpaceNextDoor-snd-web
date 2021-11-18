import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { initializeApollo } from 'apollo';
import { REFRESH_TOKEN } from 'modules/shared/queries/query';
import { getAuthStorageTokens } from '../helpers';
import { IRequestTokenResponse } from '../types';

/**
 * Refresh token.
 *
 * @param client Apollo Client
 * @returns
 */
const doRefreshToken = async (
  client?: ApolloClient<NormalizedCacheObject>,
): Promise<IRequestTokenResponse> => {
  const apollo = client || initializeApollo();

  // Refresh token
  const variables = getAuthStorageTokens();

  const { data } = await apollo.mutate({
    mutation: REFRESH_TOKEN,
    variables,
  });

  return {
    accessToken: data?.refreshToken?.access_token,
    refreshToken: data?.refreshToken?.refresh_token,
    tokenType: data?.refreshToken?.token_type,
    expiresAt: data?.refreshToken?.expires_at,
  };
};

export { doRefreshToken };
