import React from 'react';
import PersonalDetail from '../PersonalDetails';
import LoginDetails from '../LoginDetails';
import PaymentMethod from '../PaymentMethods';
import SocialAccounts from '../SocialAccounts';
import { ProfileQuery_profile } from '../../../shared/queries/__generated__/ProfileQuery';
import usePageTranslation from '../../../../hooks/usePageTranslation';

interface IProps {
  profile: ProfileQuery_profile;
  isHost: boolean;
}

const AccountDetails: React.FC<IProps> = ({ profile, isHost }) => {
  const { t } = usePageTranslation('hostAccount', 'AccountDetails');

  return (
    <>
      <PersonalDetail user={profile} title={t('personal')} />
      <LoginDetails user={profile} title={t('login')} />
      {/* <SocialAccounts user={profile} title="Social accounts" /> */}
      <PaymentMethod user={profile} isHost={isHost} title={t('payment')} />
    </>
  );
};

export default AccountDetails;
