import {
  Box, makeStyles, Typography,
} from '@material-ui/core';
import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';

import { useRouter } from 'next/router';
import Grey2Typography from '../../../../../../../components/Typographies/Grey2Typography';
import PrimaryTypography from '../../../../../../../components/Typographies/PrimaryTypography';
import Buttons from '../../Buttons';
import handleSubmit from '../../../../../../../utilities/handleSubmit';
import InputsPIN from './Inputs';
import Info from './Info';
import ErrorTypography from '../../../../../../../components/Typographies/ErrorTypography';
import { LOGIN, SEND_OTP } from '../../../../../../shared/queries/query';
import { LoginQuery, LoginQueryVariables } from '../../../../../../shared/queries/__generated__/LoginQuery';
import { SendOTPQuery, SendOTPQueryVariables } from '../../../../../../shared/queries/__generated__/SendOTPQuery';
import useTimer from '../../../../../../login/hooks/useTimer';
import HostOnboardingStore, { ONBOARDING_STORE } from '../../../../../stores/HostOnboardingStore';
import AuthStore, { AUTH_STORE_KEY } from '../../../../../../app/stores/AuthStore';
import usePageTranslation from '../../../../../../../hooks/usePageTranslation';

const useStyles = makeStyles((theme) => ({

  textBox: {
    marginTop: '56px',
    [theme.breakpoints.down('sm')]: {
      marginTop: '10px',
    },
  },
  text: {
    fontSize: '1.6rem',
    color: '#948EA2',
  },

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
}));

interface IPin {
  pin1: string;
  pin2: string;
  pin3: string;
  pin4: string;
  pin5: string;
  pin6: string;
}

interface IProps {
  store?: HostOnboardingStore;
  auth?: AuthStore;
  phoneNumber: string;
  basement: string;
  pin: IPin;
  setPin: (pin) => void;
  changeStep: (move: string) => void
}

const FormAddPIN: React.FC<IProps> = (props) => {
  const classes = useStyles();
  const [error, setError] = useState('');
  const [seconds, setSeconds] = useTimer(60);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [login] = useMutation<LoginQuery, LoginQueryVariables>(LOGIN);
  const [sendOTP] = useMutation<SendOTPQuery, SendOTPQueryVariables>(SEND_OTP);
  const {
    basement, phoneNumber, pin, setPin, changeStep, auth,
  } = props;
  const { t } = usePageTranslation('hostOnBoarding', 'Inputs');
  const sendAgain = async () => {
    const username = basement + phoneNumber;
    try {
      await sendOTP({ variables: { username } });
    } catch (e) {
      setIsLoading(false);
      return setError(e.message);
    }
    setSeconds(60);
    setError('');
    return '';
  };

  const handleChangePIN = (e) => {
    setError('');
    const { maxLength, value, name } = e.target;
    if (value !== '' && !/[0-9]/.test(value)) {
      return false;
    }
    const fieldIndex = name.split('-')[1];
    if (value.length >= maxLength) {
      if (parseInt(fieldIndex, 10) < 6) {
        const nextSibling: HTMLElement = document.querySelector(
          `input[name=pin-${parseInt(fieldIndex, 10) + 1}]`,
        );
        if (nextSibling !== null) {
          nextSibling.focus();
        }
      }
    } else if (parseInt(fieldIndex, 10) > 1) {
      const previousSibling: HTMLElement = document.querySelector(
        `input[name=pin-${parseInt(fieldIndex, 10) - 1}]`,
      );
      if (previousSibling !== null) {
        previousSibling.focus();
      }
    }
    return setPin({
      ...pin,
      [`pin${fieldIndex}`]: value,
    });
  };

  const nextStep = async () => {
    setIsLoading(true);
    if (!pin.pin1 || !pin.pin2 || !pin.pin3 || !pin.pin4 || !pin.pin5 || !pin.pin6) {
      setIsLoading(false);
      return false;
    }
    const username = basement + phoneNumber;
    const otp = pin.pin1 + pin.pin2 + pin.pin3 + pin.pin4 + pin.pin5 + pin.pin6;
    try {
      const res = await login({
        variables: {
          username,
          otp,
          preferredLanguage: router.locale,
        },
      });
      const { data } = res;
      await auth.setToken(data?.login?.access_token, data?.login?.refresh_token);
    } catch (e) {
      setIsLoading(false);
      return setError(e.message);
    }
    setIsLoading(false);
    return changeStep('next');
  };

  return (
    <>
      <Box className={classes.textBox}>
        <Typography variant="body2" className={classes.text}>
          {t('body2')}
        </Typography>
      </Box>
      <Box className={classes.root}>
        <form onSubmit={handleSubmit(nextStep, null)}>

          <Info
            phoneNumber={phoneNumber}
            basement={basement}
            changeStep={changeStep}
            seconds={seconds}
          />
          <InputsPIN error={error} pin={pin} handleChangePIN={handleChangePIN} />
          {error ? <Box mt={4}><ErrorTypography>{error}</ErrorTypography></Box> : ''}

          <Box className={seconds ? classes.hidden : classes.sendAgain}>
            <Grey2Typography>
              {t('grey2Typography')}
            </Grey2Typography>
            <PrimaryTypography onClick={sendAgain}>{t('primaryTypography')}</PrimaryTypography>
          </Box>

          <Buttons
            disabled={!pin.pin1 || !pin.pin2 || !pin.pin3 || !pin.pin4 || !pin.pin5 || !pin.pin6}
            isLoading={isLoading}
            changeStep={changeStep}
          />

        </form>

      </Box>
    </>
  );
};

export default inject(ONBOARDING_STORE, AUTH_STORE_KEY)(observer(FormAddPIN));
