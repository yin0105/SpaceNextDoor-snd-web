import React from 'react';
import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/styles';
import { Box, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: '50px',
  },
  loaderContainer: {
    width: '300px',
    height: '180px',
    border: `2px solid ${theme.palette.grey[50]}`,
    borderRadius: '12px',
    margin: '10px 45px 10px 0',
    padding: '25px',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '48%',
      margin: '10px 0',
      height: '297px',
    },
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'space-between',
    },
  },
  box: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexFlow: 'column',
    },
  },
  image: {
    marginTop: '-30px !important',
    width: '80px',
    height: '140px',
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto',
    },
  },
  info: {
    display: 'flex',
    flexFlow: 'column',
    hegiht: 'max-height',
    padding: '0 20px',
    [theme.breakpoints.down('sm')]: {
      padding: '0',
    },
  },
  priceLoader: {
    display: 'flex',
    justifyContent: 'space-between',
    borderTop: `2px solid ${theme.palette.grey[50]}`,
    paddingTop: '10px',
    [theme.breakpoints.down('sm')]: {
      flexFlow: 'column',
    },
  },
  text: {
    width: '470px',
    height: '40px',
    [theme.breakpoints.down('sm')]: {
      width: '250px',
      height: '30px',
      marginBottom: '40px',
    },
  },
  name: {
    width: '35px',
    height: '20px',
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto',
    },
  },
  size: {
    width: '90px',
    height: '20px',
    [theme.breakpoints.down('sm')]: {
      width: '75px',
      margin: '0 auto',
    },
  },
  details: {
    width: '130px',
    height: '20px',
    margin: '30px 0 0',
    [theme.breakpoints.down('sm')]: {
      width: '100px',
      margin: '10px auto',
    },
  },
}));

const Loader = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Skeleton variant="text" className={classes.text} />
      <Box className={classes.container}>
        {[...(new Array(4))].map((el, i) => (
          <Box key={i} className={classes.loaderContainer}>
            <Box className={classes.box}>
              <Skeleton variant="text" className={classes.image} />
              <Box className={classes.info}>
                <Skeleton variant="text" className={classes.name} />
                <Skeleton variant="text" className={classes.size} />
                <Skeleton variant="text" className={classes.details} />
              </Box>
            </Box>
            <Box className={classes.priceLoader}>
              <Skeleton variant="text" width="80px" height="20px" />
              <Skeleton variant="text" width="80px" height="20px" />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Loader;
