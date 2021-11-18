import React, { FC } from 'react';
import { Box, Grid, makeStyles } from '@material-ui/core';
import Header from './Header';
import Description from './Description';
import ButtonHost from './Button';
import Image from '../../../../components/Image';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
    width: '100%',
    [theme.breakpoints.up('md')]: {
      padding: '75px 200px',
    },
  },
  image: {
    '& img': {
      width: '100%',
      maxWidth: '500px',
    },
  },
  desktop: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  mobile: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: '20px',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

const HostASpace: FC = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root} mt={15} pt={20} pb={20} pl={12} pr={12}>
      <Grid container>
        <Grid item md={6} className={classes.mobile}>
          <Box className={classes.image}>
            <Image name="host-a-space" folder="Homepage" />
          </Box>
        </Grid>
        <Grid item md={6}>
          <Header />
          <Description />
        </Grid>
        <Grid item md={6} className={classes.desktop}>
          <Box className={classes.image}>
            <Image name="host-a-space" folder="Homepage" />
          </Box>
        </Grid>
      </Grid>
      <ButtonHost />
    </Box>
  );
};

export default HostASpace;
