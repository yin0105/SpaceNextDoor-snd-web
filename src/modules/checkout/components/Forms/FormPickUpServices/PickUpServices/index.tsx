import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react';
import { Box } from '@material-ui/core';
import ChooseYourService from './ChooseYourService';
import YourCollectionDetail from './YourCollectionDetail';
import { BookingStore, BOOKING_STORE } from '../../../../stores/BookingStore';
import {
  BookingServicesQuery_services,
} from '../../../../queries/__generated__/BookingServicesQuery';

const useStyles = makeStyles(() => ({
  root: {
    marginTop: '12px',
  },
}));

interface IProps {
  [BOOKING_STORE]?: BookingStore;
  hideServices?: boolean;
  servicesList:BookingServicesQuery_services;
  setManPower: (value: number) => void;
  manPower: number;
}

const PickUpServices: React.FC<IProps> = ({
  bookingStore: { serviceId },
  hideServices,
  servicesList,
  setManPower,
  manPower,
}) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      {!hideServices && <ChooseYourService items={servicesList} />}
      {!!serviceId && serviceId !== 0 && !hideServices && (
        <YourCollectionDetail setManPower={setManPower} manPower={manPower} />
      )}
    </Box>
  );
};

export default inject(BOOKING_STORE)(observer(PickUpServices));
