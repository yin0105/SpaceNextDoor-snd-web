import {
  Box, fade, Grid, makeStyles, Theme, useMediaQuery,
} from '@material-ui/core';
import { useRouter } from 'next/router';
import { Skeleton } from '@material-ui/lab';
import { useRef, useEffect } from 'react';
import * as gtag from 'utilities/gtag';
import isInViewport from 'utilities/isInViewPort';
import { getTranslatedName } from 'utilities/market';
import Grey1Typography from '../../../../../../components/Typographies/Grey1Typography';
import Image from '../../../../../../components/Image';
import Location from '../../../Location';
import { SimilarStorageQuery_sites_edges } from '../../../../queries/__generated__/SimilarStorageQuery';
import ImageLoader from '../../../../../../components/ImageLoader';
import { getResizedURL } from '../../../../../../utilities/imageResizer';
import { getTranslatedPlace } from '../../../../../../utilities/locations';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '18px',
    display: 'inline-block',
    cursor: 'pointer',
    marginLeft: '-10px',
    marginRight: '25px',
    backgroundColor: 'white',
    borderRadius: '22px',
    maxHeight: '163px',
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      position: 'relative',
      maxWidth: '345px',
      minWidth: '345px',
    },
    [theme.breakpoints.up('lg')]: {
      marginRight: '10px',
      marginLeft: '0',
      boxShadow: '0px 15px 40px #E9E9E9',
    },
  },
  container: {
    whiteSpace: 'initial',
    [theme.breakpoints.up('lg')]: {
      width: '280px',
    },
  },
  infoBox: {
    padding: '10px 0px 0px 15px',
  },
  heading: {
    color: '#292929',
    fontSize: '16px',
    fontWeight: 600,
  },
  subHeading: {
    fontSize: '14px',
    color: '#989898',
  },
  locationContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginTop: '5px',
  },
  ratingContainer: {
    display: 'flex',
    paddingTop: '5px',
  },
  reviewNumbers: {
    color: '#60C3EE',
    fontSize: '14px',
  },
  imgWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: '15px',
    height: '122px',
    backgroundColor: fade(theme.palette.grey[50], 0.8),

    [theme.breakpoints.down('sm')]: {
      width: '118px',
      height: '118px',
    },
  },
  storageImage: {
    minWidth: '100%',
    minHeight: '100%',
    height: 'inherit',
    width: 'inherit',
    maxHeight: 'inherit',
    maxWidth: 'inherit',
    objectFit: 'cover',
    objectPosition: 'center',
  },
  rating: {
    paddingLeft: '5px',
    color: '#292929',
  },
}));

interface IProps {
  similarStorage: SimilarStorageQuery_sites_edges
}

const truncateStr = (str = '', len: number) => (
  str.length > len ? `${str.substr(0, len)}...` : str
);

const OneItem: React.FC<IProps> = (props) => {
  const classes = useStyles();
  const router = useRouter();
  const { similarStorage } = props;
  const productImpressedRef = useRef(false);
  const siteRef = useRef();
  const getAddress = () => (
    truncateStr(getTranslatedPlace(similarStorage?.address, router?.locale), 18)
  );
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.only('xs'));
  const goToSiteStorage = () => {
    gtag.enhancedTrack({
      event: 'productClick',
      ecommerce: {
        click: {
          products: [{
            id: similarStorage.id,
            category: 'Similar Storage',
          }],
        },
      },
    });
    const locale = router.locale === router.defaultLocale ? '' : `/${router.locale}`;
    const url = `${locale}/details/${similarStorage.id}`;

    if (isMobile) {
      router.push(url)
        .then(() => window.scrollTo(0, 0));
      return;
    }
    window.open(url);
  };
  const { images } = similarStorage;
  useEffect(() => {
    window?.addEventListener('scroll', () => {
      if (isInViewport(siteRef.current) && !productImpressedRef.current) {
        productImpressedRef.current = true;
        gtag.enhancedTrack({
          ecommerce: {
            impressions: [{
              id: similarStorage.id,
              category: 'Similar Storage',
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
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={classes.root}
      onClick={goToSiteStorage}
      ref={siteRef}
    >
      <Grid container className={classes.container}>
        <Grid item xs={5}>
          <Box className={classes.imgWrapper}>
            <ImageLoader
              loading={false}
              placeholder={(
                <Skeleton height="100%" width="100%" className={classes.storageImage} variant="rect" />
              )}
            >
              {images[0] && (
                <img
                  src={getResizedURL(images[0], { width: 300 })}
                  alt="type icon"
                  className={classes.storageImage}
                />
              )}
            </ImageLoader>
          </Box>
        </Grid>
        <Grid item xs={7}>
          <Box className={classes.infoBox}>
            <Box>
              <Grey1Typography className={classes.heading}>
                {truncateStr(getTranslatedName(similarStorage, 'name', router.locale), 40)}
              </Grey1Typography>
            </Box>

            <Box>
              <Grey1Typography className={classes.subHeading}>
                {truncateStr(getTranslatedName(similarStorage, 'description', router.locale) || '', 15)}
              </Grey1Typography>
            </Box>

            <Box className={classes.locationContainer}>
              <Location
                location={getAddress()}
                addMargin={false}
                loading={false}
              />
            </Box>
            {/* Hide Reviews for Launch */}
            {/* <Box className={classes.ratingContainer}>
              <Box>
                <Image name="star" folder="DetailPage" />
              </Box>
              <Box>
                <Grey1Typography className={classes.rating}>
                  4.9
                </Grey1Typography>
              </Box>
              <Box>
                <Grey1Typography className={classes.reviewNumbers}>
                  (4,623 reviews)
                </Grey1Typography>
              </Box>
            </Box> */}
            <Box />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default OneItem;
