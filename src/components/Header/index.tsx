import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  AppBar, Link, Button, Toolbar, IconButton,
} from '@material-ui/core';
import Hidden from '@material-ui/core/Hidden';

import Image from '../Image';
import useStyles from './styles';
import { IMenuLinks } from './interfaces';
import AccountMenu from './AccountMenu';
import HamburgerMenu from '../HamburgerMenu';
import usePageTranslation from '../../hooks/usePageTranslation';

const Header: React.FunctionComponent = () => {
  const classes = useStyles();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleChangeUrl = (url: string) => {
    router.push(url);
  };

  const isActiveLink = (link: string): boolean => {
    const path: string = router.pathname;
    if (link !== '/' && path !== '/' && path.indexOf(link) !== -1) {
      return true;
    }

    if (path === link) {
      return true;
    }

    return false;
  };

  const addListing = () => {
    router.push('/host/listings/add');
  };

  const { t } = usePageTranslation('components', 'Header');

  const menuLinks = [
    {
      name: t('menuLinkName1'),
      link: '/host/listings',
    },
    {
      name: t('menuLinkName2'),
      link: '/host/reservations',
    },
  ];

  return (
    <div className={classes.grow}>
      <AppBar className={classes.root} position="static">
        <Toolbar className={classes.Navitems}>
          <Link
            href={`/${router.locale}`}
            className={classes.logoImage}
            onClick={(e) => {
              e.preventDefault();
              handleChangeUrl('/');
            }}
          >
            <Image name="logo" />
          </Link>
          <Hidden mdUp>
            <div className={classes.togglebtn}>
              <IconButton onClick={() => setIsOpen(true)}>
                <Image name="burger" folder="Homepage" />
              </IconButton>

              <HamburgerMenu isOpen={isOpen} showHostMenu setIsOpen={setIsOpen} />
            </div>
          </Hidden>
          <Hidden smDown>
            <div style={{ flex: 1 }}>
              {menuLinks.map((item: IMenuLinks, i) => (
                <Link
                  key={`${item.name}_${i}`}
                  href={`/${router.locale}${item.link}`}
                  className={`${classes.menuLink} ${isActiveLink(item.link) ? 'link__active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleChangeUrl(item.link);
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </Hidden>
          <div className={classes.sectionDesktop}>
            <Button
              className={`${classes.button} ${classes.createListButton}`}
              variant="contained"
              id="createListingsButton"
              onClick={() => addListing()}
            >
              {t('button')}
            </Button>
            <AccountMenu />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
