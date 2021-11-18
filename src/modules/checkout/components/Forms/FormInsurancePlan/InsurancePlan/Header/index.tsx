import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import Grey2Typography from '../../../../../../../components/Typographies/Grey2Typography';
import usePageTranslation from '../../../../../../../hooks/usePageTranslation';

const useStyles = makeStyles((theme) => ({
  descriptionBox: {
    lineHeight: '1.5rem',
    marginTop: '4px',
    [theme.breakpoints.up('sm')]: {
      marginTop: '-8px',
    },
  },
  descriptionText: {
    lineHeight: '1.5rem',
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.6rem',
      lineHeight: '3rem',
    },
  },
}));

const Header: React.FC = () => {
  const classes = useStyles();
  const { t } = usePageTranslation('checkout', 'InsurancePlanHeader');
  return (
    <>
      <Box mt={2} className={classes.descriptionBox}>
        <Grey2Typography variant="caption" className={classes.descriptionText}>
          {t('grey2Typography')}
        </Grey2Typography>
      </Box>
    </>
  );
};

export default Header;
