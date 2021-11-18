import React from 'react';
import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/styles';
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '20px',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  allDistricts: {
    margin: '40px 0 20px',
    width: '80px',
    height: '20px',
  },
  loader: {
    width: '33%',
    margin: '0 0 10px',
  },
}));

const Loader = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Skeleton variant="text" className={classes.loader} />
      <Skeleton variant="text" className={classes.allDistricts} />
      <Box className={classes.container}>
        {[...(new Array(15))].map((el, i) => (
          <Box key={i} className={classes.loader}>
            <Skeleton variant="text" width="80px" height="20px" />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Loader;
