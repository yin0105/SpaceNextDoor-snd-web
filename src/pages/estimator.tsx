import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import { Provider as MobxProvider } from 'mobx-react';

import { HomeLayout } from '../layouts/MainLayout';
import Estimator from '../modules/estimator';
import EstimatorStore from '../modules/estimator/stores/EstimatorStore';

const EstimatorPage: React.FunctionComponent = () => {
  const [store] = useState(new EstimatorStore());

  return (
    <MobxProvider estimatorStore={store}>
      <Box>
        <HomeLayout>
          <Estimator />
        </HomeLayout>
      </Box>
    </MobxProvider>
  );
};

export default EstimatorPage;
