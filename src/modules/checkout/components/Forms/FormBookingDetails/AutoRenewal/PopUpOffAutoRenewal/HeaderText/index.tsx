import { Box } from '@material-ui/core';
import React from 'react';
import Grey3Typography from '../../../../../../../../components/Typographies/Grey3Typography';
import usePageTranslation from '../../../../../../../../hooks/usePageTranslation';

const HeaderText: React.FC = () => {
  const { t } = usePageTranslation('checkout', 'HeaderText');
  return (
    <Box>
      <Grey3Typography variant="h3">
        {t('grey3Typography')}
      </Grey3Typography>
    </Box>
  );
};

export default HeaderText;
