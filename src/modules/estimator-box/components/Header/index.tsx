import React, { FC } from 'react';
import {
  Box, makeStyles, Typography, Divider,
} from '@material-ui/core';
import usePageTranslation from '../../../../hooks/usePageTranslation';

const useStyles = makeStyles((theme) => ({
  header: {
    padding: '0 27px',
    [theme.breakpoints.up('sm')]: {
      padding: 0,
    },
  },
  title: {
    color: '#070707',
    fontStyle: 'normal',
    [theme.breakpoints.up('md')]: {
      fontWeight: 700,
      fontSize: '30px',
      lineHeight: '35px',
    },
    fontWeight: 600,
    fontSize: '18px',
    lineHeight: '20px',
  },
  description: {
    color: '#9E9E9E',
    marginTop: '15px',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '20px',
    [theme.breakpoints.up('md')]: {
      fontWeight: 400,
      fontSize: '18px',
      lineHeight: '30px',
    },
  },
  divider: {
    margin: '25px 0',
    [theme.breakpoints.up('md')]: {
      margin: '50px 0',
    },
  },
}));

const Header: FC = () => {
  const classes = useStyles();
  const { t } = usePageTranslation('estimatorBox', 'Header');
  return (
    <Box className={classes.header}>
      <Typography variant="h1" className={classes.title}>{t('typography1')}</Typography>
      <Typography variant="h3" className={classes.description}>{t('typography2')}</Typography>
      <Divider className={classes.divider} />
    </Box>
  );
};

export default Header;
