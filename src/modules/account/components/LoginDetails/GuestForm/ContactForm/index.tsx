import React from 'react';
import { Box, Typography } from '@material-ui/core';
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

interface IProps {
  user:ProfileQuery_profile,
  accountStore?:AccountStore,
  onCancel: ()=>void;
  onSave:()=>void;
}

const useCustomStyles = makeStyles((theme:Theme) => ({
  title: {
    fontSize: '12px',
    fontWeight: 600,
    lineHeight: '38px',
    color: theme.palette.grey[200],
    marginBottom: '5px',
  },
}));

const Form: React.FC<IProps> = ({
  accountStore, onCancel, onSave,
}) => {
  const classes = useStyles();
  const customClasses = useCustomStyles();
  const { profile, isSuccess, errorMessage } = accountStore;
  const { t } = usePageTranslation('hostAccount', 'GuestForm');

  const updateEmailHandler = (evt: { target: { value: string; }; }) => {
    accountStore.setEmail(evt.target.value);
  };

  const showStatusMessages = () => {
    if (isSuccess) {
      delayFn(1000, onSave);
      return (
        <Grey3Typography className={classes.successText}>
          {t('logindetails_successMessage')}
        </Grey3Typography>
      );
    }
    return (
      <Grey3Typography key="error_message" className={classes.errorText}>
        {errorMessage || ''}
      </Grey3Typography>
    );
  };

  return (
    <div>
      <Box p={5}>
        {showStatusMessages()}
        <Typography variant="h6" className={customClasses.title}>
          {t('email')}
        </Typography>
        <MainInput
          className={classes.input}
          value={profile?.email || ''}
          onChange={updateEmailHandler}
        />
      </Box>
      <Box className={classes.container} ml={5} mb={10}>
        <SaveButton
          className={classes.saveBtn}
          onClick={accountStore.updateUserDetails}
          id="updateUserDetails"
        >
          {t('saveButton')}
        </SaveButton>
        <WhiteButton
          className={classes.cancelBtn}
          onClick={(e) => {
            e.preventDefault();
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
