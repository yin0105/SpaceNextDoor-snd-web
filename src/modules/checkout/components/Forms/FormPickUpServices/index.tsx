import { Box } from '@material-ui/core';
import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
import ProgressLayout from '../ProgressLayout';
import PickUpServices from './PickUpServices';
import handleSubmit from '../../../../../utilities/handleSubmit';
import Info from '../Info';
import { BookingStore, BOOKING_STORE } from '../../../stores/BookingStore';
import usePageTranslation from '../../../../../hooks/usePageTranslation';
import {
  BookingServicesQuery_services,
} from '../../../queries/__generated__/BookingServicesQuery';

interface IProps {
  step: number;
  bookingStore?: BookingStore;
  pickupOptions:BookingServicesQuery_services;
  services: number;
  setManPower: (value: number) => void;
  manPower: number;
}

const FormPickUpServices: React.FC<IProps> = (props) => {
  const {
    step,
    bookingStore,
    pickupOptions,
    services,
    setManPower,
    manPower,
  } = props;
  const { t } = usePageTranslation('checkout', 'FormPickUpServices');
  const {
    pickUpDetails: {
      address, time, lat, lng,
    }, serviceSlots, service,
  } = bookingStore;
  const serviceName = service?.title_en || t('selfPickup');
  const data = [
    { title: t('title1'), value: serviceName },
  ];

  if (service) {
    data.push({
      title: `${bookingStore?.service?.title_en}(${bookingStore?.service?.vehicle_title}) ${t('title5')}`,
      value: bookingStore?.booking?.currency_sign + services,
    });
    data.push({ title: t('title2'), value: address.value });
    data.push({ title: t('title3'), value: serviceSlots.filter((a) => a.time === time.value)[0]?.label });
  }

  const submit = () => {
    if (service && !address.value) {
      bookingStore.setPickupDetails('address', '', t('pickupDetails'));
      return;
    }

    if (service && !lat.value) {
      bookingStore.setPickupDetails('address', '', t('pickupDetails'));
      return;
    }

    if (service && !lng.value) {
      bookingStore.setPickupDetails('address', '', t('pickupDetails'));
      return;
    }

    bookingStore.setCurrentStep(bookingStore.currentStep + 1);
  };

  const [hideServices, setHideServices] = useState(false);
  return (
    <Box>
      <form onSubmit={handleSubmit(submit, null)}>
        <ProgressLayout
          step={step}
          title={t('title4')}
          subtitle={t('subtitle4')}
          setHideServices={setHideServices}
          hideServices={hideServices}
        >
          {step < bookingStore.currentStep ? (
            <Info data={data} />
          )
            : (
              <PickUpServices
                hideServices={hideServices}
                setManPower={setManPower}
                servicesList={pickupOptions}
                manPower={manPower}
              />
            )}
        </ProgressLayout>
      </form>
    </Box>
  );
};

export default inject(BOOKING_STORE)(observer(FormPickUpServices));
