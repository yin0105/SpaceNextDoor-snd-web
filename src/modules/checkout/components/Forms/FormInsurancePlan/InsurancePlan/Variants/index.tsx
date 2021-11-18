import React from 'react';
import { inject, observer } from 'mobx-react';
import { useRouter } from 'next/router';
import { Box, FormControlLabel, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import OneVariant from './OneVariant';
import StyledCheckbox from '../../../../../../../components/Checkbox';
import { BookingStore, BOOKING_STORE } from '../../../../../stores/BookingStore';
import { BookingInsurancesQuery_insurances_edges } from '../../../../../queries/__generated__/BookingInsurancesQuery';
import { getTranslatedName } from '../../../../../../../utilities/market';

const useStyles = makeStyles((theme) => ({
  variantsBox: {
    maxWidth: '272px',
    margin: '24px auto 34px',
    [theme.breakpoints.up('sm')]: {
      maxWidth: '350px',
      margin: '36px auto',
    },
  },
  label: {
    color: '#333333',
    fontWeight: 400,
    fontSize: '1.2rem',
    lineHeight: '1.8rem',
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.6rem',
    },
  },
}));

interface IProps {
  variants: BookingInsurancesQuery_insurances_edges[];
  bookingStore?: BookingStore;
}

const CustomCheckbox = ({ label, value, onClick }) => {
  const classes = useStyles();
  return (
    <FormControlLabel
      onClick={onClick}
      classes={{
        label: classes.label,
      }}
      control={(
        <StyledCheckbox name="0" checked={value === 0} />
      )}
      label={label}
    />
  );
};

const Variants: React.FC<IProps> = (props) => {
  const { locale } = useRouter();
  const classes = useStyles();
  const {
    variants,
    bookingStore,
  } = props;

  // Insurance should preselect 1000$
  if (!bookingStore.insuranceId && variants.length > 0) {
    bookingStore.setInsurancePlan(variants[0].id, variants[0]);
  }

  return (
    <>
      <Box className={classes.variantsBox}>
        <Grid container spacing={6}>
          {variants.map((variant) => (
            <Grid item xs={6} key={variant.id}>
              <OneVariant
                id={variant.id}
                title={getTranslatedName(variant, 'name', locale)}
                variant={variant.covered_amount}
                value={bookingStore.insuranceId}
                currency={bookingStore.insurance.country.currency_sign}
                handleChange={() => {
                  bookingStore.setInsurancePlan(variant.id, variant);
                }}
                dayCost={variant.price_per_day}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default inject(BOOKING_STORE)(observer(Variants));
