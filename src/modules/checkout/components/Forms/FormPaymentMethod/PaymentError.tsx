import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import usePageTranslation from 'hooks/usePageTranslation';
import { BookingStore, BOOKING_STORE } from '../../../stores/BookingStore';

interface IProps {
  bookingStore?: BookingStore;
}

const useStyles = makeStyles(() => ({
  error: {
    marginTop: '10px',
  },
}));

const PaymentError: React.FC<IProps> = (props) => {
  const { bookingStore } = props;
  const classes = useStyles();
  const { t } = usePageTranslation('common', 'BookingStoreErrors');
  let error = bookingStore.paymentError;
  // In Booking store before we set the error ourselves, We're setting error
  // coming from API, So if the error is of length greater than 13 which is
  // the length of the translation key we simply show that error.
  if (error.length !== 0 && error.length < 13) {
    error = t(error);
  }
  return (
    <>
      {error && (
        <Typography variant="body1" className={classes.error} color="error">{error}</Typography>
      )}
    </>
  );
};

export default inject(BOOKING_STORE)(observer(PaymentError));
