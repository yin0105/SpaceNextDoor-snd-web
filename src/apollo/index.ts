import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  NormalizedCacheObject,
} from '@apollo/client';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import Router from 'next/router';
import {
  getAuthStorageTokens,
  removeAuthStorageTokens,
  setAuthStorageTokens,
} from 'modules/login/helpers';
import { getCountry } from 'utilities/market';
import { doRefreshToken } from 'modules/login/services';
import { GRAPHQL_API } from '../config';

let APOLLO_CLIENT: ApolloClient<NormalizedCacheObject>;

const authLink = setContext((_, { headers = {}, asProvider, asCustomer }) => {
  const { accessToken: token } = getAuthStorageTokens();

  const obj = {
    headers: {
      ...headers,
      authorization: token && token !== 'undefined' ? `Bearer ${token}` : '',
    },
  };

  if (asProvider) {
    obj.headers['x-role'] = 'PROVIDER';
  }

  if (asCustomer) {
    obj.headers['x-role'] = 'CUSTOMER';
  }

  obj.headers.language = Router.locale;

  obj.headers.country = getCountry(Router.defaultLocale).name;

  return obj;
});

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) {
    graphQLErrors.map(async ({ extensions }) => {
      if (extensions?.exception?.response?.statusCode === 403) {
        if (typeof window !== 'undefined') {
          const client = APOLLO_CLIENT;

          try {
            // Refresh token
            const { accessToken, refreshToken } = await doRefreshToken(client);

            if (!accessToken) {
              throw Error("Couldn't refresh the token");
            }

            setAuthStorageTokens({
              accessToken,
              refreshToken,
            });

            Router.reload();
          } catch ({ message }) {
            // Clean authentication token
            removeAuthStorageTokens();
            // Redirect to login page.
            window.location.href = '/login';
          }
        }
      }
      return true;
    });
  }
});

function createApolloClient(): ApolloClient<NormalizedCacheObject> {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined', // set to true for SSR
    link: ApolloLink.from([
      errorLink,
      authLink.concat(
        new HttpLink({
          uri: GRAPHQL_API,
        }) as any,
      ) as any,
    ]),
    cache: new InMemoryCache(),
    defaultOptions: {
      mutate: {
        fetchPolicy: 'no-cache',
      },
      query: {
        fetchPolicy: 'network-only',
      },
    },
  });
}

export const initializeApollo = (
  initialState = null,
): ApolloClient<NormalizedCacheObject> => {
  const apolloClient = APOLLO_CLIENT ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client,
  // the initial state gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = apolloClient.extract();

    // Restore the cache using the data passed from
    // getStaticProps/getServerSideProps combined with the existing cached data
    apolloClient.cache.restore({ ...existingCache, ...initialState });
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return apolloClient;

  // Create the Apollo Client once in the client
  if (!APOLLO_CLIENT) APOLLO_CLIENT = apolloClient;

  return apolloClient;
};
