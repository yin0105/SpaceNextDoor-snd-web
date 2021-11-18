import {
  Box, CircularProgress, InputAdornment, makeStyles, MenuItem, Typography, FormControlLabel,
} from '@material-ui/core';
import { useMutation } from '@apollo/client';
import React, { useState, useEffect } from 'react';

import ClevertapReact from 'clevertap-react';
import useTranslation from 'next-translate/useTranslation';
import { useCurrentCountry } from 'utilities/market';
import Grey2Typography from '../../../../../components/Typographies/Grey2Typography';
import { MainTextField } from '../../../../../components/Inputs/MainInput';
import Checkbox from '../../../../../components/Checkbox';
import PrimaryButton from '../../../../../components/Buttons/PrimaryButton';
import {
  SelectInput,
  CustomSelect,
  IconComponent,
} from '../../../../../components/Inputs/MainSelect';
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
  root: {
    margin: '12px 0',
  },
  helperText: {
    color: theme.palette.grey[100],
  },
  checkError: {
    color: theme.palette.error.main,
  },
  selectBox: {
    marginTop: '10px',
    position: 'relative',
  },
  selectLabelBox: {
    position: 'absolute',
    display: 'block',
    top: '18px',
    left: '13px',
    zIndex: 1,
  },
  selectLabel: {
    fontSize: '1.8rem',
  },
  hidden: {
    display: 'none',
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
  inputSelect: {
    padding: '21px 26px 17px 12px',
  },
  inputAdornment: {
    borderRight: `1px solid ${theme.palette.grey[50]}`,
    padding: '16px 5px 16px 0',
    '&>p': {
      color: theme.palette.grey[100],
      fontSize: '1.55rem',
    },
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

interface ICountryCode {
  name: string;
  dial_code: string;
  code: string;
}

interface IProps {
  countryCodes: ICountryCode[];
  countryCode: string;
  setCountryCode: (e) => void;
  phoneNumber: string;
  setPhoneNumber: (number: string) => void;
  setStep: (step: number) => void;
}

const FormAddNumber: React.FC<IProps> = (props) => {
  const classes = useStyles();
  const [term, setTerm] = useState(false);
  const [error, setError] = useState('');
  const [termError, setTermError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sendOTP] = useMutation<SendOTPQuery, SendOTPQueryVariables>(SEND_OTP);
  const { t } = usePageTranslation('login', 'AddNumber');
  const { lang } = useTranslation();
  const trackingPayload = {
    platform: 'WEB',
    country: useCurrentCountry().name,
    login_method: 'PHONE',
    language: lang || '',
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gtag.track('sign_initiated', trackingPayload);
      ClevertapReact.event('sign_initiated', trackingPayload);
    }
  }, []);

  const {
    countryCodes,
    countryCode,
    setCountryCode,
    phoneNumber,
    setPhoneNumber,
    setStep,
  } = props;

  const handleChangeSelect = (e) => {
    setCountryCode(e.target.value);
  };
  const verifyNumber = async () => {
    if (phoneNumber?.trim() === '' || term === false) {
      if (phoneNumber?.trim() === '') {
        setError(t('error'));
      }

      if (term === false) {
        setTermError(t('termError'));
      }

      return;
    }

    setIsLoading(true);
    const username = countryCode + phoneNumber;
    try {
      await sendOTP({ variables: { username } });
      setIsLoading(false);
      setStep(1);
    } catch (e) {
      setIsLoading(false);
      setError(e.message);
    }
  };

  const handleChangePhoneNumber = (e) => {
    setError('');
    const { value } = e.target;
    const validInp = /^[0-9]+$/;
    if (value !== '' && !validInp.test(value)) {
      return false;
    }
    return setPhoneNumber(value);
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
            <Box className={classes.selectBox}>
              <Box className={countryCode ? classes.hidden : classes.selectLabelBox}>
                <Grey2Typography className={classes.selectLabel}>
                  Singapore (+65)
                </Grey2Typography>
              </Box>
              <CustomSelect
                labelId="demo"
                fullWidth
                IconComponent={IconComponent}
                input={<SelectInput classes={{ input: classes.inputSelect }} />}
                value={countryCode}
                onChange={handleChangeSelect}
              >
                {countryCodes.map((item) => (
                  <MenuItem
                    key={item.name}
                    value={item.dial_code}
                  >
                    {`${item.name} (${item.dial_code})`}
                  </MenuItem>
                ))}
              </CustomSelect>
            </Box>

            <Box className={classes.inputBox}>
              <MainTextField
                error={!!error.length}
                helperText={error.length ? error : ''}
                className={classes.input}
                value={phoneNumber}
                onChange={handleChangePhoneNumber}
                fullWidth
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      className={classes.inputAdornment}
                    >
                      {countryCode}
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box className={classes.inputBox}>
              <FormControlLabel
                control={(
                  <Checkbox
                    className={classes.input}
                    value={term}
                    onChange={handleChangeTerm}
                    id="agree"
                  />
                )}
                label={<Typography variant="body2" className={`${termError ? classes.checkError : ''}`}>{t('typography2')}</Typography>}
              />
            </Box>
            <Box>
              <PrimaryButton
                disabled={isLoading}
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

export default FormAddNumber;
