import React from 'react';
import { BookingServicesQuery_services_edges } from '../../../../../../queries/__generated__/BookingServicesQuery';
import Service from '../Service';
import { BookingStore } from '../../../../../../stores/BookingStore';

interface IProps {
  bookingStore: BookingStore;
  spaceSize: string;
  item: BookingServicesQuery_services_edges;
  value: boolean;
}

const ServiceItem:React.FC<IProps> = (props) => {
  const {
    bookingStore,
    spaceSize,
    item,
    value,
  } = props;

  return (
    <Service
      options={item}
      value={value}
      handleChange={() => bookingStore.selectService(item.id, item)}
      currency={bookingStore.booking.currency_sign}
      spaceSize={spaceSize}
    />
  );
};

export default ServiceItem;
