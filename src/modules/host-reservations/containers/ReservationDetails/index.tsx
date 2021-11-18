import {
  Grid, Theme, useMediaQuery,
} from '@material-ui/core';
import { useQuery } from '@apollo/client';
import React from 'react';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import Heading from '../../../../components/Heading';
import Details from '../../components/Details';
import DetailsLoader from '../../../host/components/DetailsLoader';
import { GET_RESERVATION_QUERY } from '../../queries';
import { ReservationDetailQuery, ReservationDetailQueryVariables } from '../../queries/__generated__/ReservationDetailQuery';
import BookingConfirmationLayout from '../../../checkout/components/Confirmation/layout';
import { Roles } from '../../contants/role';
import usePageTranslation from '../../../../hooks/usePageTranslation';
import HeadingMobile from '../../../../components/HeadingMobile';

interface IItem {
  link?: string;
  title: string;
}

interface IProps {
  id: number;
  role: Roles;
}

const Listings: React.FC<IProps> = ({ role }): JSX.Element => {
  const { t } = usePageTranslation('hostReservation', 'ReservationDetails');
  const { t: commonT } = usePageTranslation('common', 'SiteBookingStatus');
  const router = useRouter();
  const id = parseInt(router?.query?.id as string, 10);

  const { loading, data } = useQuery<ReservationDetailQuery, ReservationDetailQueryVariables>(
    GET_RESERVATION_QUERY,
    {
      context: {
        asProvider: role === Roles.HOST,
        asCustomer: role === Roles.GUEST,
      },
      variables: { id },
    },
  );
  const isGuest = role === Roles.GUEST;
  let items: IItem[] = [
    {
      link: '/host/reservations',
      title: t('itemsTitle1'),
    },
    {
      title: commonT(data?.booking?.status),
    },
    {
      title: t('itemsTitle2'),
    },
  ];

  if (isGuest) {
    items = [
      {
        link: '/customer/bookings',
        title: t('itemsGuestTitle1'),
      },
      {
        title: commonT(data?.booking?.status),
      },
      {
        title: t('itemsGuestTitle2'),
      },
    ];
  }
  const breadcrumbProps: { items: IItem[] } = {
    items,
  };

  const LoadLayout = () => {
    if (isGuest) {
      return (<BookingConfirmationLayout booking={data?.booking} loading={loading} />);
    }

    return (<Details item={data?.booking} />);
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      padding: '0 25px',
      [theme.breakpoints.up('sm')]: {
        padding: '0',
      },
    },
  }));

  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.only('xs'));
  const classes = useStyles();

  return (
    <Grid container justify="center" className={classes.root}>
      <Grid item xs={12}>
        {!isMobile ? (
          <Heading
            title={isGuest ? t('title1') : t('title2')}
            subTitle={isGuest ? t('subtitle1') : t('subtitle2')}
            breadcrumbProps={breadcrumbProps}
          />
        ) : (
          <HeadingMobile
            cb={() => window.history.back()}
            title={t('subtitle1')}
          />
        )}
        {loading ? <DetailsLoader /> : <LoadLayout />}
      </Grid>
    </Grid>
  );
};

export default Listings;
