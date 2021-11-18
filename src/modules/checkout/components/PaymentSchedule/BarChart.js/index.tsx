import React from 'react';
import { Box } from '@material-ui/core';
import chartjs from 'chart.js';
import { Bar, ChartData } from '@iftek/react-chartjs-3';

interface IProps {
  chartData: ChartData<chartjs.ChartData>
}

const PaymentSchedule: React.FC<IProps> = ({ chartData }) => (
  <Box className="chart">
    <Bar
      key={Date.now()}
      data={chartData}
      options={{
        maintainAspectRatio: true,
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
        },
        plugins: {
          legend: {
            onClick: (e) => {
              const click = new MouseEvent('click');
              click.stopPropagation();
            },
          },
        },
      }}
    />
  </Box>
);

export default PaymentSchedule;
