import React, { FC } from 'react';
import {
  makeStyles, Box, Typography, fade,
} from '@material-ui/core';
import dayJs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useRouter } from 'next/router';

import Image from '../../../../../components/Image';
import { OrderStatus } from '../../../../../typings/graphql.types';
import { GetBookingQuery_booking } from '../../../queries/__generated__/GetBookingQuery';
import usePageTranslation from '../../../../../hooks/usePageTranslation';
import { getTranslatedName } from '../../../../../utilities/market';

dayJs.extend(utc);

interface IProps {
  booking: GetBookingQuery_booking;
}

const useStyles = makeStyles((theme) => ({
  buildingDetails: {
    color: theme.palette.grey[200],
  },
  header: {
    display: 'flex',
  },
  flex: {
    display: 'flex',
  },
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
  },
  amenitie: {
    '&:not(:last-of-type)': {
      marginRight: 11,
    },
    '& img': {
      marginRight: 5,
      maxHeight: 20,
      [theme.breakpoints.down('md')]: {
        marginRight: 10,
      },
    },
    '& span': {
      fontSize: 16,
      color: '#888888',
    },
  },
  img: {
    width: 118,
    height: 118,
    objectFit: 'cover',
    marginRight: 40,
    borderRadius: 20,
    [theme.breakpoints.down('md')]: {
      marginRight: 24,
    },
  },
  location: {
    fontSize: '12px',
    lineHeight: '15px',
    [theme.breakpoints.up('sm')]: {
      fontSize: '14px',
      lineHeight: '20px',
    },
  },
  locationIcon: {
    transform: 'translateY(3px)',
    [theme.breakpoints.down('md')]: {
      height: 13,
    },
  },
  star: {
    marginRight: 7,
  },
  rating: {
    marginLeft: 8,
    color: '#888888',
  },
  title: {
    fontWeight: 600,
    fontSize: '22px',
    lineHeight: '35px',
    marginBottom: '10px',
    [theme.breakpoints.down('md')]: {
      marginTop: 10,
      fontSize: '16px',
      lineHeight: '18px',
      marginBottom: '11px',
    },
  },
  infoBlock: {
    padding: '20px 0',
    [theme.breakpoints.up('sm')]: {
      padding: '25px 0',
    },
    '&:not(:last-of-type)': {
      borderBottom: `2px solid ${fade(theme.palette.grey[100], 0.1)}`,
    },
  },
  blockTitle: {
    fontSize: 18,
    fontWeight: 600,
    color: theme.palette.grey[200],
    [theme.breakpoints.down('md')]: {
      fontSize: '14px',
      lineHeight: '18px',
    },
  },
  infoBlockHeader: {
    fontWeight: 600,
    fontSize: '14px',
    marginBottom: '10px',
    [theme.breakpoints.up('sm')]: {
      fontSize: '18px',
      marginBottom: '20px',
    },
  },
  infoBlockData: {
    color: theme.palette.grey[100],
    '& .MuiTypography-caption, & .MuiTypography-root': {
      fontSize: '12px',
      marginRight: '5px',
      position: 'relative',
      [theme.breakpoints.up('sm')]: {
        fontSize: '16px',
      },
    },
  },
  black: {
    color: theme.palette.grey[200],
  },
  pickupAddress: {
    lineHeight: '30px',
  },
  storageBlock: {
    display: 'grid',
    gridTemplateColumns: '100px 1fr',
    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: '250px 1fr',
    },
  },
  storageImage: {
    borderRadius: '15px',
    boxShadow: '0 15px 40px rgba(51, 51, 51, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100px',
    [theme.breakpoints.up('sm')]: {
      height: '250px',
    },
    '& img': {
      maxWidth: '100%',
    },
  },
  storageTags: {
    marginLeft: '40px',
    [theme.breakpoints.up('sm')]: {
      marginLeft: '100px',
    },
    '& .MuiTypography-root': {
      [theme.breakpoints.up('sm')]: {
        marginBottom: '10px',
      },
      '&:before': {
        content: '""',
        borderRadius: '50%',
        position: 'absolute',
        backgroundColor: '#888888',
        top: '5px',
        left: '-20px',
        width: '9px',
        height: '9px',
        [theme.breakpoints.up('sm')]: {
          top: '3px',
          left: '-34px',
          width: '14px',
          height: '14px',
        },
      },
    },
  },
  calendarBlock: {
    width: 150,
    [theme.breakpoints.down('md')]: {
      width: 'calc((100% - 35px) / 2) ',
    },
    '& p:first-child': {
      color: '#484451',
      FontSize: 10,
      fontWeight: 600,
    },
    '& span': {
      color: '#989898',
      fontSize: 12,
    },
    '& img': {
      float: 'right',
    },
  },
  divider: {
    height: 38,
    width: 1,
    background: '#E1E0E3',
  },
  storage: {
    marginTop: 34,
    padding: '10px 22px 6px 19px',
    display: 'flex',
    alignItems: 'center',
    border: `1px solid ${theme.palette.grey[50]}`,
    borderRadius: 21,
    width: 440,
    [theme.breakpoints.down('sm')]: {
      marginTop: 10,
      width: 'calc(100%)',
      padding: '10px 15px 6px 9px',
    },
    '& img': {
      height: 70,
      width: 70,
      [theme.breakpoints.down('sm')]: {
        height: 60,
        width: 60,
      },
    },
    '& div': {
      '& p:first-child': {
        fontSize: 16,
        fontWeight: 600,
      },
      '& p:last-child': {
        fontSize: 12,
        lineHeight: '18px',
        color: '#888888',
        fontWeight: 400,
        [theme.breakpoints.down('sm')]: {
          fontSize: 10,
        },
      },
    },
    '& p': {
      marginLeft: 'auto',
      paddingLeft: 20,
      fontSize: 22,
      fontWeight: 600,
      [theme.breakpoints.down('sm')]: {
        paddingLeft: 8,
        fontSize: 18,
      },
    },
  },
  insurance: {
    marginRight: 17,
  },
  map: {
    marginTop: 32,
    width: 594,
    height: 275,
    marginBottom: 29,
    objectFit: 'cover',
    [theme.breakpoints.down('md')]: {
      marginTop: 22,
      marginBottom: 20,
      width: '100%',
    },
  },
}));

const BuildingDetails: FC<IProps> = ({ booking }) => {
  const classes = useStyles();
  const { locale } = useRouter();
  /* eslint-disable @typescript-eslint/naming-convention */
  const {
    site_name, site_address, move_in_date, move_out_date, original_space,
    is_insured, insurance, auto_renewal, orders, original_site,
    space_price_per_month, currency_sign,
  } = booking || {};

  const pickup = (orders || []).find((order) => {
    if (order.status === OrderStatus.CONFIRMED && !!order.order_pick_up_service) {
      return true;
    }
    return false;
  });

  const { t } = usePageTranslation('checkout', 'BuildingDetails');

  return (
    <Box className={classes.buildingDetails}>
      <Box className={classes.header}>
        <img className={classes.img} src={original_site?.images?.[0]} alt={site_name} />
        <Box>
          <Typography className={classes.location}>
            <Image className={classes.locationIcon} name="flag" folder="BookingConfirmed" />
            <span>{getTranslatedName(site_address?.district, 'name', locale)}</span>
          </Typography>
          <Typography className={classes.title}>
            {site_name}
          </Typography>
        </Box>
      </Box>
      <Box className={`${classes.infoBlock} ${classes.flex}`}>
        <Box className={classes.calendarBlock}>
          <Typography>{t('typography1')}</Typography>
          <Typography>
            <span>{dayJs(move_in_date).format('DD MMM YYYY')}</span>
            <Image folder="BookingConfirmed" name="calendar" />
          </Typography>
        </Box>
        <Box className={classes.divider} ml={10} mr={7} />
        <Box className={classes.calendarBlock}>
          <Typography>{t('typography2')}</Typography>
          <Typography>
            <span>{auto_renewal ? t('span') : dayJs(move_out_date).format('DD MMM YYYY')}</span>
            <Image folder="BookingConfirmed" name="calendar" />
          </Typography>
        </Box>
      </Box>
      {/* <Box className={classes.infoBlock}>
        <Typography className={classes.blockTitle}>Location</Typography>
        <img
          className={classes.map}
          src={original_site?.images?.[0]}
          alt={site_name}
        />
        <Typography>Garden park avenue D2, 03447 Singapore</Typography>
      </Box> */}
      {!!pickup && (
        <Box className={classes.infoBlock}>
          <Typography className={classes.infoBlockHeader}>
            {t('typography3')}
          </Typography>
          <Box className={classes.infoBlockData}>
            <Typography className={classes.pickupAddress}>
              {pickup.order_pick_up_service?.address}
            </Typography>
            <Typography variant="caption" className={classes.black}>
              {t('typography4')}
            </Typography>
            <Typography variant="caption">
              {`${dayJs(pickup.order_pick_up_service.pickup_time).utc().format('h:mm A')} - `}
              {dayJs(pickup.order_pick_up_service.pickup_time).utc().add(2, 'hour').format('h:mm A')}
            </Typography>
          </Box>
        </Box>
      )}
      <Box className={classes.infoBlock}>
        <Typography className={classes.blockTitle}>{t('typography5')}</Typography>
        {original_space?.space_type && (
          <Box className={classes.storage}>
            <img src={original_space.space_type.icon} alt="storage" />
            <Box>
              <Typography className={classes.blockTitle}>
                {original_space.size}
                {original_space.size_unit}
              </Typography>
              <Typography className={classes.blockTitle}>
                {original_space.space_type.name_en}
              </Typography>
            </Box>
            <Typography className={classes.blockTitle}>
              {currency_sign}
              {space_price_per_month}
            </Typography>
          </Box>
        )}
      </Box>
      {is_insured && !!insurance && (
        <Box className={classes.infoBlock}>
          <Typography className={classes.infoBlockHeader}>
            {t('typography6')}
          </Typography>
          <Box className={classes.flex}>
            <Image className={classes.insurance} folder="BookingConfirmed" name="insurance" />
            <Box className={classes.infoBlockData}>
              <Typography>
                {`${getTranslatedName(insurance, 'name', locale)} ${t('typography7')} ${insurance?.country?.currency_sign}${insurance?.covered_amount}`}
              </Typography>
              <Typography>
                {`${insurance?.country?.currency_sign}${insurance?.price_per_day && (insurance.price_per_day * 30).toFixed(2)} ${t('typography8')}`}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default BuildingDetails;
