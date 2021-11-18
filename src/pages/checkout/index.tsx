import React, { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { inject, observer, Provider as MobxProvider } from 'mobx-react';
import { useRouter } from 'next/router';
import { loadStripe } from '@stripe/stripe-js';

import CheckoutLayout from '../../layouts/CheckoutLayout';
import CheckoutComponent from '../../modules/checkout/components';
import { BookingStore } from '../../modules/checkout/stores/BookingStore';
import { STRIPE_KEY } from '../../config';
import { PromotionStore } from '../../modules/checkout/stores/PromotionStore';
import { scrollTop } from '../../utilities/scrollTop';
import usePageTranslation from '../../hooks/usePageTranslation';
import { Intercom, IIntercomClevertapPayload } from '../../components/Intercom';
import { useCurrentCountry } from '../../utilities/market';
import AuthStore, { AUTH_STORE_KEY } from '../../modules/app/stores/AuthStore';

interface IProps {
  [AUTH_STORE_KEY]?: AuthStore;
}

const Checkout: React.FC<IProps> = ({ auth }) => {
  const router = useRouter();
  const [store] = useState(new BookingStore(router.defaultLocale, router.locale));
  const [promoStore] = useState(new PromotionStore());
  const spaceId = router.query?.space_id as string;
  const quotationId = router.query?.quotation as string;
  const country = useCurrentCountry();

  const trackingPayload: IIntercomClevertapPayload = {
    type: 'intercom',
    CTSessionId: null,
    customerEmail: auth?.user?.email,
    customerPhone: auth?.user?.phone_number,
    customerName: `${auth?.user?.first_name} ${auth?.user?.last_name}`,
    userId: auth?.user?.id || null,
    currency: country.currency,
    status: null,
    siteName: 'checkout',
    country: country.name,
  };

  useEffect(() => {
    store.fetchSpace(parseInt(spaceId, 10), quotationId);
    promoStore.fetchPublicPromotions();
    scrollTop(1);
  }, [spaceId, quotationId]);
  const { t } = usePageTranslation('checkout', 'CheckoutPage');
  return (
    <Elements stripe={loadStripe(STRIPE_KEY)}>
      <Intercom trackingPayload={trackingPayload} />
      <MobxProvider bookingStore={store} promotionStore={promoStore}>
        <CheckoutLayout text={t('text')} cb={() => window.history.back()}>
          <CheckoutComponent />
        </CheckoutLayout>
      </MobxProvider>
    </Elements>
  );
};

export default inject(AUTH_STORE_KEY)(observer(Checkout));
