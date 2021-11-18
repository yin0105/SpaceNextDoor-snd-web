import {
  Box, Grid, makeStyles, Theme, useMediaQuery,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '18px',
  },
  loader: {
    height: '190px',
    width: '300px',
    padding: '18px',
    boxShadow: '0px 15px 40px #E9E9E9',
    backgroundColor: 'white',
    marginRight: '10px',
    borderRadius: '22px',
    [theme.breakpoints.only('sm')]: {
      width: '450px',
    },
  },
}));

const Loader: React.FC = () => {
  const classes = useStyles();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.between('xs', 'sm'));

  return (
    <Box className={classes.root}>
      <Grid container>
        <Grid item xs={3} sm={4}>
          <Skeleton className={classes.loader} variant="rect" animation="wave" />
        </Grid>
        {
          !isMobile && (
          <>
            <Grid item xs={3} sm={4}>
              <Skeleton className={classes.loader} variant="rect" animation="wave" />
            </Grid>
            <Grid item xs={3} sm={4}>
              <Skeleton className={classes.loader} variant="rect" animation="wave" />
            </Grid>
          </>
          )
        }

      </Grid>
    </Box>
  );
};

export default Loader;
