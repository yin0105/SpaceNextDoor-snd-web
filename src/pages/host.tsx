import React from 'react';
import { makeStyles } from '@material-ui/core';
import HostLanding from '../modules/host-landing/components';
import { HomeLayout } from '../layouts/MainLayout';

const useStyles = makeStyles((theme) => ({
  override: {
    padding: 'unset',
    [theme.breakpoints.up('sm')]: {
      maxWidth: 'unset',
      margin: 'unset',
    },
  },
}));

const Host: React.FunctionComponent = () => {
  const classes = useStyles();

  return (
    <HomeLayout className={classes.override}>
      <HostLanding />
    </HomeLayout>
  );
};

export default Host;
