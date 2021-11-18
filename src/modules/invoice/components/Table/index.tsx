import React from 'react';
import {
  makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
} from '@material-ui/core';
import { GetCustomerInvoiceQuery_customer_invoice_items } from '../../queries/__generated__/GetCustomerInvoiceQuery';
import usePageTranslation from '../../../../hooks/usePageTranslation';

const useStyles = makeStyles(({ breakpoints }) => ({
  container: {
    marginLeft: -40,
    marginRight: -40,
    width: 'calc(100% + 80px)',
    boxShadow: 'unset',
    [breakpoints.down('sm')]: {
      marginLeft: -20,
      marginRight: -20,
      width: 'calc(100% + 40px)',
    },
  },
  tableHead: {
    backgroundColor: '#f3f2f7',
  },
  paddingLeft: {
    paddingLeft: 40,
    [breakpoints.down('sm')]: {
      paddingLeft: 20,
    },
  },
  paddingLeftDiscount: {
    paddingLeft: 20,
  },
  paddingRight: {
    paddingRight: 40,
    [breakpoints.down('sm')]: {
      paddingRight: 20,
    },
  },
}));

const financial = (x) => Number.parseFloat(x).toFixed(2);

interface IProps {
  items: GetCustomerInvoiceQuery_customer_invoice_items[]
}

const TableData: React.FC<IProps> = ({ items }) => {
  const classes = useStyles();
  const { t } = usePageTranslation('customerInvoice', 'Table');
  return (
    <TableContainer className={classes.container} component={Paper}>
      <Table>
        <TableHead className={classes.tableHead}>
          <TableRow>
            <TableCell className={classes.paddingLeft} align="left">{t('cell1')}</TableCell>
            <TableCell className={classes.paddingLeft} align="left">{t('cell2')}</TableCell>
            <TableCell className={classes.paddingLeft} align="left">{t('cell3')}</TableCell>
            <TableCell className={classes.paddingLeft} align="left">{t('cell4')}</TableCell>
            <TableCell className={classes.paddingRight} align="left">{t('cell5')}</TableCell>
            <TableCell className={classes.paddingRight} align="left">{t('cell6')}</TableCell>
            <TableCell className={classes.paddingRight} align="right">{t('cell7')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items?.map((row, i) => (
            <TableRow key={i}>
              <TableCell className={classes.paddingLeft} align="left">{i + 1}</TableCell>
              <TableCell className={classes.paddingLeft} align="left">{row.name}</TableCell>
              <TableCell className={classes.paddingLeft} align="left">{row.qty}</TableCell>
              <TableCell className={classes.paddingLeft} align="left">
                {row.currency_sign}
                &nbsp;
                {financial(row.amount)}

              </TableCell>
              <TableCell className={classes.paddingLeft} align="left">
                {row.currency_sign}
                &nbsp;
                {financial(row.amount * row.qty)}

              </TableCell>
              <TableCell className={classes.paddingLeftDiscount} align="left">
                {row.currency_sign}
                &nbsp;
                {financial(row.discount)}

              </TableCell>
              <TableCell className={classes.paddingLeft} align="left">
                {row.currency_sign}
                &nbsp;
                {financial(row.amount * row.qty - row.discount)}

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableData;
