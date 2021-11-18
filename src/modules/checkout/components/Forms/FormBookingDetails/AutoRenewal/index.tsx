import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
import { Box } from '@material-ui/core';
import DayJS from 'components/DayJS';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import Grey3Typography from '../../../../../../components/Typographies/Grey3Typography';
import Grey2Typography from '../../../../../../components/Typographies/Grey2Typography';
import CustomizedSwitches from '../../../../../../components/Switch/PrimarySwitch';
import PopUpOffAutoRenewal from './PopUpOffAutoRenewal';
import { BookingStore, BOOKING_STORE } from '../../../../stores/BookingStore';
import usePageTranslation from '../../../../../../hooks/usePageTranslation';

const useStyle = makeStyles((theme) => ({
  root: {
    margin: '24px 0 29px',
    [theme.breakpoints.up('sm')]: {
      margin: '22px 0 45px',
    },
  },
  titleText: {
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.8rem',
    },
  },
  descriptionBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      marginTop: '23px',
    },
  },
  descriptionText: {
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.6rem',
    },
  },
}));

interface IProps {
  bookingStore?: BookingStore;
}

const AutoRenewal: React.FC<IProps> = (props) => {
  const classes = useStyle();
  const { locale } = useRouter();
  const { bookingStore } = props;
  const { autoRenewal } = bookingStore.bookingDetails;
  const isAvailabilityRestricted = !!bookingStore.availableUntil;
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const moveInDate = bookingStore?.bookingDetails?.moveInDate;
  const date = moveInDate?.locale(locale).format('DD MMM YYYY');
  const handleChangeAutoRenewal = () => {
    if (autoRenewal === true) {
      setIsPopUpOpen(true);
      return;
    }

    // Auto renewal is on
    bookingStore.setBookingDetails('moveOutDate', undefined);
    bookingStore.setBookingDetails('autoRenewal', true);
  };
  const { t } = usePageTranslation('checkout', 'AutoRenewal');
  return (
    <Box className={classes.root}>
      {isPopUpOpen
        ? (
          <PopUpOffAutoRenewal
            isPopUpOpen={isPopUpOpen}
            onConfirm={() => {
              // Auto renewal off
              bookingStore.setBookingDetails('moveOutDate', DayJS(moveInDate).add(30, 'day'));
              bookingStore.setBookingDetails('autoRenewal', false);
              setIsPopUpOpen(false);
            }}
            onCancel={() => setIsPopUpOpen(false)}
          />
        )
        : ''}
      <Box>
        <Grey3Typography className={classes.titleText} variant="h5">
          {t('grey3Typography1')}
        </Grey3Typography>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" className={classes.descriptionBox}>
        <Box>
          <Grey2Typography className={classes.descriptionText} variant="body2">
            {t('grey3Typography2')}
            &nbsp;
            {date}
          </Grey2Typography>
        </Box>
        <Box>
          <CustomizedSwitches
            checked={autoRenewal}
            disabled={isAvailabilityRestricted}
            handleChange={handleChangeAutoRenewal}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default inject(BOOKING_STORE)(observer(AutoRenewal));
