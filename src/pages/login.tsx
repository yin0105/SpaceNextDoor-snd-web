import React from 'react';
import { Provider as MobxProvider } from 'mobx-react';

import { HomeLayout } from '../layouts/MainLayout';
import LoginModule from '../modules/login/components';
import withoutAuth from '../hocs/withoutAuth';

const Login: React.FC = () => (
  <MobxProvider>
    <HomeLayout>
      <LoginModule />
    </HomeLayout>
  </MobxProvider>
);

export default withoutAuth(Login);
