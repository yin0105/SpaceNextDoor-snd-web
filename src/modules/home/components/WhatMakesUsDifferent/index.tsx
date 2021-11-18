import { Box, makeStyles } from '@material-ui/core';
import Header from './Header';
import Body from './Body';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('md')]: {
      padding: '0 200px',
    },
  },
}));

const WhatMakesUsDifferent = () => {
  const classes = useStyles();

  return (
    <Box p={12} className={classes.root}>
      <Header />
      <Body />
    </Box>
  );
};

export default WhatMakesUsDifferent;
