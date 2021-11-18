import { Box, makeStyles, CircularProgress } from '@material-ui/core';
import clsx from 'clsx';
import { PrimaryButton, TextButton } from 'components/Buttons';
import usePageTranslation from 'hooks/usePageTranslation';
import { inject, observer } from 'mobx-react';
import {
  QuotationsStore,
  QUOTATIONS_STORE_KEY,
} from 'modules/quotations/stores/QuotationsStore';
import React from 'react';
import { isValidEmail } from 'utilities/bookingValidation';
import { isValidPhoneNumber } from 'libphonenumber-js';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100vw',
    background: 'white',
    position: 'fixed',
    bottom: 0,
    boxShadow: `0px -5px 10px 0px ${theme.palette.grey[50]}`,
  },
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '80px',
    maxWidth: '1040px',
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      padding: '0 15px',
    },
  },
  button: {
    width: '140px',
    height: '50px',
    fontSize: 13,
    fontWeight: 600,
  },
  textButton: {
    marginLeft: '-41px',
    color: theme.palette.primary.main,
    '&:hover': {
      background: 'initial',
    },
  },
  primaryButton: {
    color: 'white',
  },
  loading: {
    position: 'absolute',
    left: '90px',
    top: '5px',
    width: '25px',
  },
}));

interface IProps {
  containerFooter: string;
  rootFooter: string;
  textButtonBack: string;
  buttonBack: string;
  [QUOTATIONS_STORE_KEY]?: QuotationsStore;
}

const Footer: React.FC<IProps> = ({
  quotationsStore, containerFooter, rootFooter, textButtonBack, buttonBack,
}) => {
  const classes = useStyles();
  const { t } = usePageTranslation('quotations', 'Footer');
  const {
    currentStep,
    setCurrentStep,
    showEstimator,
    setShowEstimator,
    totalSteps,
    setQuotationDetails,
    quotationDetails: {
      spaceTypeId,
      fullName,
      email,
      phoneNumber,
      countryCode,
    },
    createQuotation,
    isLoading,
    error,
    setError,
    spaceTypes,
    promotionError,
  } = quotationsStore;

  const handleSteps = (order: -1 | 1) => {
    if (order === -1) {
      setError('');
    }
    if (showEstimator) {
      setShowEstimator(false);
    } else if (currentStep === 1 && order === -1) {
      window.history.back();
    } else if (currentStep <= totalSteps && order === -1) {
      setCurrentStep(currentStep + order);
    } else if (currentStep < totalSteps) {
      setCurrentStep(currentStep + order);
    }
  };
  const checkDisabled = (): boolean => {
    if (isLoading || error?.length) return true;
    switch (currentStep) {
      case 1:
        return !spaceTypes.length;
      case 2:
        return !spaceTypeId;
      case 3:
        return !!promotionError;
      case 4:
        return (
          !fullName.value.length
          || !email.value.length
          || !phoneNumber.value.length
        );
      default:
        return false;
    }
  };
  const validate = () => {
    const phone = `${countryCode}${(phoneNumber.value || '').replaceAll(
      ' ',
      '',
    )}`;
    if (currentStep !== totalSteps) {
      return true;
    }
    if (!fullName.value && !email.value && !phoneNumber.value) {
      return false;
    }
    if (fullName.value.length < 3) {
      setQuotationDetails('fullName', fullName.value, 'invalidFullName');
      return false;
    }

    if (!isValidEmail(email.value)) {
      setQuotationDetails('email', email.value, 'invalidEmail');
      return false;
    }

    if (!isValidPhoneNumber(phone)) {
      setQuotationDetails(
        'phoneNumber',
        phoneNumber.value,
        'invalidPhoneNumber',
      );
      return false;
    }
    return true;
  };

  return (
    <Box className={containerFooter || classes.container}>
      <Box className={rootFooter || classes.root}>
        <TextButton
          className={clsx(buttonBack || classes.button, textButtonBack || classes.textButton)}
          onClick={() => handleSteps(-1)}
        >
          {t('textButton')}
        </TextButton>
        <PrimaryButton
          className={clsx(classes.button, classes.primaryButton)}
          onClick={async () => {
            if (validate()) {
              await createQuotation();
              handleSteps(1);
            }
          }}
          disabled={checkDisabled()}
        >
          {/* eslint-disable-next-line */}
          {showEstimator ? t('estimate') : currentStep === totalSteps ? t('getQuote') : t('primaryButton')}
          {isLoading && <CircularProgress color="inherit" className={classes.loading} />}
        </PrimaryButton>
      </Box>
    </Box>
  );
};

export default inject(QUOTATIONS_STORE_KEY)(observer(Footer));
