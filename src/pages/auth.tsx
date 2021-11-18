import { Box, CircularProgress } from '@material-ui/core';
import React, { useEffect } from 'react';
import { inject } from 'mobx-react';
import { useRouter } from 'next/router';

import AuthStore, { AUTH_STORE_KEY } from '../modules/app/stores/AuthStore';

interface IProps {
  [AUTH_STORE_KEY]: AuthStore
}

const AdminLoginAsCustomer: React.FC<IProps> = ({ auth }) => {
  const Router = useRouter();
  const token = Router.query?.token;
  const refreshToken = Router.query?.refresh_token;
  const url = Router.query?.redirect_url as string;

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (!token || !refreshToken) {
      Router.push('/');
      return;
    }

    auth.setToken(token, refreshToken, true);
    // we use hard reload here so it refresh the token and get new profile
    setTimeout(() => {
      Router.push(url || '/');
    }, 500);
  }, [token, refreshToken]);

  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default inject(AUTH_STORE_KEY)(AdminLoginAsCustomer);
