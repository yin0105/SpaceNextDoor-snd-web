import {
  Box, makeStyles, Typography, Grid, Button,
} from '@material-ui/core';
import React from 'react';
import { useRouter } from 'next/router';

import { getCountry } from 'utilities/market';
import Image from '../../../../components/Image';
import { OAUTH_FACEBOOK_REDIRECT_URL, OAUTH_GOOGLE_REDIRECT_URL } from '../../../../config';
import usePageTranslation from '../../../../hooks/usePageTranslation';

const useStyles = makeStyles((theme) => ({
  lineContainer: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    marginTop: 35,
  },
  lineBox: {
    display: 'flex',
    flexGrow: 1,
    margin: '10px 0',
  },
  line: {
    border: `1px solid ${theme.palette.grey[100]}`,
    width: '100%',
  },
  textBox: {
    height: 'fit-content',
    display: 'flex',
    margin: '0 10px',
  },
  text: {
    color: theme.palette.grey[100],
  },
  btnContainer: {
    marginTop: 20,
  },
  buttonBox: {
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: 10,
    },
  },
  button: {
    width: '100%',
    position: 'relative',
    padding: '18px 75px',
    border: `1px solid ${theme.palette.grey[50]}`,
    borderRadius: 15,
    textTransform: 'none',
  },
  buttonText: {
    marginLeft: 15,
    fontSize: 13,
    fontWeight: 700,
  },
}));

const Footer = () => {
  const classes = useStyles();
  const router = useRouter();
  const { t } = usePageTranslation('login', 'Footer');
  const countryCodes = {
    Singapore: '', Thailand: 'th', Japan: 'jp', Korea: 'kr',
  };

  const loginWithGoogle = (): void => {
    const country = getCountry(router.defaultLocale).name;
    window.location.href = `${OAUTH_GOOGLE_REDIRECT_URL}/${countryCodes[country]}`;
  };

  const loginWithFacebook = (): void => {
    const country = getCountry(router.defaultLocale).name;
    window.location.href = `${OAUTH_FACEBOOK_REDIRECT_URL}/${countryCodes[country]}`;
  };

  return (
    <Box>
      <Box className={classes.lineContainer}>
        <Box className={classes.lineBox}>
          <Box className={classes.line} />
        </Box>

        <Box className={classes.textBox}>
          <Typography variant="body2" className={classes.text}>{t('typography1')}</Typography>
        </Box>

        <Box className={classes.lineBox}>
          <Box className={classes.line} />
        </Box>
      </Box>

      <Grid container spacing={8} className={classes.btnContainer}>
        <Grid item sm={6} xs={6}>
          <Box className={classes.buttonBox}>
            <Button
              onClick={loginWithGoogle}
              className={classes.button}
            >
              <Image name="google" folder="LoginPage" />
              <Typography className={classes.buttonText}>
                {t('typography2')}
              </Typography>
            </Button>
          </Box>
        </Grid>

        <Grid item sm={6} xs={6}>
          <Box className={classes.buttonBox}>
            <Button onClick={loginWithFacebook} className={classes.button}>
              <Image name="facebook" folder="LoginPage" />
              <Typography className={classes.buttonText}>
                {t('typography3')}
              </Typography>
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
