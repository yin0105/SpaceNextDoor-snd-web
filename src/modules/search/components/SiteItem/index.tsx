import React, { ReactElement, useRef, useEffect } from 'react';
import {
  Box, fade, Grid, makeStyles, Theme, Typography, useMediaQuery,
} from '@material-ui/core';
import clsx from 'clsx';
import { useRouter } from 'next/router';

import * as gtag from 'utilities/gtag';
import isInViewport from 'utilities/isInViewPort';
import { useInView } from 'react-intersection-observer';
import { getTranslatedName, useCurrentCountry } from 'utilities/market';
import { ISite } from 'shared/interfaces';
import { inject, observer } from 'mobx-react';
import ClevertapReact from 'clevertap-react';
import PrimaryButton from '../../../../components/Buttons/PrimaryButton';
import Icon from '../../../../components/Image';
import { objToQueryStr } from '../../../../utilities/objectToQueryString';
import Placeholder from '../../../../components/Placeholder';
import ImageLoader from '../../../../components/ImageLoader';
import { scrollTop } from '../../../../utilities/scrollTop';
import SoldOut from '../../../../components/SoldOut';
import ImagesSlider from '../../../../components/ImagesSlider';
import usePageTranslation from '../../../../hooks/usePageTranslation';
import { getResizedURL } from '../../../../utilities/imageResizer';
import { GetPublicPromotionsQuery_promotions_edges } from '../../../checkout/queries/__generated__/GetPublicPromotionsQuery';
import { filterPromotions } from '../../../../utilities/promotions';
import AuthStore, { AUTH_STORE_KEY } from '../../../app/stores/AuthStore';
import { SITES_STORE_KEY, SitesListStore } from '../../stores/SitesListStore';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    border: '2px solid rgba(243, 247, 249, 1)',
    borderRadius: '15px',
    padding: '28px 14px 14px',
    marginTop: '10px',
    maxWidth: '685px',
    [theme.breakpoints.up('sm')]: {
      padding: '28px 30px 14px',
    },
  },
  featured: {
    border: '2px solid rgba(234, 91, 33, 0.4)',

    [theme.breakpoints.only('xs')]: {
      marginTop: '0',
    },
  },
  featuredImageBox: {
    [theme.breakpoints.only('xs')]: {
      height: '130px !important',
      width: '145px !important',
      '& img': {
        width: '145px',
        height: '130px',
      },
    },
    [theme.breakpoints.up('sm')]: {
      height: '200px !important',
      width: '200px !important',
      '& img': {
        width: '200px',
        height: '200px',
      },
    },
  },
  topPics: {
    height: '82px',
    [theme.breakpoints.down('xs')]: {
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      height: '82px',
      width: '207px',
      top: 0,
      position: 'initial',
      margin: 0,
    },
  },
  header: {
    display: 'flex',
    paddingBottom: '10px',
  },
  featuredBox: {
    marginTop: '6px',
    marginBottom: '10px',
    display: 'flex',
    justifyContent: 'center',
    borderRadius: '10px',
    backgroundColor: '#FFD8C8',

    '& p': {
      color: `${theme.palette.secondary.main} !important`,
    },
  },
  importantText: {
    fontWeight: 600,
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  orange: {
    display: 'flex',
    justifyContent: 'center',
    borderRadius: '15px',
    backgroundColor: theme.palette.secondary.main,
    marginBottom: '10px',
  },
  success: {
    display: 'flex',
    justifyContent: 'center',
    borderRadius: '15px',
    backgroundColor: theme.palette.success.main,
    marginBottom: '10px',
  },
  typographyOrange: {
    color: '#FFFFFF',
    fontWeight: 700,
    fontSize: '1rem',
    textTransform: 'uppercase',
  },
  property: {
    display: 'flex',
  },
  action: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: '4px',
    marginTop: '10px',
  },
  textNearButton: {
    fontSize: '1.4rem',
    fontWeight: 500,
    color: theme.palette.success.main,
  },
  maxWidth: {
    maxWidth: '150px',
  },
  promoBox: {
    maxWidth: '200px',
  },
  boxButton: {
    width: '145px',
  },
  textButton: {
    fontWeight: 700,
    fontSize: '1.3rem',
    color: '#FFFFFF',
  },
  img: {
    minHeight: '100%',
    minWidth: '100%',
    maxHeight: 'inherit',
    maxWidth: 'inherit',
    objectFit: 'cover',
    objectPosition: 'center',
    cursor: 'pointer',
  },
  imageBox: {
    minHeight: '120px',
    minWidth: '120px',
    maxHeight: '215px',
    maxWidth: '215px',
    overflow: 'hidden',
    borderRadius: '16px',
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.only('xs')]: {
      height: '120px',
      width: '120px',
      '& img': {
        width: '120px',
        height: '120px',
      },
    },
    [theme.breakpoints.up('sm')]: {
      height: '200px',
      width: '200px',
      '& img': {
        width: '200px',
        height: '200px',
      },
    },
  },
  spacesWrapper: {
    [theme.breakpoints.down('sm')]: {
      marginTop: '5px',
    },
    [theme.breakpoints.up('sm')]: {
      paddingLeft: '20px',
    },
  },
  promotionText: {
    color: theme.palette.success.main,
    fontWeight: 700,
  },
  featuredImages: {
    position: 'relative',
  },
  featuredHeader: {
    position: 'absolute',
    left: 0,
    bottom: '-50px',
    zIndex: 2,
  },
  imgWrapper: {
    position: 'relative',
    display: 'flex',
    overflow: 'hidden',
    borderRadius: '15px',
    backgroundColor: fade(theme.palette.grey[50], 0.8),

    '& img': {
      alignSelf: 'center',
    },
  },
  mainImageWrapper: {
    height: '325px',
  },
  smallImageWrapper: {
    height: '155px',
    marginLeft: '15px',
  },
  featuredLabel: {
    width: '150px',
  },
  clickable: {
    cursor: 'pointer',
  },
  top: {
    width: '207px',
    height: '74px',
    minHeight: '74px',
    maxHeight: '74px',
    [theme.breakpoints.up('sm')]: {
      position: 'relative',
      marginTop: '-32px',
    },
  },
}));

type Props = {
  isFeatured?: boolean;
  htmlId: string;
  promotions: GetPublicPromotionsQuery_promotions_edges[];
  site: ISite;
  [AUTH_STORE_KEY]?: AuthStore;
  [SITES_STORE_KEY]?: SitesListStore;
};

const SiteItem: React.FC<Props> = ({
  isFeatured = false, site, children, promotions, htmlId, auth, sitesStore,
}) => {
  const { id, address, images } = site;
  const router = useRouter();
  const name = getTranslatedName(site, 'name', router.locale);
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.only('xs'));
  const classes = useStyles();
  const productImpressedRef = useRef(false);
  const siteRef = useRef();
  const countryName = useCurrentCountry().name;
  const { ref, inView } = useInView({ threshold: 0 });
  const {
    filters,
  } = sitesStore;
  const {
    space_features: spaceFeatures,
    space_type: spaceType,
    price_end: priceEnd,
    price_start: priceStart,
  } = filters;
  const districtIds = router.query.address;
  const trackingPlayLoad = {
    customerEmail: auth?.user?.email,
    customerPhone: auth?.user?.phone_number,
    customerName: `${auth?.user?.first_name} ${auth?.user?.last_name}`,
    country: countryName,
    district: districtIds,
    CTSource: null,
    platform: 'WEB',
    siteId: id,
    siteName: site?.name_en,
    priceRange: `${priceStart}${priceEnd}`,
    spaceSize: spaceType,
    featuresSelected: spaceFeatures,
  };

  const goToSiteDetails = (spaceId: number = null) => {
    ClevertapReact.event('Site_selected_Map', trackingPlayLoad);
    gtag.enhancedTrack({
      event: 'productClick',
      ecommerce: {
        click: {
          products: [{
            id,
            category: 'Search Results',
          }],
        },
      },
    });
    const locale = router.locale === router.defaultLocale ? '' : `/${router.locale}`;

    const url = `${locale}/details/${id}?${objToQueryStr({ ...router.query, space_id: spaceId })}`;
    if (isMobile) {
      router.push({
        pathname: `${locale}/details/${id}`,
        query: {
          ...router.query,
          space_id: spaceId,
        },
      })
        .then(() => scrollTop());
      return;
    }

    window.open(url);
  };
  const spacesCount = React.Children.count(children);
  const spaces = React.Children.map(children, (child: ReactElement) => (
    React.cloneElement(child, { onClick: () => goToSiteDetails(child.props.id) })
  ));

  const { t } = usePageTranslation('search', 'SiteItem');

  promotions = filterPromotions(promotions, id);
  useEffect(() => {
    window?.addEventListener('scroll', () => {
      if (isInViewport(siteRef.current) && !productImpressedRef.current) {
        productImpressedRef.current = true;
        gtag.enhancedTrack({
          ecommerce: {
            impressions: [{
              id,
              category: 'Featured Listing',
            }],
          },
        });
      }
    });
    return () => {
      window.removeEventListener('scroll', () => { });
    };
  }, []);
  const getLocalizedTopPicks = () => {
    switch (router.locale) {
      case 'th':
        return 'Thai';
      default:
        return '';
    }
  };
  return (
    <div ref={ref} style={{ padding: '10px 0' }}>
      {isFeatured && isMobile && (
        <div className={classes.top}>
          <div
            className={classes.topPics}
            style={{ backgroundImage: `URL("/images/SearchLocation/topPics${getLocalizedTopPicks()}.svg")` }}
          />
        </div>
      )}
      <div ref={siteRef} className={clsx(classes.root, isFeatured && classes.featured)}>

        {isFeatured && !isMobile && (
          <>
            <Grid container className={classes.featuredImages}>
              <Grid item sm={8}>
                <Box className={clsx(classes.imgWrapper, classes.mainImageWrapper)}>
                  <ImageLoader placeholder={<Placeholder />}>
                    {images[0] && (
                      <img
                        className={classes.img}
                        onClick={() => goToSiteDetails()}
                        src={getResizedURL(images[0], { width: 450 })}
                        alt={`${name}`}
                        loading="lazy"
                      />
                    )}
                  </ImageLoader>
                </Box>
              </Grid>
              <Grid item sm={4}>
                <Box className={clsx(classes.imgWrapper, classes.smallImageWrapper)} ml={7} mb={7}>
                  <ImageLoader placeholder={<Placeholder />}>
                    {images[1] && (
                      <img
                        className={classes.img}
                        onClick={() => goToSiteDetails()}
                        src={getResizedURL(images[1], { width: 250 })}
                        alt={`${name}`}
                        loading="lazy"
                      />
                    )}
                  </ImageLoader>
                </Box>
                <Box className={clsx(classes.imgWrapper, classes.smallImageWrapper)}>
                  <ImageLoader placeholder={<Placeholder />}>
                    {images[2] && (
                      <img
                        className={classes.img}
                        onClick={() => goToSiteDetails()}
                        src={getResizedURL(images[2], { width: 250 })}
                        alt={`${name}`}
                        loading="lazy"
                      />
                    )}
                  </ImageLoader>
                </Box>
              </Grid>
            </Grid>
            <div className={classes.top}>
              <div
                className={classes.topPics}
                style={{ backgroundImage: `URL("/images/SearchLocation/topPics${getLocalizedTopPicks()}.svg")` }}
              />
            </div>
            <br />
            <br />
            <br />
          </>
        )}

        <Grid container className={classes.header}>
          <Grid item xs={12} lg={4} sm={5} xl={4}>
            <Grid container>
              <Grid item xs={isFeatured ? 6 : 5} sm={12} lg={12} xl={12}>
                {(!isFeatured || isMobile) && (
                  <Box className={clsx(classes.imageBox, isFeatured && classes.featuredImageBox)}>
                    <ImagesSlider
                      images={images.map((i) => getResizedURL(i, { width: isMobile ? 150 : 250 }))}
                      onClick={goToSiteDetails}
                      htmlId={htmlId}
                    />
                  </Box>
                )}
              </Grid>
              <Grid item xs={isFeatured ? 6 : 7} sm={12} lg={12} xl={12}>
                <Box>
                  {isFeatured && (
                    <Box>
                      <Box className={clsx(classes.featuredBox, classes.maxWidth)}>
                        <Typography variant="body2" className={classes.importantText}>
                          {t('typography1')}
                        </Typography>
                      </Box>
                      <Box className={clsx(classes.maxWidth, classes.orange)}>
                        <Typography
                          variant="body2"
                          className={isFeatured ? classes.importantText : classes.typographyOrange}
                        >
                          {t('typography2')}
                        </Typography>
                      </Box>
                    </Box>
                  )}
                  {!isFeatured && promotions.map((promo, key) => (
                    <Box key={key} className={clsx(classes.promoBox, classes.success)}>
                      <Typography
                        variant="body2"
                        className={classes.importantText}
                      >
                        {getTranslatedName(promo, 'name', router.locale)}
                      </Typography>
                    </Box>
                  ))}
                  <Box className={classes.clickable} onClick={() => goToSiteDetails()}>
                    <Typography variant={isFeatured && !isMobile ? 'h2' : 'h5'}>
                      {name}
                    </Typography>
                  </Box>
                  <Box className={classes.property}>
                    <Box>
                      <Icon name="location" folder="SearchLocation" />
                    </Box>
                    <Box>
                      <Typography variant={isFeatured && !isMobile ? 'body1' : 'body2'}>
                        &nbsp;
                        {getTranslatedName(address?.district, 'name', router.locale)}
                        ,&nbsp;
                        {getTranslatedName(address?.city, 'name', router.locale)}
                      </Typography>
                    </Box>
                  </Box>
                  {/* Hide Reviews for Launch */}
                  {/* <Box className={classes.property}>
                  <Box>
                    <Icon name="star" folder="SearchLocation" />
                  </Box>
                  <Box>
                    <Typography>
                      4.9
                    </Typography>
                  </Box>
                </Box> */}
                  {isFeatured && promotions.map((promo, key) => (
                    <Box key={key}>
                      <Typography className={classes.promotionText} variant="caption">
                        {getTranslatedName(promo, 'name', router.locale)}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={7} lg={8} xl={8}>
            <Box className={classes.spacesWrapper}>
              <Box>{spaces}</Box>
              {!spacesCount && <SoldOut />}
              <Box className={classes.action}>
                <Box width={isFeatured ? '100%' : ''} className={clsx(!isFeatured && classes.boxButton)}>
                  <PrimaryButton
                    fullWidth={isFeatured}
                    disabled={!spacesCount}
                    onClick={() => goToSiteDetails()}
                    id={`viewAllSitesFor${htmlId}`}
                  >
                    <Typography className={classes.textButton}>
                      {t('typography3')}
                    </Typography>
                  </PrimaryButton>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default inject(AUTH_STORE_KEY, SITES_STORE_KEY)(observer(SiteItem));
