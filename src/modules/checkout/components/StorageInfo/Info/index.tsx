import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react';
import { Box, Hidden } from '@material-ui/core';
import { useRouter } from 'next/router';
import Grey3Typography from '../../../../../components/Typographies/Grey3Typography';
import Image from '../../../../../components/Image';
import { BookingStore, BOOKING_STORE } from '../../../stores/BookingStore';
import Dimensions from '../../../../../components/Dimensions';
import { getTranslatedName, useCurrentCountry } from '../../../../../utilities/market';

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: '15px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  onePropertyBox: {
    display: 'flex',
    '& >div:nth-child(2)': {
      marginLeft: '5px',
    },
    '& >div:nth-child(3)': {
      marginLeft: '2px',
    },
  },
  locationText: {
    fontWeight: 600,
    fontSize: '13px',
    maxWidth: '130px',
  },
  price: {
    lineHeight: '25px',
  },
  sizeWrap: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },
}));

interface IProps {
  [BOOKING_STORE]?: BookingStore;
  subTotal: string;
}

const Info: React.FC<IProps> = ({ bookingStore, subTotal }) => {
  const { locale } = useRouter();
  const classes = useStyles();
  const currentCountry = useCurrentCountry();
  return (
    <Box className={classes.root}>
      <Box>
        <Grey3Typography variant="h5">
          {getTranslatedName(bookingStore.space?.site, 'name', locale) || ''}
        </Grey3Typography>
      </Box>
      <Box mt={4} className={classes.onePropertyBox}>
        <Box>
          <Image name="location" folder="SearchLocation" />
        </Box>
        <Box>
          <Grey3Typography className={classes.locationText} noWrap>
            {getTranslatedName(bookingStore.space?.site?.address?.district, 'name', locale)}
          </Grey3Typography>
        </Box>
      </Box>
      {/* Hide Reviews for Launch */}
      {/* <Box className={classes.onePropertyBox}>
        <Box>
          <Image name="orangeStar" folder="CheckoutPage" />
        </Box>
        <Box>
          <Grey3Typography variant="h5">
            4.9
          </Grey3Typography>
        </Box>
        <Box>
          <Grey3Typography variant="body2">
            (4,623)
          </Grey3Typography>
        </Box>
      </Box> */}
      <Box className={classes.sizeWrap}>
        <Box>
          <Grey3Typography variant="body1">
            {bookingStore?.space?.size}
            &nbsp;
            {bookingStore?.space?.size_unit?.toUpperCase()}
            <Dimensions
              width={bookingStore?.space?.width}
              length={bookingStore?.space?.length}
              unit={currentCountry.sizeUnitLength}
            />
          </Grey3Typography>
        </Box>
        <Hidden smUp>
          <Box>
            <Grey3Typography variant="h2" className={classes.price}>
              {subTotal}
            </Grey3Typography>
          </Box>
        </Hidden>
      </Box>
    </Box>
  );
};

export default inject(BOOKING_STORE)(observer(Info));
