import {
  Box, makeStyles, CircularProgress,
} from '@material-ui/core';
import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { inject } from 'mobx-react';
import ClevertapReact from 'clevertap-react';
import useTranslation from 'next-translate/useTranslation';
import { useCurrentCountry } from 'utilities/market';
import Grey2Typography from '../../../../components/Typographies/Grey2Typography';
import PrimaryTypography from '../../../../components/Typographies/PrimaryTypography';
import handleSubmit from '../../../../utilities/handleSubmit';
import OTPInput from './OTPInput';
import Info from './Info';
import ErrorTypography from '../../../../components/Typographies/ErrorTypography';
import PrimaryButton from '../../../../components/Buttons/PrimaryButton';
import { LOGIN, SEND_OTP } from '../../../shared/queries/query';
import { LoginQuery, LoginQueryVariables } from '../../../shared/queries/__generated__/LoginQuery';
import { SendOTPQuery, SendOTPQueryVariables } from '../../../shared/queries/__generated__/SendOTPQuery';
import AuthStore, { AUTH_STORE_KEY } from '../../../app/stores/AuthStore';
import useTimer from '../../hooks/useTimer';
import * as gtag from '../../../../utilities/gtag';
import usePageTranslation from '../../../../hooks/usePageTranslation';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '12px 0',
    [theme.breakpoints.down('sm')]: {
      margin: '0',
    },
  },
  hidden: {
    display: 'none',
  },
  sendAgain: {
    display: 'flex',
    marginTop: '28px',
    '& :last-child': {
      marginLeft: '6px',
      cursor: 'pointer',
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  verify: {
    marginTop: 25,
  },
  verifyText: {
    color: '#FFFFFF',
    fontWeight: 700,
    fontSize: '1.3rem',
  },
  notValidForm: {
    opacity: 0.2,
  },
  btnLoading: {
    position: 'absolute',
    right: '45%',
    top: 6,
  },
}));

interface IProps {
  type: string;
  email?: string;
  phoneNumber?: string;
  countryCode?: string;
  otp: string;
  setOtp: (otp) => void;
  setStep: (step: number) => void;
  auth?: AuthStore;
}

const FormAddPIN: React.FC<IProps> = (props) => {
  // const authStore = new AuthStore();
  const classes = useStyles();
  const router = useRouter();
  const [seconds, setSeconds] = useTimer(60);
  const [error, setError] = useState('');
  const { lang } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [login] = useMutation<LoginQuery, LoginQueryVariables>(LOGIN);
  const [sendOTP] = useMutation<SendOTPQuery, SendOTPQueryVariables>(SEND_OTP);
  const {
    type, email, countryCode, phoneNumber, otp, setOtp, setStep, auth: authStore,
  } = props;
  const currentCountry = useCurrentCountry().name;
  const sendAgain = async (): Promise<void> => {
    const username = email || countryCode + phoneNumber;
    try {
      await sendOTP({ variables: { username } });
    } catch (e) {
      setIsLoading(false);
      return setError(e.message);
    }
    setSeconds(60);
    return setError('');
  };

  const handleOTPChange = (OTP: string) => {
    setError('');
    return setOtp(OTP);
  };

  const isValidForm = (): boolean => {
    if (otp.length !== 6) {
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    setIsLoading(true);
    if (!isValidForm()) {
      setIsLoading(false);
      return false;
    }
    const username = email || countryCode + phoneNumber;

    try {
      const { data } = await login({
        variables: { username, otp, preferredLanguage: router.locale },
      });
      await authStore.setToken(data.login.access_token, data.login.refresh_token);
      setIsLoading(false);

      const trackingPayload = {
        email: authStore.profile?.email,
        phone: authStore.profile?.phone_number,
        name: authStore.profile?.first_name,
        platform: 'WEB',
        language: lang,
        country: currentCountry,
      };

      gtag.track('sign_success', trackingPayload);
      ClevertapReact.event('sign_success', trackingPayload);

      return await router.push('/');
    } catch (e) {
      setIsLoading(false);
      return setError(e.message);
    }
  };
  const { t } = usePageTranslation('login', 'AddPIN');
  return (
    <>
      <Box className={classes.root}>
        <form onSubmit={handleSubmit(handleLogin, null)}>
          <Info
            type={type}
            email={email}
            phoneNumber={phoneNumber}
            countryCode={countryCode}
            setStep={setStep}
            seconds={seconds}
          />
          <OTPInput
            error={!!error}
            otp={otp}
            handleOTPChange={handleOTPChange}
          />
          {error ? <Box mt={4}><ErrorTypography>{error}</ErrorTypography></Box> : ''}

          <Box className={seconds ? classes.hidden : classes.sendAgain}>
            <Grey2Typography variant="body2">
              {t('grey2Typography')}
            </Grey2Typography>
            <PrimaryTypography onClick={sendAgain}>{t('primaryTypography')}</PrimaryTypography>
          </Box>

          <Box>
            <PrimaryButton
              disabled={isLoading}
              type="submit"
              id="verifyOTP"
              className={`${classes.verify} ${isValidForm() === false ? classes.notValidForm : ''}`}
            >
              <Box className={`${classes.verifyText}`}>
                {t('box')}
                {!!isLoading && (
                  <CircularProgress color="inherit" className={classes.btnLoading} />
                )}
              </Box>
            </PrimaryButton>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default inject(AUTH_STORE_KEY)(FormAddPIN);
