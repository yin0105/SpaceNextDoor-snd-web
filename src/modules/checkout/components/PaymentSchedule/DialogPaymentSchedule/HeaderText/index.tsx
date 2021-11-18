import { Box, makeStyles } from '@material-ui/core';
import usePageTranslation from 'hooks/usePageTranslation';
import React from 'react';

import Grey2Typography from '../../../../../../components/Typographies/Grey2Typography';
import Grey3Typography from '../../../../../../components/Typographies/Grey3Typography';

const useStyle = makeStyles((theme) => ({
  title: {
    marginBottom: 10,
  },
}));

const HeaderText: React.FC = () => {
  const classes = useStyle();
  const { t } = usePageTranslation('checkout', 'PaymentScheduleHeaderText');
  return (
    <Box>
      <Grey3Typography variant="h3" className={classes.title}>
        {t('grey3Typography')}
      </Grey3Typography>
      <Grey2Typography variant="body2">
        {t('grey2Typography')}
      </Grey2Typography>
    </Box>
  );
};

export default HeaderText;
