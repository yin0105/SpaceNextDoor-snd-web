import React from 'react';
import { Box } from '@material-ui/core';
import Grey2Typography from '../../../../../components/Typographies/Grey2Typography';
import Grey3Typography from '../../../../../components/Typographies/Grey3Typography';

interface IProps {
  title: string;
  price: string;
}

const Subtotal: React.FC<IProps> = (props) => {
  const { title, price } = props;

  return (
    <Box display="flex" justifyContent="space-between" mb="15px">
      <Box>
        <Grey2Typography variant="body1">
          {title}
        </Grey2Typography>
      </Box>
      <Box>
        <Grey3Typography>
          {price}
        </Grey3Typography>
      </Box>
    </Box>
  );
};

export default Subtotal;
