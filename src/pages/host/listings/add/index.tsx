import React, { useState } from 'react';
import { Provider as MobxProvider } from 'mobx-react';

import withAuth from '../../../../hocs/withAuth';
import HostOnboardingStore from '../../../../modules/host-onboarding/stores/HostOnboardingStore';
import OnboardingWizard from '../../../../modules/host-onboarding/components';

const Site: React.FunctionComponent = () => {
  const [store] = useState(new HostOnboardingStore());

  // by default load site step
  if (typeof window !== 'undefined') {
    store.goToStep(2);
  }

  return (
    <MobxProvider store={store}>
      <OnboardingWizard />
    </MobxProvider>
  );
};

export default withAuth(Site);
