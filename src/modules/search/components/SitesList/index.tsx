import React, { useEffect } from 'react';
import {
  Box, makeStyles, useMediaQuery, Theme,
} from '@material-ui/core/';
import { useSwipeable } from 'react-swipeable';
import clsx from 'clsx';
import { IMapSite, ISite } from 'shared/interfaces';

import InfiniteScroll from 'react-infinite-scroll-component';
import { SitesListStore, SITES_STORE_KEY } from 'modules/search/stores/SitesListStore';
import { observer } from 'mobx-react-lite';
import { inject } from 'mobx-react';
import GetAQuote from 'modules/quotations/components/GetAQuote';
import Site from './Site';
import { ISiteDetails } from '../GoogleMap/Marker';
import SitesListLoader from './SitesListLoader';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '0 17px 0 20px',
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      position: 'absolute',
      left: 0,
      margin: '0',
      bottom: '30px',
      width: '100vw',
      paddingLeft: '3vw',
      transition: 'all 0.4s ease',
    },
  },
  card: {
    width: '329px',
    border: `1px solid ${theme.palette.grey[50]}`,
    borderRadius: '22px',
    padding: '12px',
    cursor: 'pointer',
    [theme.breakpoints.down('xs')]: {
      margin: '10px 5px 0',
      width: '88vw',
      border: 'none',
      background: 'white',
    },
  },
  activeBorder: {
    border: `1px solid ${theme.palette.secondary.main}`,
  },
  siteBorder: {
    borderBottom: '5px solid white',
    borderTop: '5px solid white',
  },
  firstSiteBorder: {
    borderTop: '10px solid white',
  },
  lastSiteBorder: {
    borderBottom: '10px solid white',
  },
  quote: {
    [theme.breakpoints.down('sm')]: {
      position: 'fixed',
      top: '86px',
      left: 0,
    },
    '& div': {
      maxWidth: '329px',
      marginLeft: 0,
      [theme.breakpoints.down('sm')]: {
        maxWidth: '100vw',
        width: '100vw',
        margin: 0,
      },
      '& p': {
        fontSize: '12px',
      },
    },
  },
}));

interface IProps {
  sites: ISite[];
  activeSiteId: number;
  setActiveSiteId: (activeSiteId: number) => void;
  activeSiteListIndex: number;
  setActiveSiteListIndex: (index: number) => void;
  goToSiteDetails: (siteDetails: ISiteDetails) => void;
  [SITES_STORE_KEY]?: SitesListStore
}

const SitesList: React.FC<IProps> = ({
  sites, activeSiteId, setActiveSiteId, goToSiteDetails,
  activeSiteListIndex, setActiveSiteListIndex, sitesStore,
}) => {
  const classes = useStyles();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.only('xs'));

  useEffect(() => {
    const index = sites.findIndex((x) => x.id === activeSiteId);
    if (activeSiteId) {
      setActiveSiteId(activeSiteId);
    } else {
      setActiveSiteId(sites[activeSiteListIndex].id);
    }
    setActiveSiteListIndex(index);
  });

  const previousArrowClick = () => {
    const newActive = Math.max(activeSiteListIndex - 1, 0);
    setActiveSiteId(sites[newActive].id);
    setActiveSiteListIndex(newActive);
  };

  const forwardArrowClick = () => {
    if (activeSiteListIndex < (sites.length - 1)) {
      setActiveSiteId(sites[activeSiteListIndex + 1].id);
      setActiveSiteListIndex(activeSiteListIndex + 1);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: forwardArrowClick,
    onSwipedRight: previousArrowClick,
  });

  const position = isMobile ? {
    left: `-${activeSiteListIndex * (90.6)}vw`,
  } : {};

  return (
    <Box className={classes.root} {...handlers} style={position}>
      <Box className={classes.quote}>
        <GetAQuote />
      </Box>
      <InfiniteScroll
        dataLength={sites.length}
        next={() => sitesStore.fetchMapSites()}
        hasMore={sitesStore.mapHasMore}
        loader={<SitesListLoader />}
        style={isMobile ? { display: 'flex' } : {}}
        scrollableTarget="div"
      >
        {sites?.map((site, i) => (
          <Box
            className={isMobile ? '' : clsx(classes.siteBorder,
              i === sites.length - 1 && classes.lastSiteBorder,
              i === 0 && classes.firstSiteBorder)}
            onClick={() => goToSiteDetails({ id: site?.id })}
            id={`site${i}`}
            key={i}
          >
            <Box
              className={clsx(classes.card,
                !isMobile && activeSiteId === site.id && classes.activeBorder)}
              onMouseOver={() => setActiveSiteId(site.id)}
            >
              <Site site={site} />
            </Box>
          </Box>
        ))}
      </InfiniteScroll>
    </Box>
  );
};

export default inject(SITES_STORE_KEY)(observer(SitesList));
