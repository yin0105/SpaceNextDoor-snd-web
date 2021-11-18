import React from 'react';
import { inject, observer } from 'mobx-react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import PrimaryButton from '../../../../components/Buttons/PrimaryButton';
import WhiteTypography from '../../../../components/Typographies/WhiteTypography';
import { BookingStore, BOOKING_STORE } from '../../stores/BookingStore';
import usePageTranslation from '../../../../hooks/usePageTranslation';

const useStyles = makeStyles((theme) => ({
  buttonBox: {
    marginBottom: '52px',
    [theme.breakpoints.up('sm')]: {
      marginBottom: '0px',
    },
  },
  buttonText: {
    fontWeight: 700,
    fontSize: '1.3rem',
  },
}));

interface IProps {
  bookingStore?: BookingStore;
}

const ConfirmButton: React.FC<IProps> = (props) => {
  const classes = useStyles();
  const { bookingStore } = props;
  const { t } = usePageTranslation('checkout', 'ConfirmButton');
  return (
    <Box className={classes.buttonBox}>
      <PrimaryButton disabled={bookingStore.currentStep <= 3}>
        <WhiteTypography className={classes.buttonText}>
          {t('button')}
        </WhiteTypography>
      </PrimaryButton>
    </Box>
  );
};

export default inject(BOOKING_STORE)(observer(ConfirmButton));
