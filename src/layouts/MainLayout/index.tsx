import {
  AppBar, makeStyles, Box, IconButton,
} from '@material-ui/core';
import Switcher from 'components/Switcher';
import Image from 'components/Image';
import React, { useState } from 'react';
import Link from 'next/link';
import { useCurrentCountry } from 'utilities/market';
import HamburgerMenu from '../../components/HamburgerMenu';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    zIndex: 101,
    height: '56px',
    boxShadow: '0px 10px 80px #E9E9E9',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      height: '71px',
    },
  },
  boxBurger: {
    position: 'absolute',
    left: '18px',
    height: '100%',
    padding: 0,
    display: 'flex',
    alignItems: 'center',
  },
  imgBurger: {
    height: '30%',
    width: 'auto',

  },
  logoBox: {
    cursor: 'pointer',
    width: 'max-content',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    backgroundColor: theme.palette.grey['100'],
    opacity: 0.1,
    height: '2px',
  },
  content: {
    [theme.breakpoints.up('sm')]: {
      maxWidth: '1120px',
      margin: '0 auto',
    },
  },
  logoContainer: {
    width: '70px',
    height: '43.33px',
    display: 'flex',
    flexShrink: 1,
    cursor: 'pointer',
    [theme.breakpoints.up('md')]: {
      width: '84px',
      height: '52px',
    },
  },
  burger: {
    width: '25px',
    height: '21px',
  },
  logo: {
    width: '70px',
    height: '44px',
  },
  switchers: {
    display: 'flex',
    width: 'max-content',
    position: 'absolute',
    right: '1.4vw',
    height: '71px',
    alignItems: 'center',
    zIndex: 101,
    top: 0,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  globe: { marginRight: '10px' },
}));

type Props = {
  children?: React.ReactNode;
  noHeader?: boolean;
  hideMenu?: boolean;
  className?: string;
};

export const HomeLayout: React.FC<Props> = (props) => {
  const classes = useStyles();
  const currentCountry = useCurrentCountry();
  const {
    children, noHeader = false, hideMenu = false, className = '',
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  const handleChange = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      {!noHeader && (
        <>
          <AppBar className={classes.root} position="static">
            {!hideMenu && (
              <Box className={classes.boxBurger}>
                <IconButton onClick={handleChange} id="openHamburgerMenuButton">
                  <Image folder="Homepage" className={classes.burger} name="burger" />
                </IconButton>
              </Box>
            )}
            <Link href="/">
              <Box className={classes.logoBox}>
                <Box className={classes.logoContainer}>
                  <Image className={classes.logo} name="logo" />
                </Box>
              </Box>
            </Link>
            {
              currentCountry.locales.length > 1 && (
              <Box className={classes.switchers}>
                <img className={classes.globe} src="/images/globe_dark.svg" alt="" />
                <Switcher comp="lang" />
              </Box>
              )
            }
          </AppBar>
        </>
      )}
      <Box className={classes.divider} />
      <main className={`${classes.content} ${className}`}>
        {children}
        <HamburgerMenu isOpen={isOpen} setIsOpen={setIsOpen} />
      </main>
    </>
  );
};

export default HomeLayout;
