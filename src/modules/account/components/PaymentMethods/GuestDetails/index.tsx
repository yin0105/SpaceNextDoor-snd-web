import usePageTranslation from 'hooks/usePageTranslation';
import { ProfileQuery_profile } from '../../../../shared/queries/__generated__/ProfileQuery';
import ListItem from '../../AccountDetails/listItem';

interface IProps {
  handleEdit: (value: boolean) => void;
  user: ProfileQuery_profile;
}

const GuestDetails: React.FC<IProps> = ({ user, handleEdit }) => {
  const { t } = usePageTranslation('hostAccount', 'GuestDetails');
  return (
    <ListItem
      name={user?.customer?.card_last_digits}
      status={t('edit')}
      icon
      handleEdit={() => handleEdit(true)}
    />
  );
};

export default GuestDetails;
