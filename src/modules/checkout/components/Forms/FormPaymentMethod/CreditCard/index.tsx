import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CardElement } from '@stripe/react-stripe-js';
import { Box } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative',
    border: '1px solid #E9E9E9',
    padding: '14px 0 16px 13px',
    borderRadius: '15px',
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
