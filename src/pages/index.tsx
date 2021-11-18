import React, { useState, useEffect } from 'react';
import { inject, observer, Provider as MobxProvider } from 'mobx-react';
import { makeStyles, useMediaQuery, Theme } from '@material-ui/core/';
import Head from 'next/head';
import { FixedCountry } from 'typings/graphql.types';
import { useCurrentCountry } from 'utilities/market';
import { setLocalStorage } from 'utilities/localStorage';
import { UPDATE_PROFILE_MUTATION } from 'modules/account/queries';
import { updateProfile, updateProfileVariables } from 'modules/account/queries/__generated__/updateProfile';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import AuthStore, { AUTH_STORE_KEY } from 'modules/app/stores/AuthStore';
import { SitesListStore } from '../modules/search/stores/SitesListStore';

import { HomeLayout } from '../layouts/MainLayout';
import SquareGuides from '../modules/home/components/SquareGuides';
import SearchHeader from '../modules/home/components/SearchHeader';
import WhatMakesUsDifferent from '../modules/home/components/WhatMakesUsDifferent';
import Reviews from '../modules/home/components/Reviews';
import HostASpace from '../modules/home/components/HostASpace';
import HowItWorks from '../modules/home/components/HowItWorks';
import Footer from '../components/Footer';
import FeaturedListings from '../modules/home/components/FeaturedListings';
import usePageTranslation from '../hooks/usePageTranslation';
import { Intercom, IIntercomClevertapPayload } from '../components/Intercom';

const useStyles = makeStyles(() => ({
  override: {
    padding: 'unset',
    margin: 'unset !important',
    maxWidth: '100vw !important',
  },
  container: {
    minHeight: '100vh',
    width: '100%',
  },
  ref: {
    minHeight: '100px',
    width: '100%',
  },
}));

interface IProps {
  [AUTH_STORE_KEY]?: AuthStore;
}

const Home: React.FunctionComponent<IProps> = ({ auth }) => {
  const classes = useStyles();
  const { name, currency } = useCurrentCountry();
  const [store] = useState(new SitesListStore());
  const router = useRouter();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.only('xs'));
  const { t } = usePageTranslation('home', 'Home');
  const [updateProfileMutation] = useMutation<updateProfile, updateProfileVariables>(
    UPDATE_PROFILE_MUTATION,
  );
  const breadCrumbs = [{ title: t('navHome'), link: '/' }];
  setLocalStorage('breadCrumbs', JSON.stringify(breadCrumbs));
  useEffect(() => {
    if (auth?.user?.id) {
      updateProfileMutation({
        variables: {
          payload: {
            preferred_language: router.locale,
          },
        },
      });
    }
  }, [auth?.user?.id]);

  const trackingPayload: IIntercomClevertapPayload = {
    type: 'intercom',
    CTSessionId: null,
    customerEmail: auth?.user?.email,
    customerPhone: auth?.user?.phone_number,
    customerName: `${auth?.user?.first_name}${auth?.user?.last_name}`,
    userId: auth?.user?.id || null,
    currency,
    status: null,
    siteName: 'Home',
    country: name,
  };

  return (
    <>
      <Head>
        <title>{t('title')}</title>
        <meta name="title" content={t('metaTitle')} />
        <meta name="description" content={t('description')} />
        {
          name === FixedCountry.Thailand && <meta name="facebook-domain-verification" content="0bijis249k9ofupirsuc3wxou7eod9" />
        }
        {isMobile
          ? <link rel="preload" as="image" href={`/images/${name}/Homepage/banner-mobile.webp`} />
          : <link rel="preload" as="image" href={`/images/${name}/Homepage/banner-desktop.webp`} />}
      </Head>
      <Intercom trackingPayload={trackingPayload} />
      <MobxProvider sitesStore={store}>
        <HomeLayout className={classes.override}>
          <div className={classes.container}>
            <SearchHeader />
            <FeaturedListings />
            <HowItWorks />
          </div>
          <div>
            <SquareGuides />
            <WhatMakesUsDifferent />
            <Reviews />
            <HostASpace />
            <Footer />
          </div>
        </HomeLayout>
      </MobxProvider>
    </>
  );
};

export default inject(AUTH_STORE_KEY)(observer(Home));
