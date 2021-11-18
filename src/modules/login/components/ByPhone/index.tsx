import { Box, makeStyles } from '@material-ui/core';
import React, { useMemo, useState } from 'react';

import FormAddNumber from './AddNumber';
import FormAddPIN from '../AddPIN';
import Grey3Typography from '../../../../components/Typographies/Grey3Typography';
import countryCodes from '../../../../shared/country-codes';
import usePageTranslation from '../../../../hooks/usePageTranslation';
import { useCurrentCountry } from '../../../../utilities/market';

const useStyles = makeStyles(() => ({
  mainBox: {
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',
    padding: '25px 0',
  },
}));

const FormPhone: React.FC = () => {
  const classes = useStyles();
  const [countryCode, setCountryCode] = useState(useCurrentCountry().phoneCode);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [step, setStep] = useState(0);
  const [otp, setOtp] = useState('');
  const stepOne = useMemo(() => step === 0 && (
    <FormAddNumber
      countryCode={countryCode}
      setCountryCode={setCountryCode}
      countryCodes={countryCodes}
      phoneNumber={phoneNumber}
      setPhoneNumber={setPhoneNumber}
      setStep={setStep}
    />
  ), [step, countryCode, setCountryCode, phoneNumber, setPhoneNumber, setStep]);

  const stepTwo = useMemo(() => step === 1 && (
    <FormAddPIN
      type="phone"
      countryCode={countryCode}
      phoneNumber={phoneNumber}
      otp={otp}
      setOtp={setOtp}
      setStep={setStep}
    />
  ), [step, countryCode, phoneNumber, otp, setOtp, setStep]);
  const { t } = usePageTranslation('login', 'ByPhone');
  return (
    <Box className={classes.mainBox}>
      <Box>
        <Box>
          <Grey3Typography variant="h3">
            {t('grey3Typography')}
          </Grey3Typography>
        </Box>
      </Box>
      {stepOne}
      {stepTwo}
    </Box>
  );
};

export default FormPhone;
