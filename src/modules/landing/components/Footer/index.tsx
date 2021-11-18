import { Box, makeStyles } from '@material-ui/core';

import Header from './Header';
import Items from './Items';
import GetHelpButton from './GetHelpButton';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '78px 80px',
    [theme.breakpoints.down('sm')]: {
      margin: '20px 60px',
    },
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Header />
      <Items />
      <GetHelpButton />
    </Box>
  );
};

export default Footer;
