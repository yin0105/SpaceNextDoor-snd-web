import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import PlacesAutocomplete, { geocodeByPlaceId, getLatLng } from 'react-places-autocomplete';
import {
  Box,
  fade,
  Typography,
} from '@material-ui/core';
import StyledRadio from '../../../../RadioButton';
import Grey3Typography from '../../../../../../../../components/Typographies/Grey3Typography';
import PrimaryTypography from '../../../../../../../../components/Typographies/PrimaryTypography';
import Image from '../../../../../../../../components/Image';
import usePageTranslation from '../../../../../../../../hooks/usePageTranslation';
import { BookingStore } from '../../../../../../stores/BookingStore';
import SearchAddressMap from '../../YourCollectionDetail/SearchAddressMap';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '248px',
    maxHeight: '248px',
    minWidth: '147px',
    maxWidth: '152px',
    [theme.breakpoints.up('sm')]: {
      minWidth: '234px',
      maxWidth: '234px',
      minHeight: '380px',
      maxHeight: '380px',
    },
    borderRadius: '10px',
    backgroundColor: '#FFFFFF',
    cursor: 'pointer',
    position: 'relative',
    marginBottom: '40px',
  },
  checked: {
    border: `2px solid ${theme.palette.primary.main}`,
    boxShadow: '0px 15px 40px rgba(51, 51, 51, 0.1)',
  },
  noChecked: {
    border: `2px solid ${theme.palette.grey[50]}`,
  },
  image: {
    display: 'flex',
    padding: '45px 0 0',
    height: '87px',
    marginBottom: '10px',
    '& img': {
      height: 'auto',
    },
    [theme.breakpoints.up('sm')]: {
      marginBottom: '0',
      padding: '70px 0 30px',
      height: 'auto',
      '& img': {
        height: '65px',
      },
    },
    justifyContent: 'center',
  },
  radio: {
    position: 'absolute',
    top: 10,
    right: 10,
    [theme.breakpoints.up('sm')]: {
      top: 15,
      right: 15,
    },
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
  },
  headerText: {
    fontWeight: 600,
    padding: '0 25px',
    textAlign: 'center',
    fontSize: '12px',
    marginBottom: '0',
    [theme.breakpoints.up('sm')]: {
      fontSize: '18px',
      padding: '0 49px',
      marginBottom: '4px',
    },
  },
  descriptionText: {
    textAlign: 'center',
    color: theme.palette.grey[100],
    margin: '0 10px 0 10px',
    fontSize: '10px',
    lineHeight: '15px',
    [theme.breakpoints.up('sm')]: {
      margin: '0 20px 0 20px',
      fontSize: '14px',
      lineHeight: '20px',
    },
  },
  fromSize: {
    textAlign: 'center',
    fontSize: '10px',
    lineHeight: '15px',
    marginBottom: '6px',
    [theme.breakpoints.up('sm')]: {
      fontSize: '14px',
      marginBottom: '15px',
      lineHeight: '20px',
    },
  },
  costText: {
    marginTop: '0',
    fontSize: '18px',
    [theme.breakpoints.up('sm')]: {
      fontSize: '22px',
      marginTop: '7px',
    },
  },
  costBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    lineHeight: '1rem',
    margin: '0 20px',
    paddingTop: ' 9px',
    borderTop: '2px solid #E9E9E9',
    [theme.breakpoints.up('sm')]: {
      paddingTop: ' 15px',
    },
  },
  startingText: {
    lineHeight: '1rem',
    fontWeight: 400,
    marginLeft: '20px',
  },
  viewStorage: {
    textAlign: 'center',
    fontSize: '12px',
    marginTop: '18px',
    [theme.breakpoints.up('sm')]: {
      fontSize: '14px',
      marginTop: '20px',
    },
  },
  mostPopular: {
    position: 'absolute',
    left: '23px',
    top: '15px',
    color: theme.palette.primary.main,
    fontSize: '10px',
    lineHeight: '18px',
    fontWeight: 700,
    padding: '2px 20px',
    textTransform: 'uppercase',
    borderRadius: '10px',
    backgroundColor: fade(theme.palette.primary.main, 0.1),
    [theme.breakpoints.down('sm')]: {
      fontSize: '9px',
      padding: '0 8px',
      left: '9px',
      top: '18px',
    },
  },
  hide: {
    display: 'none',
  },
  vehicleTitle: {
    fontSize: '12px',
    lineHeight: '15px',
    color: '#EA5B21',
    textAlign: 'center',
    margin: '3px 0 0 0',
    [theme.breakpoints.up('sm')]: {
      margin: '6px 0 5px 0',
    },
  },
  mb: {
    marginBottom: '12px',
    [theme.breakpoints.up('sm')]: {
      marginBottom: '40px',
    },
  },
}));

interface IProps {
  value: boolean;
  options: any;
  handleChange: (e) => void;
  bookingStore?: BookingStore;
  spaceSize?: string;
  currency?: string;
}

const Service: React.FC<IProps> = (props) => {
  const classes = useStyles();
  const {
    value,
    handleChange,
    bookingStore,
    options,
    currency,
  } = props;
  const { t } = usePageTranslation('checkout', 'Service');
  const [addressText, setAddress] = useState(bookingStore?.pickUpDetails?.address?.value || '');
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectStreet = async (val, placeId) => {
    const location = await geocodeByPlaceId(placeId);
    const coords = await getLatLng(location[0]);

    setAddress(location[0]?.formatted_address);
    bookingStore.setPickupDetails('lat', coords.lat);
    bookingStore.setPickupDetails('lng', coords.lng);
    bookingStore.setPickupDetails('address', location[0]?.formatted_address);
  };

  useEffect(() => {
    setAddress(bookingStore?.pickUpDetails?.address?.value);
  }, [bookingStore?.pickUpDetails?.address?.value]);

  return (
    <Box
      className={clsx(value ? classes.checked : classes.noChecked, classes.root)}
      onClick={handleChange}
    >
      <SearchAddressMap isOpen={isOpen} setIsOpen={setIsOpen} />
      <Box className={classes.image}>
        {!options.fixed_price ? (
          <Image name="map_marker" folder="CheckoutPage" extension="svg" />
        ) : (
          <img src={options.icon} alt="" />
        )}
      </Box>
      <Box className={classes.radio}>
        <StyledRadio checked={value} />
      </Box>
      <Box className={classes.header}>
        <Box mt={3}>
          <Grey3Typography
            variant="body2"
            className={options.vehicle_title
              ? classes.headerText
              : clsx(classes.headerText, classes.mb)}
          >
            {options.title_en}
          </Grey3Typography>
          {options.vehicle_title && (
            <Typography className={classes.vehicleTitle}>{options.vehicle_title}</Typography>
          )}
          <Grey3Typography variant="body2" className={classes.descriptionText}>
            {addressText || options.description_en
              .slice(13)
              .replace(/(?<L>\d+(\.\d+)?m) x (?<W>\d+(\.\d+)?m) x (?<H>\d+(\.\d+)?m)/, 'L$<L> x W$<W> x H$<H>')}
          </Grey3Typography>
          {options.max_weight && (
            <Grey3Typography variant="body2" className={classes.descriptionText}>
              {`Max Weight: < ${options.max_weight} ${options.weight_unit}`}
            </Grey3Typography>
          )}
          {options.size_from && (
            <Grey3Typography
              variant="body2"
              className={classes.fromSize}
            >
              From size
              {' '}
              {options.size_from}
            </Grey3Typography>
          )}
        </Box>
      </Box>
      {!options.fixed_price && (
      <Box role="button" tabIndex={0} onClick={() => {}}>
        <PlacesAutocomplete
          searchOptions={{ componentRestrictions: { country: 'sg' } }}
          value={addressText}
          onChange={(val) => setAddress(val)}
          onSelect={handleSelectStreet}
        >
          {() => (
            <>
              <PrimaryTypography
                variant="body2"
                className={classes.viewStorage}
                onClick={() => {
                  setIsOpen(true);
                }}
              >
                {t('typography3')}
              </PrimaryTypography>
            </>
          )}
        </PlacesAutocomplete>
      </Box>
      )}
      {options.fixed_price && (
      <Box mt={2} className={classes.costBox}>
        <>
          <Typography variant="body2" className={classes.startingText}>
            {t('typography2')}
          </Typography>
          <Typography variant="h2" className={classes.costText}>
            {currency}
            {options.fixed_price}
          </Typography>
        </>
      </Box>
      )}
    </Box>
  );
};

export default Service;
