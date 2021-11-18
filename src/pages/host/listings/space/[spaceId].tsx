import withAuth from '../../../../hocs/withAuth';
import HostLayout from '../../../../layouts/HostLayout';
import Listing from '../../../../modules/host/containers/ListingDetails';

const HostListDetails: React.FC = () => (
  <HostLayout>
    <Listing />
  </HostLayout>
);

export default withAuth(HostListDetails);
