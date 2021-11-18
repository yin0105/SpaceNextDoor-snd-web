import { Box, makeStyles } from '@material-ui/core';
import React from 'react';
import Link from 'next/link';
import Image from '../../../../components/Image';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'column',
  },
  logo: {
    height: '82px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottom: `1px solid ${theme.palette.grey[50]}`,
  },
}));

const Header: React.FC = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Link href="/">
        <Box className={classes.logo}>
          <Image name="logo" />
        </Box>
      </Link>
    </Box>
  );
};

export default Header;
