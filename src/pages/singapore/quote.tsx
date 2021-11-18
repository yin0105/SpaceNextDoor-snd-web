import React from 'react';
import { makeStyles, Box, CircularProgress } from '@material-ui/core/';
import HubSpotForm from 'react-hubspot-form';

import { HomeLayout } from '../../layouts/MainLayout';
import Footer from '../../components/Footer';
import Image from '../../components/Image';

const useStyles = makeStyles((theme) => ({
  form: {
    padding: '50px 100px',

    [theme.breakpoints.down('sm')]: {
      padding: '50px 20px',
    },
  },
  override: {
    padding: 'unset',
    [theme.breakpoints.up('sm')]: {
      maxWidth: 'unset',
      margin: 'unset',
    },
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    padding: '20vh 0',
  },
  banner: {
    display: 'flex',
    justifyContent: 'center',

    '& img': {
      maxWidth: '100%',
    },
  },
}));

const Home: React.FunctionComponent = () => {
  const classes = useStyles();

  return (
    <HomeLayout className={classes.override} hideMenu>
      <Box className={classes.banner}>
        <Image folder="QuotePage" name="banner" extension="jpeg" />
      </Box>
      <Box className={classes.form}>
        <HubSpotForm
          portalId="9395319"
          formId="fc4d7da8-1eb4-4e7b-a5ca-dc36e50afeb0"
          loading={<Box className={classes.loader}><CircularProgress size={30} /></Box>}
        />
      </Box>
      <Footer />
    </HomeLayout>
  );
};

export default Home;
