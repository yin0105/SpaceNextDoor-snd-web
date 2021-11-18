import { Box } from '@material-ui/core';
import usePageTranslation from '../../../../../hooks/usePageTranslation';
import { ProfileQuery_profile } from '../../../../shared/queries/__generated__/ProfileQuery';
import ListItem from '../../AccountDetails/listItem';

interface IProps {
  handleEdit: () => void;
  user: ProfileQuery_profile;
}

const HostDetails: React.FC<IProps> = ({ user, handleEdit }) => {
  const provider: any = user?.provider || {};

  const { t } = usePageTranslation('hostAccount', 'HostDetails');

  return (
    <>
      <Box>
        <ListItem title={t('account')} name={provider?.bank_account_number} status={t('status')} handleEdit={handleEdit} />
      </Box>
      <Box mt={6} mb={6}>
        <ListItem title={t('bank')} name={provider?.bank?.id} status={t('status')} handleEdit={handleEdit} />
      </Box>
      <Box mt={6} mb={6}>
        <ListItem title={t('accountHolder')} name={provider?.bank_account_holder_name} status={t('status')} handleEdit={handleEdit} />
      </Box>
    </>
  );
};

export default HostDetails;
