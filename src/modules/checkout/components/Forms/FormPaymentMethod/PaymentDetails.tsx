import React from 'react';
import { Box } from '@material-ui/core';
import CreditCard from './CreditCard';
import PaymentError from './PaymentError';
import SiteAgreement from '../../SiteAgreement';

const PaymentDetails: React.FC = () => (
  <Box mt={-4} marginLeft="-30px">
    <CreditCard />
    <PaymentError />
    <SiteAgreement />
  </Box>
);

export default PaymentDetails;
