import InvoiceContainer from '../../../modules/invoice/containers';
import { HomeLayout } from '../../../layouts/MainLayout';
import withAuth from '../../../hocs/withAuth';

const Account: React.FC = () => (
  <HomeLayout>
    <br />
    <InvoiceContainer />
  </HomeLayout>
);

export default withAuth(Account);
