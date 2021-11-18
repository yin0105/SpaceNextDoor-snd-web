import {
  Box, makeStyles,
} from '@material-ui/core';
import dynamic from 'next/dynamic';
import { inject, observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import * as gtag from 'utilities/gtag';
import { IDynamicAdsParam } from 'typings/dynamic-ads.type';
import { useCurrentCountry } from 'utilities/market';
import { SitesListStore } from './stores/SitesListStore';
import SiteItemLoader from './components/SiteItemLoader';

const FeaturedSites = dynamic(() => import('./containers/FeaturedSites'), { ssr: false });
const SitesList = dynamic(() => import('./containers/SitesList'), { ssr: false });

const useStyles = makeStyles((theme) => ({
  location: {
    fontWeight: 400,
    color: `${theme.palette.grey[100]}`,
  },
  sitesList: {
    width: '100%',
    minHeight: '100px',
  },
}));

interface IProps {
  sitesStore?: SitesListStore;
  districtId?: number;
  cityId?: number;
}

const SearchList: React.FunctionComponent<IProps> = ({ sitesStore }) => {
  const classes = useStyles();
  const {
    sites, isLoading, featuredSites, isFeaturedSitesLoading,
  } = sitesStore;
  const currentCountry = useCurrentCountry();
  const [viewed, setViewed] = useState(false);
  const { ref: sitesListRef, inView: sitesListInView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (sitesListInView && !viewed) {
      setViewed(true);
    }
  }, [sitesListInView, viewed]);

  useEffect(() => {
    if (sites.length && featuredSites.length) {
      const dynamicAdsParams: IDynamicAdsParam = {
        content_type: ['home_listing', 'product'],
        listing_type: 'for_rent_by_agent',
        content_ids: featuredSites.map((site) => `${site.id}`).concat(sites.map((site) => `${site.id}`)),
        currency: currentCountry.currency,
        city: sites[0]?.address.city?.name_en,
        region: sites[0]?.address.city?.name_en,
        availability: 'for_rent',
      };
      gtag.track('Search', dynamicAdsParams);
    }
  }, [sites, featuredSites, currentCountry]);

  return (
    <Box>
      {!!featuredSites.length && <FeaturedSites />}
      {isFeaturedSitesLoading && <div style={{ minHeight: '100vh', height: '100vh' }} />}
      <div ref={sitesListRef} className={classes.sitesList}>
        {viewed && (!!sites.length && <SitesList />)}
      </div>
      {isLoading && !sites.length && <SiteItemLoader />}

    </Box>
  );
};

export default inject('sitesStore')(observer(SearchList));
