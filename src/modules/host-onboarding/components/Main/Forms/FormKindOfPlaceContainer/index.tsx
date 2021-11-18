import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { inject, observer } from 'mobx-react';
import HostOnboardingSiteStore, { ONBOARDING_SITE_STORE } from '../../../../stores/HostOnboardingSiteStore';
import FormKindOfPlace from './FormKindOfPlace';

interface IProps {
  changeStep: (step) => void,
  store?: HostOnboardingSiteStore;
}

const FormKindOfPlaceContainer: React.FC<IProps> = ({ changeStep, store }) => {
  const router = useRouter();
  return (
    <FormKindOfPlace changeStep={changeStep} store={store} />
  );
};

export default inject(ONBOARDING_SITE_STORE)(observer(FormKindOfPlaceContainer));
