import React from 'react';
import { Box, makeStyles, Typography } from '@material-ui/core/';
import { useRouter } from 'next/router';
import { getTranslatedName } from 'utilities/market';
import { IMapSite, ISite } from 'shared/interfaces';
import Image from '../../../../../components/Image';
import usePageTranslation from '../../../../../hooks/usePageTranslation';
import { getResizedURL } from '../../../../../utilities/imageResizer';

const useStyles = makeStyles((theme) => ({
  image: {
    width: '145px',
    height: '145px',
    maxHeight: '100%',
    minHeight: '100%',
    objectFit: 'cover',
    borderRadius: '16px',
    marginRight: '15px',
    [theme.breakpoints.down('sm')]: {
      width: '135px',
      height: '135px',
    },
  },
  grid: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',

  },
  info: {
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'space-between',
    height: '125px',
    width: '160px',
    [theme.breakpoints.up('md')]: {
      paddingTop: '5px',
      flexBasis: '50%',
    },
  },
  location: {
    display: 'grid',
    gridTemplateColumns: '10px 1fr',
    gridGap: '10px',
    paddingTop: '10px',
  },
  link: {
    color: 'black',
    cursor: 'pointer',
  },
  price: {
    display: 'flex',
    '& h5': {
      fontSize: '1.6rem',
    },
  },
  promos: {
    background: '#06C270',
    width: '100%',
    textAlign: 'center',
    fontSize: '0.9rem',
    fontWeight: 500,
    color: 'white',
    padding: '0 5px',
    borderRadius: '10px',
    marginBottom: '3px',
  },
  name: {
    height: '40px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
}));

interface IProps {
  site: ISite
}
const Site: React.FC<IProps> = ({ site }) => {
  const { locale } = useRouter();
  const classes = useStyles();
  const { t } = usePageTranslation('search', 'Site');
  return (
    <Box className={classes.grid}>
      <img src={getResizedURL(site.images?.[0], { width: 300 })} alt="" className={classes.image} loading="lazy" />
      <Box className={classes.info}>
        {/* TODO- May be added later when design is updated */}
        {/* <Typography className={classes.promos}>{t('promos')}</Typography> */}
        <Typography variant="h5" className={classes.name}>
          {getTranslatedName(site, 'name', locale).length > 5 ? `${getTranslatedName(site, 'name', locale).slice(0, 25)}...` : getTranslatedName(site, 'name', locale)}
        </Typography>
        <Box className={classes.location}>
          <Image name="map-point" folder="Homepage" />
          <Typography variant="body2">
            {getTranslatedName(site?.address?.district, 'name', locale)}
            ,
            <Typography variant="body2">
              {getTranslatedName(site?.address?.city, 'name', locale)}
            </Typography>
          </Typography>
        </Box>
        <Box className={classes.price}>
          {t('from')}
          &nbsp;
          <Typography variant="h5">
            {site?.spaces.edges[0]?.prices[0]?.currency_sign}
            {site?.spaces.edges[0]?.prices[0]?.price_per_month}
            /
          </Typography>
          {t('month')}
        </Box>
      </Box>
    </Box>
  );
};

export default Site;
