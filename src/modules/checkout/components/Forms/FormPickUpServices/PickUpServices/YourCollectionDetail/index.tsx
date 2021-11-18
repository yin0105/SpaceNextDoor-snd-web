import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react';
import {
  Box, FormControlLabel,
  IconButton,
  InputAdornment,
  List,
  MenuItem,
  RadioGroup,
  Typography,
} from '@material-ui/core';
import PlacesAutocomplete, {
  getLatLng,
  geocodeByPlaceId,
} from 'react-places-autocomplete';
import Grey3Typography from '../../../../../../../components/Typographies/Grey3Typography';
import { MainTextField } from '../../../../../../../components/Inputs/MainInput';
import Image from '../../../../../../../components/Image';
import {
  CustomSelect,
  IconComponent,
  SelectInput,
} from '../../../../../../../components/Inputs/MainSelect';
import SearchAddressMap from './SearchAddressMap';
import { BookingStore, BOOKING_STORE } from '../../../../../stores/BookingStore';
import usePageTranslation from '../../../../../../../hooks/usePageTranslation';
import Grey2Typography from '../../../../../../../components/Typographies/Grey2Typography';
import StyledRadio from '../../../../../../../components/RadioButton';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '20px 30px 0 -30px',
    [theme.breakpoints.up('sm')]: {
      margin: '20px 55px 0 -30px',
    },
  },
  titleBox: {
    margin: '10px 0 6px',
    [theme.breakpoints.up('sm')]: {
      margin: '0 0 40px',
    },
  },
  titleText: {
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.8rem',
    },
  },
  subtitleBox: {
    marginTop: '12px',
    marginBottom: '4px',
    [theme.breakpoints.up('sm')]: {
      marginTop: '25px',
      marginBottom: '17px',
    },
  },
  subtitleText: {
    fontWeight: 600,
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.4rem',
    },
  },
  inputBox: {
    position: 'relative',
  },
  inputSelect: {
    fontWeight: 400,
    fontSize: '1.2rem',
    padding: '17px 26px 13px 12px',
    border: '0px',
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.6rem',
    },
  },
  textField: {
    marginBottom: '10px',
    '& .MuiOutlinedInput-root': {
      backgroundColor: 'white',
      '& fieldset': {
        border: '0px',
      },
    },
  },
  suggestionContainer: {
    width: '100%',
    marginTop: -1,
    top: 55,
    overflow: 'scroll',
    position: 'absolute',
    zIndex: 99,
    backgroundColor: '#FFFFFF',
    borderRadius: '10px',
    border: `1px solid ${theme.palette.grey[50]}`,
    boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.1)',
  },
  input: {
    '& >input': {
      // TODO: Uncomment when we have map view
      // padding: '14px 0 16px 13px',
      padding: '14px 13px 16px 13px',
      fontSize: '1.2rem',
      [theme.breakpoints.up('sm')]: {
        fontSize: '1.6rem',
      },
    },
  },
  manPower: {
    paddingTop: '40px',
    marginTop: '47px',
    borderTop: '2px solid rgb(152 152 152 / 10%)',
  },
  manPowerTitle: {
    fontWeight: 600,
    fontSize: '14px',
  },
  manPowerSubtitle: {
    fontSize: '16px',
    lineHeight: '25px',
    [theme.breakpoints.up('sm')]: {
      fontSize: '12px',
      lineHeight: '20px',
    },
  },
  manPowerLabel: {
    fontWeight: 600,
    fontSize: '12px',
    [theme.breakpoints.up('sm')]: {
      fontSize: '14px',
    },
  },
  manPowerHint: {
    padding: '15px 0 15px 0',
    maxWidth: '450px',
  },
  radioBtn: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
    padding: '12px 16px 12px 8px',
  },
}));

interface IProps {
  bookingStore?: BookingStore;
  setManPower: (value: number) => void;
  manPower: number;
}

const YourCollectionDetail: React.FC<IProps> = (props) => {
  const classes = useStyles();
  const { bookingStore, setManPower, manPower } = props;
  const { pickUpDetails: { time }, serviceSlots } = bookingStore;
  const [addressText, setAddress] = useState(bookingStore.pickUpDetails?.address?.value || '');
  const [isOpen, setIsOpen] = useState(false);
  const { t } = usePageTranslation('checkout', 'YourCollectionDetail');

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
    <Box className={classes.root}>
      <SearchAddressMap isOpen={isOpen} setIsOpen={setIsOpen} />
      <Box className={classes.titleBox}>
        <Grey3Typography className={classes.titleText} variant="h5">
          {t('grey3Typography1')}
        </Grey3Typography>
      </Box>
      <Box mb={1} className={classes.subtitleBox}>
        <Grey3Typography variant="caption" className={classes.subtitleText}>
          {t('grey3Typography2')}
        </Grey3Typography>
      </Box>
      <Box className={classes.inputBox}>
        <PlacesAutocomplete
          searchOptions={{
            // TODO: LOCALIZATION country-change -> Make it dynamic based off on country domain
            componentRestrictions: { country: 'sg' },
          }}
          value={addressText}
          onChange={(val) => setAddress(val)}
          onSelect={handleSelectStreet}
        >
          {({
            getInputProps, suggestions, getSuggestionItemProps, loading: suggestionLoading,
          }) => (
            <>
              <MainTextField
                variant="outlined"
                placeholder={t('placeholder')}
                // value={address.value}
                // onChange={(e) => bookingStore.setPickupDetails('address', e.target.value)}
                fullWidth
                className={classes.textField}
                {...getInputProps({ placeholder: t('placeholder') })}
                InputProps={{
                  className: classes.input,
                  endAdornment: (
                    <InputAdornment
                      position="end"
                    >
                      <IconButton
                        onClick={() => {
                          setIsOpen(true);
                        }}
                      >
                        <Image name="map" folder="CheckoutPage" />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {(suggestionLoading || suggestions.length > 0) && (
                <List className={classes.suggestionContainer}>
                  {suggestionLoading && <MenuItem>{t('menuItem')}</MenuItem>}
                  {suggestions.map((suggestion, i) => {
                    const idx = i;
                    return (
                      <div key={`${idx}-key`} {...getSuggestionItemProps(suggestion)}>
                        <MenuItem>{suggestion.description}</MenuItem>
                      </div>
                    );
                  })}
                </List>
              )}
            </>
          )}
        </PlacesAutocomplete>

        {bookingStore.pickUpDetails.address.err && (
          <Typography color="error">{bookingStore.pickUpDetails.address.err}</Typography>
        )}
      </Box>
      <Box className={classes.subtitleBox}>
        <Grey3Typography variant="caption" className={classes.subtitleText}>
          {t('grey3Typography3')}
        </Grey3Typography>
      </Box>
      <Box className={classes.inputBox}>
        <CustomSelect
          labelId="demo"
          fullWidth
          IconComponent={IconComponent}
          input={<SelectInput classes={{ input: classes.inputSelect }} />}
          value={time.value}
          onChange={(e: React.ChangeEvent<{ value: string }>) => bookingStore.setPickupDetails('time', e.target.value)}
        >
          {serviceSlots.map((item) => (
            <MenuItem key={item.time} value={item.time}>{item.label}</MenuItem>
          ))}
        </CustomSelect>
      </Box>
      <Box className={classes.manPower}>
        <Grey3Typography variant="caption" className={classes.manPowerTitle}>
          {t('grey3TypographyTitle')}
        </Grey3Typography>
        <Grey2Typography className={classes.manPowerHint}>
          {t('grey3TypographySubtitle')}
        </Grey2Typography>
        <RadioGroup
          aria-label="manPower"
          name="customized-radios"
          onChange={(e) => {
            setManPower(parseInt(e.target.value, 10));
            bookingStore.setPickupDetails('moverCount', parseInt(e.target.value, 10));
          }}
        >
          <FormControlLabel
            control={(
              <StyledRadio
                className={classes.radioBtn}
                value={1}
                checked={manPower === 1}
                name="manPower"
              />
            )}
            label={<Grey3Typography className={classes.manPowerLabel}>{t('grey3Typography4')}</Grey3Typography>}
          />
          <FormControlLabel
            control={(
              <StyledRadio
                className={classes.radioBtn}
                value={0}
                checked={manPower === 0}
                name="manPower"
              />
            )}
            label={<Grey3Typography className={classes.manPowerLabel}>{t('grey3Typography5')}</Grey3Typography>}
          />
        </RadioGroup>
      </Box>
    </Box>
  );
};

export default inject(BOOKING_STORE)(observer(YourCollectionDetail));
