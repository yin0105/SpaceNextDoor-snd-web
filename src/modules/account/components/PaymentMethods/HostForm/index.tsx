import { Box, FormControlLabel } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react';
import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import useStyles from '../../styles';
import AccountStore, { ACCOUNT_STORE_KEY } from '../../../store/AccountStore';
import MainInput from '../../../../../components/Inputs/MainInput';
import Grey3Typography from '../../../../../components/Typographies/Grey3Typography';
import Select from './Select';
import SaveButton from '../../../../../components/Buttons/PrimaryButton';
import WhiteButton from '../../../../../components/Buttons/WhiteButton';
import { UPDATE_PROFILE_MUTATION } from '../../../queries';
import { updateProfile, updateProfileVariables } from '../../../queries/__generated__/updateProfile';
import { ProfileQuery_profile } from '../../../../shared/queries/__generated__/ProfileQuery';
import usePageTranslation from '../../../../../hooks/usePageTranslation';

const useCustomStyles = makeStyles((theme: Theme) => ({
  container: {
    paddingTop: '20px',
    '& .MuiFormControlLabel-root': {
      width: '100%',
      margin: '0px',
      alignItems: 'flex-start',
      '& .MuiFormControlLabel-label': {
        fontSize: '12px',
        fontWeight: 600,
        lineHeight: '38px',
      },
    },
  },
  input: {
    maxWidth: '366px',
    paddingLeft: '0',
    '& .MuiInputBase-input': {
      paddingLeft: '20px',
    },
    '& .MuiInputBase-root': {
      margin: '0px ',
      '& .MuiSelect-select.MuiSelect-select': {
        padding: '15px',
      },
    },
  },
  item: {
    marginBottom: '10px',
  },
  errorText: {
    color: theme.palette.error.main,
    marginTop: '10px',
  },
}));

interface IProps {
  onCancel: () => void;
  accountStore?: AccountStore;
  user: ProfileQuery_profile;
}

const Form: React.FC<IProps> = ({ onCancel, accountStore, user }) => {
  const classes = useStyles();
  const customClasses = useCustomStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    bank_id: null,
    bank_account_number: '',
    bank_account_holder_name: '',
  });
  const [errorMessages, setErrorMessages] = useState(null);

  useEffect(() => {
    const provider: any = user?.provider || {};
    setPaymentDetails({
      bank_id: provider?.bank?.id || null,
      bank_account_number: provider?.bank_account_number || '',
      bank_account_holder_name: provider?.bank_account_holder_name || '',
    });
  }, []);

  const [updateAccount] = useMutation<updateProfile, updateProfileVariables>(
    UPDATE_PROFILE_MUTATION,
  );

  const handleChange = (name, value) => {
    const details = { ...paymentDetails };
    details[name] = value;
    setPaymentDetails(details);
  };

  const updatePayment = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessages(null);
    try {
      const res = await updateAccount({
        variables: {
          payload: {
            provider_bank: {
              bank_id: paymentDetails.bank_id,
              bank_account_number: paymentDetails.bank_account_holder_name,
              bank_account_holder_name: paymentDetails.bank_account_holder_name,
            },
          },
        },
      });
      setIsLoading(false);
      accountStore.getProfile();
      if (res.errors) {
        setErrorMessages(res.errors);
      }
    } catch (error) {
      setIsLoading(false);
      if (error.message) {
        setErrorMessages([{ message: error.message }]);
      }
    }
  };
  const { t } = usePageTranslation('hostAccount', 'HostForm');
  return (
    <div>
      <Box className={customClasses.container}>
        <Box mb={10}>
          <div className={customClasses.item}>
            <FormControlLabel
              label={t('label1')}
              labelPlacement="top"
              value={paymentDetails.bank_account_number}
              onChange={(e: any) => handleChange('bank_account_number', e.target.value)}
              control={(
                <MainInput id="bankAccountNumberInput" fullWidth className={customClasses.input} />
              )}
            />
          </div>
          <div className={customClasses.item}>
            <FormControlLabel
              className={customClasses.input}
              label={t('label2')}
              labelPlacement="top"
              value={paymentDetails.bank_id}
              control={(
                <Select
                  items={accountStore?.banks.map((item) => ({
                    label: item.name,
                    value: item.id,
                  })) || []}
                  handleChange={(e) => handleChange('bank_id', e.target.value)}
                />
              )}
            />
          </div>
          <div>
            <FormControlLabel
              label={t('label3')}
              labelPlacement="top"
              value={paymentDetails.bank_account_holder_name}
              onChange={(e: any) => handleChange('bank_account_holder_name', e.target.value)}
              control={(
                <MainInput id="bankAccountHolderNameInput" fullWidth className={customClasses.input} />
              )}
            />
          </div>
          {Array.isArray(errorMessages) && errorMessages.map((err, i) => (
            <Grey3Typography key={`${err.message}_${i}`} className={classes.errorText}>
              { err.message}
            </Grey3Typography>
          ))}
        </Box>
        <Box>
          <SaveButton
            className={classes.saveBtn}
            onClick={updatePayment}
            disabled={isLoading}
            id="savePaymentDetails"
          >
            {t('saveButton')}
          </SaveButton>
          <WhiteButton
            className={classes.cancelBtn}
            onClick={(e) => {
              e.preventDefault();
              onCancel();
            }}
            disabled={isLoading}
            id="cancelEditingPaymentDetails"
          >
            {t('whiteButton')}
          </WhiteButton>
        </Box>
      </Box>
    </div>
  );
};

export default inject(ACCOUNT_STORE_KEY)(observer(Form));
