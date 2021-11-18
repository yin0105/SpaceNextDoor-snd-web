import React, { FC } from 'react';
import {
  Box, makeStyles, Typography, withStyles,
} from '@material-ui/core';

import Header from './Header';
import Image from '../../../../components/Image';
import usePageTranslation from '../../../../hooks/usePageTranslation';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '71.9000rem',
    backgroundColor: '#E9E9E988',
    [theme.breakpoints.up('md')]: { height: '56.9000rem' },
  },
  root: {
    position: 'relative',
    padding: '4.0000rem 2.5000rem 27.5000rem',
    [theme.breakpoints.up('md')]: {
      padding: '7.8000rem 0',
      marginLeft: '40.0000rem',
      maxWidth: '41.0000rem',
    },
  },
  images: {
    width: '100%',
    position: 'absolute',
    overflow: 'hidden',
    height: '71.9000rem',
    [theme.breakpoints.up('md')]: { height: '56.9000rem' },
  },
  cloud4: {
    position: 'absolute',
    top: '-14.5000rem',
    left: '-15.5000rem',
    [theme.breakpoints.up('md')]: { top: '-4.0000rem', left: '-3.0000rem' },
  },
  cloud5: {
    position: 'absolute',
    bottom: '-4.0000rem',
    right: '-7.5000rem',
    [theme.breakpoints.up('md')]: { bottom: '-1.5000rem', right: '-2.5000rem' },
  },
  safetyFirst: {
    position: 'absolute',
    bottom: '3.5000rem',
    left: '7.0000rem',
    [theme.breakpoints.up('md')]: { bottom: '7.0000rem', left: 'unset', right: '20.0000rem' },
    [theme.breakpoints.down('sm')]: {
      '& img': {
        width: '22.7rem',
        height: '22.7rem',
      },
    },
  },
}));

const Passage = withStyles((theme) => ({
  root: {
    fontSize: '1.2rem',
    lineHeight: '3rem',
    [theme.breakpoints.up('md')]: {
      fontSize: '1.4rem',
      lineHeight: '2.7rem',
      fontWeight: 400,
    },
  },
}),
{
  withTheme: true,
})(Typography);

const SafetyFirst: FC = () => {
  const classes = useStyles();
  const { t } = usePageTranslation('hostLanding', 'SafetyFirst');
  return (
    <Box className={classes.container}>
      <Box className={classes.images}>
        <Box className={classes.cloud4}>
          <Image name="cloud-4" folder="Host" />
        </Box>
        <Box className={classes.cloud5}>
          <Image name="cloud-5" folder="Host" />
        </Box>
        <Box className={classes.safetyFirst}>
          <Image name="safety-first" folder="Host" />
        </Box>
      </Box>
      <Box className={classes.root}>
        <Header />
        <Passage>
          {t('passage')}
        </Passage>
      </Box>
    </Box>
  );
};

export default SafetyFirst;
