import { Box, Dialog } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react';
import React from 'react';
import CheckoutLayout from '../../../../../../../../../layouts/CheckoutLayout';
import InputCurrentLocation from '../components/InputCurrentLocation';
import ButtonConfirm from '../components/ButtonConfirm';
import usePageTranslation from '../../../../../../../../../hooks/usePageTranslation';
import { Map } from '../components/Map';
import { BookingStore, BOOKING_STORE } from '../../../../../../../stores/BookingStore';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: '#FFFFFF',
    margin: '0 -26px',
    height: 'calc(100vh - 73px)',
    overflow: 'hidden',
    position: 'relative',
  },
  inputContainer: {
    position: 'absolute',
    top: '8px',
    zIndex: 2,
    width: '100%',
    padding: '0 25px',
  },
  inputBox: {
    margin: '0 25px',
  },
  buttonBox: {
    position: 'absolute',
    bottom: '49px',
    zIndex: 2,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    padding: '0 25px',
  },
}));

interface IProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  [BOOKING_STORE]?: BookingStore;
}

const MobileVersion: React.FC<IProps> = (props) => {
  const {
    isOpen,
    setIsOpen,
    bookingStore,
  } = props;
  const classes = useStyles();
  const { t } = usePageTranslation('checkout', 'MobileVersion');
  return (
    <Dialog open={isOpen} fullScreen>
      <CheckoutLayout
        text={t('text')}
        cb={() => {
          setIsOpen(false);
        }}
      >
        <Box className={classes.root}>
          <Box className={classes.inputContainer}>
            <InputCurrentLocation />
          </Box>
          <Map
            coords={{
              lat: bookingStore?.pickUpDetails?.lat?.value,
              lng: bookingStore?.pickUpDetails?.lng?.value,
            }}
            loadingElement={<div style={{ height: '100%' }} />}
            containerElement={<div style={{ height: '90vh', zIndex: 10000 }} />}
            mapElement={<div style={{ height: '100%' }} />}
          />
          <Box className={classes.buttonBox}>
            <ButtonConfirm onClick={() => setIsOpen(false)} />
          </Box>
        </Box>
      </CheckoutLayout>
    </Dialog>
  );
};

export default inject(BOOKING_STORE)(observer(MobileVersion));
