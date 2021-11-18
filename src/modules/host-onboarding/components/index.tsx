import React from 'react';
import dynamic from 'next/dynamic';
import Main from './Main';

const Header = dynamic(import('./Header'), { ssr: false });

interface IProps {
  siteId?: number;
  spaceId?: number;
}

const OnboardingWizard: React.FunctionComponent<IProps> = (props: IProps) => (
  <>
    <Header />
    <Main {...props} />
  </>
);

export default OnboardingWizard;
