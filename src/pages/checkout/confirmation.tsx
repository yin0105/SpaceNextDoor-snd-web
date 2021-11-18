import { Box } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Provider as MobxProvider } from 'mobx-react';
import { useRouter } from 'next/router';

import { HomeLayout } from '../../layouts/MainLayout';
import CheckoutConfirmation from '../../modules/checkout/components/Confirmation';
import { BookingStore } from '../../modules/checkout/stores/BookingStore';

const CheckoutConfirmationPage: React.FunctionComponent = () => {
  const router = useRouter();
  // init booking store with current country and locale
  const [store] = useState(new BookingStore(router.defaultLocale, router.locale));

  useEffect(() => {
    const bookingId = parseInt(router.query?.booking_id as string, 10);
    store.fetchBooking(bookingId);
    if (!bookingId) {
      router.push('/');
    }
  });

  return (
    <MobxProvider bookingStore={store}>
      <Box>
        <HomeLayout>
          <CheckoutConfirmation isConfirmation />
        </HomeLayout>
      </Box>
    </MobxProvider>
  );
};

export default CheckoutConfirmationPage;
