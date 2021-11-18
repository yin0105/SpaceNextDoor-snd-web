import {
  Box, CircularProgress, makeStyles, Typography, FormControlLabel, Link,
} from '@material-ui/core';
import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import ClevertapReact from 'clevertap-react';
import { useCurrentCountry } from 'utilities/market';
import { MainTextField } from '../../../../../components/Inputs/MainInput';
import Checkbox from '../../../../../components/Checkbox';
import PrimaryButton from '../../../../../components/Buttons/PrimaryButton';
import handleSubmit from '../../../../../utilities/handleSubmit';
import Footer from '../../Footer';
import { SEND_OTP } from '../../../../shared/queries/query';
import { SendOTPQuery, SendOTPQueryVariables } from '../../../../shared/queries/__generated__/SendOTPQuery';
import usePageTranslation from '../../../../../hooks/usePageTranslation';
import * as gtag from '../../../../../utilities/gtag';

const useStyles = makeStyles((theme) => ({
  textBox: {
    marginTop: 20,
    [theme.breakpoints.down('sm')]: {
      marginTop: 10,
    },
  },
  link: {
    textDecoration: 'underline !important',
    color: 'black',
    marginLeft: '3px',
    marginRight: '3px',
  },
  root: {
    margin: '12px 0',
  },
  helperText: {
    color: theme.palette.grey[100],
  },
  checkError: {
    color: theme.palette.error.main,
  },
  inputBox: {
    position: 'relative',
    marginTop: 25,
  },
  btnLoading: {
    position: 'absolute',
    right: '45%',
    top: 6,
  },
  input: {
    fontSize: '18px',
  },
  login: {
    marginTop: 25,
  },
  loginText: {
    color: '#FFFFFF',
    fontWeight: 700,
    fontSize: '1.3rem',
  },
}));

const FORM_ADD_EMAIL = 'FORM_ADD_EMAIL';

interface IProps {
  email: string;
  setEmail: (email: string) => void;
  setStep: (step: number) => void;
}

const FormAddEmail: React.FC<IProps> = (props) => {
  const classes = useStyles();
  const router = useRouter();
  const [term, setTerm] = useState(false);
  const [error, setError] = useState('');
  const [termError, setTermError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sendOTP] = useMutation<SendOTPQuery, SendOTPQueryVariables>(SEND_OTP);
  const termsAndPoliciesLink = 'https://help.spacenextdoor.com/hc/en-us/articles/115000814953-Terms-Of-Service';
  const privacyPolicyLink = 'https://help.spacenextdoor.com/hc/en-us/articles/115000820034-Privacy-Policy';
  const {
    email,
    setEmail,
    setStep,
  } = props;
  const { t } = usePageTranslation('login', 'AddEmail');
  const { lang } = useTranslation();
  const trackingPayload = {
    platform: 'WEB',
    country: useCurrentCountry().name,
    login_method: 'EMAIL',
    language: lang || '',
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gtag.track('sign_initiated', trackingPayload);
      ClevertapReact.event('sign_initiated', trackingPayload);
    }
  }, []);

  const verifyNumber = async () => {
    if (email?.trim() === '' || term === false) {
      if (email?.trim() === '') {
        setError(t('error'));
      }

      if (term === false) {
        setTermError(t('termError'));
      }

      return;
    }
    setIsLoading(true);
    try {
      await sendOTP({ variables: { username: email } });

      setIsLoading(false);
      setStep(1);
    } catch (e) {
      setIsLoading(false);
      setError(e.message);
    }
  };

  const handleChangeEmail = (e) => {
    setError('');
    return setEmail(e.target.value);
  };

  const handleChangeTerm = (e) => {
    setTermError('');
    return setTerm(e.target.checked);
  };

  return (
    <>
      <Box className={classes.textBox}>
        <Typography variant="body2" className={classes.helperText}>
          {t('typography1')}
        </Typography>
      </Box>
      <Box className={classes.root}>

        <form onSubmit={handleSubmit(verifyNumber, null)}>

          <>
            <Box>
              <MainTextField
                type="email"
                error={!!error.length}
                helperText={error.length ? error : ''}
                className={classes.input}
                value={email}
                onChange={handleChangeEmail}
                fullWidth
                variant="outlined"
                placeholder={t('placeholder')}
              />
            </Box>
            <Box className={classes.inputBox}>
              <FormControlLabel
                control={(
                  <Checkbox
                    className={`${classes.input}`}
                    value={term}
                    onChange={handleChangeTerm}
                    id="agree"
                  />
                )}
                label={(
                  <Typography variant="body2" className={`${termError ? classes.checkError : ''}`}>
                    {t('typography2')}
                    <Link href={termsAndPoliciesLink} target="_blank" className={classes.link}>{t('link1')}</Link>
                    {t('and')}
                    <Link href={privacyPolicyLink} target="_blank" className={classes.link}>
                      {' '}
                      {t('link2')}
                    </Link>
                    .
                  </Typography>
                )}
              />
            </Box>
            <Box>
              <PrimaryButton
                disabled={!!isLoading}
                type="submit"
                className={classes.login}
                id="loginButton"
              >
                <Box className={classes.loginText}>
                  {t('box')}
                  {!!isLoading && (
                    <CircularProgress color="inherit" className={classes.btnLoading} />
                  )}
                </Box>
              </PrimaryButton>
            </Box>
          </>
          <Box>
            <Footer />
          </Box>
        </form>

      </Box>
    </>
  );
};

export default FormAddEmail;
