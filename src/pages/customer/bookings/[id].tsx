import { useRouter } from 'next/router';
import withAuth from '../../../hocs/withAuth';
import { HomeLayout } from '../../../layouts/MainLayout';
import Reservation from '../../../modules/host-reservations/containers/ReservationDetails';
import { Roles } from '../../../modules/host-reservations/contants/role';

const BookingDetails: React.FC = () => {
  const router = useRouter();
  const bookingId = parseInt(router?.query?.id as string, 10);

  return (
    <HomeLayout>
      <br />
      <Reservation id={bookingId} role={Roles.GUEST} />
    </HomeLayout>
  );
};

export default withAuth(BookingDetails);
