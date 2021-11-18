import React from 'react';
import Service from '../Service';
import { BookingStore } from '../../../../../../stores/BookingStore';
import usePageTranslation from '../../../../../../../../hooks/usePageTranslation';

interface IProps {
  bookingStore: BookingStore;
}

const NoPickupService:React.FC<IProps> = (props) => {
  const { t } = usePageTranslation('checkout', 'ChooseYourService');
  const { bookingStore } = props;

  const options = {
    title_en: t('serviceTitle2'),
    description_en: t('serviceDesc'),
  };

  return (
    <Service
      options={options}
      value={bookingStore.serviceId === 0}
      handleChange={() => bookingStore.selectService(0, null)}
      bookingStore={bookingStore}
    />
  );
};

export default NoPickupService;
