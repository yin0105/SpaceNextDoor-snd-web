import { useState } from 'react';
import { Provider } from 'mobx-react';
import AccountContainer from '../../modules/account/containers';
import AccountStore from '../../modules/account/store/AccountStore';
import HostLayout from '../../layouts/HostLayout';
import withAuth from '../../hocs/withAuth';

const Account: React.FC = () => {
  const [store] = useState(new AccountStore());

  return (
    <Provider accountStore={store}>
      <HostLayout>
        <AccountContainer isHost />
      </HostLayout>
    </Provider>
  );
};

export default withAuth(Account);
