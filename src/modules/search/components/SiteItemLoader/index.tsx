import {
  Box, Grid, makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    border: '2px solid rgba(243, 247, 249, 1)',
    borderRadius: '15px',
    padding: '20px 14px 14px',
    marginTop: '10px',
  },
  header: {
    display: 'flex',
    paddingBottom: '10px',
  },
  impotentText: {
    fontWeight: 600,
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  label: {
    display: 'flex',
    borderRadius: '15px',
    backgroundColor: theme.palette.grey[100],
    marginBottom: '10px',
    height: '22px',
    width: '140px',
  },
  heading: {
    display: 'flex',
    borderRadius: '15px',
    backgroundColor: theme.palette.grey[100],
    marginBottom: '20px',
    height: '15px',
    width: '150px',
  },
  text: {
    borderRadius: '15px',
    backgroundColor: theme.palette.grey[50],
    marginBottom: '2px',
    height: '15px',
    width: '145px',
  },
  property: {
    display: 'flex',
    flexDirection: 'column',
  },
  imageBox: {
    height: '120px',
    width: '120px',
    backgroundColor: theme.palette.grey[50],
    borderRadius: '16px',
    [theme.breakpoints.up('sm')]: {
      width: '190px',
      height: '190px',
      marginBottom: '10px',
    },
  },
  spaceTitle: {
    backgroundColor: theme.palette.grey[100],
    marginBottom: '10px',
    height: '15px',
    width: '75px',
    borderRadius: '15px',
  },
  spaceText: {
    backgroundColor: theme.palette.grey[50],
    marginBottom: '5px',
    height: '10px',
    width: '170px',
    borderRadius: '15px',
  },
  spacePrice: {
    backgroundColor: theme.palette.grey[50],
    margin: 'auto',
    height: '20px',
    width: '90px',
    borderRadius: '15px',
  },
  boxBeforePrice: {
    borderRight: '2px dashed #E1E0E3',
  },
  flex: {
    display: 'flex',
  },
}));

const SiteItemLoader: React.FunctionComponent = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        <Grid container>
          <Grid item xs={12} lg={4} sm={5} xl={4}>
            <Grid container>
              <Grid xs={5} sm={12} lg={12} xl={12} item>
                <Box className={classes.imageBox} />
              </Grid>
              <Grid xs={7} sm={12} lg={12} xl={12} item>
                <Box>
                  <Box className={classes.label} />
                  <Box className={classes.heading} />
                  <Box className={classes.property}>
                    <Box className={classes.text} />
                    <Box className={classes.text} />
                    <Box className={classes.text} />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={8} sm={8} xl={8}>
            {[1, 2, 3].map((i) => (
              <Box key={i} className={classes.root}>
                <Grid container>
                  <Grid xs={8} item>
                    <Box mr={5} className={classes.boxBeforePrice}>
                      <Box className={classes.spaceTitle} />
                      <Box className={classes.spaceText} />
                      <Box className={classes.spaceText} />
                    </Box>
                  </Grid>
                  <Grid xs={4} item className={classes.flex}>
                    <Box className={classes.spacePrice} />
                  </Grid>
                </Grid>
              </Box>
            ))}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SiteItemLoader;
