import {
  Box,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { inject } from 'mobx-react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { HomeLayout } from '../../../../layouts/MainLayout';

import AuthStore, { AUTH_STORE_KEY } from '../../../../modules/app/stores/AuthStore';

const useStyles = makeStyles({
  root: {
    marginTop: '200px',
  },
  title: {
    textAlign: 'center',
    fontSize: '20px',
  },
});

interface IProps {
  auth: AuthStore;
}

const OAuthRedirectFacebook: React.FC<IProps> = (props) => {
  const router = useRouter();
  const classes = useStyles();
  const {
    auth: authStore,
  } = props;

  const accessToken = router?.query?.access_token || '';
  const refreshToken = router?.query?.refresh_token || '';

  useEffect(() => {
    if (authStore.isAuthenticated) {
      router.push('/');
    }

    if (accessToken && !authStore.isAuthenticated) {
      authStore.setToken(accessToken, refreshToken);
      router.push('/');
    }
  });

  return (
    <HomeLayout>
      <Box className={classes.root}>
        <Typography className={classes.title}>
          Logging you in, this will take a second. We will redirect you automatically.
        </Typography>
      </Box>
    </HomeLayout>
  );
};

export default inject(AUTH_STORE_KEY)(OAuthRedirectFacebook);
