import React from 'react';
import { format } from 'date-fns';
import {
  Box, Grid, makeStyles, Typography,
} from '@material-ui/core';
import { useCountryShortCode } from 'utilities/market';
import usePageTranslation from '../../../../hooks/usePageTranslation';

const useStyles = makeStyles(({ breakpoints }) => ({
  dateWidth: {
    width: 200,
  },
  mobileColumn: {
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  spaceBetween: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  lightBold: {
    fontWeight: 600,
  },
  center: {
    alignItems: 'center',
  },
  dark: {
    color: '#5e5873',
  },
}));

interface IProps {
  id: number,
  issue_date: string
  due_date: string
}

const InvoiceHead: React.FC<IProps> = ({ id, issue_date, due_date }) => {
  const classes = useStyles();
  const countryShortCode = useCountryShortCode();
  const { t } = usePageTranslation('customerInvoice', 'InvoiceHead');
  return (
    <>
      <Grid className={`${classes.spaceBetween} ${classes.center} ${classes.mobileColumn}`} item>
        <img src="/images/logo.svg" alt="logo" />
        <Typography className={classes.dark} variant="h3">
          {countryShortCode === 'SG' ? t('typography1SG') : t('typography1')}
        </Typography>
      </Grid>
      <Grid className={`${classes.spaceBetween} ${classes.mobileColumn}`} item>
        <Box mt={10}>
          <Typography variant="body1">{t(`typography2${countryShortCode}`)}</Typography>
          <Typography variant="body1">{t(`typography3${countryShortCode}`)}</Typography>
          <Typography variant="body1">{t(`typography4${countryShortCode}`)}</Typography>
          <Typography variant="body1">{t(`typography5${countryShortCode}`)}</Typography>
          <Typography variant="body1">{t(`typography6${countryShortCode}`)}</Typography>
        </Box>
        <Box className={classes.dateWidth} mt={10}>
          <Typography className={classes.spaceBetween} variant="body1">
            {t('typography7')}
            &nbsp;&nbsp;
            <span className={classes.lightBold}>{format(new Date(issue_date), 'dd/MM/yyyy')}</span>
          </Typography>
          <Typography className={classes.spaceBetween} variant="body1">
            {t('typography8')}
            &nbsp;&nbsp;
            <span className={classes.lightBold}>{format(new Date(due_date), 'dd/MM/yyyy')}</span>
          </Typography>
          <Typography className={classes.spaceBetween} variant="body1">
            {countryShortCode === 'SG' ? t('typography9SG') : t('typography9')}
            &nbsp;&nbsp;
            <span className={classes.lightBold}>{`${countryShortCode}${id}`}</span>
          </Typography>
        </Box>
      </Grid>
    </>
  );
};

export default InvoiceHead;
