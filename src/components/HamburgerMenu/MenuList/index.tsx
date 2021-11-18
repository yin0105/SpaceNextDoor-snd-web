import {
  Box, Divider, ClickAwayListener,
  List, ListItem, ListItemIcon, ListItemText,
} from '@material-ui/core';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Switcher from 'components/Switcher';
import Link from 'next/link';
import { useCurrentCountry } from 'utilities/market';
import Image from '../../Image';
import usePageTranslation from '../../../hooks/usePageTranslation';
import toCamelCase from '../../../utilities/toCamelCase';
import getMenuItemsByCountry from './common.items';

const useStyles = makeStyles((theme) => ({
  list: {
    padding: '0',
  },
  divider: {
    paddingTop: '13px',
    paddingBottom: '13px',
    paddingLeft: '0',
  },
  listItem: {
    paddingTop: '13px',
    paddingBottom: '13px',
    paddingLeft: '0',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  listItemIcon: {
    minWidth: '24px',
    marginRight: '14px',
  },
}));

interface IProps {
  showHostMenu: boolean;
  isLoggedIn: boolean;
  logout(): void;
  close(): void;
}

const HostMenu: React.FC<IProps> = ({
  isLoggedIn, close, logout, showHostMenu,
}) => {
  const classes = useStyles();
  const [activeDropdown, setActiveDropdown] = useState<string | undefined>(undefined);
  const currentCountry = useCurrentCountry().name;
  const onLinkClick = (e, item) => {
    e.preventDefault();
    window.open(item.link, '_blank');
  };
  const { t } = usePageTranslation('homeLayout', 'MenuList');
  const switchers = [
    useCurrentCountry().locales.length > 1 && {
      divider: true,
      name: t('common1Name'),
      icon: 'globe_light',
      needsAuth: false,
      component: <Switcher comp="lang" disabled />,
      parent: 'lang',
    },
    {
      divider: false,
      name: t('common2Name'),
      icon: 'flag',
      needsAuth: false,
      component: <Switcher comp="country" disabled />,
      parent: 'country',
    },
  ];
  const guestMenu = [
    {
      divider: true,
      name: t('guest1Name'),
      icon: 'bookings',
      route: '/customer/bookings',
      needsAuth: true,
    },
    {
      divider: false,
      name: t('guest2Name'),
      icon: 'account',
      route: '/customer/account',
      needsAuth: true,
    },
    {
      divider: true,
      name: t('guest3Name'),
      icon: 'switchToGuest',
      route: '/host/reservations',
      needsAuth: true,
    },
  ];

  const hostMenu = [
    {
      divider: true,
      name: t('host1Name'),
      icon: 'myListings',
      route: '/host/listings',
      needsAuth: true,
      onClick: close,
    },
    {
      divider: false,
      name: t('host2Name'),
      icon: 'bookings',
      route: '/host/reservations',
      needsAuth: true,
      onClick: close,
    },
    {
      divider: false,
      name: t('host3Name'),
      icon: 'account',
      route: '/host/account',
      needsAuth: true,
    },
    {
      divider: true,
      name: t('host4Name'),
      icon: 'switchToGuest',
      route: '/customer/bookings',
      needsAuth: true,
    },
  ];

  const getLinkJsx = (oneItem) => (
    <Link href={oneItem.route || ''}>
      <Box onClick={() => { setActiveDropdown(oneItem.parent); }}>
        <ListItem
          key={oneItem.name}
          id={toCamelCase(oneItem.name)}
          button
          className={classes.listItem}
          onClick={(e) => oneItem.onClick && oneItem.onClick(e, oneItem)}
        >
          <Box display="flex">
            <ListItemIcon className={classes.listItemIcon}>
              <Image name={oneItem.icon} folder="HamburgerMenu" />
            </ListItemIcon>
            <ListItemText primary={oneItem.name} />
          </Box>
          {oneItem.component}
        </ListItem>
        {oneItem.parent === 'lang' && (
          <Switcher
            comp="lang"
            use="dependent"
            isDropdownOpen={activeDropdown === 'lang'}
          />
        )}

        {oneItem.parent === 'country' && (
          <Switcher
            comp="country"
            use="dependent"
            isDropdownOpen={activeDropdown === 'country'}
          />
        )}
      </Box>
    </Link>
  );

  const link = (oneItem: any) => (
    <React.Fragment key={oneItem.name}>
      {oneItem.divider && (
        <Box className={classes.divider}><Divider /></Box>
      )}
      {
        getLinkJsx(oneItem)
      }
    </React.Fragment>
  );

  const menuItems = getMenuItemsByCountry(currentCountry, t, onLinkClick, logout);
  const list = [].concat(showHostMenu ? hostMenu : guestMenu, ...menuItems);

  return (
    <List className={classes.list}>
      <ClickAwayListener onClickAway={() => setActiveDropdown(undefined)}>
        <Box>
          {switchers.map((i) => (i && link(i)))}
        </Box>
      </ClickAwayListener>
      {list.filter((l) => (l.needsAuth === isLoggedIn) || !l.needsAuth).map((oneItem) => (
        (oneItem.onClick || oneItem.route) && link(oneItem)
      ))}
    </List>
  );
};

export default HostMenu;
