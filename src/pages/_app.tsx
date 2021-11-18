import React from 'react';
import Head from 'next/head';
import App from 'next/app';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ApolloProvider } from '@apollo/client';
import { Provider as MobxProvider, enableStaticRendering, observer } from 'mobx-react';
import { Router } from 'next/router';
import { AppContextType } from 'next/dist/next-server/lib/utils';
import ClevertapReact from 'clevertap-react';

import { MuiTheme, ThaiTheme } from '../MuiTheme';
import { initializeApollo } from '../apollo';
import { init as sentryInit } from '../utilities/sentry';
import {
  APP_ENV, CLEVER_TAP_PROD_ACCOUNT_ID,
  CLEVER_TAP_TEST_ACCOUNT_ID,
} from '../config';
import { fetchInitialStoreState, AppStore } from '../modules/app/stores/AppStore';
import AuthStore, { AUTH_STORE_KEY } from '../modules/app/stores/AuthStore';
import { SitesListStore } from '../modules/search/stores/SitesListStore';
import GoogleTagManager from '../components/GoogleTagManager';
import { getCookieUtil, setCookieUtil } from '../utilities/cookies';

type Props = {
  Component: any,
  pageProps: any,
  initialApolloState: any,
};

enableStaticRendering(typeof window === 'undefined');

sentryInit();

@observer
class MyApp extends App<Props> {
  state = {
    dataStore: new AppStore(),
    authStore: new AuthStore(),
    sitesStore: new SitesListStore(),
    apollo: null,
  };

  // Fetching serialized(JSON) store state
  static async getInitialProps(appContext: AppContextType<Router>): Promise<any> {
    const appProps = await App.getInitialProps(appContext);
    const initialStoreState = await fetchInitialStoreState();
    return {
      ...appProps,
      initialStoreState,
    };
  }

  // Hydrate serialized state to store
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  static getDerivedStateFromProps(props: any, prevState: any): any {
    prevState.dataStore.hydrate(props.initialStoreState);
    const newState: { apollo?: any } = {};
    if (!prevState.apollo) {
      newState.apollo = initializeApollo(props.initialApolloState);
    }

    return { ...prevState, ...newState };
  }

  public componentDidMount(): void {
    this.setState({ isMounted: true });
    setTimeout(() => {
      this.setState({ reqScripts: true });
    }, 10000);

    if (typeof window !== 'undefined') {
      if (!getCookieUtil('snd-domain')) setCookieUtil('snd-domain', window?.location?.origin);
    }

    if (APP_ENV === 'prod') {
      ClevertapReact.initialize(CLEVER_TAP_PROD_ACCOUNT_ID);
    } else {
      ClevertapReact.initialize(CLEVER_TAP_TEST_ACCOUNT_ID);
    }
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }

  render(): JSX.Element {
    const { Component, pageProps, router } = this.props;
    const {
      apollo, dataStore, authStore, sitesStore,
    } = this.state;
    const providerParams = {
      store: dataStore,
      [AUTH_STORE_KEY]: authStore,
      sitesStore,
    };

    let fontFamily = 'Poppins';
    let Theme = MuiTheme;
    if (router.locale === 'th') {
      fontFamily = 'Prompt';
      Theme = ThaiTheme;
    }

    return (
      <GoogleTagManager>
        <MobxProvider {...providerParams}>
          <ApolloProvider client={apollo}>
            <Head>
              <title>Space Next Door</title>
              <meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
              <link rel="preconnect" href="https://fonts.gstatic.com" />
              <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
              />
              <link
                href={`https://fonts.googleapis.com/css2?family=${fontFamily}:wght@400;500;600;700&display=swap`}
                rel="stylesheet"
              />
              <link
                href="https://fonts.googleapis.com/icon?family=Material+Icons"
                rel="stylesheet"
              />
              {/* HubSpot Embed Code */}
              <script type="text/javascript" id="hs-script-loader" defer src="//js.hs-scripts.com/9395319.js" />
            </Head>
            <ThemeProvider theme={Theme}>
              <CssBaseline />
              <Component {...pageProps} />
            </ThemeProvider>
          </ApolloProvider>
        </MobxProvider>
      </GoogleTagManager>
    );
  }
}

export default MyApp;
