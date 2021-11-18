import { useRouter } from 'next/router';
import withAuth from '../../../hocs/withAuth';
import HostLayout from '../../../layouts/HostLayout';
import Reservation from '../../../modules/host-reservations/containers/ReservationDetails';
import { Roles } from '../../../modules/host-reservations/contants/role';

const HostListDetails: React.FC = () => {
  const router = useRouter();
  const bookingId = parseInt(router?.query?.id as string, 10);

  return (
    <HostLayout>
      <Reservation id={bookingId} role={Roles.HOST} />
    </HostLayout>
  );
};

export default withAuth(HostListDetails);
