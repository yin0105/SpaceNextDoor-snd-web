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
  },
  headerBox: {},
  header: {
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      width: '43.3rem',
    },
  },
  descriptionBox: {
    textAlign: 'center',
    marginTop: '2rem',
    width: '32rem',
    [theme.breakpoints.up('md')]: {
      marginTop: '1.5rem',
      width: '44.5rem',
    },
  },
}));

const Title = withStyles(
  (theme) => ({
    root: {
      fontSize: '2.2000rem',
      lineHeight: '3.0000rem',
      [theme.breakpoints.up('md')]: {
        fontSize: '3.0000rem',
        lineHeight: '3.5000rem',
      },
    },
  }),
  {
    withTheme: true,
  },
)(Typography);

const SubTitle = withStyles(
  (theme) => ({
    root: {
      fontSize: '14px',
      lineHeight: '20px',
      [theme.breakpoints.up('md')]: {
        fontSize: '14px',
        lineHeight: '25px',
      },
    },
  }),
  {
    withTheme: true,
  },
)(Typography);

const Info: FC = () => {
  const classes = useStyles();
  const { t } = usePageTranslation('hostLanding', 'Info');
  return (
    <Box className={classes.root}>
      <Box className={classes.headerBox}>
        <Title className={classes.header} variant="h1">
          {t('title')}
        </Title>
      </Box>
      <Box className={classes.descriptionBox}>
        <SubTitle variant="body1">
          {t('subtitle')}
        </SubTitle>
      </Box>
    </Box>
  );
};

export default Info;
