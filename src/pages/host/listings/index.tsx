import React, { useState } from 'react';
import { Provider } from 'mobx-react';
import Listings from '../../../modules/host/containers/Listings';
import HostListingsStore from '../../../modules/host/stores/HostListingsStore';
import HostLayout from '../../../layouts/HostLayout';
import withAuth from '../../../hocs/withAuth';
import HostOnboardingStore from '../../../modules/host-onboarding/stores/HostOnboardingStore';
import { Intercom, IIntercomClevertapPayload } from '../../../components/Intercom';
import AuthStore, { AUTH_STORE_KEY } from '../../../modules/app/stores/AuthStore';
import { useCurrentCountry } from '../../../utilities/market';

interface IProps {
  [AUTH_STORE_KEY]?: AuthStore;
}

const HostListingPage: React.FunctionComponent<IProps> = ({ auth }) => {
  const [store] = useState(new HostListingsStore());
  const [hostStore] = useState(new HostOnboardingStore());
  const country = useCurrentCountry();
  const trackingPayload: IIntercomClevertapPayload = {
    type: 'intercom',
    CTSessionId: null,
    customerEmail: auth?.user?.email,
    customerPhone: auth?.user?.phone_number,
    customerName: `${auth?.user?.first_name}${auth?.user?.last_name}`,
    userId: auth?.user?.id || null,
    currency: country.currency,
    status: null,
    siteName: 'host-listings',
    country: country.name,
  };

  return (
    <Provider hostListsStore={store} onboardingStore={hostStore}>
      <Intercom trackingPayload={trackingPayload} />
      <HostLayout>
        <Listings />
      </HostLayout>
    </Provider>
  );
};

export default withAuth(HostListingPage);
