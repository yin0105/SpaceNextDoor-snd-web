import React, { FC } from 'react';
import { Box, makeStyles, Typography } from '@material-ui/core';
import Items from 'modules/detail/components/HowItWorks/Items';
import usePageTranslation from '../../../../hooks/usePageTranslation';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '25px 25px 70px',
    background: '#E9E9E988',
    [theme.breakpoints.up('md')]: {
      padding: '55px 200px 70px',
    },
  },
  headerBox: {
    marginBottom: '25px',
    [theme.breakpoints.up('md')]: {
      marginBottom: '45px',
    },
  },
  header: {
    [theme.breakpoints.up('md')]: {
      fontSize: '34px',
    },
  },
}));

const HowItWorks: FC = () => {
  const classes = useStyles();
  const { t } = usePageTranslation('home', 'HowItWorks');
  return (
    <Box className={classes.root}>
      <Box className={classes.headerBox}>
        <Typography variant="h2" className={classes.header}>
          {t('h2')}
        </Typography>
      </Box>
      <Items />
    </Box>
  );
};

export default HowItWorks;
