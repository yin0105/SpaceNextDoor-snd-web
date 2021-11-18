import { Box, makeStyles, Typography } from '@material-ui/core';
import usePageTranslation from 'hooks/usePageTranslation';
import { useRouter } from 'next/router';
import React from 'react';
import SelectPlace from './SelectPlace';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'column',
    maxWidth: '1040px',
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      paddingBottom: '100px',
    },
  },
  head: {
    display: 'flex',
    flexFlow: 'column',
    marginTop: '15px',
  },
  title: {
    fontWeight: 'bold',
    fontSize: '30px',
    lineHeight: '30px',
    margin: '15px 0',
    [theme.breakpoints.down('sm')]: {
      fontSize: '18px',
      lineHeight: '20px',
      marginTop: '5px',
    },
  },
  subtitle: {
    fontSize: '16px',
    lineHeight: '20px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px',
      lineHeight: '20px',
    },
  },
}));

const PlacesForm = () => {
  const classes = useStyles();
  const router = useRouter();
  const { t } = usePageTranslation('places', 'FormLocation');

  return (
    <Box className={classes.root}>
      <SelectPlace />
    </Box>
  );
};

export default PlacesForm;
