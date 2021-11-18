import { Box, makeStyles, Typography } from '@material-ui/core';
import usePageTranslation from '../../../../../hooks/usePageTranslation';

const useStyles = makeStyles((theme) => ({
  header: {
    [theme.breakpoints.up('md')]: {
      fontSize: '34px',
      marginBottom: '55px',
    },
  },
}));

const Header = () => {
  const classes = useStyles();
  const { t } = usePageTranslation('home', 'WhatMakesUsDiffHeader');
  return (
    <Box width="100%" pt={5} pb={10}>
      <Typography variant="h3" className={classes.header}>
        {t('typography')}
      </Typography>
    </Box>
  );
};

export default Header;
