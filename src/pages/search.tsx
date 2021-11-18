import {
  makeStyles, Box, Divider, Grid,
  Hidden, useMediaQuery, Theme, Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { inject, observer, Provider as MobxProvider } from 'mobx-react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Head from 'next/head';

import { useTranslatedCountryName, useCurrentCountry, getTranslatedName } from 'utilities/market';

import { SitesListStore, SITES_STORE_KEY } from 'modules/search/stores/SitesListStore';
import SiteItemLoader from 'modules/search/components/SiteItemLoader';
import usePageTranslation from 'hooks/usePageTranslation';
import Loader from 'modules/search/components/Loader';
import GetAQuote from 'modules/quotations/components/GetAQuote';
import { getLocalStorage, setLocalStorage } from 'utilities/localStorage';
import { HomeLayout } from '../layouts/MainLayout';
import Header from '../modules/search/components/Header';
import SearchLocation from '../components/Search';
import SearchInput from '../components/Search/SearchInput';
import { PromotionStore } from '../modules/checkout/stores/PromotionStore';
import ViewOnMap from '../modules/search/components/ViewOnMap';

const SearchList = dynamic(() => import('../modules/search'), { ssr: false });
const SitesMap = dynamic(() => import('../modules/search/containers/SitesMap'), { ssr: false });
const DesktopFilters = dynamic(() => import('../modules/search/components/FiltersDesktop'), { ssr: false });
const FilterPopup = dynamic(() => import('../modules/search/components/FilterPage'), { ssr: false });
const Dates = dynamic(() => import('../components/Search/Dates'), { ssr: false });
const SitesEmptyState = dynamic(() => import('../components/Search/EmptyState').then((mod) => mod.SitesEmptyState), { ssr: false });

const useStyles = makeStyles((theme) => ({
  relative: {
    position: 'relative',
  },
  filterWrap: {
    position: 'relative',
    borderRadius: '32px 32px 0px 0px',
    backgroundColor: '#FFFFFF',
    [theme.breakpoints.down('xs')]: {
      boxShadow: '0px -6px 20px 0px #cec7c7',
    },
  },
  line: {
    display: 'flex',
    justifyContent: 'center',
    margin: '10px auto 20px',
    maxWidth: '60px',
    border: `2px solid ${theme.palette.grey[50]}`,
    borderRadius: '10px',
  },
  location: {
    fontWeight: 400,
    color: `${theme.palette.grey[100]}`,
  },
  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 110,
    height: '100%',
  },
}));
interface IProps {
  [SITES_STORE_KEY]?: SitesListStore;
}

const Search: React.FunctionComponent<IProps> = ({ sitesStore }) => {
  const [store] = useState(new PromotionStore());
  const [showMap, setShowMap] = useState(false);
  const [viewed, setViewed] = useState(false);
  const [address, setAddress] = useState('');
  const [isCompMounted, setIsCompMounted] = useState(false);
  const classes = useStyles();
  const router = useRouter();
  const location = router?.query?.location as unknown as string || '';
  const totalResults = router.query?.total_results as unknown as number || 0;
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.only('xs'));
  const {
    featuredSites, isFeaturedSitesLoading, isLoading,
    sites, setCurrentCountry,
  } = sitesStore;
  const country = useCurrentCountry();
  const {
    // eslint-disable-next-line
    lat, lon, country_id, city_id, district_id, filterBy, districtIds, cityIds
  } = router.query;

  let breadCrumbs: any[] = [];
  if (getLocalStorage('breadCrumbs')) {
    const jsonStr = localStorage.getItem('breadCrumbs');
    breadCrumbs = JSON.parse(jsonStr);
    if (breadCrumbs[1]?.link !== router.asPath || !breadCrumbs[1]) {
      breadCrumbs[1] = { title: 'Search Results', link: router.asPath };
    }
    localStorage.setItem('breadCrumbs', JSON.stringify(breadCrumbs));
  }

  useEffect(() => {
    setIsCompMounted(true);
    setCurrentCountry(country.name);
  }, []);

  useEffect(() => {
    const params = router.query as any;
    setAddress(params.address || getTranslatedName(country, 'name', router.locale));
    if (params?.lat && params?.lon) {
      sitesStore.setSearchedLatLon({
        lat: params.lat,
        lon: params.lon,
      });
    }
    sitesStore.setCountryId(parseInt(params?.country_id, 10) || country.id);
    sitesStore.setCityId(parseInt(params?.city_id, 10) || null);
    sitesStore.setDistrictId(parseInt(params?.district_id, 10) || null);

    if (filterBy) {
      let ids: number[] = [];
      if (filterBy === 'districts') {
        ids = JSON.parse(districtIds as string);
        sitesStore.setDistrictFilterIds(ids[0] !== 0 ? ids : []);
      } else if (filterBy === 'cities') {
        ids = JSON.parse(districtIds as string);
        sitesStore.setCityFilterIds(ids[0] !== 0 ? ids : []);
      }
    }
    if (decodeURI(params.address)) {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('searchQueryParams', JSON.stringify(params));
      }
    }
  }, [lat, lon, country_id, city_id, district_id, filterBy, districtIds, cityIds]);

  useEffect(() => {
    if (sitesStore.polygon) {
      sitesStore.fetchSiteMarkers();
    }
  }, [sitesStore.polygon]);

  useEffect(() => {
    if (!sitesStore.isLoading && !sitesStore.isFeaturedSitesLoading) {
      sitesStore.clearSites();
      sitesStore.fetchSites(true);
      sitesStore.fetchFeaturedSites(true);
    }
  }, [sitesStore.searchedLatLon]);

  useEffect(() => {
    if (!sitesStore.isLoading && !sitesStore.isFeaturedSitesLoading) {
      sitesStore.clearSites();
      sitesStore.fetchSites(true);
      sitesStore.fetchFeaturedSites(true);
    }
  }, [sitesStore.countryId,
    sitesStore.cityId,
    sitesStore.districtId, sitesStore.cityFilterIds,
    sitesStore.districtFilterIds]);

  useEffect(() => {
    store.fetchPublicPromotions();
  }, [location]);

  useEffect(() => {
    if (!isFeaturedSitesLoading && !isLoading && (featuredSites.length || sites.length)) {
      setViewed(true);
    }
  }, [isFeaturedSitesLoading, isLoading]);

  const { t } = usePageTranslation('search', 'SearchModule');

  const handleClick = () => {
    sitesStore.resetFilters();
    sitesStore.fetchSites();
    sitesStore.fetchFeaturedSites();
    sitesStore.fetchMapSites();
  };
  const showLoader = (isFeaturedSitesLoading || isLoading)
    && !sites.length && !featuredSites.length;

  return (
    <>
      <Head>
        <title>
          {t('title', { totalResults, countryName: useTranslatedCountryName() })}
        </title>
        <meta name="title" content={t('title', { totalResults, countryName: useTranslatedCountryName() })} />
        <link rel="preload" as="image" href="https://static.spacenextdoor.com/icons/defaultMap.svg" />
        <link rel="preload" as="image" href="/images/SearchLocation/topPics.svg" />
      </Head>
      <MobxProvider promotionStore={store}>
        <Box className={classes.relative}>
          <HomeLayout>
            <Hidden smUp implementation="css">
              <Header />
            </Hidden>
            <SearchLocation>
              <Grid container>
                <Grid item xs={12} sm={8} lg={8} xl={8}>
                  <SearchInput />
                </Grid>
                <Grid item xs={12} sm={4} lg={4} xl={4}>
                  <Hidden smUp>
                    <Divider />
                  </Hidden>
                  <Dates />
                </Grid>
              </Grid>
            </SearchLocation>
            <Grid container>
              <Hidden only="xs">
                <Grid item xs={12} sm={4} lg={4} xl={4}>
                  <Box mb={20} mt={21}>
                    <Hidden xsDown>
                      {showMap && <SitesMap showMap={showMap} setShowMap={setShowMap} />}
                      <ViewOnMap setShowMap={setShowMap} />
                    </Hidden>
                    {!isMobile && <DesktopFilters />}
                  </Box>
                </Grid>
              </Hidden>
              <Grid item xs={12} sm={8} lg={8} xl={8} style={{ overflowX: 'hidden' }}>
                <Hidden smUp>
                  {showMap && <SitesMap showMap={showMap} setShowMap={setShowMap} />}
                  <ViewOnMap setShowMap={setShowMap} />
                </Hidden>
                {!isMobile
                  && (
                    <>
                      <br />
                      <br />
                      <br />
                    </>
                  )}
                {(!!sites.length || !!featuredSites.length || isLoading) && (
                  <Hidden smDown>
                    <Box style={{ marginLeft: '15px' }}>
                      <Typography variant="h1">
                        {t('h1')}
                        {' '}
                        {address?.length ? address : getTranslatedName(country, 'name', router.locale)}
                      </Typography>
                      {/* HIDDEN because the total does not match the number of displayed sites */}
                      {/* <Box mt={5}>
                        <Typography variant="h2" style={{ fontSize: '1.6rem', lineHeight: '18px' }}>
                          {isLoading && <Skeleton width={300} animation="wave" variant="text" />}
                          {!isLoading && (
                            <span>
                              {total}
                              &nbsp;
                              {t('h2')}
                              {' '}
                              <span className={classes.location}>
                                {t('in')}
                                {address}
                              </span>
                            </span>
                          )}
                        </Typography>
                      </Box> */}
                    </Box>
                  </Hidden>
                )}
                {!isMobile && <GetAQuote />}
                {showLoader && <SiteItemLoader />}
                {showLoader && (
                  <Box className={classes.loader}>
                    <Loader />
                  </Box>
                )}
                {isCompMounted && (
                  <Box className={classes.filterWrap}>
                    {viewed && <SearchList />}
                  </Box>
                )}
                {!sites.length && !featuredSites.length && !isLoading
                  && !isFeaturedSitesLoading && <SitesEmptyState handleClick={handleClick} />}
              </Grid>
            </Grid>
          </HomeLayout>
          {isMobile && sitesStore.isFilterPopupActive && <FilterPopup />}
        </Box>
      </MobxProvider>
    </>
  );
};

export default inject(SITES_STORE_KEY)(observer(Search));
