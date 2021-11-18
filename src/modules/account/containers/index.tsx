import { inject, observer } from 'mobx-react';
import { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';
import AccountStore, { ACCOUNT_STORE_KEY } from '../store/AccountStore';
import Heading from '../../../components/Heading';
import AccountDetails from '../components/AccountDetails';
import usePageTranslation from '../../../hooks/usePageTranslation';
// import DeleteButton from '../components/button';

interface IProps {
  accountStore?: AccountStore;
  isHost: boolean;
}

const Account: React.FC<IProps> = ({ accountStore, isHost }) => {
  const { getProfile, getBanks, profile } = accountStore;
  useEffect(() => {
    getProfile();
    getBanks();
  }, []);

  const { t } = usePageTranslation('hostAccount', 'Containers');

  return (
    <>
      <Grid container justify="center">
        <Grid item xs={10}>
          <Heading title={t('title')} isLinkBreak />
          <AccountDetails isHost={isHost} profile={profile} />
          {/* <DeleteButton /> */}
        </Grid>
      </Grid>
    </>
  );
};

export default inject(ACCOUNT_STORE_KEY)(observer(Account));
