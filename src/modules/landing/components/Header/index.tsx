import { Box, makeStyles } from '@material-ui/core';
import Link from 'next/link';

import Image from '../../../../components/Image';

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
      <Link href="/">
        <Image name="logo" folder="LoginPage" />
      </Link>
    </Box>
  );
};

export default Header;
