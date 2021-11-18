import React, { useState } from 'react';
import { Provider as MobxProvider } from 'mobx-react';

import { HomeLayout } from '../layouts/MainLayout';
import EstimatorBox from '../modules/estimator-box';
import EstimatorBoxStore from '../modules/estimator-box/stores/EstimatorBoxStore';

const EstimatorBoxPage: React.FunctionComponent = () => {
  const [store] = useState(new EstimatorBoxStore());

  return (
    <MobxProvider estimatorBoxStore={store}>
      <HomeLayout>
        <EstimatorBox />
      </HomeLayout>
    </MobxProvider>
  );
};

export default EstimatorBoxPage;
