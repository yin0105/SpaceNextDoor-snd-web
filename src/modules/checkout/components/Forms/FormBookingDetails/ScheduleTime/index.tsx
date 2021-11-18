import React from 'react';
import clsx from 'clsx';
import { inject, observer } from 'mobx-react';
import { Box, Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grey3Typography from '../../../../../../components/Typographies/Grey3Typography';
import Dates from './Dates';
import { BookingStore, BOOKING_STORE } from '../../../../stores/BookingStore';
import usePageTranslation from '../../../../../../hooks/usePageTranslation';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      margin: '24px 0 29px',
    },
  },
  disabled: {
    [theme.breakpoints.up('sm')]: {
      filter: 'saturate(0)',
    },
  },
}));

interface IProps {
  bookingStore?: BookingStore;
}

const ScheduleTime: React.FC<IProps> = (props) => {
  const classes = useStyles();
  const { bookingStore } = props;
  const { t } = usePageTranslation('checkout', 'ScheduleTime');
  return (
    <Box className={bookingStore.currentStep === 0
      ? classes.root
      : clsx(classes.root, classes.disabled)}
    >
      <Hidden smUp>
        <Box>
          <Grey3Typography variant="h5">
            {t('grey3Typography')}
          </Grey3Typography>
        </Box>
      </Hidden>
      <Dates />
    </Box>
  );
};

export default inject(BOOKING_STORE)(observer(ScheduleTime));
