import {
  makeStyles, Box, Grid,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import Header from '../Header';

const useStyles = makeStyles((theme) => ({
  line: {
    border: '1px solid #E9E9E9',
    margin: '25px 0 25px 40px',
    [theme.breakpoints.down('sm')]: {
      margin: '16px',
    },
  },
}));

const customStylesForSkeleton = makeStyles((theme) => ({
  text: {
    marginTop: '10px',
  },
}));

const FeaturesPlaceholder = () => {
  const classes = useStyles();
  const customClassesForSkeleton = customStylesForSkeleton();
  return (
    <Box>
      <Grid container>
        <Grid item md={2} xs={12}>
          <Header loading name="hello" />
        </Grid>
        <Grid item md={10} xs={12}>
          <Grid container>
            <Grid item xs={6}>
              <Skeleton classes={customClassesForSkeleton} variant="text" width={97} height={20} />
              <Skeleton classes={customClassesForSkeleton} variant="text" width={97} height={20} />
              <Skeleton classes={customClassesForSkeleton} variant="text" width={97} height={20} />
              <Skeleton classes={customClassesForSkeleton} variant="text" width={97} height={20} />
              <Skeleton classes={customClassesForSkeleton} variant="text" width={97} height={20} />
            </Grid>
            <Grid item xs={6}>
              <Skeleton classes={customClassesForSkeleton} variant="text" width={97} height={20} />
              <Skeleton classes={customClassesForSkeleton} variant="text" width={97} height={20} />
              <Skeleton classes={customClassesForSkeleton} variant="text" width={97} height={20} />
              <Skeleton classes={customClassesForSkeleton} variant="text" width={97} height={20} />
              <Skeleton classes={customClassesForSkeleton} variant="text" width={97} height={20} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Box className={classes.line} />
      <Grid container>
        <Grid item md={2} xs={12}>
          <Header loading name="hello" />
        </Grid>
        <Grid item md={10} xs={12}>
          <Grid container>
            <Grid item xs={6}>
              <Skeleton classes={customClassesForSkeleton} variant="text" width={97} height={20} />
              <Skeleton classes={customClassesForSkeleton} variant="text" width={97} height={20} />
              <Skeleton classes={customClassesForSkeleton} variant="text" width={97} height={20} />
              <Skeleton classes={customClassesForSkeleton} variant="text" width={97} height={20} />
              <Skeleton classes={customClassesForSkeleton} variant="text" width={97} height={20} />
            </Grid>
            <Grid item xs={6}>
              <Skeleton classes={customClassesForSkeleton} variant="text" width={97} height={20} />
              <Skeleton classes={customClassesForSkeleton} variant="text" width={97} height={20} />
              <Skeleton classes={customClassesForSkeleton} variant="text" width={97} height={20} />
              <Skeleton classes={customClassesForSkeleton} variant="text" width={97} height={20} />
              <Skeleton classes={customClassesForSkeleton} variant="text" width={97} height={20} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
export default FeaturesPlaceholder;
