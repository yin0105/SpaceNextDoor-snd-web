import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
import { Typography, Box, Divider } from '@material-ui/core';
import useStyles from '../styles';
import ListItem from '../AccountDetails/listItem';
import GuestContactForm from './GuestForm/ContactForm';
import AccountStore, { ACCOUNT_STORE_KEY } from '../../store/AccountStore';
import { ProfileQuery_profile } from '../../../shared/queries/__generated__/ProfileQuery';
import usePageTranslation from '../../../../hooks/usePageTranslation';

interface IProps {
  title: string;
  user: ProfileQuery_profile;
  accountStore?: AccountStore;
}

enum FormStatus {
  ACTIVE = 1,
  INACTIVE = 0,
}

const LoginDetails: React.FC<IProps> = ({ title, accountStore, user }) => {
  const classes = useStyles();
  const { t } = usePageTranslation('hostAccount', 'LoginDetails');
  const [isEditable, setIsEditable] = useState<number>(FormStatus.INACTIVE);

  const toggleFormHandler = (bol: FormStatus) => {
    setIsEditable(bol);
  };

  const renderEditableForm = () => {
    if (isEditable) {
      return (
        <GuestContactForm
          user={accountStore.profile}
          onSave={() => toggleFormHandler(FormStatus.INACTIVE)}
          onCancel={() => toggleFormHandler(FormStatus.INACTIVE)}
        />
      );
    }
    return (
      <ListItem
        title={t('email')}
        name={accountStore.profile?.email || ''}
        status={t('status')}
        handleEdit={() => toggleFormHandler(FormStatus.ACTIVE)}
      />
    );
  };

  return (
    <>
      <Box className={classes.root}>
        <Typography variant="h6" className={classes.title}>
          {title}
        </Typography>
        {renderEditableForm()}
        <ListItem title={t('phone')} name={user?.phone_number || ''} status={t('status')} />
      </Box>
      <Divider />
    </>
  );
};

export default inject(ACCOUNT_STORE_KEY)(observer(LoginDetails));
