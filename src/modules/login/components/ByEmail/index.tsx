import { Box, makeStyles } from '@material-ui/core';
import React, { useMemo, useState } from 'react';

import FormAddEmail from './AddEmail';
import FormAddPIN from '../AddPIN';
import Grey3Typography from '../../../../components/Typographies/Grey3Typography';
import usePageTranslation from '../../../../hooks/usePageTranslation';

const useStyles = makeStyles((theme) => ({
  mainBox: {
    maxWidth: '600px',
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',
    padding: '25px 0',
  },
}));

const FormPhone: React.FC = () => {
  const classes = useStyles();
  const [countryCode, setCountryCode] = useState('+65');
  const [email, setEmail] = useState('');
  const [step, setStep] = useState(0);
  const [otp, setOtp] = useState('');

  const stepOne = useMemo(() => step === 0 && (
    <FormAddEmail
      email={email}
      setEmail={setEmail}
      setStep={setStep}
    />
  ), [step, countryCode, setCountryCode, email, setEmail, setStep]);

  const stepTwo = useMemo(() => step === 1 && (
    <FormAddPIN
      type="email"
      email={email}
      otp={otp}
      setOtp={setOtp}
      setStep={setStep}
    />
  ), [step, countryCode, email, otp, setOtp, setStep]);
  const { t } = usePageTranslation('login', 'ByEmail');
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
