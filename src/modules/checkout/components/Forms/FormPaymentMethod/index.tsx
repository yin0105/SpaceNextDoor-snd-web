import React from 'react';
import { Box } from '@material-ui/core';
import { inject } from 'mobx-react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useRouter } from 'next/router';
import ProgressLayout from '../ProgressLayout';
import handleSubmit from '../../../../../utilities/handleSubmit';
import { BookingStore, BOOKING_STORE } from '../../../stores/BookingStore';
import PaymentDetails from './PaymentDetails';
import usePageTranslation from '../../../../../hooks/usePageTranslation';

interface IProps {
  step: number;
  bookingStore?: BookingStore;
}

const FormPaymentMethod: React.FC<IProps> = (props) => {
  const {
    step, bookingStore,
  } = props;
  const { t } = usePageTranslation('checkout', 'FormPaymentMethod');
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const handlePay = async () => {
    if (!stripe || !elements) {
      bookingStore.setPaymentError(t('paymentError'));
      return;
    }

    bookingStore.setProcessing(true);
    const cardElement = elements.getElement(CardElement);

    try {
      const { error, token } = await stripe.createToken(cardElement);

      if (error) {
        bookingStore.setProcessing(false);
        bookingStore.setPaymentError(error.message);
        return;
      }

      // If there is no service and insurance selected, just pay!
      if (!bookingStore.serviceId && !bookingStore.insuranceId) {
        bookingStore.payBooking(token.id);
        return;
      }

      // If there is service selected, create order first before paying
      let order;
      let updatedBooking;
      if (bookingStore.serviceId) {
        order = await bookingStore.createOrder();
      }

      if (bookingStore.insuranceId) {
        updatedBooking = await bookingStore.updateBooking();
      }

      // If there was an error creating order OR insurance package was selected but booking
      // wasn't updated, return and show error to user
      if ((bookingStore.serviceId && !order) || (bookingStore.insuranceId && !updatedBooking)) {
        return;
      }

      bookingStore.payBooking(token.id);
    } catch (e) {
      bookingStore.setProcessing(false);
      bookingStore.setPaymentError(e.message);
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(handlePay, null)}>
        <ProgressLayout isPaymentStep step={step} title={t('title')} btnText={t('btnText')}>
          <PaymentDetails />
        </ProgressLayout>
      </form>
    </Box>
  );
};

export default inject(BOOKING_STORE)(FormPaymentMethod);
