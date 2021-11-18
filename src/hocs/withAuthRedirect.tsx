import { ReactElement } from 'react';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { observer, inject } from 'mobx-react';
import { Box, CircularProgress } from '@material-ui/core';

import AuthStore, { AUTH_STORE_KEY } from '../modules/app/stores/AuthStore';

const isBrowser = (): boolean => typeof window !== 'undefined';

const DefaultLoadingFallback = (): ReactElement => (
  <Box
    style={{
      display: 'flex',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100vw',
    }}
  >
    <CircularProgress />
  </Box>
);

interface IProps {
  [AUTH_STORE_KEY]: AuthStore
}

/**
 * Support client-side conditional redirecting based on the user's
 * authenticated state.
 *
 * @param WrappedComponent The component that this functionality
 * will be added to. NextPage<CP, IP>
 * @param LoadingComponent The component that will be rendered while
 * the auth state is loading.
 * @param expectedAuth Whether the user should be authenticated for
 * the component to be rendered.
 * @param location The location to redirect to.
 */
const withAuthRedirect = function withAuthRedirect<CP, IP = CP>({
  WrappedComponent,
  LoadingComponent = DefaultLoadingFallback,
  expectedAuth,
  location,
}: {
  WrappedComponent: any;
  LoadingComponent?: NextPage;
  expectedAuth: boolean;
  location: string;
}) {
  const WithAuthRedirectWrapper = (props: IProps) => {
    const router = useRouter();
    // eslint-disable-next-line react/destructuring-assignment
    const { authLoading, isAuthenticated } = props[AUTH_STORE_KEY];

    if (authLoading) {
      return <LoadingComponent />;
    }

    if (isBrowser() && expectedAuth !== isAuthenticated) {
      router.push(location);
      return <></>;
    }

    return <WrappedComponent {...props} />;
  };

  return inject(AUTH_STORE_KEY)(observer(WithAuthRedirectWrapper));
};

export default withAuthRedirect;
