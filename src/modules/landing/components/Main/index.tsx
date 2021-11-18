import { Box, Grid, makeStyles } from '@material-ui/core';

import Info from './Info';
import LoginForm from './LoginForm';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#EAF0F6',
    padding: '67px 0 75px',
    [theme.breakpoints.down('sm')]: {
      padding: '20px 0 30px',
    },
  },
  wrapper: {
    maxWidth: '1112px',
    margin: '0 auto',
    padding: '0 20px',
  },
}));

const Main = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box className={classes.wrapper}>
        <Grid container>
          <Grid item md={6} xs={12}>
            <Info />
          </Grid>
          <Grid item md={6} xs={12}>
            <LoginForm />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Main;
