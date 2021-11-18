import React from 'react';
import { makeStyles } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import { useRouter } from 'next/router';
import DropdownMenu from '../../Dropdowns/dropdownMenu';
import AuthStore, { AUTH_STORE_KEY } from '../../../modules/app/stores/AuthStore';
import usePageTranslation from '../../../hooks/usePageTranslation';

const useStyles = makeStyles(() => ({
  dropDown: {
    width: '150px',
    marginRight: '38px',
    color: '#333333',
    justifyContent: 'space-around',
    border: '0.737089px solid #E9E9E9',
    boxSizing: 'border-box',
  },
}));

interface IProps {
  [AUTH_STORE_KEY]?: AuthStore;
}

const AccountMenu: React.FunctionComponent<IProps> = ({ auth }) => {
  const classes = useStyles();
  const router = useRouter();
  const { t } = usePageTranslation('components', 'AccountMenu');
  const dropdownLinks = [
    {
      name: t('linkName1'),
      imageName: 'user',
      imageFolder: 'Host',
      divider: true,
      onClick: () => router.push('/host/account'),
    },
    // {
    //   name: 'Add new Listing',
    //   imageName: 'add',
    //   imageFolder: 'Host',
    //   divider: true,
    // },
    {
      name: t('linkName2'),
      imageName: 'switch',
      imageFolder: 'Host',
      divider: false,
      onClick: () => router.push('/customer/bookings'),
    },
    {
      name: t('linkName3'),
      imageName: 'signout',
      imageFolder: 'Host',
      divider: true,
      onClick: () => {
        auth.logout();
        router.push('/');
      },
    },
    {
      name: t('linkName4'),
      imageName: 'helpCenter',
      imageFolder: 'HamburgerMenu',
      onClick: () => {
        window.open('https://help.spacenextdoor.com/hc/en-us', '_blank');
      },
    },
  ];
  const name = auth.user?.first_name ? `${t('hello')}, ${auth.user?.first_name}!` : `${t('hello')}!`;

  return (
    <DropdownMenu
      btnTitle={name}
      icon="user"
      btnClass={classes.dropDown}
      listitems={dropdownLinks}
    />
  );
};

export default inject(AUTH_STORE_KEY)(observer(AccountMenu));
