import React, { FC, useState } from 'react';
import {
  makeStyles, Box, Typography, fade, Grid, useMediaQuery, Theme, Button, Divider,
} from '@material-ui/core';
import dayJs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Image from '../../../../../components/Image';
import { BookingStatus } from '../../../../../typings/graphql.types';
import { GetBookingQuery_booking } from '../../../queries/__generated__/GetBookingQuery';
import usePageTranslation from '../../../../../hooks/usePageTranslation';
import LocationMap from '../../../../detail/components/Map';
import { PrimaryButton } from '../../../../../components/Buttons';
import { ICenter } from '../../../../search/components/GoogleMap';
import { getTranslatedName } from '../../../../../utilities/market';

dayJs.extend(utc);

interface IProps {
  booking: GetBookingQuery_booking;
  loading?: boolean;
}

const useStyles = makeStyles((theme) => ({
  buildingDetails: {
    marginTop: 20,
    color: theme.palette.grey[200],
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    '&:not(:last-of-type)': {
      borderBottom: `1px solid ${fade(theme.palette.grey[100], 0.3)}`,
    },
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column-reverse',
    },
    paddingBottom: 20,
  },
  parts: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 16,
    lineHeight: '20px',
    padding: '20px 0 14px 0',
    '&:not(:last-of-type)': {
      borderBottom: `1px solid ${fade(theme.palette.grey[100], 0.3)}`,
    },
    [theme.breakpoints.down('md')]: {
      fontSize: 12,
    },
  },
  partWithTitle: {
    position: 'relative',
    fontSize: 16,
    [theme.breakpoints.down('md')]: {
      '& > :first-child': {
        fontSize: 14,
      },
      fontSize: 12,
    },
    lineHeight: '20px',
    padding: '20px 0 14px 0',
    '&:not(:last-of-type)': {
      borderBottom: `1px solid ${fade(theme.palette.grey[100], 0.3)}`,
    },
  },
  img: {
    width: 324,
    height: 157,
    objectFit: 'cover',
    borderRadius: 22,
    [theme.breakpoints.down('md')]: {
      marginBottom: 29,
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
  locationText: {
    fontSize: 12,
    marginLeft: 5,
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
    maxWidth: 207,
    fontSize: '22px',
    lineHeight: '35px',
    marginBottom: '4px',
    [theme.breakpoints.down('md')]: {
      marginTop: 10,
      fontSize: '16px',
      lineHeight: '18px',
      marginBottom: '11px',
    },
  },
  stars: {
    marginLeft: -2,
  },
  insurance: {
    marginRight: 17,
  },
  green: {
    display: 'flex',
    color: theme.palette.success.main,
  },
  checkMark: {
    width: 15,
    marginRight: 5,
  },
  unitImg: {
    width: 106,
    height: 106,
    padding: '18px 9px 11px 8px',
    borderRadius: 10,
    boxShadow: '0px 15px 40px 0px rgba(233, 233, 233, 1)',
    '& img': {
      width: 88,
      height: 76,
    },
    [theme.breakpoints.down('sm')]: {
      width: 52,
      height: 52,
      padding: '9px 5px 6px 4px',
      '& img': {
        width: 44,
        height: 38,
      },
    },
  },
  unitInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    fontSize: 16,
    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
    },
  },
  textRight: {
    textAlign: 'right',
  },
  siteLocation: {
    borderBottom: `1px solid ${fade(theme.palette.grey[100], 0.1)}`,
  },
  invoice: {
    marginLeft: 17,
    fontWeight: 500,
    color: theme.palette.primary.main,
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
      marginLeft: 5,
    },
  },
  bookAgainBtn: {
    maxWidth: 323,
    margin: '42px auto 52px auto',
    '& button': {
      color: '#fff',
      fontSize: 13,
      fontWeight: 700,
    },
    [theme.breakpoints.down('sm')]: {
      margin: '24px auto 42px auto',
    },
  },
  paymentHistory: {
    fontSize: 18,
    fontWeight: 700,
    marginTop: 40,
    lineHeight: '26px',
    marginBottom: 20,
    '& > h2': {
      marginBottom: 20,
    },
    '& > :nth-child(2)': {
      borderTop: '1px solid rgba(152, 152, 152, 0.3)',
    },
    '& > :first-child': {
      fontSize: 22,
      marginBottom: 17,
      [theme.breakpoints.down('sm')]: {
        marginBottom: 27,
      },
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 18,
      fontWeight: 600,
      lineHeight: '17px',
    },
  },
  transaction: {
    display: 'flex',
    padding: '40px 0 20px 0',
    borderBottom: '1px solid rgba(152, 152, 152, 0.3)',
    [theme.breakpoints.down('sm')]: {
      padding: '20px 0 15px 0',
      fontSize: 12,
    },
  },
  street: {
    maxWidth: 'auto',
    [theme.breakpoints.down('sm')]: {
      maxWidth: 180,
    },
  },
  invoiceImg: {
    height: 24,
    width: 24,
    [theme.breakpoints.down('sm')]: {
      height: 20,
      width: 18,
    },
  },
  mapControls: {
    position: 'absolute',
    bottom: '48px',
    display: 'flex',
    flexFlow: 'column',
    right: '20px',
    background: 'transparent',
    [theme.breakpoints.down('xs')]: {
      bottom: '120px',
    },
  },
  zoomControls: {
    borderRadius: '15px',
    background: 'white',
    marginBottom: '10px',
  },
  zoomButton: {
    width: '40px',
    height: '40px',
    minWidth: '40px',
    borderRadius: '10px',
  },
  navigation: {
    cursor: 'pointer',
  },
  borderClassName: {
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
}));

const BookingDetails: FC<IProps> = ({ booking, loading }) => {
  const classes = useStyles();
  /* eslint-disable @typescript-eslint/naming-convention */
  const {
    site_name, site_address, original_space, currency_sign,
    insurance, orders, original_site, transactions, id,
    sub_total_amount, total_amount, status, renewals, unit_id,
  } = booking || {};

  const { locale } = useRouter();

  const [zoom, setZoom] = useState<number>(17);
  const [center, setCenter] = useState<ICenter>({ lat: 0, lng: 0 });
  const mapIcon = '/images/SearchLocation/activePoint.png';

  const sqft = (unitSize: string) => {
    if (unitSize !== 'sqft') return unitSize;

    return unitSize.replace('sqft', 'sq ft');
  };

  const handleNavigate = () => {
    const successCallback = (pos: GeolocationPosition) => {
      setCenter({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    };
    navigator.geolocation.getCurrentPosition(
      successCallback,
      () => alert('Unable to access current location'),
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  const transaction = transactions ? transactions[0] : null;
  const { t } = usePageTranslation('checkout', 'BuildingDetails');
  const { t: commonT } = usePageTranslation('common', 'SiteBookingStatus');
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  return (
    <Box className={classes.buildingDetails}>
      <Box className={classes.header}>
        <Box>
          <Typography className={classes.location}>
            <Image className={classes.locationIcon} name="flag" folder="BookingConfirmed" />
            <span className={classes.locationText}>{getTranslatedName(site_address?.district, 'name', locale)}</span>
          </Typography>
          <Typography className={classes.title}>
            {site_name}
          </Typography>
          <Image className={classes.stars} name="stars" folder="DetailPage" />
        </Box>
        <img className={classes.img} src={original_site?.images?.[0]} alt={site_name} />
      </Box>
      <Box className={classes.parts}>
        <Box>{t('typography9')}</Box>
        <Box>
          <Box textAlign="right" mb="9px">{id}</Box>
          <Box>
            <Box className={classes.green}>
              <Image
                className={classes.checkMark}
                folder="BookingConfirmed"
                name="checkmar"
              />
              {commonT(status)}
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className={classes.parts}>
        <Box>
          <Box>{t('from')}</Box>
          <Box mt="9px">{t('to')}</Box>
        </Box>
        <Box>
          <Box textAlign="right">
            {renewals?.length > 0 && dayJs(renewals[0]?.renewal_start_date).format('DD/MM/YYYY')}
          </Box>
          <Box textAlign="right" mt="9px" mb="5px">
            {renewals?.length > 0 && dayJs(renewals[0]?.renewal_end_date).format('DD/MM/YYYY')}
          </Box>
          <Box textAlign="right">
            {renewals?.length > 0 && dayJs(renewals[0]?.renewal_end_date).diff(renewals[0]?.renewal_start_date, 'weeks')}
            {' '}
            {t('weeks')}
          </Box>
        </Box>
      </Box>
      <Box className={classes.parts}>
        <Box>
          <Box>{t('guest')}</Box>
        </Box>
        <Box>
          <Box textAlign="right">
            {booking?.customer?.first_name}
            {' '}
            {booking?.customer?.last_name}
          </Box>
          <Box textAlign="right" mt="9px" mb="5px">{booking?.customer?.email}</Box>
        </Box>
      </Box>
      <Box className={classes.partWithTitle}>
        <Box fontWeight={600}>{unit_id || t('unitDetails')}</Box>
        <Box display="flex" mt="20px">
          <Box className={classes.unitImg}>
            <img src={original_space?.space_type?.icon} alt="storage" />
          </Box>
          <Box className={classes.unitInfo}>
            <Box marginLeft="25px">
              <Box>{t('unitNumber')}</Box>
              <Box my="7px">{t('unitName')}</Box>
              <Box>{t('unitSize')}</Box>
            </Box>
            <Box marginLeft="25px" textAlign="right">
              <Box>{t('unassigned')}</Box>
              <Box my="7px">
                {t('sizeWithAC', { size: getTranslatedName(original_space?.space_type, 'name', locale) })}
              </Box>
              <Box>
                {original_space?.size}
                {' '}
                {sqft(original_space?.size_unit)}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className={classes.parts}>
        <Box>
          <Box>{t('autoRenewal')}</Box>
        </Box>
        <Box>
          {renewals?.length > 0 && dayJs(renewals[0]?.next_renewal_date).format('DD/MM/YYYY')}
        </Box>
      </Box>
      <Box className={classes.partWithTitle}>
        <Box fontWeight={600} mb="9px">{t('typography3')}</Box>
        <Box>{site_address?.street}</Box>
        <Box display="flex" justifyContent="space-between" alignItems="baseline">
          <Box mt="9px">{t('typography4')}</Box>
          <Box>{orders?.length > 0 ? orders[0]?.order_pick_up_service?.pickup_time : 'N/A'}</Box>
        </Box>
      </Box>
      <Box className={classes.partWithTitle}>
        <Box fontWeight={600} mb="9px">{t('typography6')}</Box>
        <Box display="flex" justifyContent="space-between">
          <Box maxWidth={isMobile ? '220px' : 'auto'}>
            {t('essentialUpTo')}
            {' '}
            {currency_sign}
            {insurance?.covered_amount || 0}
            {isMobile && <br />}
            (
            {t('insuranceCover')}
            )
          </Box>
          <Box>
            {insurance?.price_per_day
              ? `${insurance.country.currency_sign}${(insurance?.price_per_day * 7).toFixed(2)} ${t('perWeek')}`
              : 'N/A'}
          </Box>
        </Box>
      </Box>
      <Box className={classes.partWithTitle}>
        <LocationMap
          zoom={zoom}
          isDraggable
          setCenter={setCenter}
          icon={mapIcon}
          center={center}
          height={isMobile ? '243px' : '446px'}
          className={classes.siteLocation}
          borderClassName={classes.borderClassName}
          loading={loading}
          coords={{ lat: site_address?.lat || 0, lng: site_address?.lng || 0 }}
        />
        <Box className={classes.mapControls}>
          <Box className={classes.zoomControls}>
            <Button className={classes.zoomButton} onClick={() => setZoom(zoom + 1)}>
              <Image name="zoom_in" folder="SearchLocation" extension="png" />
            </Button>
            <Divider />
            <Button className={classes.zoomButton} onClick={() => setZoom(zoom - 1)}>
              <Image name="zoom_out" folder="SearchLocation" extension="png" />
            </Button>
          </Box>
          <Image
            name="Navigation"
            folder="SearchLocation"
            className={classes.navigation}
            onClick={handleNavigate}
          />
        </Box>
      </Box>
      <Box className={classes.parts}>
        <Box>{t('fullAddress')}</Box>
        <Box>
          <Box className={classes.street} textAlign="right" lineHeight="25px">
            {site_address?.street}
          </Box>
        </Box>
      </Box>
      <Box className={classes.partWithTitle}>
        <Box fontWeight={600} mb="10px">{t('paymentDetail')}</Box>
        <Box display="flex" justifyContent="space-between">
          <Box lineHeight="30px">
            <Box>{t('subtotal')}</Box>
            <Box>{t('pickUpService')}</Box>
            <Box>{t('insurance')}</Box>
            <Box fontWeight={600}>{t('total')}</Box>
          </Box>
          <Box lineHeight="30px" textAlign="right">
            <Box>{sub_total_amount && currency_sign + sub_total_amount}</Box>
            <Box>
              {orders?.length > 0
                ? currency_sign + orders[0]?.order_pick_up_service?.total_amount
                : `${currency_sign}0.00`}
            </Box>
            <Box>
              {renewals?.length > 0 && currency_sign + renewals[0]?.insurance_amount.toFixed(2)}
            </Box>
            <Box fontWeight={600}>
              {total_amount && currency_sign + total_amount}
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className={classes.partWithTitle}>
        <Box fontWeight={600} mb="10px">{t('paymentMethod')}</Box>
        <Box display="flex" justifyContent="space-between">
          <Box lineHeight="30px">
            <Box>{t('cardType')}</Box>
            <Box>{t('cardNumber')}</Box>
          </Box>
          <Box lineHeight="30px" textAlign="right">
            <Box>{booking?.customer?.customer?.card_brand_name || 'N/A'}</Box>
            <Box>
              {booking?.customer?.customer?.card_last_digits ? (
                <>
                  **** **** ****
                  {' '}
                  {booking?.customer?.customer?.card_last_digits}
                </>
              ) : 'N/A'}
            </Box>
          </Box>
        </Box>
      </Box>
      {transaction
      && (BookingStatus.ACTIVE || BookingStatus.CONFIRMED || BookingStatus.TERMINATED) && (
        <Box className={classes.partWithTitle} display="flex" alignItems="center">
          <Image folder="BookingConfirmed" name="invoice" />
          <Link href={`/customer/invoice/${transaction?.id}`} prefetch={false}>
            <Typography className={classes.invoice}>
              {t('seeInvoice')}
            </Typography>
          </Link>
        </Box>
      )}
      {(status === BookingStatus.TERMINATED || status === BookingStatus.COMPLETED) && (
        <Box className={classes.bookAgainBtn}>
          <Link href={`/details/${original_site?.id}`} prefetch={false}>
            <PrimaryButton>{t('bookAgain')}</PrimaryButton>
          </Link>
        </Box>
      )}
      {transactions?.length > 0 && (
        <Box className={classes.paymentHistory}>
          <Box>{t('paymentHistory')}</Box>
          {transactions?.map((item) => (
            <Box className={classes.transaction} key={item.id}>
              <Grid md={3} xs={3}>
                <Box fontWeight={600}>
                  {dayJs(item.created_at).format('DD/MM/YYYY')}
                </Box>
              </Grid>
              <Grid md={5} xs={3}>
                <Box fontWeight={600}>
                  {item.booking?.original_space?.size}
                  {' '}
                  {sqft(item.booking?.original_space?.size_unit)}
                </Box>
                <Box fontSize={isMobile ? '10px' : '16px'} fontWeight={400}>
                  {item.booking?.original_space?.space_type?.name_en}
                  {' '}
                  {t('sizeUnits')}
                </Box>
              </Grid>
              <Grid md={2} xs={2}>
                <Box textAlign="center">
                  {currency_sign}
                  {item.amount}
                </Box>
              </Grid>
              <Grid md={2} xs={4}>
                <Box display="flex" paddingLeft={!isMobile ? '65px' : '16px'}>
                  <Image folder="BookingConfirmed" name="invoice" className={classes.invoiceImg} />
                  <Link href={`/customer/invoice/${item.id}`} prefetch={false}>
                    <Typography className={classes.invoice}>
                      {t('seeInvoice')}
                    </Typography>
                  </Link>
                </Box>
              </Grid>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default BookingDetails;
