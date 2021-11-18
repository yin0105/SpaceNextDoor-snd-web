import React from 'react';
import { Box, Typography } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { inject, observer } from 'mobx-react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import useStyles from '../../../styles';
import AccountStore, { ACCOUNT_STORE_KEY } from '../../../../store/AccountStore';
import Grey3Typography from '../../../../../../components/Typographies/Grey3Typography';
import MainInput from '../../../../../../components/Inputs/MainInput';
import SaveButton from '../../../../../../components/Buttons/PrimaryButton';
import WhiteButton from '../../../../../../components/Buttons/WhiteButton';
import { ProfileQuery_profile } from '../../../../../shared/queries/__generated__/ProfileQuery';
import usePageTranslation from '../../../../../../hooks/usePageTranslation';
import delayFn from '../../../../../../utilities/delay';

const useCustomStyles = makeStyles((theme:Theme) => ({
  title: {
    fontSize: '12px',
    fontWeight: 600,
    lineHeight: '38px',
    color: theme.palette.grey[200],
    marginBottom: '5px',
  },
}));

interface IProps {
  user:ProfileQuery_profile,
  accountStore?:AccountStore,
  onCancel: ()=>void;
  onSave:()=>void;
}

const Form: React.FC<IProps> = ({
  accountStore, onCancel, onSave,
}) => {
  const classes = useStyles();
  const customClasses = useCustomStyles();
  const isMobile = useMediaQuery('(max-width:600px)');
  const {
    isSuccess, errorMessage, validationErrorMessages, profile,
  } = accountStore;

  const { t } = usePageTranslation('hostAccount', 'GuestForm');

  const validateInput = (val) => {
    if (!val) {
      accountStore.setValidationMessage('fullNameErrorMessage', t('personal_errorMessage'));
    } else {
      accountStore.setValidationMessage('fullNameErrorMessage', '');
    }
  };

  const updateFirstNameHandler = (evt: { target: { value: string; }; }) => {
    validateInput(evt.target.value);
    accountStore.setFirstName(evt.target.value);
  };

  const updateLastNameHandler = (evt: { target: { value: string; }; }) => {
    validateInput(evt.target.value);
    accountStore.setLastName(evt.target.value);
  };

  const showStatusMessages = () => {
    if (isSuccess) {
      delayFn(1000, onSave);
      return (
        <Grey3Typography className={classes.successText}>
          {t('personal_successMessage')}
        </Grey3Typography>
      );
    }

    return (
      <Grey3Typography key="error_message" className={classes.errorText}>
        {errorMessage || validationErrorMessages?.fullNameErrorMessage}
      </Grey3Typography>
    );
  };

  const enableSaveOption = () => {
    if (!profile?.first_name || !profile?.last_name) {
      return (
        <SaveButton
          className={classes.saveBtn}
          id="updateUserDetails"
          disabled
        >
          {t('saveButton')}
        </SaveButton>
      );
    }

    return (
      <SaveButton
        className={classes.saveBtn}
        onClick={accountStore.updateUserDetails}
        id="updateUserDetails"
      >
        {t('saveButton')}
      </SaveButton>
    );
  };

  return (
    <div>
      {showStatusMessages()}
      <Box display="flex" flexDirection={(isMobile ? 'column' : 'row')}>
        <Box p={5}>
          <Typography variant="h6" className={customClasses.title}>
            {t('firstName')}
          </Typography>
          <MainInput
            className={classes.input}
            value={profile?.first_name || ''}
            onChange={updateFirstNameHandler}
          />
        </Box>
        <Box p={5}>
          <Typography variant="h6" className={customClasses.title}>
            {t('lastName')}
          </Typography>
          <MainInput
            className={classes.input}
            value={profile?.last_name}
            onChange={updateLastNameHandler}
          />
        </Box>
      </Box>
      <Box className={classes.container} ml={5}>
        {enableSaveOption()}
        <WhiteButton
          className={classes.cancelBtn}
          onClick={() => {
            onCancel();
          }}
          id="cancelUserDetails"
        >
          {t('whiteButton')}
        </WhiteButton>
      </Box>
    </div>
  );
};

export default inject(ACCOUNT_STORE_KEY)(observer(Form));
