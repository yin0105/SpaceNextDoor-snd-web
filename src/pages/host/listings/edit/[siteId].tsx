import React, { useState } from 'react';
import { Provider as MobxProvider } from 'mobx-react';
import { useRouter } from 'next/router';

import withAuth from '../../../../hocs/withAuth';
import HostOnboardingStore from '../../../../modules/host-onboarding/stores/HostOnboardingStore';
import OnboardingWizard from '../../../../modules/host-onboarding/components';

const Site: React.FunctionComponent = () => {
  const [store] = useState(new HostOnboardingStore());
  const router = useRouter();
  const siteId = Number(router?.query?.siteId) || null;

  // by default load site edit step
  if (typeof window !== 'undefined') {
    store.goToStep(2, true);
  }

  return (
    <MobxProvider store={store}>
      <OnboardingWizard siteId={siteId} />
    </MobxProvider>
  );
};

export default withAuth(Site);
