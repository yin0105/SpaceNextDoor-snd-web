import { Box, makeStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexFlow: 'column',
    [theme.breakpoints.down('xs')]: {
      flexFlow: 'row',
      padding: '0',
    },
  },
  card: {
    height: '171px',
    width: '329px',
    margin: '10px 0',
    border: '1px solid #E5E5E5',
    borderRadius: '22px',
    padding: '12px 20px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      width: '88vw',
      background: 'white',
      margin: '10px 5px 0',
    },
  },
  info: {
    display: 'flex',
    flexFlow: 'column',
    height: '80%',
    width: '150px',
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]: {
      width: '145px',
    },
  },
}));

const SitesListLoader = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.card}>
        <Skeleton variant="rect" width="135px" height="120px" />
        <Box className={classes.info}>
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="100%" />
        </Box>
      </Box>
    </Box>
  );
};

export default SitesListLoader;
