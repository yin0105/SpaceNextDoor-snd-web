import {
  Box,
} from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grey3Typography from '../../../../../../../../components/Typographies/Grey3Typography';
import Grey2Typography from '../../../../../../../../components/Typographies/Grey2Typography';
import usePageTranslation from '../../../../../../../../hooks/usePageTranslation';

const useStyles = makeStyles((theme) => ({
  bodyTitleBox: {
    display: 'flex',
    justifyContent: 'center',
    margin: '0 40px',
    [theme.breakpoints.down('xs')]: {
      margin: '0 20px',
    },
  },
  bodyTitleText: {
    fontWeight: 500,
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      fontWeight: 600,
    },
  },
  bodyDescriptionBox: {
    display: 'flex',
    justifyContent: 'center',
    margin: '11px 0 28px',
  },
  bodyDescriptionText: {
    whiteSpace: 'pre-line',
    textAlign: 'center',
  },
}));

const BodyText: React.FC = () => {
  const classes = useStyles();
  const { t } = usePageTranslation('checkout', 'BodyText');
  return (
    <>
      <Box className={classes.bodyTitleBox}>
        <Grey3Typography variant="h3" className={classes.bodyTitleText}>
          {t('grey3Typography')}
        </Grey3Typography>
      </Box>
      <Box className={classes.bodyDescriptionBox}>
        <Grey2Typography variant="body1" className={classes.bodyDescriptionText}>
          {t('grey2Typography')}
        </Grey2Typography>
      </Box>
    </>
  );
};

export default BodyText;
