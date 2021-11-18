import {
  Box, makeStyles, useMediaQuery, Theme,
} from '@material-ui/core';
import { useRouter } from 'next/router';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  loader: {
    width: '100vw',
    height: '100vh',
    border: 'none',
    [theme.breakpoints.down('xs')]: {
      width: '312px',
      height: '160px',
      position: 'absolute',
      bottom: '40px',
      borderRadius: '22px',
      top: '30vh',
    },
  },
  loaderContainer: {
    height: '100%',
    width: '100vw',
    position: 'absolute',
    left: '0',
    background: 'rgb(127 127 127 / 40%)',
    zIndex: 12,
  },
}));

const Loader: React.FC = () => {
  const classes = useStyles();
  const router = useRouter();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.only('xs'));
  const getLoaderPath = () => {
    if (isMobile) {
      switch (router.locale) {
        case 'en-US':
          return '/SNDloaderMobile.html';
        case 'th':
          return '/SNDloaderMobileThai.html';
        case 'ja':
          return 'SNDloaderMobileJa.html';
        default:
          return '/SNDloaderMobile.html';
      }
    } else {
      switch (router.locale) {
        case 'en-US':
          return '/SNDloaderDesktop.html';
        case 'th':
          return '/SNDloaderDesktopThai.html';
        case 'ja':
          return 'SNDloaderDesktopJa.html';
        default:
          return '/SNDloaderDesktop.html';
      }
    }
  };

  return (
    <Box className={classes.loaderContainer}>
      <iframe
        id="sndloader"
        title="sndloader"
        className={classes.loader}
        style={{ left: isMobile ? `${(window.innerWidth - 312) / 2}px` : 0 }}
        src={getLoaderPath()}
      />
    </Box>
  );
};

export default Loader;
