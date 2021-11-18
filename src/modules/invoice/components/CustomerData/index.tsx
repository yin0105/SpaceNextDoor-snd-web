import React from 'react';
import { format } from 'date-fns';
import {
  Box, Grid, makeStyles, Typography,
} from '@material-ui/core';
import { useCurrentCountry } from 'utilities/market';
import usePageTranslation from '../../../../hooks/usePageTranslation';

const useStyles = makeStyles(({ breakpoints }) => ({
  mobileColumn: {
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  spaceBetween: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  dark: {
    color: '#5e5873',
    fontWeight: 'bold',
  },
  detailsWidth: {
    width: 330,
  },
}));

interface IProps {
  customer: {
    name: string
    phone_number: string
    email: string
    card_brand_name: string
    card_last_digits: string
  }
  transaction_short_id: string
  start_date: string
  end_date: string
}

const CustomerData: React.FC<IProps> = ({
  customer, transaction_short_id, start_date, end_date,
}) => {
  const classes = useStyles();
  const currentCountry = useCurrentCountry().name;
  const { t } = usePageTranslation('customerInvoice', 'CustomerData');
  return (
    <Grid className={`${classes.spaceBetween} ${classes.mobileColumn}`} item>
      <Box mt={6}>
        <Typography className={classes.dark}>
          {currentCountry === 'Singapore' ? t('typography1SG') : t('typography1')}
          :
        </Typography>
        <br />
        <Typography className={classes.dark}>{customer.name}</Typography>
        <Typography>{customer.phone_number}</Typography>
        <Typography>{customer.email}</Typography>
      </Box>
      <Box className={classes.detailsWidth} mt={6}>
        <Typography className={classes.dark}>
          {t('typography2')}
          :
        </Typography>
        <br />
        <Typography className={classes.spaceBetween}>
          <span>
            {t('typography3')}
            :
          </span>
          <span>{transaction_short_id}</span>
        </Typography>
        <Typography className={classes.spaceBetween}>
          <span>
            {t('typography4')}
            :
          </span>
          <span>{customer.card_brand_name}</span>
        </Typography>
        <Typography className={classes.spaceBetween}>
          <span>
            {t('typography5')}
            :
          </span>
          <span>
            XXXXXXXX
            {customer.card_last_digits}
          </span>
        </Typography>
        <Typography className={classes.spaceBetween}>
          <span>
            {t('typography6')}
          </span>
          <span>
            {format(new Date(start_date), 'dd MMM yyyy')}
          </span>
        </Typography>
        <Typography className={classes.spaceBetween}>
          <span>
            {t('typography7')}
          </span>
          <span>
            {format(new Date(end_date), 'dd MMM yyyy')}
          </span>
        </Typography>
      </Box>
    </Grid>
  );
};

export default CustomerData;
