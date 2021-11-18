import React, { useEffect, useState } from 'react';
import { Marker } from 'react-google-maps';
import { useRouter } from 'next/router';
import { makeStyles, useMediaQuery, Theme } from '@material-ui/core';
import InfoBox from 'react-google-maps/lib/components/addons/InfoBox';
import { getTranslatedName, useCurrentCountry } from 'utilities/market';
import { IMapSite, ISite } from 'shared/interfaces';
import { SitesListStore, SITES_STORE_KEY } from 'modules/search/stores/SitesListStore';
import { observer } from 'mobx-react-lite';
import { inject } from 'mobx-react';
import ClevertapReact from 'clevertap-react';
import usePageTranslation from '../../../../../hooks/usePageTranslation';
import { getResizedURL } from '../../../../../utilities/imageResizer';
import AuthStore, { AUTH_STORE_KEY } from '../../../../app/stores/AuthStore';

const useStyles = makeStyles({
  box: {
    width: '350px',
    minWidth: '350px',
    background: 'white',
    borderRadius: '20px',
    transform: 'translate(-120px,10px) !important',
    '& img': {
      display: 'none',
    },
  },
  root: {
    display: 'flex',
    width: '100%',
    maxWidth: '100%',
    padding: '15px',
    justifyContent: 'space-between',
  },
  image: {
    width: '140px',
    height: '120px',
    borderRadius: '10px',
  },
  info: {
    display: 'flex',
    flexFlow: 'column',
    width: '170px',
    height: '120px',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: '1.4rem',
    marginTop: 0,
    fontWeight: 600,
    marginBottom: '5px',
  },
  price: {
    fontWeight: 'bold',
    fontSize: '1.8rem',
    marginTop: '10px',
  },
  promos: {
    background: '#06C270',
    fontSize: '1rem',
    fontWeight: 500,
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 3px',
    height: '20px',
    borderRadius: '10px',
    margin: 0,
  },
});

export interface ISiteDetails {
  id: number;
}

interface IProps {
  marker: any;
  isActive: boolean;
  setActiveSiteId: (activeSiteId: number) => void;
  goToSiteDetails: (siteDetails: ISiteDetails) => void;
  [SITES_STORE_KEY]?: SitesListStore;
  [AUTH_STORE_KEY]?: AuthStore;
}

const INACTIVE_POINT = '/images/SearchLocation/inactivePoint.png';
const ACTIVE_POINT = '/images/SearchLocation/activePoint.png';

const CustomMarker: React.FC<IProps> = ({
  marker, isActive, setActiveSiteId, goToSiteDetails, sitesStore, auth,
}) => {
  const { locale, query } = useRouter();
  const [showInfo, setShowInfo] = useState(false);
  const classes = useStyles();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.only('xs'));
  const [site, setSite] = useState<ISite>(null);
  const { t } = usePageTranslation('search', 'Marker');
  const { name } = useCurrentCountry();
  const districtIds = query?.address;

  const handleHover = async () => {
    setActiveSiteId(marker?.id[0]);
    setShowInfo(true);
    if (!site) {
      await sitesStore.fetchMarkerSite(marker?.id[0], false);
    }
  };

  useEffect(() => {
    const res = sitesStore.mapSites.filter((s) => s.id === marker?.id[0]);
    if (res.length === 1) {
      setSite(res[0]);
    }
  }, [sitesStore.mapSites]);

  const handleClick = async () => {
    const {
      filters,
    } = sitesStore;
    const {
      space_features: spaceFeatures,
      space_type: spaceType,
      price_end: priceEnd,
      price_start: priceStart,
    } = filters;
    const trackingPayload = {
      customerEmail: auth?.user?.email,
      customerPhone: auth?.user?.phone_number,
      customerName: `${auth?.user?.first_name}${auth?.user?.last_name}`,
      country: name,
      district: districtIds,
      CTSource: null,
      platform: null,
      siteId: marker?.id[0],
      siteName: 'view-on-map',
      priceRange: `${priceStart || ''}${priceEnd || ''}`,
      spaceSize: spaceType,
      featuresSelected: spaceFeatures,
    };
    ClevertapReact.event('Site_selected_Map', trackingPayload);

    if (isMobile) {
      setActiveSiteId(marker?.id[0]);
      if (!site) {
        await sitesStore.fetchMarkerSite(marker?.id[0], true);
      } else {
        sitesStore.sortMapSites(marker?.id[0]);
      }
      return;
    }
    goToSiteDetails({
      id: marker?.id[0],
    });
  };

  return (
    <Marker
      position={{ lat: marker['address.geo_location']?.[0]?.coordinates[1], lng: marker['address.geo_location']?.[0]?.coordinates[0] }}
      icon={isActive ? ACTIVE_POINT : INACTIVE_POINT}
      onMouseOver={() => !isMobile && handleHover()}
      onMouseOut={() => setShowInfo(false)}
      onClick={handleClick}
    >
      {(showInfo && !isMobile && site)
        && (
          <InfoBox
            options={{
              boxClass: classes.box,
              disableAutoPan: true,
            }}
          >
            <div className={classes.root}>
              {site && (
                <>
                  <img style={{ display: 'block' }} className={classes.image} src={getResizedURL(site.images[0], { width: 140 })} alt="" />
                  <div className={classes.info}>
                    <p className={classes.promos}>{t('promos')}</p>
                    <p className={classes.name}>
                      {getTranslatedName(site, 'name', locale).length > 25 ? `${getTranslatedName(site, 'name', locale).slice(0, 25)}...` : getTranslatedName(site, 'name', locale)}
                    </p>
                    <div>
                      <img
                        alt=""
                        src="https://static.spacenextdoor.com/icons/map-point.svg"
                        style={{ display: 'initial' }}
                      />
                      <span style={{ fontSize: '1.2rem' }}>
                        {`${getTranslatedName(site?.address?.district, 'name', locale)}, ${getTranslatedName(site?.address?.city, 'name', locale)}`}
                      </span>
                    </div>
                    <span style={{ fontSize: '1.4rem' }}>
                      {t('from')}
                      &nbsp;
                      <span className={classes.price}>
                        {site?.spaces?.edges[0]?.prices[0]?.currency_sign}
                        {site?.spaces?.edges[0]?.prices[0]?.price_per_month}
                      </span>
                      /
                      {t('month')}
                    </span>
                  </div>
                </>
              )}
            </div>
          </InfoBox>
        )}
    </Marker>
  );
};

export default inject(SITES_STORE_KEY, AUTH_STORE_KEY)(observer(CustomMarker));
