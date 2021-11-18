import React, { useState } from 'react';
import { Provider as MobxProvider } from 'mobx-react';
import { useRouter } from 'next/router';
import OnboardingWizard from '../../../modules/host-onboarding/components';
import HostOnboardingStore from '../../../modules/host-onboarding/stores/HostOnboardingStore';

const Site: React.FunctionComponent = () => {
  const [store] = useState(new HostOnboardingStore());
  const router = useRouter();
  const siteId = Number(router?.query?.siteid) || null;

  return (
    <MobxProvider store={store}>
      <OnboardingWizard siteId={siteId} />
    </MobxProvider>
  );
};

export default Site;
