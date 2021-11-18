import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { CardElement } from '@stripe/react-stripe-js';
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'relative',
    border: `1px solid ${theme.palette.grey[50]}`,
    padding: '14px 0 16px 13px',
    borderRadius: '15px',
    maxWidth: '366px',
  },
}));

const CreditCard: React.FC<any> = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <CardElement
        options={{
          hidePostalCode: true,
          style: {
            base: {
              fontSize: '17px',
              color: 'rgba(0, 0, 0, 0.87)',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
    </Box>
  );
};

export default CreditCard;
