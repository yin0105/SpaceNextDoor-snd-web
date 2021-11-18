import { Box, Divider, Hidden } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';
import DayJS from 'components/DayJS';
import { inject, observer } from 'mobx-react';
import ClevertapReact from 'clevertap-react';
import useTranslation from 'next-translate/useTranslation';
import { useCurrentCountry } from 'utilities/market';
import ProgressLayout from '../ProgressLayout';
import AutoRenewal from './AutoRenewal';
import YourDetail from './YourDetail';
import ScheduleTime from './ScheduleTime';
import handleSubmit from '../../../../../utilities/handleSubmit';
import AuthStore, { AUTH_STORE_KEY } from '../../../../app/stores/AuthStore';
import Grey2Typography from '../../../../../components/Typographies/Grey2Typography';
import Info from '../Info';
import { BookingStore, BOOKING_STORE } from '../../../stores/BookingStore';
import * as gtag from '../../../../../utilities/gtag';
import usePageTranslation from '../../../../../hooks/usePageTranslation';
import Promotions from '../../Promotions';
import { IPromotion } from '../../../hooks/useCheckoutPrice';
import Grey3Typography from '../../../../../components/Typographies/Grey3Typography';

const useStyles = makeStyles((theme: Theme) => ({
  errorText: {
    color: theme.palette.error.main,
    margin: '20px 0',
  },
}));

interface IProps {
  step: number;
  disableBtn?: boolean;
  [BOOKING_STORE]?: BookingStore;
  [AUTH_STORE_KEY]?: AuthStore;
  appliedPromotion: IPromotion;
  promotionError: string;
  appliedPublicPromotion: IPromotion;
  total: number
}

const FormBookingDetails: React.FC<IProps> = (props) => {
  const { t } = usePageTranslation('checkout', 'FormBookingDetails');
  const { lang } = useTranslation();
  const {
    step,
    bookingStore,
    auth,
    disableBtn,
    appliedPromotion,
    appliedPublicPromotion,
    promotionError,
    total,
  } = props;
  const {
    fullName,
    email,
    phoneNumber,
    autoRenewal,
    moveInDate,
    moveOutDate,
  } = bookingStore.bookingDetails;

  const { locale } = useRouter();
  const data = [
    { title: t('dataTitle1'), value: moveInDate.locale(locale).format('MMM D, YYYY') },
    { title: t('dataTitle2'), value: autoRenewal ? 'Monthly Ongoing' : DayJS(moveOutDate).locale(locale).format('MMM D, YYYY') },
    {
      title: t('dataTitle3'),
      value: autoRenewal ? DayJS(moveInDate).add(1, 'M').subtract(2, 'd').locale(locale)
        .format('MMM D, YYYY') : '',
    },
    { title: t('dataTitle4'), value: fullName.value },
    { title: t('dataTitle5'), value: email.value },
    { title: t('dataTitle6'), value: `${phoneNumber.value}` },
  ];
  const classes = useStyles();
  const [errors, setErrors] = useState([]);
  const currentCountry = useCurrentCountry().name;
  useEffect(() => {
    if (auth.isAuthenticated) {
      bookingStore.populateBookingData();
    }
  }, [auth.isAuthenticated, bookingStore.bookingId]);

  const verificationSubmit = async () => {
    if (!bookingStore.isAvailable) {
      return;
    }

    try {
      const { createBooking } = await bookingStore.createBooking() || {};

      if (!createBooking) {
        return;
      }

      // Booking information.
      const {
        site_name: siteName,
        id: bookingId,
        space_size: spaceSize,
        space_size_unit: spaceSizeUnit,
        original_space: originalSpace,
        original_site: originalSite,
        renewals,
        currency,
        customer,
        auth: bookingAuth,
      } = createBooking;

      // Site & space.
      const spaceId = originalSpace?.id;
      const siteId = originalSite?.id;
      // Renewals information.
      const subTotalAmount = renewals?.[0]?.sub_total_amount;
      const discountAmount = renewals?.[0]?.discount_amount;
      const depositAmount = renewals?.[0]?.deposit_amount;
      const totalAmount = renewals?.[0]?.total_amount;
      const baseAmount = renewals?.[0]?.base_amount;
      // Booking access token.
      const accessToken = bookingAuth?.access_token;
      const refreshToken = bookingAuth?.refresh_token;
      const {
        id: userId,
        first_name: customerName,
        email: customerEmail,
        phone_number: customerPhone,
      } = customer || {};

      const trackingPayload = {
        siteName,
        bookingId,
        spaceId,
        siteId,
        spaceSize,
        spaceSizeUnit,
        subTotalAmount,
        discountAmount,
        depositAmount,
        currency,
        totalAmount,
        country: currentCountry,
        userId,
        customerName,
        customerEmail,
        customerPhone,
        baseAmount,
        language: lang,
        platform: 'WEB',
      };

      await auth.setToken(accessToken, refreshToken);

      gtag.track('create_booking', trackingPayload);
      ClevertapReact.event('create_booking', trackingPayload);

      Router.replace({
        pathname: '/checkout',
        query: {
          ...Router.query,
          booking_id: createBooking.id,
        },
      });
    } catch ({ message }) {
      if (message) {
        setErrors([{ message: `${t('errorCreateBooking')}` }]);
      }
    }
  };

  return (
    <Box>
      <Box>
        {errors.map((err, i) => {
          const { message } = err;
          return (
            <Grey3Typography key={`${message}_${i}`} className={classes.errorText}>
              {message}
            </Grey3Typography>
          );
        })}
      </Box>
      <form onSubmit={handleSubmit(verificationSubmit, null)}>
        <ProgressLayout
          step={step}
          title={t('progressLayoutTitle')}
          btnText={t('progressLayoutBtnText')}
          btnIcon="lock"
          disableBtn={disableBtn}
        >
          {step < bookingStore.currentStep ? (
            <Info data={data} />
          )
            : (
              <>
                <Hidden smUp>
                  <ScheduleTime />
                  <Divider />
                </Hidden>
                <AutoRenewal />
                <Divider />
                <Hidden xsDown>
                  <Box style={{ marginBottom: '100px' }}>
                    <Promotions
                      promotionError={promotionError}
                      appliedPromotion={appliedPromotion}
                      appliedPublicPromotion={appliedPublicPromotion}
                      total={total}
                    />
                  </Box>
                </Hidden>
                <Divider />
                <YourDetail />
              </>
            )}

          <Box>
            <Grey2Typography variant="body2" style={{ color: '#E53535' }}>
              {bookingStore.bookingError}
            </Grey2Typography>
          </Box>
        </ProgressLayout>
      </form>
    </Box>
  );
};

export default inject(BOOKING_STORE, AUTH_STORE_KEY)(observer(FormBookingDetails));
