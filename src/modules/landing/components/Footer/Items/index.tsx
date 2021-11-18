import { Box, Grid, makeStyles } from '@material-ui/core';

import OneItem from './OneItem';

const info = [
  {
    title: 'List for free',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor Lorem ipsum dolor sit amet, '
      + 'consectetur adipiscing elit, sed do eiusmod tempor Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ',
  },
  {
    title: 'Respond to renters',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor Lorem ipsum dolor sit amet, '
      + 'consectetur adipiscing elit, sed do eiusmod tempor Lorem ipsum dolor '
      + 'sit amet, consectetur adipiscing elit, sed do eiusmod tempor ',
  },
  {
    title: 'Make money',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor '
      + 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod '
      + 'tempor Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ',
  },
];

const useStyles = makeStyles({
  root: {
    marginTop: '26px',
    margin: '-15px',
  },
});

const Items = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Grid container>
        {info.map((item, i) => (
          <Grid item md={4} xs={12} key={item.title}>
            <OneItem item={item} i={i + 1} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Items;
