import {
  Grid,
  Box,
  List,
  ListItem,
  makeStyles,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles({
  root: {
    padding: '15px 0',
  },
  listtitle: {
    backgroundColor: '#989898',
  },
  listitems: {
    padding: '0px',
  },
  listitem: {
    padding: '0px',
    '& img': {
      width: '18px',
      marginRight: '15px',
    },
  },
  listingContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listImg: {
    width: '70px',
    height: '70px',
    borderRadius: '10px',
  },
  box: {
    width: '100%',
    padding: '20px 0',
    '& > span': {
      height: '30px',
    },
  },
});

const HostListLoader: any = () => {
  const classes = useStyles();

  return (
    <>
      <Grid container wrap="nowrap" className={classes.root}>
        <Grid item>
          <Skeleton variant="rect" width="78px" height="78px" className={classes.listImg} />
        </Grid>
        <Grid
          item
          container
          className={classes.listingContainer}
        >
          <Box pl={8}>
            <List className={classes.listitems}>
              <Skeleton variant="text" height="33px" width="147px" animation="wave" className={classes.listtitle} />
              <ListItem className={classes.listitem}>
                <Skeleton variant="text" height="27px" width="347px" animation="wave" />
              </ListItem>
              <ListItem className={classes.listitem}>
                <Skeleton variant="text" height="20px" width="47px" animation="wave" />
              </ListItem>
            </List>
          </Box>
          <Box>
            <Skeleton variant="text" width="20px" animation="wave" />
          </Box>
        </Grid>
      </Grid>
      <Box className={classes.box}>
        <Skeleton variant="text" width="100%" animation="wave" />
        <Skeleton variant="text" width="100%" animation="wave" />
        <Skeleton variant="text" width="100%" animation="wave" />
      </Box>
    </>
  );
};

export default HostListLoader;
