import React from 'react';
import { Box } from '@material-ui/core';
import Grey3Typography from '../../../../../components/Typographies/Grey3Typography';
import usePageTranslation from '../../../../../hooks/usePageTranslation';

interface IProps {
  price: string;
}

const Total: React.FC<IProps> = ({ price }) => {
  const { t } = usePageTranslation('checkout', 'Total');
  return (
    <Box display="flex" justifyContent="space-between" mb="5px">
      <Box>
        <Grey3Typography variant="h3">
          {t('grey3Typography')}
        </Grey3Typography>
      </Box>
      <Box>
        <Grey3Typography variant="h3">
          {price}
        </Grey3Typography>
      </Box>
    </Box>
  );
};

export default Total;
