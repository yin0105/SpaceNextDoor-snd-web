import { Box, makeStyles } from '@material-ui/core';
import Header from './Header';
import ReviewsCards from './ReviewsCards';
import Statistic from './Statistic';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('md')]: {
      padding: '0 200px',
    },
  },
}));

const Reviews = () => {
  const classes = useStyles();

  return (
    <Box pl={14} pr={14} className={classes.root}>
      <Header />
      <Statistic />
      <ReviewsCards />
    </Box>
  );
};

export default Reviews;
