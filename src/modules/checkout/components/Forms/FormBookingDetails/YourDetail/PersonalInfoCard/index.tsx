import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react';
import { Box } from '@material-ui/core';

import OneInput from './OneInput';
import PhoneInput from './PhoneInput';
import { BookingStore, BOOKING_STORE } from '../../../../../stores/BookingStore';
import usePageTranslation from '../../../../../../../hooks/usePageTranslation';

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    border: `1.5px solid ${theme.palette.grey[50]}`,
    borderRadius: '22px',
    padding: '20px 22px 20px 16px',
    [theme.breakpoints.up('sm')]: {
      padding: '43px 22px 22px 24px',
    },
  },
}));

interface IProps {
  bookingStore?: BookingStore;
}

const PersonalInfoCard: React.FC<IProps> = (props) => {
  const classes = useStyles();
  const { bookingStore } = props;
  const handleCountryChange = (e) => {
    bookingStore.setBookingDetails('countryCode', e.target.value);
  };

  if (bookingStore?.space) {
    const { quotation } = bookingStore.space;
    if (quotation?.user && !bookingStore.bookingDetails.fullName.value) {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { first_name, last_name } = quotation.user;
      const firstName = !Object.is(first_name, null) ? first_name : '';
      const lastName = !Object.is(last_name, null) ? last_name : '';
      bookingStore.setBookingDetails('fullName', `${firstName} ${lastName}`);
      bookingStore.setBookingDetails('email', quotation.user.email);
      bookingStore.setBookingDetails('phoneNumber', quotation.user.phone_number);
    }
  }
  const { t } = usePageTranslation('checkout', 'PersonalInfoCard');
  return (
    <Box className={classes.cardContainer}>
      <OneInput
        title={t('title1')}
        label={t('label1')}
        inputData={bookingStore.bookingDetails.fullName}
        onChange={(e) => bookingStore.setBookingDetails('fullName', e.target.value)}
      />
      <OneInput
        title={t('title2')}
        label={t('label2')}
        inputData={bookingStore.bookingDetails.email}
        onChange={(e) => bookingStore.setBookingDetails('email', e.target.value)}
      />
      <PhoneInput
        title={t('title3')}
        label="xxx xxx xxxx"
        inputData={bookingStore.bookingDetails.phoneNumber}
        onChange={(e) => bookingStore.setBookingDetails('phoneNumber', e.target.value)}
        countryCode={bookingStore.bookingDetails.countryCode}
        handleCountryChange={handleCountryChange}
      />
    </Box>
  );
};

export default inject(BOOKING_STORE)(observer(PersonalInfoCard));
