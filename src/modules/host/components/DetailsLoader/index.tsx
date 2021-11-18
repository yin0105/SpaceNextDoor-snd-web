import { Skeleton } from '@material-ui/lab';
import { makeStyles, Box, Grid } from '@material-ui/core';

const UseStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  detailListHeader: {
    marginBottom: '18px',
  },
  listdetails: {
    margin: '15px 0px',
  },
  darkColor: {
    backgroundColor: '#989898',
  },
  listitems: {
    height: '15px',
  },
});

const DetailsLoader = (): JSX.Element => {
  const classes = UseStyles();
  return (
    <div className={classes.root}>
      <Box className={classes.detailListHeader}>
        <Skeleton variant="rect" width="10%" animation="wave" className={`${classes.darkColor} ${classes.listitems}`} />
        <Skeleton variant="rect" width="30%" animation="wave" className={`${classes.listdetails} ${classes.listitems}`} />
        <Skeleton variant="rect" width="100%" height="2px" animation="wave" className={`${classes.listdetails} `} />
        <Skeleton variant="rect" width="50%" animation="wave" className={`${classes.darkColor} ${classes.listdetails} ${classes.listitems}`} />
      </Box>
      <Box>
        <Skeleton variant="rect" width="110px" height="10px" animation="wave" className={` ${classes.listitems}`} />
        {[0, 1, 2, 3, 4, 5].map((item: number) => (
          <Grid key={item} container className={classes.listdetails}>
            <Grid item container justify="space-between" xs={12}>
              <Grid item xs={1}>
                <Skeleton variant="rect" animation="wave" className={`${classes.listitems}`} />
              </Grid>
              <Grid item xs={1}>
                <Skeleton variant="rect" animation="wave" className={`${classes.listitems}`} />
              </Grid>
              <Grid item xs={12}>
                <Skeleton variant="rect" width="100%" height="2px" animation="wave" className={classes.listdetails} />
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Box>
    </div>
  );
};

export default DetailsLoader;
