import React from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grey3Typography from '../../../../../../components/Typographies/Grey3Typography';
import PersonalInfoCard from './PersonalInfoCard';
import usePageTranslation from '../../../../../../hooks/usePageTranslation';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '26px',
    [theme.breakpoints.up('sm')]: {
      marginTop: '46px',
    },
  },
  headerBox: {
    marginBottom: '18px',
    [theme.breakpoints.up('sm')]: {
      marginBottom: '25px',
    },
  },
  headerText: {
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.8rem',
    },
  },
}));

const YourDetail: React.FC = () => {
  const classes = useStyles();
  const { t } = usePageTranslation('checkout', 'YourDetail');
  return (
    <Box className={classes.root}>
      <Box className={classes.headerBox}>
        <Grey3Typography className={classes.headerText} variant="h5">
          {t('grey3Typography')}
        </Grey3Typography>
      </Box>
      <PersonalInfoCard />
    </Box>
  );
};

export default YourDetail;
