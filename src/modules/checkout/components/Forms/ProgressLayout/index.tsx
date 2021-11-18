import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Divider,
  IconButton,
  Typography,
} from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import clsx from 'clsx';
import React from 'react';

import Image from '../../../../../components/Image';
import WhiteTypography from '../../../../../components/Typographies/WhiteTypography';
import Buttons from '../Buttons';
import Grey3Typography from '../../../../../components/Typographies/Grey3Typography';
import { BookingStore, BOOKING_STORE } from '../../../stores/BookingStore';
import Grey2Typography from '../../../../../components/Typographies/Grey2Typography';
import usePageTranslation from '../../../../../hooks/usePageTranslation';

const useStyles = makeStyles((theme) => ({
  root: {
    marginRight: '8px',
  },
  stepCircleBox: {
    height: '24px',
    width: '24px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  greenBox: {
    backgroundColor: theme.palette.success.main,
  },
  greyBox: {
    backgroundColor: theme.palette.grey[100],
  },
  stepText: {
    position: 'relative',
    top: '1px',
    fontSize: '1rem',
    fontWeight: 600,
  },
  mainBox: {
    display: 'flex',
  },
  dividerBox: {
    display: 'flex',
    justifyContent: 'center',
    height: 'calc(100% - 48px)',
  },
  boxForDivider: {
    paddingBottom: '18px',
    [theme.breakpoints.up('sm')]: {
      paddingBottom: '6px',
    },
  },
  headerBox: {
    padding: '12px 0 20px',
    [theme.breakpoints.up('sm')]: {
      padding: '16px 0 28px',
    },
  },
  headerText: {
    fontSize: '1.4rem',
    fontWeight: 600,
    [theme.breakpoints.up('sm')]: {
      fontSize: '18px',
    },
  },
  headerTextInactive: {
    fontSize: '1.4rem',
    fontWeight: 600,
    color: theme.palette.grey[100],
    [theme.breakpoints.up('sm')]: {
      fontSize: '2.2rem',
    },
  },
  editIconButtonBox: {
    position: 'relative',
    right: '-12px',
  },
  editIconButton: {
    '& .MuiIconButton-label': {
      width: '18px',
      height: '18px',
      [theme.breakpoints.up('sm')]: {
        width: '24px',
        height: '24px',
      },
    },
  },
  infoBox: {
    marginTop: '-30px',
    marginBottom: '50px',

    '& img': {
      position: 'relative',
      top: '6px',
      marginRight: '10px',

      [theme.breakpoints.down('sm')]: {
        width: '18px',
        left: 0,
        top: 1,
        position: 'absolute',
      },
    },

    '& p': {
      [theme.breakpoints.down('sm')]: {
        position: 'relative',
        paddingLeft: '25px',
        fontSize: '0.9rem',
      },
    },
  },
  noServices: {
    margin: '0 13px 0 86px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '13px',
      marginLeft: '30px',
    },
    textTransform: 'uppercase',
    color: '#989898',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  subtitle: {
    marginTop: '26px',
    marginLeft: '-30px',
    fontSize: '16px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px',
    },
  },
  btnContinue: {
    margin: '30px 0 30px -40px !important',
  },
}));

interface IProps {
  step: number;
  title: string;
  subtitle?: string;
  btnIcon?: string;
  bookingStore?: BookingStore;
  disableBtn?: boolean;
  btnText?: string;
  setHideServices?: (hide:boolean) => void;
  hideServices?: boolean;
  isPaymentStep?: boolean;
}

const ProgressLayout: React.FC<IProps> = (props) => {
  const classes = useStyles();
  const {
    step,
    children,
    title,
    subtitle,
    bookingStore,
    disableBtn,
    btnIcon,
    btnText,
    setHideServices,
    hideServices,
    isPaymentStep,
  } = props;
  const { t } = usePageTranslation('checkout', 'ProgressLayout');

  const showButtons = () => {
    if (step === bookingStore.currentStep) {
      return bookingStore.currentStep === 1 ? (
        <Box display="flex" alignItems="center">
          <Buttons
            isLoading={bookingStore.isProcessing}
            disableBtn={disableBtn}
            icon={btnIcon}
            btnText={btnText}
            className={classes.btnContinue}
            isError={bookingStore.paymentError}
            isPaymentStep={isPaymentStep}
          />
          {!hideServices && bookingStore.serviceId !== 0 && (
            <Typography
              onClick={() => {
                setHideServices?.(true);
                bookingStore?.selectService(0, null);
              }}
              className={classes.noServices}
            >
              {t('noServices')}
            </Typography>
          )}
        </Box>
      ) : (
        <Buttons
          isLoading={bookingStore.isProcessing}
          disableBtn={disableBtn}
          icon={btnIcon}
          isPaymentStep={isPaymentStep}
          btnText={btnText}
          className={classes.btnContinue}
          isError={bookingStore.paymentError}
        />
      );
    }
    return '';
  };

  return (
    <Box className={classes.mainBox}>
      <Box className={classes.root}>
        <Box pt={6} pb={6}>
          <Box className={step <= bookingStore.currentStep
            ? clsx(classes.stepCircleBox, classes.greenBox)
            : clsx(classes.stepCircleBox, classes.greyBox)}
          >
            {step < bookingStore.currentStep
              ? <Image name="correct" folder="CheckoutPage" />
              : <WhiteTypography className={classes.stepText}>{step + 1}</WhiteTypography>}
          </Box>
        </Box>
        {step === 3 || step === bookingStore.currentStep ? ''
          : (
            <Box className={classes.dividerBox}>
              <Divider orientation="vertical" variant="fullWidth" />
            </Box>
          )}
      </Box>
      <Box width="100%">
        <Box>
          <Box display="flex" justifyContent="space-between">
            <Box className={classes.headerBox}>
              <Grey3Typography
                className={step > bookingStore.currentStep
                  ? classes.headerTextInactive
                  : classes.headerText}
              >
                {title}
              </Grey3Typography>
              {step === bookingStore.currentStep && (
              <Typography className={classes.subtitle}>{subtitle}</Typography>
              )}
            </Box>
            {step < bookingStore.currentStep && step !== 0 ? (
              <Box className={classes.editIconButtonBox}>
                <IconButton
                  className={classes.editIconButton}
                  onClick={() => {
                    setHideServices?.(false);
                    bookingStore.setCurrentStep(step);
                  }}
                >
                  <Image name="edit" folder="CheckoutPage" fullWidth />
                </IconButton>
              </Box>
            ) : ''}
          </Box>
          {step > bookingStore.currentStep ? (
            <Box className={classes.boxForDivider} pb={3} />
          ) : children}
        </Box>
        {showButtons()}

        {step === 0 && bookingStore.currentStep === 0 && (
          <Box className={classes.infoBox}>
            <Grey2Typography variant="body2">
              <Image folder="CheckoutPage" name="timer-sm" />
              {t('grey2Typography1')}
            </Grey2Typography>
            <Grey2Typography variant="body2">
              <Image folder="CheckoutPage" name="promo" />
              {t('grey2Typography2')}
            </Grey2Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default inject(BOOKING_STORE)(observer(ProgressLayout));
