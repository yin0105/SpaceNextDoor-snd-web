import React, { FC } from 'react';
import { Box, makeStyles, Typography } from '@material-ui/core';

import { useCurrentCountry } from 'utilities/market';
import Columns from './Columns';
import Image from '../Image';
import usePageTranslation from '../../hooks/usePageTranslation';
import Switcher from '../Switcher';

const useStyles = makeStyles((theme) => ({
  container: { backgroundColor: '#F4F4F4' },
  root: {
    padding: '7.8000rem 8.0000rem',
    '@media (max-width:959.95px)': { padding: '4.0000rem 2.5000rem' },
  },
  footer: {
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: '7.0000rem',
    '@media (min-width:960px)': {
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'nowrap',
      marginBottom: '16.0000rem',
    },
    '& .MuiTypography-root': {
      fontSize: '1.0000rem',
      [theme.breakpoints.up('md')]: {
        fontSize: '14px',
      },
    },
  },
  copyright: {
    order: 2,
    maxWidth: '18.0000rem',
    '@media (min-width:960px)': {
      order: 1,
      width: '100%',
      maxWidth: 'none',
    },
  },
  actions: {
    order: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: '1.0000rem',
    // marginRight: '1.0000rem',
    '@media (min-width:960px)': { order: 2, width: '32.4rem', marginRight: '0' },
  },
  switchers: { display: 'flex' },
  switcher: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '1.0000rem',
    '& img': {
      marginRight: '1.4000rem',
      [theme.breakpoints.up('md')]: {
        width: '14.67px',
        height: '14.67px',
      },
    },
  },
  social: {
    display: 'flex',
    // width: '4.6000rem',
    alignItems: 'center',
    '& img': {
      marginLeft: '1.0000rem',
      [theme.breakpoints.up('md')]: {
        marginLeft: '16px',
        width: '15px',
        height: '15px',
      },
      [theme.breakpoints.down('xs')]: {
        width: '1.3000rem',
        height: '1.3000rem',
      },
    },
  },
  globe: { marginRight: '10px' },
}));

const Footer: FC = () => {
  const classes = useStyles();
  const { t } = usePageTranslation('footer', 'Footer');
  const country = useCurrentCountry();

  return (
    <Box className={classes.container}>
      <Box className={classes.root}>
        <Columns />

        <Box className={classes.footer}>
          <Box className={classes.copyright}>
            <Typography>
              {t('typography')}
            </Typography>
          </Box>
          <Box className={classes.actions}>
            <Box className={classes.switchers}>
              <img className={classes.globe} src="/images/globe_dark.svg" alt="" />
              {country.locales.length > 1 && <Switcher comp="lang" />}
              <Switcher comp="country" />
            </Box>
            <Box className={classes.social}>
              {country.socialLink.whatsapp
                && (
                  <a href={country.socialLink.whatsapp} rel="noreferrer" target="_blank">
                    <Image name="whatsapp" folder="Homepage" />
                  </a>
                )}
              {country.socialLink.facebook
                && (
                  <a href={country.socialLink.facebook} rel="noreferrer" target="_blank">
                    <Image name="facebook" folder="Homepage" />
                  </a>
                )}
              {country.socialLink.instagram
                && (
                  <a href={country.socialLink.instagram} rel="noreferrer" target="_blank">
                    <Image name="instagram" folder="Homepage" />
                  </a>
                )}
              {country.socialLink.line
                && (
                  <a href={country.socialLink.line} rel="noreferrer" target="_blank">
                    <Image name="line" folder="Homepage" />
                  </a>
                )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
