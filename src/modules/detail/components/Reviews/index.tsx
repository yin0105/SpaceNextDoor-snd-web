import {
  Box, Button, Divider, Drawer, IconButton, makeStyles, Typography,
} from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import Rating from '@material-ui/lab/Rating';
import { APP_ENV } from 'config';
import usePageTranslation from 'hooks/usePageTranslation';
import Head from 'next/head';
import { getTranslatedName } from 'utilities/market';
import { SiteReviewsQuery_sites_edges } from 'modules/detail/queries/__generated__/SiteReviewsQuery';
import { useRouter } from 'next/router';
import Image from '../../../../components/Image';

const useStyles = makeStyles((theme) => ({
  boxBurger: {
    padding: 0,
    display: 'flex',
    justifyContent: 'space-between',
    marginRight: '60px',
    [theme.breakpoints.down('xs')]: {
      padding: '20px 0 10px',
      margin: '0 0 20px',
    },
    '& h2': {
      marginLeft: '15%',
      [theme.breakpoints.down('xs')]: {
        marginLeft: '24%',
      },
    },
  },
  drawer: {
    '& .MuiDrawer-paper': {
      width: '75%',
      overflow: 'hidden',
      bottom: 0,
      top: 'auto',
      [theme.breakpoints.down('xs')]: {
        width: '100%',
      },
    },
  },
  container: {
    display: 'flex',
    flexFlow: 'column',
    overflow: 'hidden',
  },
  reviews: {
    padding: '0px 60px 100px 80px',
    height: '75vh',
    display: 'flex',
    flexFlow: 'column',
    overflowY: 'scroll',
    msOverflowStyle: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    '& .jiaUca': {
      marginBottom: '50px',

    },
    [theme.breakpoints.down('sm')]: {
      padding: '15px 10px 80px',
      height: '80vh',
    },
  },
  tabs: {
    display: 'flex',
    paddingLeft: '80px',
    [theme.breakpoints.down('xs')]: {
      marginTop: '10px',
      paddingLeft: '10px',
    },

  },
  button: {
    backgroundColor: '#00A0E3',
    color: '#fff',
    fontSize: '0.9em',
    width: '130px',
    padding: '10px',
    borderRadius: '10px',
    marginRight: '10px',
    '&:hover': {
      background: '#00A0E3',
    },
    [theme.breakpoints.up('sm')]: {
      background: '#fff',
      color: '#00A0E3',
      fontWeight: '600',
      fontSize: '14px',
      width: 'max-content',
      padding: '10px 0',
      borderBottom: '2px solid #00A0E3',
      borderRadius: '0',
      marginBottom: '-1px',
      textTransform: 'capitalize',
      justifyContent: 'flex-start',
      marginRight: '70px',
      '&:hover': {
        background: '#fff',
      },
    },
  },
  inactive: {
    backgroundColor: '#E9E9E9',
    [theme.breakpoints.up('sm')]: {
      background: '#fff',
      color: '#333333',
      border: 'none',
      marginBottom: '0',
      fontWeight: 400,
    },
  },
  divider: {
    margin: '0 60px 0 80px',
    [theme.breakpoints.down('xs')]: {
      margin: '15px 0 0',
    },
  },
  logos: {
    display: 'flex',
    marginTop: '25px',
    [theme.breakpoints.down('xs')]: {
      transform: 'scale(0.8)',
      paddingRight: '10px',
      marginTop: '45px',
    },
  },
  subContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '-50px',
  },
  verified: {
    marginBottom: '-20px',
    marginLeft: '16px',
    fontWeight: 500,
  },
  rating: {
    display: 'flex',
    color: '#888888',
  },
  stars: {
    fontSize: '2.5rem',
    color: '#eb704c',
  },
  yotpotRating: {
    marginLeft: '10px',
    [theme.breakpoints.up('sm')]: {
      marginLeft: '80px',
    },
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      position: 'absolute',
      top: 0,
      width: '100vw',
      borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    },
    '& h3': {
      [theme.breakpoints.up('sm')]: {
        paddingLeft: '32px',
      },
    },

  },
  headerContainer: {
    disply: 'flex',
    flexFlow: 'column',
    [theme.breakpoints.down('xs')]: {
      paddingTop: '37px',
    },
  },
}));

interface IProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  site: SiteReviewsQuery_sites_edges;
}

const Reviews: React.FC<IProps> = ({
  isOpen,
  setIsOpen,
  site,
}) => {
  const classes = useStyles();
  const { locale } = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const { t } = usePageTranslation('details', 'Reviews');
  const googleReviewsId = site?.google_reviews_widget_id;
  const totalYotpoReviews = site?.reviews?.total;
  const siteIdWithEnv = `${APP_ENV === 'prod' ? 'production' : APP_ENV}_${site?.id}`;

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  return (
    <>
      <Head>
        {isMounted && isOpen && (
          <>
            {activeTab === 0 && (
              <script
                type="text/javascript"
                dangerouslySetInnerHTML={{
                  __html: `
            {(function e() { var e = document.createElement("script");
             e.type = "text/javascript", e.async = true,
              e.src = "//staticw2.yotpo.com/DbWQDXuepWRILVgRJgezbrKIXs2xWcNXpZ4TERDO/widget.js";
               var t = document.getElementsByTagName("script")[0]; t.parentNode.insertBefore(e, t) })()};
               setTimeout(function(){
                 if(typeof yotpo === 'object'){
                  yotpo.refreshWidgets();
                 }
              },1000);
              `,
                }}
              />
            )}
            <script src="https://apps.elfsight.com/p/platform.js" async />
          </>
        )}
      </Head>
      <Drawer
        open={isOpen}
        onClose={() => setIsOpen(!isOpen)}
        className={classes.drawer}
        anchor="left"
      >
        <Box className={classes.container}>
          <Box className={classes.boxBurger}>
            <Box className={classes.headerContainer}>
              <Box className={classes.header}>
                <IconButton onClick={() => setIsOpen(!isOpen)}>
                  <Image name="close" folder="Homepage" />
                </IconButton>
                <Typography variant="h2">{t('reviews')}</Typography>
              </Box>
              {!!totalYotpoReviews && (
                <Box className={classes.yotpotRating}>
                  <Typography>{t('typography1')}</Typography>
                  <Typography className={classes.rating}>
                    <Typography style={{ fontWeight: 600, fontSize: '18px', color: 'black' }}>
                      {site.reviews.average_rating}
                      /5 &nbsp;
                    </Typography>
                    {totalYotpoReviews}
                    {' '}
                    {t('typography2')}
                  </Typography>
                  <Rating className={classes.stars} name="read-only" value={site.reviews.average_rating} readOnly />
                </Box>
              )}
            </Box>
            <Box className={classes.logos} style={{ transform: !googleReviewsId && 'scale(1)' }}>
              <Image folder="DetailPage" name="yotpo" />
              {!!googleReviewsId && (
                <Box>
                  <Typography className={classes.verified}>{t('typography3')}</Typography>
                  <Image folder="DetailPage" name="googleLogo" />
                </Box>
              )}
            </Box>
          </Box>
          <Box className={classes.tabs} style={{ marginTop: totalYotpoReviews ? 10 : 0 }}>
            <Button className={activeTab === 0 ? classes.button : `${classes.button} ${classes.inactive}`} onClick={() => setActiveTab(0)}>{t('reviews')}</Button>
            {googleReviewsId && <Button className={activeTab === 1 ? classes.button : `${classes.button} ${classes.inactive}`} onClick={() => setActiveTab(1)}>{t('googleReviews')}</Button>}
          </Box>
          <Divider className={classes.divider} />
          <Box className={classes.reviews}>
            {activeTab === 0 && (
              <div
                className="yotpo yotpo-main-widget"
                data-product-id={siteIdWithEnv}
                data-price=""
                data-currency=""
                data-name={getTranslatedName(site, 'name', locale)}
                data-url={`https://spacenextdoor.com/details/${site?.id}`}
                data-image-url=""
              />
            )}
            {activeTab === 1 && <div className={googleReviewsId} />}
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Reviews;
