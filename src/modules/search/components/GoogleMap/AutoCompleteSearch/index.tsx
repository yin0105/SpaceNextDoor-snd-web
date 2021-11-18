import {
  makeStyles, Box, fade, Theme, useMediaQuery, Hidden,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { inject, observer } from 'mobx-react';
import Image from '../../../../../components/Image';
import { ICenter } from '../index';
import { SitesListStore } from '../../../stores/SitesListStore';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'column',
    transition: 'all 0.2s ease',
    [theme.breakpoints.down('xs')]: {
      flexBasis: '100% !important',
      padding: '10px',
      flexFlow: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  },
  input: {
    borderRadius: '25px',
    border: 'none',
    flexBasis: '100%',
    height: '50px',
    outline: 'none',
    fontSize: '12px',
    lineHeight: '20px',
    padding: '20px 40px',
    transition: 'all 0.2s ease-in-out',
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      backgroundColor: fade(theme.palette.grey[50], 0.7),
      padding: '20px',
      borderRadius: '15px',
    },
  },
  suggestion: {
    padding: '10px',
    borderRadius: '20px',
    fontSize: '1.2rem',
    cursor: 'pointer',
  },
  skeleton: {
    margin: '10px 15px',
    height: '35px',
    borderRadius: '8px',
    backgroundColor: fade(theme.palette.grey[50], 0.8),
    [theme.breakpoints.down('xs')]: {
      height: '20px',
      margin: '5px 10px',
    },
  },
  searchIcon: {
    position: 'relative',
    width: '20px',
    left: '15px',
    top: '35px',
  },
  pointer: {
    position: 'absolute',
    width: '20px',
    top: '37px',
    right: '20px',
  },
  active: {
    width: '6px',
    height: '6px',
    background: 'red',
    borderRadius: '50px',
    position: 'absolute',
    top: '21px',
    right: '7px',
  },
}));

interface IProps {
  setCenter: (center: ICenter) => void;
  showFilters: boolean;
  sitesStore?: SitesListStore;
  setShowMap: (showMap: boolean) => void;
}

const AutoCompleteSearch: React.FC<IProps> = ({
  setCenter, showFilters, sitesStore, setShowMap,
}) => {
  const classes = useStyles();
  const router = useRouter();
  const { location } = router.query;
  const [address, setAddress] = useState(`${location}, `);
  const isMedScreen = useMediaQuery((theme: Theme) => theme.breakpoints.only('md'));
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.only('xs'));

  const handleChange = (val: string) => {
    if (val.length - 2 < location.length) {
      setAddress(`${location}, `);
    } else {
      setAddress(`${location}, ${val.replaceAll(`${location}, `, '')}`);
    }
  };
  const handleSelect = async (selectedAddress) => {
    try {
      setAddress(selectedAddress);
      const res = await geocodeByAddress(selectedAddress);
      const latLng = await getLatLng(res[0]);
      setCenter({
        lat: latLng.lat,
        lng: latLng.lng,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const inputDivStyle = isMedScreen ? {
    flexBasis: (showFilters ? '40%' : '82%'),
  } : {
    flexBasis: (showFilters ? '61%' : '100%'),
  };
  return (
    <PlacesAutocomplete
      value={address}
      onChange={handleChange}
      onSelect={handleSelect}
      searchOptions={{
        componentRestrictions: {
          country: 'sg', // TODO: country-change
        },
        types: ['establishment'],
      }}
    >
      {({
        getInputProps, suggestions, getSuggestionItemProps, loading,
      }) => (
        <div
          style={inputDivStyle}
          className={classes.root}
        >
          <Hidden smDown>
            <img
              alt=""
              src="https://static.spacenextdoor.com/icons/searchicon.svg"
              className={classes.searchIcon}
            />
          </Hidden>
          <Hidden smUp>
            <img
              alt=""
              src="https://static.spacenextdoor.com/icons/leftarrow.svg"
              onClick={() => setShowMap(false)}
            />
          </Hidden>
          <Box style={{ width: isMobile ? '82%' : '100%' }}>
            <input
              {...getInputProps({
                placeholder: 'Search',
              })}
              className={classes.input}
            />
            <Hidden smDown>
              <Image name="locationPointer" folder="SearchLocation" className={classes.pointer} />
            </Hidden>
            <div
              className="autocomplete-dropdown-container"
              style={{
                borderRadius: '20px', background: 'white', marginTop: '3px', flexBasis: '100%',
              }}
            >
              {loading
                && (
                  <Box>
                    <Skeleton classes={{ root: classes.skeleton }} width="40%" animation="wave" />
                    <Skeleton classes={{ root: classes.skeleton }} width="55%" animation="wave" />
                    <Skeleton classes={{ root: classes.skeleton }} width="70%" animation="wave" />
                    <Skeleton classes={{ root: classes.skeleton }} width="85%" animation="wave" />
                    <Skeleton classes={{ root: classes.skeleton }} animation="wave" />
                  </Box>
                )}
              {suggestions.map((suggestion, idx) => (
                <div
                  key={idx}
                  {...getSuggestionItemProps(suggestion)}
                  style={{ background: suggestion.active ? '#fafafa' : 'transparent' }}
                  className={classes.suggestion}
                >
                  {suggestion.description}
                </div>
              ))}
            </div>
          </Box>
          <Hidden smUp>
            <Box onClick={() => sitesStore.toggleFilterPopup('ACTIVE')}>
              <Image name="settings" folder="SearchLocation" />
              {sitesStore.isFiltersApplied && (
                <span className={classes.active} />
              )}
            </Box>
          </Hidden>
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default inject('sitesStore')(observer(AutoCompleteSearch));
