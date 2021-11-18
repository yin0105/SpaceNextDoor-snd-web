import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import Variants from './Variants';
import Header from './Header';
import { BookingInsurancesQuery_insurances_edges } from '../../../../queries/__generated__/BookingInsurancesQuery';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '4px 0 22px',
    [theme.breakpoints.up('sm')]: {
      margin: '0 0 48px',
    },
  },
}));

interface IProps {
  variants: BookingInsurancesQuery_insurances_edges[];
}

const InsurancePlan: React.FC<IProps> = (props) => {
  const classes = useStyles();
  const {
    variants,
  } = props;
  return (
    <Box className={classes.root}>
      <Header />
      <Variants variants={variants} />
    </Box>
  );
};

export default InsurancePlan;
