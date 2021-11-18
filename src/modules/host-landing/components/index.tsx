import React, { FC } from 'react';
import { makeStyles, Box } from '@material-ui/core';
import ListYourSpace from './ListYourSpace';
import HelpButton from './HelpButton';
import HowToHost from './HowToHost';
import SafetyFirst from './SafetyFirst';
import EasyPayments from './EasyPayments';
import Footer from '../../../components/Footer';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
}));

const HostLanding: FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <ListYourSpace />
      <HowToHost />
      <SafetyFirst />
      <EasyPayments />
      <Footer />

      {/* <HelpButton /> */}
    </Box>
  );
};

export default HostLanding;
