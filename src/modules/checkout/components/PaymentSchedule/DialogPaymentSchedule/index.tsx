import {
  Box,
  Dialog,
  IconButton,
} from '@material-ui/core';
import React from 'react';
import chartjs from 'chart.js';
import { ChartData } from '@iftek/react-chartjs-3';
import { makeStyles } from '@material-ui/core/styles';

import Image from '../../../../../components/Image';
import HeaderText from './HeaderText';
import BarChart from '../BarChart.js';

const useStyles = makeStyles((theme) => ({
  paper: {
    borderRadius: '15px',
    margin: '5px',
  },
  headerBox: {
    padding: '20px 26px 7px 38px',
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'flex-end',
      padding: '20px',
    },
  },
  bodyBox: {
    padding: '23px 43px 33px',
    [theme.breakpoints.up('md')]: {
      padding: '0 20px 29px',
      width: 800,
      height: 500,
    },
    [theme.breakpoints.down('sm')]: {
      padding: '0 5px 10px',
      width: '99%',
      height: 230,
    },
  },
}));

interface IProps {
  isPopUpOpen: boolean;
  onCancel: () => void;
  chartData: ChartData<chartjs.ChartData>
}

const DialogPaymentSchedule: React.FC<IProps> = (props) => {
  const classes = useStyles();
  const { isPopUpOpen, onCancel, chartData } = props;

  return (
    <Dialog
      open={isPopUpOpen}
      onClose={onCancel}
      maxWidth="xl"
      PaperProps={{
        className: classes.paper,
      }}
    >
      <Box className={classes.headerBox}>
        <HeaderText />
        <Box>
          <IconButton onClick={onCancel}>
            <Image name="close" />
          </IconButton>
        </Box>
      </Box>
      <Box className={classes.bodyBox}>
        <BarChart chartData={chartData} />
      </Box>
    </Dialog>
  );
};

export default DialogPaymentSchedule;
