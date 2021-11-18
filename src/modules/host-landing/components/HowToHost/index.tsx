import React, { FC } from 'react';
import { Box, makeStyles } from '@material-ui/core';

import Header from './Header';
import Steps from './Steps';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '7.8rem 8rem',
    [theme.breakpoints.down('sm')]: {
      padding: '4rem 2.5rem',
    },
  },
}));

const HowToHost: FC = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Header />
      <Steps />
    </Box>
  );
};

export default HowToHost;
