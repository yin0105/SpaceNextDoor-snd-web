import { Box, makeStyles } from '@material-ui/core';
import Image from '../../../Image';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    padding: '54px 72px 22px',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'center',
      padding: '10px 0',
    },
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Image name="logo" folder="LoginPage" />
    </Box>
  );
};

export default Header;
