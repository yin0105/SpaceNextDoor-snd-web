import 'date-fns';
import thLocale from 'date-fns/locale/th';
import jpLocale from 'date-fns/locale/ja';
import enLocale from 'date-fns/locale/en-US';
import React, { useState } from 'react';
import {
  Box, IconButton, makeStyles, Typography,
} from '@material-ui/core';
import clsx from 'clsx';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DayJS, { Dayjs } from 'components/DayJS';
import { useRouter } from 'next/router';
import { inject, observer } from 'mobx-react';
import Grey2Typography from '../../../../../../../components/Typographies/Grey2Typography';
import Image from '../../../../../../../components/Image';
import { BookingStore, BOOKING_STORE } from '../../../../../stores/BookingStore';
import { isMoveOutDateValid } from '../../../../../../../utilities/bookingValidation';
import DateModal from './modal';
import usePageTranslation from '../../../../../../../hooks/usePageTranslation';

const useStyles = makeStyles((theme) => ({
  dates: {
    display: 'flex',
    flexDirection: 'row',
    padding: '14px 0 28px',
    [theme.breakpoints.up('sm')]: {
      padding: '0 8px 0 8px',
    },
  },
  notAllowed: {
    cursor: 'not-allowed !important',
  },
  oneDate: {
    cursor: 'pointer',
    position: 'relative',
    width: '100%',
    '&:first-child': {
      padding: '0 8px 0 0',
      [theme.breakpoints.up('sm')]: {
        padding: '0 8px 0 0',
      },
    },
    '&:last-child': {
      borderLeft: '1px solid #E1E0E3',
      padding: '0 0 0 15px',
      [theme.breakpoints.up('sm')]: {
        padding: '0 0 0 8px',
      },
    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.up('sm')]: {
      padding: '0 8px 0 8px',
    },
  },
  oneDateHeader: {
    fontWeight: 600,
  },
  oneDateDescriptionBox: {},
  imageBox: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  errorText: {
    color: '#E53535',
  },
}));
interface IProps {
  bookingStore?: BookingStore;
}

const localeMap = {
  'en-US': enLocale,
  th: thLocale,
  ja: jpLocale,
};

const localeUtilsMap = {
  'en-US': DateFnsUtils,
  th: DateFnsUtils,
  ja: DateFnsUtils,
};

const Dates: React.FC<IProps> = (props) => {
  const { locale } = useRouter();
  const classes = useStyles();
  const { bookingStore } = props;
  const {
    bookingDetails, setBookingDetails, bookingError, availableUntil,
  } = bookingStore;
  const {
    moveInDate, moveOutDate, autoRenewal,
  } = bookingDetails;
  const [isMoveInOpen, setIsMoveInOpen] = useState(false);
  const [isMoveOutOpen, setIsMoveOutOpen] = useState(false);

  const getMoveInMaxDate = () => {
    let date;

    if (moveOutDate && moveOutDate.isBefore(availableUntil)) {
      date = moveOutDate;
    } else {
      date = availableUntil;
    }

    return date && date.subtract(1, 'day');
  };

  const changeBookingDetails = (property, value) => {
    setBookingDetails(property, value);
  };

  const dateValidation = (name: string, value: Dayjs) => {
    const getMoveInDate = name === 'moveInDate' ? value : moveInDate;
    const getMoveOutDate = name === 'moveOutDate' ? value : moveOutDate;

    const isMoveOutValid = getMoveOutDate && isMoveOutDateValid(getMoveInDate, getMoveOutDate);
    if (name === 'moveInDate' && !isMoveOutValid) {
      changeBookingDetails('moveOutDate', undefined);
      changeBookingDetails('autoRenewal', true);
    }

    if (getMoveOutDate && isMoveOutValid) {
      // turn of automatically when move out is chosen
      changeBookingDetails('autoRenewal', false);
    }

    changeBookingDetails(name, value);
  };

  const toggleModal = (name: string) => {
    if (name === 'moveInDate') {
      setIsMoveInOpen(!isMoveInOpen);
    } else {
      setIsMoveOutOpen(!isMoveOutOpen);
    }
  };

  const clearDatePicker = (name: string, value: Dayjs) => {
    if (name === 'moveOutDate') {
      changeBookingDetails('autoRenewal', true);
    }

    changeBookingDetails(name, value);
    toggleModal(name);
  };

  const confirmDatePicker = (name: string, value: Dayjs) => {
    dateValidation(name, value);
    toggleModal(name);
  };

  const { t } = usePageTranslation('checkout', 'Dates');
  const commonT = usePageTranslation('common', 'BookingStoreErrors').t;
  const maxMoveInDate = getMoveInMaxDate();

  let bookingErrorFormatted = bookingError;
  if (bookingError.length !== 0 && bookingError.length < 13) {
    bookingErrorFormatted = commonT(bookingError);
  }

  return (
    <MuiPickersUtilsProvider utils={localeUtilsMap[locale]} locale={localeMap[locale]}>
      <DateModal
        isOpen={isMoveInOpen}
        clearDatePicker={clearDatePicker}
        confirmDatePicker={confirmDatePicker}
        date={moveInDate}
        minDate={DayJS().add(1, 'day')}
        maxDate={maxMoveInDate}
        title={t('title1')}
        description={t('desc1')}
        name="moveInDate"
        toggleModal={toggleModal}
      />
      <DateModal
        isOpen={isMoveOutOpen}
        clearDatePicker={clearDatePicker}
        confirmDatePicker={confirmDatePicker}
        date={moveOutDate}
        minDate={DayJS(moveInDate).add(1, 'day') || DayJS().add(3, 'day')}
        maxDate={availableUntil}
        title={t('title2')}
        description={t('desc2')}
        name="moveOutDate"
        toggleModal={toggleModal}
      />
      <Box>
        <Grey2Typography variant="body2" className={classes.errorText}>
          {!!bookingError.length && bookingErrorFormatted}
        </Grey2Typography>
      </Box>

      <Box className={classes.dates}>
        <Box className={classes.oneDate}>
          <Box onClick={() => bookingStore.currentStep === 0 && setIsMoveInOpen(true)}>
            <Box>
              <Typography variant="caption" className={classes.oneDateHeader}>
                {t('title1')}
              </Typography>
            </Box>
            <Box className={classes.oneDateDescriptionBox}>
              <Grey2Typography variant="body2">
                {DayJS(moveInDate).locale(locale).format('DD MMM, YYYY')}
              </Grey2Typography>
            </Box>
          </Box>
          <Box className={classes.imageBox}>
            <IconButton
              onClick={() => bookingStore.currentStep === 0 && setIsMoveInOpen(true)}
            >
              <Image
                name="calendar"
                folder="SearchLocation"
              />
            </IconButton>
          </Box>
        </Box>
        <Box className={clsx(classes.oneDate, autoRenewal && classes.notAllowed)}>
          <Box
            onClick={() => (
              (bookingStore.currentStep === 0) && setIsMoveOutOpen(true)
            )}
          >
            <Box>
              <Typography variant="caption" className={classes.oneDateHeader}>
                {t('title2')}
              </Typography>
            </Box>
            <Box className={classes.oneDateDescriptionBox}>
              <Grey2Typography variant="body2">
                {autoRenewal ? t('grey2Typography') : DayJS(moveOutDate).locale(locale).format('DD MMM, YYYY')}
              </Grey2Typography>
            </Box>
          </Box>
          <Box className={classes.imageBox}>
            <IconButton
              onClick={() => (
                (bookingStore.currentStep === 0) && setIsMoveOutOpen(true)
              )}
            >
              <Image
                name="calendar"
                folder="SearchLocation"
              />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </MuiPickersUtilsProvider>
  );
};

export default inject(BOOKING_STORE)(observer(Dates));
