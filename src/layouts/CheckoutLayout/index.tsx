import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Box,
  fade,
  Hidden,
  IconButton,
} from '@material-ui/core';
import Image from '../../components/Image';
import Grey3Typography from '../../components/Typographies/Grey3Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    zIndex: 1,
    height: 73,
    boxShadow: 'none',
    borderBottom: `2px solid ${fade(theme.palette.grey[100], 0.1)}`,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      height: 82,
    },
  },
  iconBox: {
    position: 'absolute',
    left: '10px',
    [theme.breakpoints.up('sm')]: {
      left: '20px',
    },
    '& img': {
      [theme.breakpoints.down('sm')]: {
        width: '20px',
      },
      width: '25px',
    },
  },
  headerTextBox: {
    [theme.breakpoints.up('sm')]: {
      marginTop: '15px',
    },
  },
  mainBox: {
    margin: '0 26px',
    [theme.breakpoints.up('sm')]: {
      maxWidth: '1040px',
      margin: '0 auto',
      padding: '0 20px',
    },
  },
}));

interface IProps {
  text: string;
  cb?: () => void;
}

const CheckoutLayout: React.FC<IProps> = (props) => {
  const classes = useStyles();
  const {
    text,
    cb,
    children,
  } = props;

  return (
    <>
      <AppBar position="static" color="inherit" className={classes.root}>
        <Box className={classes.iconBox}>
          <IconButton onClick={() => (cb ? cb() : window.history.back())}>
            <Image folder="CheckoutPage" name="arrowBack" />
          </IconButton>
        </Box>
        <Box className={classes.headerTextBox}>
          <Hidden smUp>
            <Grey3Typography variant="h2">
              {text}
            </Grey3Typography>
          </Hidden>
          <Hidden xsDown>
            <Image name="logo" />
          </Hidden>
        </Box>
      </AppBar>
      <main>
        <Box className={classes.mainBox}>
          {children}
        </Box>
      </main>
    </>
  );
};

export default CheckoutLayout;
