import React, { FC, useEffect } from 'react';
import { Box, makeStyles, Typography } from '@material-ui/core';
import lottie from 'lottie-web';
import clsx from 'clsx';
import paymentProcessAnimation from './paymentProcessAnimation.json';
import usePageTranslation from '../../hooks/usePageTranslation';
import styles from './PaymentProcess.module.css';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: '100%',
    minHeight: '100%',
    backgroundColor: '#fff',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 999,
    cursor: 'auto',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 500,
    margin: '0 auto',
    color: theme.palette.grey[200],
    height: '100vh',
    textAlign: 'center',
    textTransform: 'initial',
  },
  animation: {
    maxWidth: 300,
    [theme.breakpoints.down('md')]: {
      maxWidth: 199,
    },
  },
  title: {
    margin: '43px 0',
    fontSize: 30,
    fontWeight: 700,
    lineHeight: '35px',
    color: '#3A3335',
    [theme.breakpoints.down('md')]: {
      fontWeight: 600,
      fontSize: 18,
      lineHeight: '20px',
      margin: '14px 0 34px 0',
    },
  },
  message: {
    fontSize: 16,
    fontWeight: 400,
    lineHeight: '20px',
    maxWidth: 425,
    [theme.breakpoints.down('md')]: {
      maxWidth: 280,
    },
  },
}));

const PaymentProcessing: FC = () => {
  const classes = useStyles();

  useEffect(() => {
    lottie.loadAnimation({
      container: document.querySelector('#payment-process'),
      animationData: paymentProcessAnimation,
    });
  }, []);

  const { t } = usePageTranslation('checkout', 'PaymentProcessing');
  return (
    <Box className={classes.root}>
      <Box className={classes.content}>
        <Box className={classes.animation} id="payment-process" />
        <Box>
          <Typography variant="h1" className={clsx(classes.title, styles.processing)}>
            {t('typography1')}
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </Typography>
          <Typography className={classes.message}>{t('typography2')}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PaymentProcessing;
