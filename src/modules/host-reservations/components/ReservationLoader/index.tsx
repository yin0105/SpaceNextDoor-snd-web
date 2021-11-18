import {
  makeStyles,
  Grid,
  Divider,
  Box,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles({
  root: {
    marginTop: '25px',
    display: 'block',

    '& .MuiGrid-spacing-xs-10 > .MuiGrid-item': {
      marginRight: '60px',
    },
    '& .MuiSkeleton-text': {
      padding: '20px',
    },
  },
});

interface IProps {
  items: number[];
}

const ReservationLoader: React.FC<IProps> = ({ items: data }) => {
  const classes = useStyles();

  const items = [1, 2, 3, 4, 5, 6];

  const renderGrid = (index: number) => (
    <Grid key={index} item xs={index === 2 ? 2 : 1}>
      <Skeleton variant="text" width="100%" animation="wave" />
    </Grid>
  );

  return (
    <>
      <Grid container className={classes.root}>
        {data.map((item: number) => (
          <Box key={`grid_${item}`}>
            <Grid item container spacing={10} xs={12}>
              {items.map((i: number) => ((item === 0 && i === 10) ? null : renderGrid(i)))}
            </Grid>
            <Divider style={{ width: '100%', margin: '25px 0' }} />
          </Box>
        ))}
      </Grid>
    </>
  );
};

export default ReservationLoader;
