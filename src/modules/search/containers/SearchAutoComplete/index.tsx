import { useLazyQuery } from '@apollo/client';
import {
  Box, fade, makeStyles, TextField,
} from '@material-ui/core';
import debounce from 'lodash/debounce';
import clsx from 'clsx';
import { Autocomplete, Skeleton } from '@material-ui/lab';
import Router, { useRouter } from 'next/router';
import {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { inject, observer } from 'mobx-react';

import { useCurrentCountry } from 'utilities/market';
import ClevertapReact from 'clevertap-react';
import useTranslation from 'next-translate/useTranslation';
import SearchEmptyState from '../../../../components/Search/EmptyState';
import { SEARCH_LOCATIONS_QUERY } from '../../queries/query';
import { SearchLocationsQuery, SearchLocationsQueryVariables } from '../../queries/__generated__/SearchLocationsQuery';
import useRecentSearches from '../../hooks/useRecentSearches';
import { SitesListStore } from '../../stores/SitesListStore';
import { objToQueryStr } from '../../../../utilities/objectToQueryString';
import usePageTranslation from '../../../../hooks/usePageTranslation';
import * as gtag from '../../../../utilities/gtag';
import { getTranslatedPlace } from '../../../../utilities/locations';

const useStyles = makeStyles((theme) => ({
  option: {
    padding: '15px 30px',
  },
  group: {
    borderRadius: '15px',
  },
  skeleton: {
    margin: '10px 15px',
    height: '35px',
    borderRadius: '8px',
    backgroundColor: fade(theme.palette.grey[50], 0.8),
  },
  input: {
    '& div:before': {
      display: 'none',
    },
    '& div:after': {
      display: 'none',
    },
    '& div': {
      padding: '10px 30px !important',
      '& div': {
        display: 'none',
      },
    },
    borderRadius: '15px',
    backgroundColor: fade(theme.palette.grey[50], 0.7),
  },
  inputLight: {
    backgroundColor: 'white',
  },
}));

interface IProps {
  sitesStore?: SitesListStore;
  onChange(): void;
  theme?: 'light';
  currentLocation: string;
  openInNewTab: boolean;
}

const SearchLocationAutoComplete: React.FunctionComponent<IProps> = ({
  sitesStore,
  onChange, currentLocation, openInNewTab, theme,
}) => {
  const classes = useStyles();
  const router = useRouter();
  const country = useCurrentCountry();
  const [search, setSearch] = useState(currentLocation || 't');
  const inRef = useRef<HTMLDivElement>();
  const { lang } = useTranslation();
  const [selectedValue, setSelectedValue] = useState(null);
  const [, setRecentSearches] = useRecentSearches([]);
  const [query, result] = useLazyQuery<SearchLocationsQuery, SearchLocationsQueryVariables>(
    SEARCH_LOCATIONS_QUERY,
  );
  const currentCountry = useCurrentCountry().name;
  const debouncedQuery = useCallback(debounce((s: string) => {
    query({
      variables: {
        search: s ? { _iLike: `%${s}%` } : undefined,
        country: { _eq: country?.name },
      },
    });
  }, 500), []);
  const debouncedSetSearch = useCallback(debounce((s: string) => setSearch(s), 500), []);
  const locations = result.data?.locations?.edges || [];

  // set country id
  sitesStore.setCountryId(locations?.[0]?.country?.id);

  const isSelectedValue = (location: SearchLocationsQuery['locations']['edges'][0], prevLocation: string) => {
    const words = prevLocation.split(' ');
    const district = location?.district?.name_en || '';
    const city = location?.city?.name_en || '';
    let confidence = 0;

    words.forEach((word) => {
      if (city.includes(word) || district.includes(word)) {
        confidence += 1;
      }
    });

    return confidence >= (words.length - 2);
  };

  useEffect(() => {
    const inputEl: any = inRef.current.childNodes[0].childNodes[0];
    if (inputEl) {
      setTimeout(() => {
        if (inputEl instanceof HTMLInputElement) inputEl.setAttribute('id', 'mainSearchField');
      }, 500);
    }
  }, []);

  useEffect(() => {
    const keywords = JSON.parse(sessionStorage.getItem('keywords'));
    if (search.length > 1 && !keywords?.length) {
      sessionStorage.setItem('keywords', JSON.stringify([search]));
    } else if (search.length > 1) {
      keywords.push(search);
      sessionStorage.setItem('keywords', JSON.stringify(keywords));
    }
  }, [search]);

  useEffect(() => {
    // Call the query first time to load the location that was selected previously
    // This can happen when user accidentally refreshes the page, now we need to show
    // previously selected value in the auto complete box
    if (currentLocation) {
      debouncedQuery(currentLocation.substr(0, currentLocation.lastIndexOf(', ')) || 'd');
    }

    setSearch(currentLocation);
  }, [currentLocation]);

  useEffect(() => {
    // Keep a watch on query data, if that changes, try to guess if the first value is
    // the one that user selected and then show it in the auto complete
    if (!selectedValue && currentLocation) {
      locations.forEach((loc) => {
        if (isSelectedValue(loc, currentLocation)) {
          setSelectedValue(locations[0]);
        }
      });
    }
  }, [result.data]);

  const onLocationChange = (location: SearchLocationsQuery['locations']['edges'][0], reason: string) => {
    if (reason === 'clear') {
      setSearch('');
      query({
        variables: {
          country: { _eq: country?.name },
        },
      });
    }

    if (!location) {
      return;
    }

    type Query = { district_id?: number, city_id?: number, location: string };
    const queryParams: Query = {
      ...Router.query,
      location: getTranslatedPlace(location, router?.locale),
    };

    if (location?.district?.id) {
      queryParams.district_id = location?.district?.id;
      delete queryParams.city_id;
    } else if (location?.city?.id) {
      queryParams.city_id = location?.city?.id;
      delete queryParams.district_id;
    }

    const trackingPayload = {
      city: location?.city?.name_en,
      district: location?.district?.name_en,
      language: lang,
      country: currentCountry,
      platform: 'WEB',
    };
    gtag.track('search', trackingPayload);
    ClevertapReact.event('search', trackingPayload);

    setRecentSearches(location);
    // set country name
    sitesStore.setCountryId(location?.country?.id);
    if (openInNewTab) {
      window.open(`/search?${objToQueryStr(queryParams)}`);
    } else {
      setSelectedValue(location);
      Router.push({
        pathname: '/search',
        query: queryParams,
      });

      onChange();
    }
  };

  const NoOptionsText = () => {
    if (!search) {
      return null;
    }
    if (locations.length) {
      return <Box />;
    }

    return <SearchEmptyState />;
  };

  const { t } = usePageTranslation('search', 'SearchAutoComplete');

  return (
    <Box>
      <Autocomplete
        fullWidth
        options={locations}
        onChange={(_, location: SearchLocationsQuery['locations']['edges'][0], reason) => onLocationChange(location, reason)}
        openOnFocus
        onFocus={() => {
          if (!search) {
            query({
              variables: {
                country: { _eq: country?.name },
              },
            });
          }
        }}
        loadingText={(
          <Box>
            <Skeleton classes={{ root: classes.skeleton }} width={250} animation="wave" />
            <Skeleton classes={{ root: classes.skeleton }} width={350} animation="wave" />
            <Skeleton classes={{ root: classes.skeleton }} width={450} animation="wave" />
            <Skeleton classes={{ root: classes.skeleton }} width={550} animation="wave" />
            <Skeleton classes={{ root: classes.skeleton }} animation="wave" />
          </Box>
        )}
        noOptionsText={<NoOptionsText />}
        loading={result.loading}
        getOptionLabel={(_loc) => getTranslatedPlace(_loc, router?.locale)}
        classes={{
          option: classes.option,
          paper: classes.group,
          popper: classes.group,
        }}
        value={selectedValue}
        renderInput={(params) => (
          <TextField
            {...params}
            classes={{ root: clsx(classes.input, theme === 'light' && classes.inputLight) }}
            autoFocus={false}
            value={search}
            ref={inRef}
            placeholder={t('placeholder')}
            onChange={(ev) => {
              debouncedSetSearch(ev.target.value);
              debouncedQuery(ev.target.value);
            }}
            fullWidth
          />
        )}
      />
    </Box>
  );
};

export default inject('sitesStore')(observer(SearchLocationAutoComplete));
