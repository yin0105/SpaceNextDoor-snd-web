import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import chartjs from 'chart.js';
import { ChartData } from '@iftek/react-chartjs-3';

import { useRouter } from 'next/router';
import { IPaymentSchedule } from '../../hooks/usePaymentSchedule';
import DialogPaymentSchedule from './DialogPaymentSchedule';
import BarChart from './BarChart.js';
import usePageTranslation from '../../../../hooks/usePageTranslation';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '400px',
  },
  text: {
    color: '#00A0E3',
    fontSize: '10px',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
}));

interface IProps {
  hideEmbed?: boolean;
  paymentSchedule: IPaymentSchedule[]
  onGoingPrice: number;
  moveOutDateSelected: boolean;
}

const PaymentSchedule: React.FC<IProps> = ({
  paymentSchedule, hideEmbed = false, onGoingPrice, moveOutDateSelected,
}) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const { t } = usePageTranslation('checkout', 'PaymentSchedule');
  const { locale } = useRouter();
  const cancel = () => {
    setIsOpen(false);
  };

  const backgroundColor = [];
  const borderColor = [];
  const data = [];
  const labels = [];

  paymentSchedule.forEach((schedule, i) => {
    data.push(schedule.total_amount);

    if (i === 0) {
      backgroundColor.push('rgba(0, 160, 227, 0.1)');
      borderColor.push('#00A0E3');
    } else {
      backgroundColor.push('rgba(255, 216, 200, 0.5)');
      borderColor.push('#EA5B21');
    }
    if (locale === 'th') {
      labels.push([t('month'), `${i + 1}`]);
    } else if (i === 0) {
      labels.push(['1st', t('month')]);
    } else if (i === 1) {
      labels.push(['2nd', t('month')]);
    } else if (i === 2) {
      labels.push(['3rd', t('month')]);
    } else {
      labels.push([`${i + 1}th`, t('month')]);
    }
  });
  if (!moveOutDateSelected) {
    labels.push([t('onGoing'), '']);
    data.push(onGoingPrice);
  }

  const chartData: ChartData<chartjs.ChartData> = {
    labels,
    datasets: [{
      label: t('label'),
      data,
      backgroundColor,
      borderColor,
      borderRadius: 10,
      borderWidth: 2,
      borderSkipped: false,
    }],
  };

  return (
    <Box className={classes.root}>
      <Typography variant="h6" className={classes.text} onClick={() => setIsOpen(true)}>
        {t('typography')}
      </Typography>
      <DialogPaymentSchedule onCancel={cancel} isPopUpOpen={isOpen} chartData={chartData} />

      {!hideEmbed && (
        <BarChart
          chartData={chartData}
        />
      )}
    </Box>
  );
};

export default PaymentSchedule;
