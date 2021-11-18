import { Box, makeStyles, Typography } from '@material-ui/core';
import { PrimaryButton } from 'components/Buttons';
import Image from 'components/Image';
import React from 'react';
import Link from 'next/link';
import usePageTranslation from 'hooks/usePageTranslation';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: '80px',
    [theme.breakpoints.down('sm')]: {
      padding: '15px',
      marginTop: '60px',
    },
  },
  thanks: {
    fontSize: '40px',
    lineHeight: '70px',
    fontWeight: 700,
    [theme.breakpoints.down('sm')]: {
      fontSize: '28px',
      lineHeight: '35px',
      textAlign: 'center',
    },
  },
  message: {
    fontSize: '16px',
    lineHeight: '20px',
    marginTop: '20px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px',
    },
  },
  button: {
    width: 'max-content',
    padding: '15px 35px',
    color: 'white',
    fontSize: '13px',
    fontWeight: 700,
    marginTop: '57px',
  },
}));

const Thanks: React.FC = () => {
  const classes = useStyles();
  const { t } = usePageTranslation('quotations', 'Thanks');
  return (
    <Box className={classes.root}>
      <Image folder="Quotation" name="thanks" />
      <Typography className={classes.thanks}>{t('typography1')}</Typography>
      <Typography className={classes.message}>{t('typography2')}</Typography>
      <Link href="/">
        <PrimaryButton className={classes.button}>{t('typography3')}</PrimaryButton>
      </Link>
    </Box>
  );
};

export default Thanks;
