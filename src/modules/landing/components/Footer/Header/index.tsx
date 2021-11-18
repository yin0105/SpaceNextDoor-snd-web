import { Box, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  secondTextBox: {
    marginTop: '22px',
  },
});

const Header = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box>
        <Typography variant="h1">
          How to Host
        </Typography>
      </Box>
      <Box className={classes.secondTextBox}>
        <Typography>
          YOU CAN START MAKING MONEY ON NEIGHBOR IN AS LITTLE AS FIVE MINUTES.
        </Typography>
      </Box>
    </Box>
  );
};

export default Header;
