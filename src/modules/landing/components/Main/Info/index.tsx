import { Box, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '105px 85px 50px 10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      padding: '0 10px 20px',
    },
  },
  headerBox: {},
  header: {
    textAlign: 'center',
    lineHeight: '4.3rem',
  },
  descriptionBox: {
    padding: '6px 20px 0',
  },
  description: {
    textAlign: 'center',
  },
}));

const Info = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box className={classes.headerBox}>
        <Typography className={classes.header} variant="h1">
          Make money with the space
          you don&apos;t use.
        </Typography>
      </Box>
      <Box className={classes.descriptionBox}>
        <Typography variant="body1" className={classes.description}>
          Rent out your unused space to store your neighbors&apos;
          belongings. It&apos;s easy, safe, and free.
        </Typography>
      </Box>
    </Box>
  );
};

export default Info;
