import { Box, Dialog, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react';
import React from 'react';
import Grey3Typography from '../../../../../../../../../components/Typographies/Grey3Typography';
import Image from '../../../../../../../../../components/Image';
import ButtonConfirm from '../components/ButtonConfirm';
import InputCurrentLocation from '../components/InputCurrentLocation';
import usePageTranslation from '../../../../../../../../../hooks/usePageTranslation';
import { Map } from '../components/Map';
import { BookingStore, BOOKING_STORE } from '../../../../../../../stores/BookingStore';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: '#FFFFFF',
    zIndex: 2,
    position: 'relative',
  },
  paper: {
    borderRadius: '22px',
    minWidth: '80vw',
    minHeight: '90vh',
  },
  header: {
    margin: '8px 34px 8px 66px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputContainer: {
    position: 'absolute',
    top: '19px',
    zIndex: 2,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  inputBox: {
    width: '683px',
    margin: '0 20px',
  },
  buttonBox: {
    minWidth: '324px',
  },
  buttonContainer: {
    marginTop: '15px',
    marginBottom: '14px',
    display: 'flex',
    justifyContent: 'center',
  },
}));

interface IProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  [BOOKING_STORE]?: BookingStore;
}

const DesktopVersion: React.FC<IProps> = (props) => {
  const {
    isOpen,
    setIsOpen,
    bookingStore,
  } = props;
  const classes = useStyles();
  const { t } = usePageTranslation('checkout', 'DesktopVersion');
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      maxWidth="lg"
      PaperProps={{
        className: classes.paper,
      }}
    >
      <Box className={classes.header}>
        <Grey3Typography variant="h3">
          {t('grey3Typography')}
        </Grey3Typography>
        <Box>
          <IconButton
            onClick={() => {
              setIsOpen(false);
            }}
          >
            <Image name="close" folder="SearchLocation" fullWidth />
          </IconButton>
        </Box>
      </Box>
      <Box className={classes.root}>
        <Box className={classes.inputContainer}>
          <Box className={classes.inputBox}>
            <InputCurrentLocation />
          </Box>
        </Box>

        <Map
          coords={{
            lat: bookingStore?.pickUpDetails?.lat?.value,
            lng: bookingStore?.pickUpDetails?.lng?.value,
          }}
          loadingElement={<div style={{ height: '100%' }} />}
          containerElement={<div style={{ height: '70vh' }} />}
          mapElement={<div style={{ height: '100%' }} />}
        />
      </Box>
      <Box className={classes.buttonContainer}>
        <Box className={classes.buttonBox}>
          <ButtonConfirm onClick={() => setIsOpen(false)} />
        </Box>
      </Box>
    </Dialog>
  );
};

export default inject(BOOKING_STORE)(observer(DesktopVersion));
