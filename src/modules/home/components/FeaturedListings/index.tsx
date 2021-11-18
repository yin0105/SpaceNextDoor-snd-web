import React, { FC } from 'react';
import {
  Box, makeStyles, Typography, useMediaQuery, Theme,
} from '@material-ui/core/';
import Skeleton from '@material-ui/lab/Skeleton';
import { useQuery } from '@apollo/client';
import ImageLoader from 'components/ImageLoader';
import { useCurrentCountry } from '../../../../utilities/market';
import { FeaturedSitesQuery, FeaturedSitesQueryVariables } from './queries/__generated__/FeaturedSitesQuery';
import { FEATURED_SITES_QUERY } from './queries/index';
import usePageTranslation from '../../../../hooks/usePageTranslation';
import FeaturedListing from './FeaturedListing';
import { Carousel } from './KeenCarousel';
import SkeletonLoader from './SkeletonLoader';

const useStyles = makeStyles((theme) => ({
  mobile: {
    display: 'block',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  container: {
    overflowX: 'hidden',
    position: 'relative',
    padding: '0px 25px',
    [theme.breakpoints.down('xs')]: {
      height: '400px',
      maxHeight: '400px',
      padding: '10px 25px',
      marginTop: '15px',
    },
    [theme.breakpoints.up('md')]: {
      overflowX: 'visible',
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
    width: '327px',
    margin: '0 auto',
    border: `1px solid ${theme.palette.grey[50]}`,
    borderRadius: '22px',
    padding: '12px 20px',
    [theme.breakpoints.up('md')]: {
      height: '263px',
      width: '507px',
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
      gridTemplateColumns: '287px 1fr',
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
}));

const FeaturedListings: FC = () => {
  const classes = useStyles();
  const country = useCurrentCountry();

  const { data, loading } = useQuery<FeaturedSitesQuery, FeaturedSitesQueryVariables>(
    FEATURED_SITES_QUERY, {
      variables: {
        limit: 4,
        offset: 0,
        isFeatured: true,
        countryId: { _eq: country.id },
      },
    },
  );

  const sites = data?.sites?.edges || [];
  const { t } = usePageTranslation('home', 'FeaturedListings');
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  return (
    <Box className={classes.container}>
      {
        sites.length > 0 && (
          <Typography className={classes.header} variant="h2">
            {t('h2', { country: country?.name })}
          </Typography>
        )
      }
      <ImageLoader
        loading={loading}
        placeholder={loading && (
          <Box>
            {isMobile
              ? (
                <Box>
                  <Skeleton variant="text" height={30} width="100%" animation="wave" />
                  <Skeleton variant="text" height={30} width="50%" animation="wave" />
                </Box>
              )
              : (
                <Box marginBottom={10}>
                  <Skeleton variant="text" height={40} width="55%" animation="wave" />
                </Box>
              ) }
            <Box className={classes.root}>
              {Array.from({ length: 4 }).map((_, i) => <SkeletonLoader key={i} />)}
            </Box>
          </Box>
        )}
      >
        {
          !!sites.length && isMobile ? (
            <Carousel>
              {sites.map((site, i) => (
                <div className="keen-slider__slide" key={i}>
                  <FeaturedListing index={i} site={site} />
                </div>
              ))}
            </Carousel>
          ) : !!sites.length && (
            <Box className={classes.root}>
              {sites.map((site, i) => (
                <FeaturedListing key={i} index={i} site={site} />
              ))}
            </Box>
          )
        }
      </ImageLoader>
    </Box>
  );
};

export default FeaturedListings;
