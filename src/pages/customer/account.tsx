import { useState } from 'react';
import { Provider } from 'mobx-react';
import AccountContainer from '../../modules/account/containers';
import AccountStore from '../../modules/account/store/AccountStore';
import { HomeLayout } from '../../layouts/MainLayout';
import withAuth from '../../hocs/withAuth';

const Account: React.FC = () => {
  const [store] = useState(new AccountStore());

  return (
    <Provider accountStore={store}>
      <HomeLayout>
        <br />
        <AccountContainer isHost={false} />
      </HomeLayout>
    </Provider>
  );
};

export default withAuth(Account);
