import { Box, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import PrimaryButton from '../../../../../components/Buttons/PrimaryButton';
import Image from '../../../../../components/Image';
import WhiteTypography from '../../../../../components/Typographies/WhiteTypography';
import usePageTranslation from '../../../../../hooks/usePageTranslation';

const PaymentProcessing = dynamic(() => import('../../../../../components/PaymentProcessing'));

const useStyles = makeStyles(() => ({
  root: {
    margin: '27px 0 43px -9px',
    display: 'flex',
    alignItems: 'center',
    '& >div:last-child': {
      marginLeft: '8px',
    },
  },
  continueButton: {
    padding: '15px 35px',
    maxWidth: '240px',
    '& img': {
      position: 'relative',
      top: '-1px',
      marginRight: '10px',
    },
  },
  continueButtonText: {
    fontSize: '1.3rem',
    fontWeight: 700,
  },
  cancelButtonText: {
    fontSize: '1.3rem',
    fontWeight: 500,
  },
  btnLoading: {
    position: 'absolute',
    left: '45px',
    top: '5px',
  },
  btnCenter: {
    justifyContent: 'center',
  },
}));

interface IProps {
  handleCancel?: () => void;
  icon?: string;
  isLoading: boolean;
  disableBtn: boolean;
  btnText?: string;
  className?: string;
  isError?: string;
  isPaymentStep?: boolean;
}

const Buttons: React.FC<IProps> = (props) => {
  const classes = useStyles();
  const { t } = usePageTranslation('checkout', 'Buttons');
  const {
    isLoading, disableBtn, btnText = t('continue'), isPaymentStep, icon, className, isError,
  } = props;
  const [showLoader, setShowLoading] = useState(false);

  useEffect(() => {
    if (!!isLoading && isPaymentStep) setShowLoading(true);
    if (isError && isPaymentStep) setShowLoading(false);
  }, [isLoading, isError]);

  return (
    <Box
      className={clsx(
        classes.root,
        btnText === t('continue') ? className : '',
        btnText === t('acceptAndPay') && classes.btnCenter,
      )}
    >
      <Box>
        <PrimaryButton disabled={isLoading || disableBtn} type="submit" className={classes.continueButton}>
          {icon && (
            <Image folder="CheckoutPage" name={icon} />
          )}
          <WhiteTypography className={classes.continueButtonText}>
            {btnText}
            {showLoader && <PaymentProcessing />}
            {!!isLoading && (
              <CircularProgress color="inherit" className={classes.btnLoading} />
            )}
          </WhiteTypography>
        </PrimaryButton>
      </Box>
    </Box>
  );
};

export default Buttons;
