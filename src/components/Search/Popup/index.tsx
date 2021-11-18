import {
  Box,
  CircularProgress,
  Dialog,
  Grid,
  Icon,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import { inject } from 'mobx-react';
import Router, { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import SearchAutoComplete from 'modules/home/components/SearchHeader/Search/SearchAutoComplete';
import Image from '../../Image';
import MainInput from '../../Inputs/MainInput';
import SearchEmptyState from '../EmptyState';
import { SearchLocationItemFragment } from './__generated__/SearchLocationItemFragment';
import { SitesListStore } from '../../../modules/search/stores/SitesListStore';
import useRecentSearches from '../../../modules/search/hooks/useRecentSearches';
import usePageTranslation from '../../../hooks/usePageTranslation';
import { getTranslatedPlace } from '../../../utilities/locations';

const useStyles = makeStyles(() => ({
  wrapper: {
    padding: '10px 15px',
  },
  chipsWrapper: {
    marginBottom: '20px',
  },
  chips: {
    marginRight: '10px',
    height: '28px',
    padding: '0 8px',
    borderRadius: '11px',
  },
  heading: {
    fontWeight: 600,
    marginTop: '15px',
  },
  closeIcon: {
    position: 'absolute',
    display: 'flex',
    right: '15px',
    top: 0,
    bottom: 0,
    margin: 'auto',
    alignItems: 'center',
  },
  searchBox: {
    position: 'relative',
    margin: '4px 0 10px',
  },
  listItem: {
    paddingLeft: '0px',
  },
  listItemText: {
    paddingLeft: '15px',
    '& span, & svg': {
      fontSize: '12px',
    },
  },
  input: {
    fontSize: '12px',
    backgroundColor: '#E9E9E9',
    padding: '18px 40px 18px 15px',
  },
  recentSearchTitle: {
    fontWeight: 600,
    fontSize: '10px',
    lineHeight: '0px',
    textTransform: 'uppercase',
    paddingTop: '20px',
    paddingBottom: '10px',
  },
}));

interface ISearchPopupProps {
  isOpen: boolean;
  onClose(): void;
  sitesStore?: SitesListStore;
  onMap?: boolean
  // loading: boolean;
  // onSearch(str: string): void;
  // locations: SearchLocationItemFragment[];
  // isLoading: boolean;
  // setIsLoading: (value: boolean) => void;
}

const SearchPopup: React.FC<ISearchPopupProps> = ({
  isOpen,
  onClose,
  sitesStore,
  onMap = false,
  // loading,
  // onSearch,
  // locations,
  // isLoading,
  // setIsLoading,
}) => {
  const router = useRouter();
  const classes = useStyles();
  const [search, setSearchText] = useState('');
  const [, setRecentSearches] = useRecentSearches([]);

  const onLocationClick = (location: SearchLocationItemFragment) => {
    setRecentSearches(location);
    type Query = {
      district_id?: number;
      city_id?: number;
      location: string;
    };
    const query: Query = {
      ...Router.query,
      location: getTranslatedPlace(location, router?.locale),
    };

    if (location?.district?.id) {
      query.district_id = location?.district?.id;
      delete query.city_id;
    } else if (location?.city?.id) {
      query.city_id = location?.city?.id;
      delete query.district_id;
    }

    sitesStore.setCountryId(location?.country?.id);
    sitesStore.resetFilters();
    Router.push({
      pathname: '/search',
      query,
    });

    onClose();
  };

  const renderList = (location: SearchLocationItemFragment, i: number) => (
    <ListItem
      key={`${location?.city?.id}_${i}`}
      button
      className={classes.listItem}
    >
      <Image name="location" folder="SearchLocation" />
      <ListItemText
        className={classes.listItemText}
        primary={getTranslatedPlace(location, router?.locale)}
        onClick={() => onLocationClick(location)}
      />
    </ListItem>
  );

  const { t } = usePageTranslation('search', 'Popup');
  const onSelect = () => {
    onClose();
  };
  return (
    <Dialog fullScreen open={isOpen} style={{ zIndex: 130000000 }}>
      <Box className={classes.wrapper}>
        <Box mb={5} className={classes.searchBox}>
          <Grid container spacing={0} alignItems="center">
            <Grid item xs={1}>
              <Icon onClick={onClose}>
                <Image name="back" folder="SearchLocation" />
              </Icon>
            </Grid>
            <Grid item xs={11}>
              <SearchAutoComplete popup onMap={onMap} onSelect={onSelect} />
              {/* <MainInput
                autoFocus
                value={search}
                onChange={({ target: { value } }) => {
                  setSearchText(value);
                  onSearch(value);
                  setIsLoading(true);
                }}
                classes={{ input: classes.input }}
                fullWidth
                placeholder={t('placeholder')}
              /> */}
              {/* {loading && (
                <Box className={classes.closeIcon}>
                  <CircularProgress size={20} />
                </Box>
              )}

              {!!search && !loading && (
                <Box
                  className={classes.closeIcon}
                  onClick={() => {
                    onSearch('');
                    setSearchText('');
                  }}
                >
                  <Image name="closeOutline" folder="SearchLocation" />
                </Box>
              )} */}
            </Grid>
          </Grid>
        </Box>
        {/* {!locations.length && !loading && !!search && !isLoading && <SearchEmptyState />}

        {!!locations.length && (
          <Box>
            <List>
              {locations.map((location, i) => renderList(location, i))}
            </List>
          </Box>
        )} */}
      </Box>
    </Dialog>
  );
};

export default inject('sitesStore')(SearchPopup);
