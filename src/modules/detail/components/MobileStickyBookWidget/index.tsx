import {
  Box, makeStyles, Typography, fade,
} from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import DayJS from 'dayjs';
import { useRouter } from 'next/router';
import scrollIntoView from 'scroll-into-view';
import ClevertapReact from 'clevertap-react';
import { useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useCurrentCountry } from 'utilities/market';
import { FixedCountry, StockManagementType } from 'typings/graphql.types';
import clsx from 'clsx';
import queryString from 'query-string';
import { IDynamicAdsParam } from 'typings/dynamic-ads.type';
import PrimaryButton from '../../../../components/Buttons/PrimaryButton';
import SiteDetailStore, { SITE_DETAIL_STORE } from '../../stores/SiteDetailStore';
import { SitesListStore, SITES_STORE_KEY } from '../../../search/stores/SitesListStore';
import { getTranslatedName } from '../../../../utilities/market';
import * as gtag from '../../../../utilities/gtag';
import usePageTranslation from '../../../../hooks/usePageTranslation';
import SpaceTypeDetails from '../SpacetypeDetails';
import AffiliateTypeform from '../AffiliateTypeform';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    background: 'white',
    width: '100%',
    zIndex: 99,
    bottom: 0,
    borderBottom: `1px solid ${fade(theme.palette.grey[100], 0.1)}`,
    marginLeft: '-13px',
    marginRight: '-28px',
    padding: '15px 28px 15px',
    borderTopRightRadius: '25px',
    borderTopLeftRadius: '25px',
    boxShadow: '0px 9px 40px rgba(51, 51, 51, 0.1)',
  },
  priceBox: {
    marginTop: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',

    '& h3': {
      fontSize: '1.7rem',
      whiteSpace: 'nowrap',
    },
    '& h4': {
      fontSize: '1.5rem',
      fontWeight: 400,
    },
  },
  sizeText: {
    color: theme.palette.grey[100],
    textAlign: 'right',
  },
  button: {
    color: 'white',
    fontSize: '1.3rem',
    fontWeight: 700,
    width: '100%',
    height: '50px',
    marginTop: '10px',
  },
  clickable: {
    textDecoration: 'underline',
    cursor: 'pointer',
    textAlign: 'right',
  },
  details: {
    fontSize: '12px',
    textDecoration: 'underline',
  },
  quote: {
    color: theme.palette.primary.main,
    border: `2px solid ${theme.palette.primary.main}`,
    marginTop: '10px',
    background: '#fff',
    '&:hover': {
      background: '#fff',
    },
  },
  quoteText: {
    color: theme.palette.primary.main,
  },
  or: {
    color: 'black',
    textDecoration: 'none',
  },
  spaceText: {
    color: theme.palette.secondary.main,
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
}));

interface IProps {
  store?: SiteDetailStore;
  [SITES_STORE_KEY]?: SitesListStore;
}

const MobileStickyBookWidget: React.FC<IProps> = ({
  store: {
    price, space, site, spaceTypes,
  }, sitesStore: { moveInDate },
}) => {
  const router = useRouter();
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [isTypeformOpen, setIsTypeformOpen] = useState(false);
  const { lang } = useTranslation();
  const currentCountry = useCurrentCountry();
  const translatedName = getTranslatedName(site, 'name', router.locale);
  const goToSpaces = () => {
    const el = document.getElementById('spaceSelector');
    if (el) {
      scrollIntoView(el, {
        align: {
          topOffset: -350,
        },
      });
    }
  };

  const goToCheckOut = () => {
    const trackingPayload = {
      spaceSize: space?.size,
      spaceUnit: space?.size_unit,
      spaceId: space?.id,
      baseAmount: space?.prices[0]?.price_per_month,
      price,
      platform: 'WEB',
      siteName: translatedName,
      siteId: site?.id,
      country: currentCountry,
      language: lang || '',
    };

    const dynamicAdsParams: IDynamicAdsParam = {
      content_type: ['home_listing', 'product'],
      listing_type: 'for_rent_by_agent',
      content_ids: `${site?.id}`,
      currency: currentCountry.currency,
      city: site.address?.city?.name_en,
      region: site.address?.city?.name_en,
      availability: 'for_rent',
      country: currentCountry.name,
    };

    gtag.track('InitiateCheckout', dynamicAdsParams);
    ClevertapReact.event('book_now', trackingPayload);

    router.push({
      pathname: '/checkout',
      query: {
        space_id: space?.id,
        move_in: router.query.move_in,
        available_until: space?.stock_available_until
          ? DayJS(space?.stock_available_until).format('DD-MM-YYYY')
          : null,
        move_out: space?.stock_available_until
          ? DayJS(space?.stock_available_until).format('DD-MM-YYYY')
          : router.query.move_out,
      },
    });
  };

  const goToQuotation = () => {
    const params = {
      space_id: space?.id,
      move_in: router.query.move_in,
      site_id: site?.id,
      district_id: site?.address?.district?.id,
      spaceType_id: space?.space_type?.id,
    };
    const url = `/get-a-quote?${queryString.stringify(params)}`;
    router.push(url);
  };

  const getQuoteHandler = () => {
    if (router.defaultLocale === 'ja') {
      setIsTypeformOpen(true);
      return;
    }
    goToQuotation();
  };

  const bookNowHandler = () => {
    if (site?.stock_management_type === StockManagementType.AFFILIATE
      && currentCountry.name === FixedCountry.Japan) {
      setIsTypeformOpen(true);
      return;
    }
    goToCheckOut();
  };

  const { t } = usePageTranslation('details', 'MobileStickyBookWidget');
  return (
    <Box className={classes.root}>
      <Box>
        <Box className={clsx(space && classes.container)}>
          {!space && moveInDate && (
            <Typography>
              <span
                role="presentation"
                className={clsx(classes.clickable, classes.spaceText)}
                onClick={goToSpaces}
              >
                {t('typography1')}
              </span>
              <span
                role="presentation"
                className={classes.or}
              >
                {' '}
                {t('or')}
              </span>
              <span
                role="presentation"
                className={clsx(classes.clickable, classes.quoteText)}
                onClick={goToQuotation}
                color="primary"
              >
                {t('typography2')}
              </span>
            </Typography>
          )}
          {!space && !moveInDate && (
            <Typography color="secondary">
              {t('typography3')}
            </Typography>
          )}
          {space && (
            <Box className={classes.priceBox}>
              <Typography variant="h3">
                {price}
                /
              </Typography>
              <Typography variant="h4">
                &nbsp;
                {t('typography4')}
              </Typography>
            </Box>
          )}
          {space && (
            <Box>
              <Typography variant="body1" className={classes.sizeText}>
                {space?.size}
                &nbsp;
                {space?.size_unit}
              </Typography>
              <Typography
                onClick={() => setIsOpen(true)}
                className={classes.details}
                color="primary"
              >
                {t('unitDetails')}
              </Typography>
              <SpaceTypeDetails
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                spaceTypeId={space?.space_type?.id}
                spaceTypes={spaceTypes}
              />
            </Box>
          )}
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="flex-end" gridGap={15}>
          {site?.stock_management_type !== StockManagementType.AFFILIATE
            && (
              <PrimaryButton
                className={clsx(classes.button, classes.quote)}
                onClick={getQuoteHandler}
                style={!site ? { border: 'none' } : {}}
                disabled={!site}
              >
                {t('primaryButton2')}
              </PrimaryButton>
            )}
          <PrimaryButton
            onClick={bookNowHandler}
            disabled={!space}
            className={classes.button}
          >
            {t('primaryButton1')}
          </PrimaryButton>
        </Box>
        <AffiliateTypeform isOpen={isTypeformOpen} setIsOpen={setIsTypeformOpen} />
      </Box>
    </Box>
  );
};

export default inject(SITE_DETAIL_STORE, SITES_STORE_KEY)(observer(MobileStickyBookWidget));
