import React, { FC, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core/';

import { inject, observer } from 'mobx-react';
import * as gtag from 'utilities/gtag';
import AuthStore, { AUTH_STORE_KEY } from 'modules/app/stores/AuthStore';
import Header from './Header';
import BuildingDetails from './BuildingDetails';
import PaymentSummary from './PaymentSummary';
import { BookingStore, BOOKING_STORE } from '../../stores/BookingStore';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: '30px 25px 60px',
    [theme.breakpoints.up('lg')]: {
      padding: '30px 0 60px',
    },
  },
  body: {
    display: 'grid',
    gridTemplateColumns: '3fr 2fr',
    gridGap: '20px',
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
    },
  },
}));

interface IProps {
  isConfirmation?: boolean;
  bookingStore?: BookingStore;
  [AUTH_STORE_KEY]?: AuthStore;
}

const BookingConfirmed: FC<IProps> = ({ bookingStore, isConfirmation, auth }) => {
  const classes = useStyles();
  const booking = bookingStore?.booking;
  useEffect(() => {
    if (booking) {
      const keywords = JSON.parse(sessionStorage.getItem('keywords'));
      gtag.enhancedTrack({
        ecommerce: {
          purchase: {
            actionField: {
              id: booking?.transactions[0].id,
            },
            products: [{
              id: booking?.original_site?.id,
              price: booking?.base_amount,
              quantity: 1,
              email: auth?.user?.email || '',
              zipcode: '',
              keywords: keywords || [],
            }],
          },
        },
      });
    }
  }, [booking]);
  return (
    <Box className={classes.container}>
      <Header booking={booking} isConfirmation={isConfirmation} />
      <Box className={classes.body}>
        <BuildingDetails booking={booking} />
        <PaymentSummary booking={booking} />
      </Box>
    </Box>
  );
};

export default inject(BOOKING_STORE, AUTH_STORE_KEY)(observer(BookingConfirmed));
