import React, { FC } from 'react';
import { Box, makeStyles, Typography } from '@material-ui/core';
import usePageTranslation from '../../../../hooks/usePageTranslation';

const useStyles = makeStyles((theme) => ({
  header: {
    padding: '0 30px',
    [theme.breakpoints.up('sm')]: {
      padding: 0,
    },
  },
  title: {
    color: '#070707',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '18px',
    lineHeight: '20px',
  },
  description: {
    color: '#9E9E9E',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '12px',
    lineHeight: '20px',
  },
}));

const Header: FC = () => {
  const classes = useStyles();
  const { t } = usePageTranslation('estimator', 'Header');
  return (
    <Box className={classes.header}>
      <Typography variant="h1" className={classes.title}>{t('typography1')}</Typography>
      <Typography variant="h3" className={classes.description}>{t('typography2')}</Typography>
      <Typography variant="h3" className={classes.description}>{t('typography3')}</Typography>
    </Box>
  );
};

export default Header;
