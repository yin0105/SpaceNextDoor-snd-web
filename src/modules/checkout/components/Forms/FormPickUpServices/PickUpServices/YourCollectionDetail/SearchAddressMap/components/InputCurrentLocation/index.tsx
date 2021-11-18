import {
  InputAdornment, Box, List, MenuItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PlacesAutocomplete, {
  getLatLng,
  geocodeByPlaceId,
} from 'react-places-autocomplete';
import { inject, observer } from 'mobx-react';
import React, { useState } from 'react';
import { MainTextField } from '../../../../../../../../../../components/Inputs/MainInput';
import Image from '../../../../../../../../../../components/Image';
import usePageTranslation from '../../../../../../../../../../hooks/usePageTranslation';
import { BookingStore, BOOKING_STORE } from '../../../../../../../../stores/BookingStore';

const useStyles = makeStyles((theme) => ({
  inputBox: {
    position: 'relative',
  },
  textField: {
    border: '0px',
    '& .MuiOutlinedInput-root': {
      boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.1)',
      backgroundColor: 'white',
      '& fieldset': {
        border: '0px',
      },
    },
  },
  input: {
    '& >input': {
      padding: '14px 0 16px 13px',
      fontSize: '1.2rem',
      color: theme.palette.grey[200],
      [theme.breakpoints.up('sm')]: {
        fontSize: '1.6rem',
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
}));

interface IProps {
  [BOOKING_STORE]?: BookingStore;
}

const InputCurrentLocation: React.FC<IProps> = ({ bookingStore }) => {
  const classes = useStyles();
  const [location, setLocation] = useState(bookingStore?.pickUpDetails?.address?.value || '');
  const { t } = usePageTranslation('checkout', 'InputCurrentLocation');

  const handleSelectStreet = async (_: string, placeId: string) => {
    const address = await geocodeByPlaceId(placeId);
    const coords = await getLatLng(address[0]);

    setLocation(address[0]?.formatted_address);
    bookingStore.setPickupDetails('lat', coords.lat);
    bookingStore.setPickupDetails('lng', coords.lng);
    bookingStore.setPickupDetails('address', address[0]?.formatted_address);
  };

  return (
    <Box className={classes.inputBox}>
      <PlacesAutocomplete
        searchOptions={{
          // TODO: LOCALIZATION country-change -> Make it dynamic based off on country domain
          componentRestrictions: { country: 'sg' },
        }}
        value={location}
        onChange={(val) => setLocation(val)}
        onSelect={handleSelectStreet}
      >
        {({
          getInputProps, suggestions, getSuggestionItemProps, loading: suggestionLoading,
        }) => (
          <>
            <MainTextField
              placeholder={t('placeholder')}
              variant="outlined"
              fullWidth
              className={classes.textField}
              {...getInputProps({ placeholder: t('placeholder') })}
              InputProps={{
                className: classes.input,
                startAdornment: (
                  <InputAdornment position="start">
                    <Image name="searchIcon" folder="Homepage" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment
                    position="start"
                  >
                    <Image name="location" folder="CheckoutPage" />
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
    </Box>
  );
};

export default inject(BOOKING_STORE)(observer(InputCurrentLocation));
