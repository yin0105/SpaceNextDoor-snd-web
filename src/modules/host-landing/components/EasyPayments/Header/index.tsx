import React, { FC } from 'react';
import {
  Box, makeStyles, Typography, withStyles,
} from '@material-ui/core';
import usePageTranslation from '../../../../../hooks/usePageTranslation';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderBottom: `0.2rem solid ${theme.palette.grey[50]}`,
    paddingBottom: '3.7rem',
    marginBottom: '4.3rem',
    [theme.breakpoints.up('md')]: {
      marginTop: '4rem',
      paddingBottom: '5.2rem',
      marginBottom: '5.2rem',
    },
  },
  secondTextBox: {
    marginTop: '2.4rem',
    textTransform: 'uppercase',
  },
}));

const Title = withStyles((theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '2.2rem',
      lineHeight: '3.5rem',
    },
  },
}),
{
  withTheme: true,
})(Typography);

const Subtitle = withStyles((theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',
      lineHeight: '18px',
    },
  },
}),
{
  withTheme: true,
})(Typography);

const Header: FC = () => {
  const classes = useStyles();
  const { t } = usePageTranslation('hostLanding', 'EasyPaymentsHeader');
  return (
    <Box className={classes.root}>
      <Box>
        <Title variant="h1">
          {t('title')}
        </Title>
      </Box>
      <Box className={classes.secondTextBox}>
        <Subtitle variant="h5">
          {t('subtitle')}
        </Subtitle>
      </Box>
    </Box>
  );
};

export default Header;
