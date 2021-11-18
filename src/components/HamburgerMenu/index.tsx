import {
  Box,
  Drawer, Hidden, IconButton, makeStyles, Dialog, Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { inject, observer } from 'mobx-react';
import { PrimaryButton, WhiteButton } from 'components/Buttons';
import Link from 'next/link';
import Grey3Typography from '../Typographies/Grey3Typography';
import Image from '../Image';
import MenuList from './MenuList';
import Login from './Login';
import AuthStore, { AUTH_STORE_KEY } from '../../modules/app/stores/AuthStore';
import usePageTranslation from '../../hooks/usePageTranslation';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    zIndex: 1,
    height: 71,
    backgroundColor: '#FFFFFF',
    [theme.breakpoints.up('sm')]: {
      height: 'auto',
    },
  },
  boxBurger: {
    position: 'absolute',
    left: '18px',
    height: '100%',
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      marginTop: '10px',
      position: 'relative',
      left: '11px',
      height: 'auto',
    },
  },
  imgBurger: {
    height: '30%',
    width: 'auto',

  },
  logoBox: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    '& img': {
      width: '114px',
      height: '71px',
    },
  },
  drawer: {
    '& .MuiDrawer-paper': {
      width: '100%',
      bottom: 0,
      top: 'auto',
      [theme.breakpoints.up('sm')]: {
        width: '375px',
        height: '100vh',
        overflowX: 'hidden',
      },
    },
    '& ::-webkit-scrollbar': { display: 'none' },
    '& -ms-overflow-style': 'none',
  },
  container: {
    borderTop: `2px solid ${theme.palette.grey[50]}`,
    padding: '0 25px',
    [theme.breakpoints.up('sm')]: {
      borderTop: 'none',
    },
  },
  headerBox: {
    margin: '26px 0 13px',
    [theme.breakpoints.up('sm')]: {
      margin: '22px 0 13px',
    },
  },
  popup: {
    width: '320px',
    height: '150px',
    padding: '20px',
    background: 'white',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexFlow: 'column',
    '& p': {
      fontSize: '16px',
    },
    '& button': {
      fontSize: '16px',
      height: '50px',
    },
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  paperWidthSm: {
    outline: 'none',
    background: 'none',
    borderRadius: '15px',
  },
}));

interface IProps {
  isOpen: boolean;
  showHostMenu?: boolean;
  setIsOpen: (isOpen: boolean) => void;
  [AUTH_STORE_KEY]?: AuthStore;
}

const HamburgerMenu: React.FC<IProps> = (props) => {
  const classes = useStyles();
  const {
    isOpen,
    setIsOpen,
    showHostMenu = false,
    auth,
  } = props;
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const { t } = usePageTranslation('homeLayout', 'HamburgerMenu');
  const style = {
    height: '100vh',
  };

  useEffect(() => {
    if (typeof window !== undefined) {
      style.height = `${window.innerHeight}`;
    }
  }, []);

  return (
    <>
      <Drawer
        open={isOpen}
        onClose={() => setIsOpen(!isOpen)}
        className={classes.drawer}
        style={style}
        anchor="left"
      >
        <Box className={classes.root} position="static">
          <Box className={classes.boxBurger}>
            <IconButton onClick={() => setIsOpen(!isOpen)}>
              <Image name="close" folder="Homepage" />
            </IconButton>
          </Box>
          <Hidden smUp>
            <Link href="/">
              <Box className={classes.logoBox}>
                <Image name="logo" />
              </Box>
            </Link>
          </Hidden>
        </Box>
        <Box width="100%" className={classes.container}>
          {!auth.isAuthenticated && (
            <Login onClick={() => router.push('/login')} />
          )}
          {auth.isAuthenticated && (
            <Box className={classes.headerBox}>
              <Grey3Typography variant="h2">
                {auth.user?.first_name ? `${t('grey3Typography')}, ${auth.user?.first_name}!` : `${t('grey3Typography')}!`}
              </Grey3Typography>
            </Box>
          )}
          <MenuList
            isLoggedIn={auth.isAuthenticated}
            showHostMenu={showHostMenu}
            close={() => setIsOpen(false)}
            logout={() => {
              setIsOpen(false);
              setIsSigningOut(true);
            }}
          />
        </Box>
      </Drawer>
      <Dialog
        open={isSigningOut}
        onClose={() => setIsSigningOut(false)}
        classes={{
          paperWidthSm: classes.paperWidthSm,
        }}
      >
        <Box className={classes.popup}>
          <Typography>{t('typography')}</Typography>
          <Box className={classes.buttons}>
            <WhiteButton
              style={{ marginRight: '5px', background: '#efeded', width: '50%' }}
              onClick={() => setIsSigningOut(false)}
            >
              {t('no')}
            </WhiteButton>

            <PrimaryButton
              style={{ marginLeft: '5px', color: 'white', width: '50%' }}
              onClick={() => {
                auth.logout();
                setIsSigningOut(false);
                router.push('/');
              }}
            >
              {t('yes')}
            </PrimaryButton>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

export default inject(AUTH_STORE_KEY)(observer(HamburgerMenu));
