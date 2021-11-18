import { Snackbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import { inject, observer } from 'mobx-react';
import React, { useState } from 'react';
import PrimaryButton from '../../../../../../../../../../components/Buttons/PrimaryButton';
import WhiteTypography from '../../../../../../../../../../components/Typographies/WhiteTypography';
import usePageTranslation from '../../../../../../../../../../hooks/usePageTranslation';
import { BookingStore, BOOKING_STORE } from '../../../../../../../../stores/BookingStore';

const useStyles = makeStyles(() => ({
  button: {
    width: '100%',
  },
  buttonText: {
    fontSize: '1.3rem',
    fontWeight: 700,
  },
}));

interface IProps {
  [BOOKING_STORE]?: BookingStore;
  onClick: () => void;
}

const ButtonConfirm: React.FC<IProps> = ({ onClick, bookingStore }) => {
  const classes = useStyles();
  const [open, setState] = useState(false);
  const { t } = usePageTranslation('checkout', 'ButtonConfirm');

  return (
    <>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={3000}
        onClose={() => setState(false)}
      >
        <Alert severity="warning">
          {t('alert')}
        </Alert>
      </Snackbar>
      <PrimaryButton
        className={classes.button}
        onClick={() => {
          if (!bookingStore?.pickUpDetails?.lat?.value) {
            setState(true);
            return;
          }

          onClick();
        }}
      >
        <WhiteTypography className={classes.buttonText}>
          {t('whiteTypography')}
        </WhiteTypography>
      </PrimaryButton>
    </>
  );
};

export default inject(BOOKING_STORE)(observer(ButtonConfirm));
