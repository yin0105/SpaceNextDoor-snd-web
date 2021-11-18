import {
  Box, makeStyles, Typography, fade,
} from '@material-ui/core';
import React, { FC } from 'react';

import Image from '../../../../../components/Image';
import usePageTranslation from '../../../../../hooks/usePageTranslation';
import { GetBookingQuery_booking } from '../../../queries/__generated__/GetBookingQuery';

interface IProps {
  isConfirmation?: boolean;
  booking: GetBookingQuery_booking;
}

const useStyles = makeStyles((theme) => ({
  header: {
    textAlign: 'center',
    color: theme.palette.grey[200],
    marginBottom: '40px',
    [theme.breakpoints.up('sm')]: {
      marginBottom: '64px',
    },
  },
  successIcon: {
    '& img': {
      width: '32px',
      height: '32px',
      marginBottom: '30px',
      [theme.breakpoints.up('sm')]: {
        width: '55px',
        height: '55px',
      },
    },
  },
  title: {
    fontSize: '30px',
    lineHeight: '35px',
    marginBottom: '10px',
    fontWeight: 600,
    [theme.breakpoints.up('sm')]: {
      fontSize: '35px',
      lineHeight: '35px',
      marginBottom: '25px',
    },
  },
  subTitle: {
    fontSize: '16px',
    lineHeight: '18px',
    marginBottom: '20px',
    fontWeight: 600,
    [theme.breakpoints.up('sm')]: {
      fontSize: '22px',
      lineHeight: '30px',
      marginBottom: '45px',
    },
  },
  buildingImage: {
    width: '100%',
    borderRadius: '22px',
    maxWidth: '682px',
    overflow: 'hidden',
    margin: '0 auto',
    maxHeight: '313px',
    '& img': {
      width: '100%',
      marginBottom: '-6px',
    },
  },
  block: {
    borderTop: `2px solid ${fade(theme.palette.grey[100], 0.1)}`,
    [theme.breakpoints.down('md')]: {
      borderTop: 'none',
    },
  },
}));

const Header: FC<IProps> = ({ booking, isConfirmation = false }) => {
  /* eslint-disable @typescript-eslint/naming-convention */
  const { short_id } = booking || {};
  const classes = useStyles();
  const { t } = usePageTranslation('checkout', 'Header');
  return (
    <Box className={classes.header}>
      {isConfirmation && (
        <Box className={classes.successIcon}>
          <Image name="Shape" folder="BookingConfirmed" />
        </Box>
      )}
      <Typography className={classes.title}>
        {t('typography1')}
      </Typography>
      <Typography className={classes.subTitle}>
        {`${t('typography2')} ${short_id}`}
      </Typography>
      <Box className={classes.block} />
    </Box>
  );
};

export default Header;
