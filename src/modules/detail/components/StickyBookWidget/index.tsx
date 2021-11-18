import {
  Box, makeStyles, Typography, fade, Grid,
} from '@material-ui/core';
import Sticky from 'react-stickynode';
import clsx from 'clsx';
import DayJS from 'dayjs';
import { inject, observer } from 'mobx-react';
import { useRouter } from 'next/router';
import { Skeleton } from '@material-ui/lab';
import ClevertapReact from 'clevertap-react';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';
import queryString from 'query-string';

import { FixedCountry, SpaceSizeUnit, StockManagementType } from 'typings/graphql.types';
import { IDynamicAdsParam } from 'typings/dynamic-ads.type';
import { useCurrentCountry, getTranslatedName } from 'utilities/market';
import PrimaryButton from '../../../../components/Buttons/PrimaryButton';
import styles from './StickyBookWidget.module.css';
import SiteDetailStore, { SITE_DETAIL_STORE } from '../../stores/SiteDetailStore';
import Image from '../../../../components/Image';
import { SitesListStore, SITES_STORE_KEY } from '../../../search/stores/SitesListStore';
import * as gtag from '../../../../utilities/gtag';
import usePageTranslation from '../../../../hooks/usePageTranslation';
import Promotion from '../Promotion';

import { GetPublicPromotionsQuery_promotions_edges_customer_buys } from '../../../checkout/queries/__generated__/GetPublicPromotionsQuery';
import AlertDiscount from '../AlertDiscount';
import SpaceTypeDetails from '../SpacetypeDetails';
import AffiliateTypeform from '../AffiliateTypeform';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '50px',
    marginLeft: '60px',
    width: '350px',
    boxShadow: '0px 15px 40px rgba(51, 51, 51, 0.1)',
    background: 'white',
    borderRadius: '22px',
    padding: '0 30px 23px',
  },
  title: {
    padding: '15px 30px 11px',
    margin: '0 -30px',
    borderBottom: `1px solid ${fade(theme.palette.grey[100], 0.1)}`,
    fontSize: '1.6rem',
    display: 'flex',
    alignItems: 'center',
    '& img': {
      marginRight: '5px',
    },
  },
  location: {
    fontSize: '16px',
  },
  shoppingIcon: {
    display: 'flex !important',
    '& > svg': {
      height: '18px',
      width: '18px',
      '& > path': {
        fill: '#000',
      },
    },
  },
  priceBox: {
    padding: '16px 0 23px 0',
  },
  textContainer: {
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
  },
  disabled: {
    color: theme.palette.secondary.main,
    padding: '0 40px',
    textAlign: 'center',
  },
  quoteText: {
    color: theme.palette.primary.main,
    padding: '0 20px',
    textAlign: 'center',
  },
  button: {
    color: 'white',
    fontSize: '1.3rem',
    fontWeight: 700,
  },
  sizeContainer: {
    display: 'flex',
  },
  sizes: {
    fontSize: '14px',
  },
  price: {
    fontSize: '22px',
    lineHeight: '23px',
    marginRight: '8px',
    marginTop: '12px',
  },
  spaceImage: {
    height: '97px',
    width: '113px',
    cursor: 'pointer',
  },
  iconsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  label: {},
  clickable: {
    textDecoration: 'underline',
    cursor: 'pointer',
  },
  details: {
    fontSize: '12px',
    textDecoration: 'underline',
    height: '32px',
    width: '125px',
    textAlign: 'center',
    cursor: 'pointer',
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
}));
interface IProps {
  store?: SiteDetailStore;
  [SITES_STORE_KEY]?: SitesListStore;
  location: string;
  loading: boolean;
  promotions: GetPublicPromotionsQuery_promotions_edges_customer_buys[];
  isOpenDiscount: boolean;
}

const StickyBookWidget: React.FC<IProps> = ({
  store: {
    space, price, site, spaceTypes,
  }, loading, location, promotions,
  sitesStore: { moveInDate },
  isOpenDiscount,
}) => {
  const router = useRouter();
  const classes = useStyles();
  const { lang } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isTypeformOpen, setIsTypeformOpen] = useState(false);
  const currentCountry = useCurrentCountry();
  const translatedName = getTranslatedName(site, 'name', router.locale);
  const goToSpaces = () => {
    const el = document.getElementById('spaceSelector');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
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

  const { t } = usePageTranslation('details', 'StickyBookWidget');
  const size = [SpaceSizeUnit.sqm, SpaceSizeUnit.tatami].includes(space?.size_unit) ? 'm' : 'ft';
  return (
    <Sticky
      enabled
      activeClass={styles.bookingbox__sticky_active}
      innerZ={100}
      top={20}
    >
      <Box className={clsx(classes.root, styles.bookingbox__sticky)}>
        <Box className={classes.title}>
          <Image name="location" folder="SearchLocation" />
          {!loading && (
            <Typography noWrap className={classes.location}>{location}</Typography>
          )}
          {loading && (
            <Skeleton height={22} width={200} animation="wave" variant="text" />
          )}
        </Box>
        <Promotion promotionData={promotions} loading={loading} />
        <Box className={classes.priceBox}>
          {!space && moveInDate && (
            <Box className={classes.textContainer}>
              <Typography
                className={clsx(classes.disabled, classes.clickable)}
                onClick={goToSpaces}
              >
                {t('typography1')}
              </Typography>
              <Typography>{t('or')}</Typography>
              <Typography
                className={clsx(classes.quoteText, classes.clickable)}
                onClick={goToQuotation}
              >
                {t('typography2')}
              </Typography>
            </Box>
          )}
          {!space && !moveInDate && (
            <Typography className={classes.disabled}>
              {t('typography3')}
            </Typography>
          )}
          {space && (
            <Grid container>
              <Grid item sm={1} className={classes.iconsContainer}>
                <Box>
                  <Image name="home" folder="DetailPage" className={classes.shoppingIcon} asInlineEl />
                </Box>
                <Box>
                  <Image name="shopping" folder="DetailPage" className={classes.shoppingIcon} asInlineEl />
                </Box>
              </Grid>
              <Grid item sm={5} className={classes.sizeContainer}>
                <Box display="flex" justifyContent="space-between" flexDirection="column">
                  <Box>
                    <Typography className={classes.label}>{t('typography5')}</Typography>
                  </Box>
                  <Box display="flex" alignItems="flex-end">
                    <Typography variant="h2" className={classes.price}>{space?.size}</Typography>
                    <Typography align="right" className={classes.label}>{space?.size_unit}</Typography>
                  </Box>
                  <Box className={classes.sizes}>{`${space?.width} ${size} x ${space?.length} ${size}`}</Box>
                  <Typography className={classes.label}>{t('typography4')}</Typography>
                </Box>
              </Grid>
              <Grid item sm={6}>
                <Box onClick={() => setIsOpen(true)}>
                  <img src={space?.space_type?.icon} alt="" className={classes.spaceImage} />
                  <Typography color="primary" className={classes.details}>{t('unitDetails')}</Typography>
                </Box>
                <SpaceTypeDetails
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  spaceTypeId={space?.space_type?.id}
                  spaceTypes={spaceTypes}
                />
              </Grid>
              <Grid item sm={1} />
              <Grid item sm={11}>
                <Typography variant="h1" color="primary" className={classes.price}>{price}</Typography>
              </Grid>
            </Grid>
          )}
        </Box>
        <Box>
          <PrimaryButton
            disabled={!space}
            className={classes.button}
            onClick={bookNowHandler}
          >
            {t('primaryButton1')}
          </PrimaryButton>
        </Box>
        {site?.stock_management_type !== StockManagementType.AFFILIATE && (
          <Box>
            {!isOpenDiscount && (
              <PrimaryButton
                className={clsx(classes.button, classes.quote)}
                onClick={getQuoteHandler}
                style={!site ? { border: 'none' } : {}}
                disabled={!site}
              >
                {t('primaryButton2')}
              </PrimaryButton>
            )}
          </Box>
        )}
      </Box>
      {isOpenDiscount && <AlertDiscount />}
      <AffiliateTypeform isOpen={isTypeformOpen} setIsOpen={setIsTypeformOpen} />
    </Sticky>
  );
};

export default inject(SITE_DETAIL_STORE, SITES_STORE_KEY)(observer(StickyBookWidget));
