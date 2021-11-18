import React, { useState } from 'react';
import { Provider as MobxProvider } from 'mobx-react';
import OnboardingWizard from '../../modules/host-onboarding/components';
import HostOnboardingStore from '../../modules/host-onboarding/stores/HostOnboardingStore';

const OnboardingHostPage: React.FunctionComponent = () => {
  const [store] = useState(new HostOnboardingStore());

  return (
    <MobxProvider store={store}>
      <OnboardingWizard />
    </MobxProvider>
  );
};

export default OnboardingHostPage;
