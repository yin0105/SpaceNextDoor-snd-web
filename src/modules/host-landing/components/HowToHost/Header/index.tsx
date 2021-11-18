import React, { FC } from 'react';
import { Box, makeStyles, Typography } from '@material-ui/core';
import usePageTranslation from '../../../../../hooks/usePageTranslation';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderBottom: `0.2rem solid ${theme.palette.grey[50]}`,
    paddingBottom: '5rem',
    marginBottom: '5rem',
    [theme.breakpoints.up('sm')]: {
      paddingBottom: '3.5rem',
      marginBottom: '3.5rem',
    },
  },
  secondTextBox: {
    marginTop: '2.2rem',
    textTransform: 'uppercase',
  },
}));

const Header: FC = () => {
  const classes = useStyles();
  const { t } = usePageTranslation('hostLanding', 'HowToHost');
  return (
    <Box className={classes.root}>
      <Box>
        <Typography variant="h1">
          {t('typography1')}
        </Typography>
      </Box>
      <Box className={classes.secondTextBox}>
        <Typography variant="h5">
          {t('typography2')}
        </Typography>
      </Box>
    </Box>
  );
};

export default Header;
