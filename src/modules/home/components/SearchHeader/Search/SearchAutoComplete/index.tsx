import {
  makeStyles,
  Box,
  fade,
  useMediaQuery,
  ClickAwayListener,
  Theme,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { useRouter } from 'next/router';
import React, {
  useState, useEffect, useRef,
} from 'react';
import ClevertapReact from 'clevertap-react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { inject, observer } from 'mobx-react';
import clsx from 'clsx';
import { getTranslatedName, useCurrentCountry } from 'utilities/market';
import usePageTranslation from 'hooks/usePageTranslation';
import Image from 'components/Image';
import {
  SitesListStore,
  SITES_STORE_KEY,
} from 'modules/search/stores/SitesListStore';
import useTranslation from 'next-translate/useTranslation';
import * as gtag from 'utilities/gtag';
import searchTerm, { ILocation, IPlaces } from 'utilities/searchByLocation';
import queryString from 'query-string';
import SearchButton from '../SearchButton';

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
    borderRadius: '15px',
    border: 'none',
    flexBasis: '100%',
    height: '50px',
    outline: 'none',
    fontSize: '14px',
    lineHeight: '20px',
    padding: '20px 30px',
    transition: 'all 0.2s ease-in-out',
    width: '100%',
    fontFamily: 'inherit',
    '&::placeholder': {
      opacity: '0.55',
    },
    [theme.breakpoints.down('xs')]: {
      backgroundColor: fade(theme.palette.grey[50], 0.7),
      padding: '20px',
      borderRadius: '15px',
    },
  },
  inputSearch: {
    backgroundColor: fade(theme.palette.grey[50], 0.7),
  },
  suggestion: {
    padding: '12px 30px',
    fontSize: '1.4rem',
    cursor: 'pointer',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    width: '100%',
    background: 'transparent',
    '& img': {
      height: '14px',
      marginBottom: '-2px',
      marginRight: '5px',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.2rem',
      padding: '10px 0px',
      paddingRight: '50px',
      paddingLeft: '10px',
    },
  },
  skeleton: {
    margin: '15px 30px',
    height: '32px',
    borderRadius: '8px',
    backgroundColor: fade(theme.palette.grey[50], 0.8),
    [theme.breakpoints.down('xs')]: {
      margin: '5px 0px',
      height: '40px',
    },
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
  container: {
    borderRadius: '15px',
    border: '1px solid #E9E9E9',
    background: 'white',
    marginTop: '3px',
    flexBasis: '100%',
    padding: '10px 0',
    position: 'absolute',
    width: '100%',
  },
  onSearch: {
    boxShadow: ' 0px 3px 8px -5px gray',
    top: '53px',
  },
  onHome: {
    bottom: '55px',
  },
  onMobile: {
    top: '55px',
    left: 0,
    border: 'none',
    [theme.breakpoints.down('sm')]: {
      width: '100vw',
    },
    [theme.breakpoints.down('xs')]: {
      width: '90vw',
    },
  },
}));

interface IProps {
  onSelect?: () => void;
  onMap?: boolean;
  [SITES_STORE_KEY]?: SitesListStore;
  popup?: boolean;
}

const SearchAutoComplete: React.FC<IProps> = ({
  onSelect,
  onMap = false,
  sitesStore,
  popup = false,
}) => {
  const classes = useStyles();
  const router = useRouter();
  const [address, setAddress] = useState('');
  const [showDefaultSuggest, setShowDefaultSuggest] = useState(true);
  const [showDefaultCities, setShowDefaultCities] = useState(false);
  const [searchBtn, setSearchBtn] = useState(false);
  const [dbSuggestions, setDbSuggestions] = useState<ILocation[]>([]);
  const onSearchPage = router.pathname === '/search';
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.only('xs'));
  const { t } = usePageTranslation('search', 'SearchAutoComplete');
  const currentCountry = useCurrentCountry();
  const { lang } = useTranslation();
  const ref = useRef<string[]>();
  const inputRef = useRef<HTMLInputElement & HTMLTextAreaElement>();
  const country = useCurrentCountry();

  const handleChange = (val: string) => {
    setShowDefaultSuggest(true);
    const searchTerms = searchTerm({ term: val, country: country.name }, t).slice(0, 3);
    setDbSuggestions(searchTerms);
    setAddress(val);
  };

  const showCities = () => {
    if (address.length < 1) {
      setShowDefaultSuggest(true);
    }
    setShowDefaultCities(true);
    setSearchBtn(true);
    setDbSuggestions(
      searchTerm({ country: country.name, showCities: true }, t).slice(0, 5),
    );
  };

  /*
      When search input loose focus/onBlur
  */
  const hideSuggestion = () => {
    /*
      if clicked target search button
      then blink by the suggestions
    */
    setTimeout(() => {
      setShowDefaultSuggest(false);
    }, 200);
    /*
    Otherwise turn search button into Iconbutton
    */
    setSearchBtn(false);
  };

  /*
    If user selected a place e.g District
    or MRT
  */
  const handlePlaceSelect = (val: IPlaces, e) => {
    const params = {
      search: val.search_value,
      country_id: country.id,
      country_name: country.name,
    };

    router.push(`/place?${queryString.stringify(params)}`);
  };

  const handleDbSelect = (val: ILocation, e) => {
    setDbSuggestions([]);
    const { city, district } = val;
    const searchedAddress = getTranslatedName(val, 'search', router.locale);
    setAddress(searchedAddress);
    const params = {
      address: searchedAddress,
      country_id: country.id,
      city_id: city?.id,
      district_id: district?.id,
    };

    onSelect?.();
    const trackingPayload = {
      searchedAddress,
      language: lang,
      country: currentCountry.name,
      platform: 'WEB',
    };
    gtag.track('search', trackingPayload);
    ClevertapReact.event('search', trackingPayload);
    router.push(`/search?${queryString.stringify(params)}`);
  };

  const handleSelect = async (val: string) => {
    setDbSuggestions([]);
    let selectedAddress = val;
    if (ref.current && !(selectedAddress in ref.current || [])) {
      // eslint-disable-next-line
      selectedAddress = ref.current[0];
    }

    try {
      const searchedAddress = selectedAddress.split(',').slice(0, 2).join(',');
      setAddress(searchedAddress);
      const res = await geocodeByAddress(selectedAddress);
      const latLng = await getLatLng(res[0]);
      const params = {
        address: searchedAddress,
        lat: latLng.lat,
        lon: latLng.lng,
      };
      onSelect?.();
      const trackingPayload = {
        searchedAddress,
        language: lang,
        country: currentCountry.name,
        platform: 'WEB',
      };

      gtag.track('search', trackingPayload);
      ClevertapReact.event('search', trackingPayload);
      if (onMap) {
        sitesStore.mapPanTo(latLng);
        return;
      }
      router.push(`/search?${queryString.stringify(params)}`);
    } catch (e) {
      console.error(e);
    }
  };

  const showStorages = async () => {
    if (address.length > 2) {
      await handleSelect(address);
    }
    setTimeout(() => {
      inputRef?.current?.click();
      inputRef?.current?.focus();
    }, 10);
  };

  useEffect(() => {
    if (onSearchPage && !popup) {
      setAddress(
        decodeURI(router.query.address as any).replaceAll('undefined', ''),
      );
    }
  }, []);

  const autoCompleteStyles = () => {
    if ((isMobile || onSearchPage) && dbSuggestions.length) {
      return { top: 53 + dbSuggestions.length * 38, paddingTop: 15 };
    }
    if (!onSearchPage && dbSuggestions.length) {
      return { bottom: 48 + dbSuggestions.length * 38, paddingBottom: 20 };
    }
    return {};
  };

  const dbSuggestionsStyles = () => {
    if (!onSearchPage && !isMobile) {
      return {
        paddingTop: '5px', bottom: 55, paddingBottom: '5px', border: 'none',
      };
    }
    if (onSearchPage && !isMobile) {
      return {
        top: 53,
        boxShadow: !popup ? ' 0px -3px 10px -5px gray' : 'none',
        paddingBottom: 0,
        borderRadius: '15px',
        border: 'none',
      };
    }
    return {};
  };

  const supportedPlaces = [
    'airport',
    'atm',
    'cafe',
    'fire_station',
    'flag',
    'gas_station',
    'hospital',
    'library',
    'lodging',
    'park',
    'parking',
    'pharmacy',
    'place_of_worship',
    'point_of_interest',
    'police',
    'post_office',
    'restaurant',
    'supermarket',
    'tourist_attraction',
  ];

  const renderAutocompleteList = (s, i) => {
    if (s?.places?.length > 0) {
      return s?.places?.map((p:IPlaces, k) => (
        <div
          key={k}
          className={`${classes.suggestion}`}
          onClick={(e) => handlePlaceSelect(p, e)}
          role="presentation"
        >
          {p?.search_value === 'stations' ? <Image name="station" /> : <Image name="location" />}
          {p.name_en}
        </div>
      ));
    }
    return (
      <div
        key={i}
        className={classes.suggestion}
        onClick={(e) => handleDbSelect(s, e)}
        role="presentation"
      >
        <Image name="location" />
        {getTranslatedName(s, 'search', router.locale)}
      </div>
    );
  };

  return (
    <>
      <PlacesAutocomplete
        value={address}
        onChange={handleChange}
        onSelect={handleSelect}
        searchOptions={{
          componentRestrictions: {
            country: useCurrentCountry().code,
          },
          types: ['establishment'],
        }}
        shouldFetchSuggestions={address.length > 1}
      >
        {({
          getInputProps, suggestions, getSuggestionItemProps, loading,
        }) => (
          <div className={classes.root}>
            <Box width="100%">
              <ClickAwayListener onClickAway={() => hideSuggestion()}>
                <Box
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    background: !onSearchPage ? 'white' : 'rgba(233, 233, 233, 0.7)',
                    borderRadius: '15px',
                  }}
                >
                  <input
                    {...getInputProps({
                      placeholder: t('placeholder'),
                    })}
                    onClick={showCities}
                    ref={inputRef}
                    className={clsx(
                      classes.input,
                      onSearchPage && classes.inputSearch,
                    )}
                  />
                  {!isMobile && (
                  <SearchButton
                    onClickCallback={showStorages}
                    activeState={searchBtn || address.length > 2}
                  />
                  )}
                </Box>
              </ClickAwayListener>
              {(loading || !!suggestions.length) && (
              <div
                className={clsx(
                  'autocomplete-dropdown-container',
                  classes.container,
                  !isMobile
                      && (onSearchPage ? classes.onSearch : classes.onHome),
                  isMobile && classes.onMobile,
                )}
                style={autoCompleteStyles()}
              >
                {loading && (
                <>
                  <Skeleton
                    classes={{ root: classes.skeleton }}
                    width="40%"
                    animation="wave"
                  />
                  <Skeleton
                    classes={{ root: classes.skeleton }}
                    width="55%"
                    animation="wave"
                  />
                  <Skeleton
                    classes={{ root: classes.skeleton }}
                    width="70%"
                    animation="wave"
                  />
                  <Skeleton
                    classes={{ root: classes.skeleton }}
                    width="85%"
                    animation="wave"
                  />
                  <Skeleton
                    classes={{ root: classes.skeleton }}
                    animation="wave"
                  />
                </>
                )}
                {!loading
                    && suggestions.map((suggestion, idx) => {
                      // only want to set ref one time.
                      // Since UI is not updating we're using ref here instead of state
                      if (idx === 0) ref.current = suggestions.map((s) => s.description) || [];
                      return (
                        <div
                          key={idx}
                          {...getSuggestionItemProps(suggestion)}
                          style={{
                            background: suggestion.active
                              ? '#fafafa'
                              : 'transparent',
                          }}
                          className={classes.suggestion}
                        >
                          {supportedPlaces.includes(suggestion.types[0]) ? (
                            <Image
                              name={`LocationIcon/${suggestion.types[0]}`}
                            />
                          ) : (
                            <Image name="LocationIcon/place" />
                          )}

                          {suggestion.description}
                        </div>
                      );
                    })}
              </div>
              )}
            </Box>
          </div>
        )}
      </PlacesAutocomplete>

      {showDefaultSuggest && (!!address.length || showDefaultCities) && !!dbSuggestions.length && (
        <div
          className={clsx(classes.container, isMobile && classes.onMobile)}
          role="presentation"
          style={dbSuggestionsStyles()}
        >
          {(!!address.length || showDefaultCities)
            && dbSuggestions.map((s, i) => renderAutocompleteList(s, i))}
        </div>
      )}
    </>
  );
};

export default inject(SITES_STORE_KEY)(observer(SearchAutoComplete));
