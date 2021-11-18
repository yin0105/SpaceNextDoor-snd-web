import React from 'react';
import { Box } from '@material-ui/core';
import dynamic from 'next/dynamic';
import { useQuery } from '@apollo/client';
import { useCurrentCountry } from 'utilities/market';
import { IPromotion } from '../../hooks/useCheckoutPrice';
import { BOOKING_SERVICES_QUERY } from '../../queries';
import {
  BookingServicesQuery,
  BookingServicesQueryVariables,
} from '../../queries/__generated__/BookingServicesQuery';

// Since we rely on query params to load correct step, we need to turn off SSR for that
const FormBookingDetails = dynamic(() => import('./FormBookingDetails'), { ssr: false });
const FormPickUpServices = dynamic(() => import('./FormPickUpServices'), { ssr: false });
const FormInsurancePlan = dynamic(() => import('./FormInsurancePlan'), { ssr: false });
const FormPaymentMethod = dynamic(() => import('./FormPaymentMethod'), { ssr: false });

interface IProps {
  disableBtn?: boolean;
  appliedPromotion: IPromotion;
  promotionError: string;
  services: number;
  setManPower: (value: number) => void;
  manPower: number;
  appliedPublicPromotion: IPromotion
  total: number
}

const Forms: React.FC<IProps> = ({
  disableBtn = false,
  appliedPromotion,
  promotionError,
  services,
  setManPower,
  manPower,
  appliedPublicPromotion,
  total,
}) => {
  const { data } = useQuery<BookingServicesQuery, BookingServicesQueryVariables>(
    BOOKING_SERVICES_QUERY, {
      variables: {
        country: { _eq: useCurrentCountry().name },
      },
    },
  );

  const pickUpServices = data?.services?.edges.length;

  const showPickUpServicesStep = () => {
    if (pickUpServices) {
      return (
        <FormPickUpServices
          step={1}
          services={services}
          manPower={manPower}
          pickupOptions={data?.services}
          setManPower={setManPower}
        />
      );
    }

    return '';
  };

  return (

    <Box>
      <FormBookingDetails
        step={0}
        disableBtn={disableBtn}
        appliedPromotion={appliedPromotion}
        promotionError={promotionError}
        appliedPublicPromotion={appliedPublicPromotion}
        total={total}
      />
      {showPickUpServicesStep()}
      <FormInsurancePlan step={pickUpServices ? 2 : 1} />
      <FormPaymentMethod step={pickUpServices ? 3 : 2} />
    </Box>
  );
};

export default Forms;
