import React from 'react';
import {
  Box,
  Divider,
  makeStyles,
  Typography,
  useMediaQuery,
  Theme,
} from '@material-ui/core';
import { useRouter } from 'next/router';
import { GetCustomerInvoiceQuery_customer_invoice } from '../../queries/__generated__/GetCustomerInvoiceQuery';
import usePageTranslation from '../../../../hooks/usePageTranslation';
import PaymentSchedule from '../../../checkout/components/PaymentSchedule';
import { getTranslatedName } from '../../../../utilities/market';

const useStyles = makeStyles((theme) => ({
  spaceBetween: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  divider: {
    width: '100%',
    backgroundColor: '#ebe9f1',
  },
  container: {
    display: 'flex',
    marginLeft: 'auto',
    justifyContent: 'flex-end',
    marginTop: '40px',
    [theme.breakpoints.down('xs')]: {
      flexFlow: 'column',
    },
  },
  total: {
    display: 'flex',
    flexDirection: 'column',
    width: '330px',
    marginLeft: '50px',
    [theme.breakpoints.down('xs')]: {
      width: '180px',
      marginLeft: 'auto',
    },
  },
}));

interface IProps {
  customer_invoice: GetCustomerInvoiceQuery_customer_invoice;
}

const Amount: React.FC<IProps> = ({ customer_invoice }) => {
  const classes = useStyles();
  const { t } = usePageTranslation('customerInvoice', 'Amount');
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.only('xs'));
  const paymentSchedule = customer_invoice.payment_schedule || [];
  const { locale } = useRouter();
  let taxTitle = '';
  const taxes = customer_invoice?.applied_taxes || [];
  if (taxes.length) {
    taxTitle = `${getTranslatedName(taxes[0]?.tax, 'name', locale)} @${taxes[0].value}%`;
  }
  const taxableCharge = customer_invoice.items.reduce(
    (previousValue, currentValue) => previousValue + (currentValue.amount - currentValue.discount),
    0,
  );

  const subTotalAmount = taxableCharge + (customer_invoice.deposit_amount || 0);

  return (
    <Box className={classes.container}>
      {paymentSchedule.length > 0 && (
        <PaymentSchedule
          hideEmbed={isMobile}
          paymentSchedule={paymentSchedule}
          onGoingPrice={0}
          moveOutDateSelected
        />
      )}
      <Box className={classes.total} mt={20}>
        {customer_invoice.deposit_amount && (
          <Typography className={classes.spaceBetween}>
            <span>
              {t('span2')}
              :
            </span>
            <b>
              {customer_invoice.currency_sign}
              {customer_invoice.deposit_amount}
            </b>
          </Typography>
        )}
        <Box mt={7} mb={5}>
          <Divider className={classes.divider} />
        </Box>
        <Typography className={classes.spaceBetween}>
          <span>
            {t('span1')}
            :
          </span>
          <b>
            {customer_invoice.currency_sign}
            {subTotalAmount.toFixed(2)}
          </b>
        </Typography>
        {(customer_invoice.tax_amount > 0) && (
          <>
            <Typography className={classes.spaceBetween}>
              <span>{`${taxTitle}:`}</span>
              <b>
                {customer_invoice.currency_sign}
                {customer_invoice.tax_amount}
              </b>
            </Typography>
            <Typography className={classes.spaceBetween}>
              <span>
                {' '}
                {`${t('span6')} ${customer_invoice.currency_sign}${taxableCharge.toFixed(2)}@${taxes[0]?.value}%`}
              </span>
            </Typography>
            {customer_invoice.deposit_amount && (
              <Typography className={classes.spaceBetween}>
                <span>
                  {' '}
                  {t('span7', { vatName: getTranslatedName(taxes[0]?.tax, 'name', locale) })}
                  {' '}
                  {customer_invoice.currency_sign}
                  {customer_invoice.deposit_amount}
                </span>
              </Typography>
            )}
          </>
        )}
        <Box mt={7} mb={5}>
          <Divider className={classes.divider} />
        </Box>
        <Typography className={classes.spaceBetween}>
          <span><b>{`${t('span5')}`}</b></span>
          <b>
            {customer_invoice.currency_sign}
            {customer_invoice.total_amount.toFixed(2)}
          </b>
        </Typography>
      </Box>
    </Box>
  );
};

export default Amount;
