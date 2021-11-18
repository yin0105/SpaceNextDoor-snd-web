import { Box, makeStyles } from '@material-ui/core';
import React, { useMemo, useState } from 'react';

import FormAddNumber from './FormAddNumber';
import FormAddPIN from './FormAddPIN';
import FormNumberAdded from './FormNumberAdded';
import Grey3Typography from '../../../../../../components/Typographies/Grey3Typography';
import countryCodes from '../../../../../../shared/country-codes';
import usePageTranslation from '../../../../../../hooks/usePageTranslation';
import { useCurrentCountry } from '../../../../../../utilities/market';

const useStyles = makeStyles((theme) => ({
  mainBox: {
    maxWidth: '600px',
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',
    padding: '100px 20px',
    [theme.breakpoints.down('sm')]: {
      padding: '20px',
    },
  },
  paddingRight: {
    paddingRight: '150px',
    [theme.breakpoints.down('sm')]: {
      paddingRight: '0',
    },
  },
}));

interface IProps {
  step: number;
  changeStep: (move) => void;
}

const FormPhone: React.FC<IProps> = ({ changeStep }) => {
  const classes = useStyles();
  const [currentStep, setCurrentStep] = useState(0);
  const [basement, setBasement] = useState(useCurrentCountry().phoneCode);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pin, setPin] = useState({
    pin1: '',
    pin2: '',
    pin3: '',
    pin4: '',
    pin5: '',
    pin6: '',
  });
  const { t } = usePageTranslation('hostOnBoarding', 'FormPhone');
  const changeLocalStep = (str: string) => {
    if (str === 'next') {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

  const stepZero = useMemo(() => currentStep === 0 && (
    <FormAddNumber
      basement={basement}
      setBasement={setBasement}
      countryCodes={countryCodes}
      phoneNumber={phoneNumber}
      setPhoneNumber={setPhoneNumber}
      changeStep={changeLocalStep}
      currentStep={currentStep}
    />
  ), [currentStep, basement, setBasement, phoneNumber, setPhoneNumber, changeStep]);

  const stepFirst = useMemo(() => currentStep === 1 && (
    <FormAddPIN
      basement={basement}
      phoneNumber={phoneNumber}
      pin={pin}
      setPin={setPin}
      changeStep={changeLocalStep}
    />
  ), [currentStep, phoneNumber, pin, setPin, changeStep]);

  const stepSecond = useMemo(() => currentStep === 2 && (
    <FormNumberAdded
      basement={basement}
      phoneNumber={phoneNumber}
      changeStep={(direc: string) => {
        if (direc === 'prev') {
          changeLocalStep(direc);
        } else {
          changeStep(direc);
        }
      }}
    />
  ), [currentStep, phoneNumber, changeStep]);

  return (
    <Box className={classes.mainBox}>
      <Box className={classes.paddingRight}>
        <Box>
          <Grey3Typography variant="h1">
            {t('grey3Typography')}
          </Grey3Typography>
        </Box>
      </Box>
      {stepZero}
      {stepFirst}
      {stepSecond}
    </Box>
  );
};

export default FormPhone;
