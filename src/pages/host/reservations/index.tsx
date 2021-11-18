import React, { useState } from 'react';
import { Provider } from 'mobx-react';
import HostReservationsStore from '../../../modules/host-reservations/store/HostReservationsStore';
import HostLayout from '../../../layouts/HostLayout';
import Reservations from '../../../modules/host-reservations/containers/Reservations';
import { Roles } from '../../../modules/host-reservations/contants/role';
import withAuth from '../../../hocs/withAuth';
import { Intercom, IIntercomClevertapPayload } from '../../../components/Intercom';
import AuthStore, { AUTH_STORE_KEY } from '../../../modules/app/stores/AuthStore';
import { useCurrentCountry } from '../../../utilities/market';

interface IProps {
  [AUTH_STORE_KEY]?: AuthStore;
}

const HostReservations: React.FunctionComponent<IProps> = ({ auth }) => {
  const [store] = useState(new HostReservationsStore());
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
    siteName: 'host-reservations',
    country: country.name,
  };

  return (
    <Provider hostReservationsStore={store}>
      <Intercom trackingPayload={trackingPayload} />
      <HostLayout>
        <Reservations role={Roles.HOST} />
      </HostLayout>
    </Provider>
  );
};

export default withAuth(HostReservations);
