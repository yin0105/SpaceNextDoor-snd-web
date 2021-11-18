import React, { useState } from 'react';
import { Typography, Box, Divider } from '@material-ui/core';
import useStyles from '../styles';
import ListItem from '../AccountDetails/listItem';
import GuestPersonalForm from './GuestForm/PersonalForm';
import { ProfileQuery_profile } from '../../../shared/queries/__generated__/ProfileQuery';
import usePageTranslation from '../../../../hooks/usePageTranslation';

interface IProps {
  title: string;
  user: ProfileQuery_profile;
}

enum FormStatus {
  ACTIVE = 1,
  INACTIVE = 0,
}

const PersonalDetails: React.FC<IProps> = ({ title, user }) => {
  const classes = useStyles();
  const { t } = usePageTranslation('hostAccount', 'PersonalDetails');
  const [isEditable, setIsEditable] = useState<number>(FormStatus.INACTIVE);

  const toggleFormHandler = (bol: FormStatus) => {
    setIsEditable(bol);
  };

  const renderEditableForm = () => {
    if (isEditable) {
      return (
        <GuestPersonalForm
          user={user}
          onSave={() => toggleFormHandler(FormStatus.INACTIVE)}
          onCancel={() => toggleFormHandler(FormStatus.INACTIVE)}
        />
      );
    }
    return (
      <ListItem
        title={t('title')}
        name={`${user?.first_name || ''} ${user?.last_name || ''}`}
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
      </Box>
      <Divider />
    </>
  );
};

export default PersonalDetails;
