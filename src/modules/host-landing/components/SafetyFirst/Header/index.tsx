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
    borderBottom: '0.2000rem solid #E9E9E9',
    paddingBottom: '3.5000rem',
    marginBottom: '3.5000rem',
    [theme.breakpoints.up('md')]: {
      alignItems: 'start',
      paddingBottom: '5.0000rem',
      marginBottom: '5.0000rem',
    },
  },
  secondTextBox: {
    marginTop: '2.2000rem',
    textTransform: 'uppercase',
    '& .MuiTypography-root': { fontWeight: '60.0000rem' },
  },
}));

const Title = withStyles((theme) => ({
  root: {
    fontSize: '2.2rem',
    lineHeight: '3.5rem',
    [theme.breakpoints.up('md')]: {
      fontSize: '3rem',
      lineHeight: '3.5rem',
    },
  },
}),
{
  withTheme: true,
})(Typography);

const Subtitle = withStyles((theme) => ({
  root: {
    fontSize: '12px',
    lineHeight: '18px',
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      fontSize: '13px',
      lineHeight: '19.5px',
    },
  },
}),
{
  withTheme: true,
})(Typography);

const Header: FC = () => {
  const classes = useStyles();
  const { t } = usePageTranslation('hostLanding', 'SafetyFirstHeader');
  return (
    <Box className={classes.root}>
      <Box>
        <Title variant="h1">
          {t('title')}
        </Title>
      </Box>
      <Box className={classes.secondTextBox}>
        <Subtitle>
          {t('subtitle')}
        </Subtitle>
      </Box>
    </Box>
  );
};

export default Header;
