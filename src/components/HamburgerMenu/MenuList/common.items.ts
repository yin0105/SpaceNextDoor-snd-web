const getMenuItemsByCountry = (country, t, onClickCallback, logoutAction) => {
  const common = {
    Singapore: {
      contactUs: {
        divider: true,
        name: t('common3Name'),
        icon: 'contactUs',
        link: 'https://help-center.spacenextdoor.com/en/articles/5525246-contact-us',
        onClick: onClickCallback,
        needsAuth: false,
      },
      helpCenter: {
        divider: false,
        name: t('common4Name'),
        icon: 'helpCenter',
        link: 'https://help.spacenextdoor.com/hc/en-us',
        onClick: onClickCallback,
        needsAuth: false,
      },
      blog: {
        divider: false,
        name: t('common5Name'),
        icon: 'blogIcon',
        link: 'https://spacenextdoor.com/blog/',
        onClick: onClickCallback,
        needsAuth: false,
      },
      signOut: {
        divider: true,
        name: t('common6Name'),
        icon: 'signOut',
        onClick: (e: Event) => {
          e.preventDefault();
          logoutAction();
        },
        needsAuth: true,
      },
    },
    Thailand: {
      contactUs: {
        divider: true,
        name: t('common3Name'),
        icon: 'contactUs',
        link: 'https://help-center.spacenextdoor.com/en/articles/5641567-',
        onClick: onClickCallback,
        needsAuth: false,
      },
      helpCenter: {
        divider: false,
        name: t('common4Name'),
        icon: 'helpCenter',
        link: 'https://help-center.spacenextdoor.com/en/collections/3110898',
        onClick: onClickCallback,
        needsAuth: false,
      },
      blog: {
        divider: false,
        name: t('common5Name'),
        icon: 'blogIcon',
        link: 'https://spacenextdoor.com/blog/',
        onClick: onClickCallback,
        needsAuth: false,
      },
      signOut: {
        divider: true,
        name: t('common6Name'),
        icon: 'signOut',
        onClick: (e: Event) => {
          e.preventDefault();
          logoutAction();
        },
        needsAuth: true,
      },

    },
    Japan: {
      contactUs: {
        divider: true,
        name: t('common3Name'),
        icon: 'contactUs',
        link: 'https://help-center.spacenextdoor.com/en/articles/5525246-contact-us',
        onClick: onClickCallback,
        needsAuth: false,
      },
      helpCenter: {
        divider: false,
        name: t('common4Name'),
        icon: 'helpCenter',
        link: 'https://help.spacenextdoor.com/hc/en-us',
        onClick: onClickCallback,
        needsAuth: false,
      },
      blog: {
        divider: false,
        name: t('common5Name'),
        icon: 'blogIcon',
        link: 'https://spacenextdoor.com/blog/',
        onClick: onClickCallback,
        needsAuth: false,
      },
      signOut: {
        divider: true,
        name: t('common6Name'),
        icon: 'signOut',
        onClick: (e: Event) => {
          e.preventDefault();
          logoutAction();
        },
        needsAuth: true,
      },
    },
  };

  const menutItems = [];
  if (common[country]) {
    menutItems.push(common[country].blog);
    menutItems.push(common[country].contactUs);
    menutItems.push(common[country].helpCenter);
    menutItems.push(common[country].signOut);
  }

  return menutItems;
};

export default getMenuItemsByCountry;
