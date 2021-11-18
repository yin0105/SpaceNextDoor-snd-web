import React, { FC, useEffect, useRef } from 'react';
import {
  Box, makeStyles, Typography, useMediaQuery, Theme, Link,
} from '@material-ui/core/';
import isInViewport from 'utilities/isInViewPort';
import * as gtag from 'utilities/gtag';
import { scrollTop } from 'utilities/scrollTop';
import { useRouter } from 'next/router';
import { getTranslatedName } from 'utilities/market';
import Image from '../../../../../components/Image';
import FeaturedSitesImageCarousel from '../Crousel';
import usePageTranslation from '../../../../../hooks/usePageTranslation';
import { getResizedURL } from '../../../../../utilities/imageResizer';
import { FeaturedSitesQuery_sites_edges } from '../queries/__generated__/FeaturedSitesQuery';

const useStyles = makeStyles((theme) => ({
  mobile: {
    display: 'block',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  container: {
    padding: '25px 25px 35px',
    overflowX: 'hidden',
    position: 'relative',
    [theme.breakpoints.up('md')]: {
      overflowX: 'auto',
      padding: '0 200px',
      margin: '30px 0',
    },
  },
  header: {
    [theme.breakpoints.up('md')]: {
      fontSize: '34px',
      marginBottom: '30px',
    },
  },
  root: {
    padding: '20px 0 50px',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    gridGap: '10px',
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: '1fr 1fr',
      gridGap: '25px',
    },
  },
  card: {
    height: '200px',
    width: '100%',
    margin: '0 auto',
    border: `1px solid ${theme.palette.grey[50]}`,
    borderRadius: '22px',
    padding: '12px 20px',
    [theme.breakpoints.up('md')]: {
      height: '263px',
      width: '100%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  tags: {
    display: 'flex',
    marginBottom: '15px',
  },
  tag: {
    fontSize: '10px',
    width: '112px',
    height: '20px',
    marginRight: '10px',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textTransform: 'uppercase',
    fontWeight: 700,
    [theme.breakpoints.up('md')]: {
      marginBottom: '10px',
    },
  },
  featured: {
    background: theme.palette.secondary.light,
    color: theme.palette.secondary.main,
  },
  bestSeller: {
    background: theme.palette.secondary.main,
    color: '#ffffff',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '118px 1fr',
    gridGap: '22px',
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: '135px 80px',
    },
    [theme.breakpoints.up('lg')]: {
      gridTemplateColumns: '287px 1fr',
    },
    [theme.breakpoints.up('xl')]: {
      gridTemplateColumns: '360px 1fr',
    },
  },
  info: {
    [theme.breakpoints.up('md')]: {
      paddingTop: '15px',
    },
  },
  location: {
    display: 'grid',
    gridTemplateColumns: '10px 1fr',
    gridGap: '10px',
    paddingTop: '10px',
  },
  rating: {
    display: 'grid',
    gridTemplateColumns: '20px 30px 1fr',
  },
  points: {
    position: 'absolute',
    bottom: '42px',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
    gridGap: '10px',
    left: 'calc(50% - 50px)',
    [theme.breakpoints.up('md')]: {
      bottom: '30px',
    },
    '& > div': {
      width: '9px',
      height: '9px',
      background: theme.palette.secondary.light,
      borderRadius: '50%',
    },
  },
  activePoint: {
    background: `${theme.palette.secondary.main} !important`,
  },
  link: {
    color: 'black',
    cursor: 'pointer',
  },
  blue: {
    color: '#60C3EE',
  },
  bold: {
    fontWeight: 600,
  },
  price: {
    display: 'flex',
  },
  desktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  },
  mapPoint: {
    width: '16px',
    height: '16px',
  },
}));

interface IProps {
  site: FeaturedSitesQuery_sites_edges
  index: number
}
const FeaturedListing: FC<IProps> = ({ site, index }) => {
  const classes = useStyles();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.only('xs'));
  const router = useRouter();
  const siteRef = useRef();
  const productImpressedRef = useRef(false);
  const goToSiteDetails = (id, country, cityId) => {
    gtag.enhancedTrack({
      event: 'productClick',
      ecommerce: {
        click: {
          products: [{
            id: site.id,
            category: 'Featured Listing',
          }],
        },
      },
    });
    const url = `/${router.locale}/details/${id}?location=${country}&city_id=${cityId}`;

    if (isMobile) {
      router.push(url).then(() => scrollTop());
      return;
    }
    window.open(url);
  };
  const { t } = usePageTranslation('home', 'FeaturedListings');
  useEffect(() => {
    window?.addEventListener('scroll', () => {
      if (isInViewport(siteRef.current) && !productImpressedRef.current) {
        productImpressedRef.current = true;
        gtag.enhancedTrack({
          ecommerce: {
            impressions: [{
              id: site.id,
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

  return (
    <div ref={siteRef} className={classes.card} key={index}>
      <Box className={classes.mobile}>
        <Box className={classes.tags}>
          <Box className={`${classes.tag} ${classes.featured}`}>
            {t('tag1')}
          </Box>
          <Box className={`${classes.tag} ${classes.bestSeller}`}>
            {t('tag2')}
          </Box>
        </Box>
      </Box>

      <Box className={classes.grid}>
        <Box>
          <FeaturedSitesImageCarousel
            images={(site?.images || []).slice(0, 5)
              .map((im) => getResizedURL(im, { width: 300 }))}
            country={site?.address?.country?.name_en}
            cityId={site?.address?.city?.id}
            siteId={site?.id}
          />
        </Box>
        <Box className={classes.info}>
          <Box className={`${classes.tags} ${classes.desktop}`}>
            <Box className={`${classes.tag} ${classes.featured}`}>
              {t('tag1')}
            </Box>
            <Box className={`${classes.tag} ${classes.bestSeller}`}>
              {t('tag2')}
            </Box>
          </Box>
          <Typography
            variant="h4"
          >
            <Link
              id={`featuredListing${index + 1}`}
              className={classes.link}
              onClick={() => goToSiteDetails(
                site?.id,
                site?.address?.country?.name_en,
                site?.address?.city?.id,
              )}
            >
              {getTranslatedName(site, 'name', router.locale)}
            </Link>
          </Typography>

          <Box className={classes.location}>
            <Image className={classes.mapPoint} name="map-point" folder="Homepage" />
            <Typography variant="body2">
              {`${getTranslatedName(site?.address?.district, 'name', router.locale)}, ${getTranslatedName(site?.address?.city, 'name', router.locale)
              }`}
            </Typography>
          </Box>
          {/* Hide Reviews for Launch */}
          {/* <Box className={classes.rating}>
                  <Image name="star" folder="Homepage" />
                  <Typography className={classes.bold}>4.9</Typography>
                  <Typography className={classes.blue} variant="body2">
                    (4,623 reviews)
                  </Typography>
                </Box> */}
          <Typography variant="body2">{t('typography1')}</Typography>
          <Box className={classes.price}>
            <Typography variant="h3">
              {site?.spaces?.edges?.[0]?.prices?.[0]?.currency_sign}
              {site?.spaces?.edges?.[0]?.prices?.[0]?.price_per_month}
              /
            </Typography>
            <Typography variant="body2">
              {' '}
              {t('typography2')}
            </Typography>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default FeaturedListing;
