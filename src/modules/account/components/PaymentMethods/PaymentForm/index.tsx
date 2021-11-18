import { Box } from '@material-ui/core';
import { useElements, useStripe, CardElement } from '@stripe/react-stripe-js';
import { makeStyles } from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react';
import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import useStyles from '../../styles';
import { UPDATE_PROFILE_MUTATION } from '../../../queries';
import { updateProfile, updateProfileVariables } from '../../../queries/__generated__/updateProfile';
import AccountStore, { ACCOUNT_STORE_KEY } from '../../../store/AccountStore';
import Grey3Typography from '../../../../../components/Typographies/Grey3Typography';
import CreditCard from '../../../../../components/CreditCard';
import SaveButton from '../../../../../components/Buttons/PrimaryButton';
import WhiteButton from '../../../../../components/Buttons/WhiteButton';
import { ProfileQuery_profile } from '../../../../shared/queries/__generated__/ProfileQuery';
import usePageTranslation from '../../../../../hooks/usePageTranslation';

const useCustomStyles = makeStyles(() => ({

  container: {
    paddingTop: '35px',
  },

}));

interface IProps {
  onCancel: () => void;
  user: ProfileQuery_profile;
  accountStore?: AccountStore;
}

const Form: React.FC<IProps> = ({ accountStore, onCancel }) => {
  const stripe = useStripe();
  const elements = useElements();
  const classes = useStyles();
  const customStyles = useCustomStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [stripeError, setStripeError] = useState<string>('');
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const [errorMessages, setErrorMessages] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      const iframeEl = (document.querySelector('.__PrivateStripeElement') as HTMLDivElement)?.childNodes[0];
      if (iframeEl instanceof HTMLIFrameElement) iframeEl.setAttribute('id', 'stripeIframe');
    }, 500);
  }, []);

  const [updateProfileMutation] = useMutation<updateProfile, updateProfileVariables>(
    UPDATE_PROFILE_MUTATION,
  );

  const updatePayment = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessages(null);
    const cardElement = elements.getElement(CardElement);

    try {
      const { error, token } = await stripe.createToken(cardElement);
      setStripeError(error?.message);
      if (!error) {
        const res = await updateProfileMutation({
          variables: {
            payload: {
              customer_card_token: token.id,
            },
          },
        });
        accountStore.getProfile();

        if (res.errors) setErrorMessages(res.errors);
        else setSuccess(true);
      } else setErrorMessages(error);
    } catch (err) {
      if (err.message) {
        setErrorMessages([{ message: err.message }]);
      }
    }
    setIsLoading(false);
  };

  const { t } = usePageTranslation('hostAccount', 'GuestForm');

  return (
    <div>
      <CreditCard />
      <Box>
        {stripeError ? (
          <Grey3Typography className={classes.errorText}>{stripeError}</Grey3Typography>
        ) : (
          Array.isArray(errorMessages) && errorMessages.map((err, i) => (
            <Grey3Typography key={`${err.message}_${i}`} className={classes.errorText}>
              {err.message}
            </Grey3Typography>
          ))
        )}
        {!stripeError && isSuccess && (
        <Grey3Typography className={classes.successText}>
          {t('successMessage')}
        </Grey3Typography>
        )}
      </Box>
      <Box className={customStyles.container}>
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
    </div>
  );
};

export default inject(ACCOUNT_STORE_KEY)(observer(Form));
