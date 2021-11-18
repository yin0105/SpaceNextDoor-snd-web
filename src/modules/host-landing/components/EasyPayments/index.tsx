import React, { FC } from 'react';
import { Box, makeStyles } from '@material-ui/core';

import Header from './Header';
import Items from './Items';
import Image from '../../../../components/Image';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#EA5B21',
    position: 'relative',
    height: '98.1rem',
    [theme.breakpoints.up('md')]: { height: '90rem' },
  },
  container: {
    color: '#ffffff',
    position: 'relative',
    paddingTop: '4.3833%',
    paddingRight: '6.6667%',
    paddingLeft: '6.6667%',
    [theme.breakpoints.up('md')]: {
      paddingTop: '4.5556%',
      paddingRight: '5.5556%',
      paddingLeft: '5.5556%',
    },
  },
  images: {
    position: 'absolute',
    overflow: 'hidden',
    width: '100.0000%',
    height: '100.0000%',
    [theme.breakpoints.up('md')]: { width: '100.0000%', height: '100.0000%' },
  },
  cloud6: {
    position: 'absolute',
    top: '-1.5291%',
    left: '-41.3333%',
    [theme.breakpoints.up('md')]: { left: '-2.0833%' },
  },
  cloud7: {
    position: 'absolute',
    top: '14.7808%',
    right: '-13.3333%',
    [theme.breakpoints.up('md')]: {
      top: '-4.4444%',
      left: 'unset',
      right: '0.0000%',
    },
  },
  cloud8: {
    position: 'absolute',
    bottom: '-4.0775%',
    left: '-5.8667%',
    [theme.breakpoints.up('md')]: { bottom: '-1.6667%', left: '31.2500%' },
  },
  easyPayments: {
    position: 'absolute',
    left: '6.6667%',
    bottom: '8.1549%',
    '& img': { width: '89.8667%', height: '30.0714%' },
    [theme.breakpoints.up('md')]: {
      left: '34.7222%',
      bottom: '4.4444%',
      '& img': {
        width: 'auto',
        height: 'auto',
      },
    },
  },
}));

const EasyPayments: FC = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box className={classes.images}>
        <Box className={classes.cloud6}>
          <Image name="cloud-6" folder="Host" />
        </Box>
        <Box className={classes.cloud7}>
          <Image name="cloud-7" folder="Host" />
        </Box>
        <Box className={classes.cloud8}>
          <Image name="cloud-8" folder="Host" />
        </Box>
        <Box className={classes.easyPayments}>
          <Image name="easy-payments" folder="Host" />
        </Box>
      </Box>
      <Box className={classes.container}>
        <Header />
        <Items />
      </Box>
    </Box>
  );
};

export default EasyPayments;
