import React from 'react';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import {
  Box, Grid, Divider, makeStyles,
} from '@material-ui/core';
import { useCurrentCountry } from 'utilities/market';
import { FETCH_INVOICE_QUERY } from '../queries';
import usePageTranslation from '../../../hooks/usePageTranslation';
import InvoiceHead from '../components/InvoiceHead';
import Table from '../components/Table';
import Amount from '../components/Amount';
import CustomerData from '../components/CustomerData';
import { GetCustomerInvoiceQuery, GetCustomerInvoiceQueryVariables } from '../queries/__generated__/GetCustomerInvoiceQuery';

const useStyles = makeStyles(({ breakpoints }) => ({
  container: {
    margin: '40px 20px',
    backgroundColor: '#fff',
    color: '#6e6b7b',
    padding: 40,
    boxShadow: '0 4px 24px 0 rgb(34 41 47 / 30%)',
    borderRadius: 10,
    flexDirection: 'column',
    [breakpoints.down('sm')]: {
      padding: 20,
      margin: '20px 10px',
    },
  },
  divider: {
    width: '100%',
    backgroundColor: '#ebe9f1',
  },
}));

const Invoice: React.FC = () => {
  const classes = useStyles();
  const id = parseInt(useRouter()?.query?.id as string, 10);
  const currentCountry = useCurrentCountry().name;
  const { t } = usePageTranslation('customerInvoice', 'InvoiceFooter');
  const { loading, data } = useQuery<GetCustomerInvoiceQuery, GetCustomerInvoiceQueryVariables>(
    FETCH_INVOICE_QUERY,
    {
      variables: {
        transaction_id: id,
      },
    },
  );
  return (
    <Grid className={classes.container}>
      {!loading && (
        <InvoiceHead
          id={id}
          issue_date={data.customer_invoice.issue_date}
          due_date={data.customer_invoice.end_date}
        />
      )}
      <Box mt={10} mb={10}>
        <Divider className={classes.divider} />
      </Box>
      {!loading && (
        <CustomerData
          transaction_short_id={data.customer_invoice.transaction_short_id}
          start_date={data.customer_invoice.start_date}
          end_date={data.customer_invoice.end_date}
          customer={data.customer_invoice.customer}
        />
      )}
      <Box mt={30} />
      {!loading && <Table items={data.customer_invoice.items} />}
      {!loading && <Amount customer_invoice={data.customer_invoice} />}
      {currentCountry === 'Singapore' ? t('typography1SG') : t('typography1')}
    </Grid>
  );
};

export default Invoice;
