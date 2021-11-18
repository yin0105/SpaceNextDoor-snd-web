import {
  Dialog, makeStyles, Box, Divider, Button, Theme, useMediaQuery, Hidden,
} from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SearchInput from 'components/Search/SearchInput';
import clsx from 'clsx';
import delayFn from 'utilities/delay';
import Loader from 'modules/search/components/Loader';
import usePageTranslation from 'hooks/usePageTranslation';
import { filterPromotions } from 'utilities/promotions';
import filterSitesWithoutSpaces from 'utilities/filterSitesWithoutSpaces';
import Image from '../../../../components/Image';
import FiltersDesktop from '../../components/FiltersDesktop';
import { SitesListStore, SITES_STORE_KEY } from '../../stores/SitesListStore';
import Map from '../../components/GoogleMap';
import SitesList from '../../components/SitesList';
import { ISiteDetails } from '../../components/GoogleMap/Marker';
import { SitesEmptyState } from '../../../../components/Search/EmptyState';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100vw',
    height: '100vh',
    [theme.breakpoints.down('xs')]: {
      height: window.innerHeight,
    },
    '& .gm-style-cc': {
      display: 'none',
    },
  },
  paper: {
    margin: '0',
  },
  paperScrollPaper: {
    maxHeight: '100vh',
    overflow: 'hidden',
    borderRadius: '10px',
    msOverflowStyle: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    [theme.breakpoints.down('xs')]: {
      borderRadius: '0',
      maxHeight: '100%',
    },
  },
  paperWidthSm: {
    maxWidth: '100vw',
    [theme.breakpoints.up('sm')]: {
      width: '1300px',
    },
  },
  container: {
    height: '92vh',
    display: 'flex',
    justifyContent: 'flex-end',
    background: 'white',
    [theme.breakpoints.down('sm')]: {
      width: '100vw',
      height: '100vh',
    },
  },
  filters: {
    display: 'flex',
    flexFlow: 'column',
    width: '27%',
    position: 'absolute',
    zIndex: 0,
    left: '2px',
    transition: 'all 0.5s linear',
    height: '100%',
    overflowY: 'scroll',
    msOverflowStyle: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    [theme.breakpoints.down('md')]: {
      flexBasis: '30% !important',
      width: '30%',
    },
  },
  divider: {
    height: '100vh',
    marginRight: '10px',
    position: 'relative',
    top: '-40px',
    width: '2px',
  },
  subContainer: {
    background: 'white',
    zIndex: 1,
    display: 'flex',
    transition: 'all 0.3s ease',
    [theme.breakpoints.down('xs')]: {
      flexBasis: '100% !important',
    },
  },
  image: {
    width: '30px',
    height: '30px',
    position: 'relative',
    cursor: 'pointer',
    top: '40px',
    right: '14px',
    zIndex: 1,
    transition: 'all 0.3s linear',
  },
  arrow: {
    flexBasis: '1%',
    cursor: 'pointer',
  },
  map: {
    position: 'relative',
    display: 'flex',
    height: '100%',
    flexBasis: '50%',
    flexGrow: 2,
    [theme.breakpoints.down('md')]: {
      flexBasis: '40%',
    },
    [theme.breakpoints.up('sm')]: {
      '& a': {
        display: 'none !important',
      },
    },
    [theme.breakpoints.down('xs')]: {
      flexFlow: 'column',
    },
  },
  sitesList: {
    [theme.breakpoints.up('sm')]: {
      overflowY: 'scroll',
      height: '100%',
      display: 'flex',
      minWidth: '366px',
      msOverflowStyle: 'none',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
  },
  close: {
    position: 'absolute',
    right: '15px',
    top: '15px',
    cursor: 'pointer',
  },
  mapControls: {
    position: 'absolute',
    bottom: '15px',
    display: 'flex',
    flexFlow: 'column',
    right: '15px',
    background: 'transparent',
    [theme.breakpoints.down('xs')]: {
      bottom: '225px',
    },
  },
  zoomControls: {
    borderRadius: '15px',
    background: 'white',
    marginBottom: '10px',
  },
  zoomButton: {
    width: '40px',
    height: '40px',
    minWidth: '40px',
    borderRadius: '10px',
  },
  topBar: {
    transition: 'all 0.3s linear',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'white',
    padding: '15px',
    margin: '0',
    width: '100%',
  },
  navigation: {
    cursor: 'pointer',
  },
  active: {
    width: '6px',
    height: '6px',
    background: 'red',
    borderRadius: '50px',
    position: 'absolute',
    top: '15px',
    right: '15px',
  },
  emptyState: {
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    width: '350px',
    [theme.breakpoints.down('xs')]: {
      background: 'white',
      overflowY: 'hidden',
      width: '85vw',
      height: '66vh',
      paddingTop: '30px',
    },
  },
  emptyStatePaper: {
    borderRadius: '15px',
    margin: 0,
  },
  emptyStatePaperScrollPaper: {
    maxHeight: window.innerHeight,
  },
  searchBar: {
    position: 'absolute',
    top: '25px',
    // width: '32vw',
    right: '25px',
    left: '25px',
    transition: 'all 0.3s ease',
    '& input': {
      background: '#fff',
      paddingLeft: '35px',
    },
  },
  searchBarExpanded: {
    right: '6vw',
    width: '50vw',
  },
}));

const DEFAULT_ZOOM = 13.5;

interface IProps {
  [SITES_STORE_KEY]?: SitesListStore;
  showMap: boolean;
  setShowMap: (showMap: boolean) => void;
}

const SitesMap: React.FC<IProps> = ({ sitesStore, showMap, setShowMap }) => {
  const classes = useStyles();
  const [showFilters, setShowFilters] = useState(true);
  const [activeSiteId, setActiveSiteId] = useState<number>(0);
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);
  const [activeSiteListIndex, setActiveSiteListIndex] = useState(0);
  const [isEmptyStateActive, setIsEmptyStateActive] = useState(true);
  const isMedScreen = useMediaQuery((theme: Theme) => theme.breakpoints.only('md'));
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.only('xs'));
  const router = useRouter();
  const [hasCalledES, setHasCalledES] = useState(false);
  const {
    isLoadingForMap, mapSites,
  } = sitesStore;
  const { t } = usePageTranslation('search', 'SitesMap');
  const sitesForMap = filterSitesWithoutSpaces(mapSites);

  // This will run after we have sites markers for map and then will be blocked by
  // 'hasCalledES' so that it cannot run again.
  // It extends the bounds of our current map to fit in all of the markers, but this
  // only happens when the map is opened from search listings
  useEffect(() => {
    if (sitesStore.mapRef && sitesStore.markers.length && !hasCalledES) {
      const bounds = sitesStore.mapRef?.current?.getBounds();
      if (bounds) {
        delayFn(2000, () => setHasCalledES(true));
      }
      sitesStore.markers.map((s) => {
        bounds?.extend({
          lat: s['address.geo_location']?.[0]?.coordinates[1],
          lng: s['address.geo_location']?.[0]?.coordinates[0],
        });
        return s;
      });
      sitesStore.mapRef.current.fitBounds(bounds);
      const currentZoom = sitesStore.mapRef?.current?.getZoom();
      setZoom(currentZoom <= 13 ? 13 : currentZoom);
    }
  }, [sitesStore.markers]);

  const setViewForMap = (onMap: boolean, onMobile: boolean) => {
    if (onMobile) {
      const htmlEl = document.getElementsByTagName('html')[0];
      htmlEl.style.overflow = onMap ? 'hidden' : 'initial';
      htmlEl.style.height = onMap ? '100%' : 'initial';
      htmlEl.style.margin = onMap ? '0' : 'initial';
      const bodyEl = document.getElementsByTagName('body')[0];
      bodyEl.style.overflowY = onMap ? 'scroll' : 'initial';
      bodyEl.style.height = onMap ? '100%' : 'initial';
    }
  };

  useEffect(() => {
    if (!showMap) { setShowFilters(true); }
    setViewForMap(showMap, isMobile);
    return () => {
      setViewForMap(false, isMobile);
    };
  }, [showMap]);

  useEffect(() => {
    if (!isEmptyStateActive && (isLoadingForMap)) {
      setIsEmptyStateActive(true);
    }
  }, [isEmptyStateActive, isLoadingForMap]);

  const goToSiteDetails = (siteDetails: ISiteDetails) => {
    const { id } = siteDetails;
    const url = `/details/${id}`;
    if (isMobile && id) {
      router.push(url);
      return;
    }
    if (id) window.open(url);
  };

  const handleNavigate = () => {
    const successCallback = (pos: GeolocationPosition) => {
      sitesStore.mapPanTo({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    };
    navigator.geolocation.getCurrentPosition(
      successCallback,
      () => alert(t('alert')),
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  const handleClick = () => {
    sitesStore.resetFilters();
    sitesStore.fetchMapSites();
    sitesStore.fetchSites();
    sitesStore.fetchFeaturedSites();
  };

  const subContainerStyle = isMedScreen ? {
    flexBasis: (showFilters ? '70%' : '98%'),
  } : {
    flexBasis: (showFilters ? '73%' : '98%'),
  };

  const setMapZoom = (val: number) => {
    setZoom(val);
    setTimeout(() => sitesStore.updatePolygon(), 500);
  };

  const sites = (
    <Box className={classes.sitesList} id="div" style={isLoadingForMap ? { overflowY: 'hidden' } : {}}>
      {(!!sitesForMap?.length) && (
        <SitesList
          sites={sitesForMap}
          setActiveSiteId={setActiveSiteId}
          activeSiteId={activeSiteId}
          goToSiteDetails={goToSiteDetails}
          activeSiteListIndex={activeSiteListIndex}
          setActiveSiteListIndex={setActiveSiteListIndex}
        />
      )}
      {isLoadingForMap && document.querySelector('#sndloader')?.scrollIntoView()}
      {(!sitesForMap?.length && !isLoadingForMap && hasCalledES)
        && (
          isMobile ? (
            <Dialog
              open={isEmptyStateActive}
              onClose={() => setIsEmptyStateActive(false)}
              style={{ zIndex: 100000001, height: window.innerHeight }}
              classes={{
                paper: classes.emptyStatePaper,
                paperScrollPaper: classes.emptyStatePaperScrollPaper,
              }}
            >
              <Box className={classes.emptyState}>
                <img
                  className={classes.close}
                  onClick={() => setIsEmptyStateActive(false)}
                  alt=""
                  src="https://static.spacenextdoor.com/icons/close.svg"
                />
                <SitesEmptyState width="85vw" handleClick={handleClick} onMap />
              </Box>
            </Dialog>
          ) : <SitesEmptyState width="366px" handleClick={handleClick} onMap />
        )}
    </Box>
  );

  return (
    <>
      <Dialog
        open={showMap}
        onClose={() => setShowMap(false)}
        className={classes.root}
        style={{ zIndex: 100000000 }}
        classes={{
          paper: classes.paper,
          paperWidthSm: classes.paperWidthSm,
          paperScrollPaper: classes.paperScrollPaper,
        }}
      >
        {(isLoadingForMap) && (<Loader />)}
        <Box className={classes.container}>
          <Hidden xsDown>
            <Box className={classes.filters} style={{ flexBasis: showFilters ? '27%' : '2%' }}>
              <FiltersDesktop />
            </Box>
          </Hidden>
          <Box className={classes.subContainer} style={subContainerStyle}>
            <Hidden xsDown>
              <Box style={{ width: '0' }}>
                <Box className={classes.image} onClick={() => setShowFilters(!showFilters)} style={{ transform: showFilters ? 'rotate(0deg)' : 'rotate(180deg)' }}>
                  <img alt="" src="https://static.spacenextdoor.com/icons/arrow.svg" />
                </Box>
                <Divider className={classes.divider} />
              </Box>
              {/* Sites List for Desktop */}
              {sites}
            </Hidden>
            <Box className={classes.map}>
              <Hidden smUp>
                <Box className={classes.topBar}>
                  <img
                    alt=""
                    src="https://static.spacenextdoor.com/icons/leftarrow.svg"
                    onClick={() => setShowMap(false)}
                  />
                  {/* HOTFIX: hide for now becase of isuse - SND-854  */}
                  {/* <SearchInput onMap /> */}
                  <Box onClick={() => sitesStore.toggleFilterPopup('ACTIVE')}>
                    <Image name="settings" folder="SearchLocation" />
                    {sitesStore.isFiltersApplied && (
                      <span className={classes.active} />
                    )}
                  </Box>
                </Box>
              </Hidden>
              <Map
                sites={sitesForMap}
                zoom={zoom}
                goToSiteDetails={goToSiteDetails}
                setActiveSiteId={setActiveSiteId}
                activeSiteId={activeSiteId}
                containerElement={<div style={{ height: '100%', width: '100%' }} />}
                mapElement={<div style={{ height: '100%' }} />}
              />
              <Hidden smUp>
                {/* Sites List for Mobile */}
                {sites}
              </Hidden>
              {/* <Hidden smUp>
                <Box className={classes.topBar}>
                  <img
                    alt=""
                    src="https://static.spacenextdoor.com/icons/leftarrow.svg"
                    onClick={() => setShowMap(false)}
                  />
                  <SearchInput onMap />
                  <Box onClick={() => sitesStore.toggleFilterPopup('ACTIVE')}>
                    <Image name="settings" folder="SearchLocation" />
                    {sitesStore.isFiltersApplied && (
                      <span className={classes.active} />
                    )}
                  </Box>
                </Box>
              </Hidden> */}
              <Hidden xsDown>
                <Box className={clsx(classes.searchBar, !showFilters && classes.searchBarExpanded)}>
                  {/* HOTFIX: hide for now becase of isuse - SND-854  */}
                  {/* <SearchInput onMap /> */}
                </Box>
              </Hidden>
              <Hidden xsDown>
                <img
                  className={classes.close}
                  onClick={() => setShowMap(false)}
                  alt=""
                  src="https://static.spacenextdoor.com/icons/close.svg"
                />
              </Hidden>
              <Box className={classes.mapControls}>
                <Box className={classes.zoomControls}>
                  <Button className={classes.zoomButton} onClick={() => setMapZoom(zoom + 1)}>
                    <Image name="zoom_in" folder="SearchLocation" extension="png" />
                  </Button>
                  <Divider />
                  <Button className={classes.zoomButton} onClick={() => setMapZoom(zoom - 1)}>
                    <Image name="zoom_out" folder="SearchLocation" extension="png" />
                  </Button>
                </Box>
                <Image
                  name="Navigation"
                  folder="SearchLocation"
                  className={classes.navigation}
                  onClick={handleNavigate}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

export default inject(SITES_STORE_KEY)(observer(SitesMap));
