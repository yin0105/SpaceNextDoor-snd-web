import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { inject, observer } from 'mobx-react';

import Grey3Typography from '../../../../../components/Typographies/Grey3Typography';
import { MainTextField } from '../../../../../components/Inputs/MainInput';
import PrimaryButton from '../../../../../components/Buttons/PrimaryButton';
import WhiteTypography from '../../../../../components/Typographies/WhiteTypography';
import { BookingStore, BOOKING_STORE } from '../../../stores/BookingStore';
import { IPromotion } from '../../../hooks/useCheckoutPrice';
import usePageTranslation from '../../../../../hooks/usePageTranslation';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '5px',
    marginBottom: '4px',
    [theme.breakpoints.up('xs')]: {
      marginBottom: '70px',
    },
  },
  inputContainer: {
    position: 'relative',
  },
  inputFiled: {
    position: 'absolute',
  },
  inputButtonContainer: {
    position: 'absolute',
    right: 0,
    width: '115px',
  },
  inputButton: {
    backgroundColor: '#333333',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '70px',
      '&.MuiButton-root': {
      },
    },
  },
  inputButtonRemove: {
    backgroundColor: theme.palette.grey[500],
  },
  inputButtonText: {
    fontWeight: 600,
    fontSize: 16,
  },
  title: {
    fontWeight: 600,
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.4rem',
    },
  },
  input: {
    fontSize: '1.2rem',
    padding: '15px 13px',
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.6rem',
    },
  },
  label: {
    fontSize: '1.2rem',
    fontWeight: 400,
    color: theme.palette.grey[100],
    transform: 'translate(9px, 16px) scale(1)',
  },
}));

interface IProps {
  [BOOKING_STORE]?: BookingStore;
  appliedPromotion: IPromotion;
  promotionError: string;
}

const PromoCodeInput: React.FC<IProps> = ({
  bookingStore: {
    bookingDetails,
    applyPromoCode,
    removePromoCode,
    setBookingDetails,
  },
  promotionError,
  appliedPromotion,
}) => {
  const classes = useStyles();
  const { promoCode: { value, errorMessage } } = bookingDetails;

  const applyCode = async () => {
    await applyPromoCode(value);
  };

  const removeCode = () => {
    removePromoCode();
  };

  const onChange = (val: string) => {
    setBookingDetails('promoCode', val);
    if (val === '') {
      removeCode();
    }
  };
  const { t } = usePageTranslation('checkout', 'PromoCode');

  return (
    <Box className={classes.root} mt="5px" mb="70px">
      <Box>

        <Grey3Typography variant="caption" className={classes.title}>
          {t('grey3Typography')}
        </Grey3Typography>
      </Box>
      <Box mt={4} className={classes.inputContainer}>
        <MainTextField
          error={!!errorMessage.length || !!promotionError}
          helperText={(errorMessage.length || promotionError) ? errorMessage || promotionError : ''}
          placeholder={t('placeholder')}
          fullWidth
          value={value}
          onChange={(e) => onChange(e.target.value)}
          variant="outlined"
          className={classes.inputFiled}
          disabled={!!appliedPromotion?.code}
          inputProps={{
            className: classes.input,
          }}
          InputLabelProps={{
            className: classes.label,
          }}
        />
        {!appliedPromotion?.code
          && (
            <Box className={classes.inputButtonContainer}>
              <PrimaryButton
                type="button"
                className={classes.inputButton}
                onClick={applyCode}
              >
                <WhiteTypography className={classes.inputButtonText}>
                  {t('whiteTypography1')}
                </WhiteTypography>
              </PrimaryButton>
            </Box>
          )}
        {!!appliedPromotion?.code
          && (
            <Box className={classes.inputButtonContainer}>
              <PrimaryButton
                disabled={false}
                type="button"
                className={classes.inputButtonRemove}
                onClick={removeCode}
              >
                <WhiteTypography className={classes.inputButtonText}>
                  {t('whiteTypography2')}
                </WhiteTypography>
              </PrimaryButton>
            </Box>
          )}
      </Box>
    </Box>
  );
};

export default inject(BOOKING_STORE)(observer(PromoCodeInput));
