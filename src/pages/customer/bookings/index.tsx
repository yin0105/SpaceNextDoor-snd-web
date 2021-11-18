import React, { useState } from 'react';
import { Provider } from 'mobx-react';
import HostReservationsStore from '../../../modules/host-reservations/store/HostReservationsStore';
import { HomeLayout } from '../../../layouts/MainLayout';
import Bookings from '../../../modules/host-reservations/containers/Reservations';
import { Roles } from '../../../modules/host-reservations/contants/role';
import withAuth from '../../../hocs/withAuth';

const CustomerBookings: React.FunctionComponent = () => {
  const [store] = useState(new HostReservationsStore());
  return (
    <Provider hostReservationsStore={store}>
      <HomeLayout>
        <br />
        <Bookings role={Roles.GUEST} />
      </HomeLayout>
    </Provider>
  );
};

export default withAuth(CustomerBookings);
