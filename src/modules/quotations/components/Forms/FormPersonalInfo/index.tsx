import React, { useEffect } from 'react';
import { Box, makeStyles, Typography } from '@material-ui/core';
import usePageTranslation from 'hooks/usePageTranslation';
import { inject, observer } from 'mobx-react';
import { QuotationsStore, QUOTATIONS_STORE_KEY } from 'modules/quotations/stores/QuotationsStore';
import PhoneInput from 'modules/checkout/components/Forms/FormBookingDetails/YourDetail/PersonalInfoCard/PhoneInput';
import OneInput from 'modules/checkout/components/Forms/FormBookingDetails/YourDetail/PersonalInfoCard/OneInput';
import { useCurrentCountry } from 'utilities/market';
import Error from '../../Error';

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: '30px',
    fontWeight: 700,
    lineHeight: '35px',
    marginTop: '30px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '18px',
      lineHeight: '20px',
    },
  },
  subtitle: {
    fontSize: '16px',
    lineHeight: '20px',
    marginTop: '5px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px',
      lineHeight: '20px',
    },
  },
  fields: {
    display: 'flex',
    flexFlow: 'column',
    maxWidth: '515px',
  },
  detail: {
    margin: '0 0 30px',
    fontWeight: 600,
    fontSize: '18px',
    lineHeight: '20px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px',
    },
  },
}));

interface IProps {
  [QUOTATIONS_STORE_KEY]?: QuotationsStore
}

const FormPersonalInfo: React.FC<IProps> = ({ quotationsStore }) => {
  const {
    setQuotationDetails, quotationDetails: {
      fullName, email, phoneNumber, countryCode,
    }, error, isSuccess,
  } = quotationsStore;
  const classes = useStyles();
  const { t } = usePageTranslation('quotations', 'FormPersonalInfo');
  const country = useCurrentCountry();
  useEffect(() => {
    setQuotationDetails('countryCode', country.phoneCode);
  }, []);
  return (
    <Box paddingBottom="100px">
      <Typography className={classes.title}>{t('typography1')}</Typography>
      <Typography className={classes.subtitle}>{t('typography2')}</Typography>
      <Box minHeight="60px">
        {!isSuccess && !!error?.length && <Error text={error} />}
      </Box>
      <Box className={classes.fields}>
        <Typography className={classes.detail}>{t('typography3')}</Typography>
        <OneInput
          title={t('label1')}
          label={t('label1')}
          onChange={(e) => setQuotationDetails('fullName', e.target.value)}
          inputData={fullName}
          required
        />
        <OneInput
          title={t('label2')}
          label={t('label2Email')}
          onChange={(e) => setQuotationDetails('email', e.target.value)}
          inputData={email}
          required
        />
        <PhoneInput
          title={t('label3')}
          label="xxx xxx xxxx"
          inputData={phoneNumber}
          onChange={(e) => setQuotationDetails('phoneNumber', e.target.value)}
          countryCode={countryCode}
          handleCountryChange={(e) => setQuotationDetails('countryCode', e.target.value)}
          required
        />
      </Box>
    </Box>
  );
};

export default inject(QUOTATIONS_STORE_KEY)(observer(FormPersonalInfo));
