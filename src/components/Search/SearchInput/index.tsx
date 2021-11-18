import {
  Box, fade, Hidden, makeStyles, Typography,
} from '@material-ui/core';
import { useState } from 'react';
import clsx from 'clsx';
import PlacesAutoComplete from 'modules/home/components/SearchHeader/Search/SearchAutoComplete';
import { useRouter } from 'next/router';
import Image from '../../Image';
import usePageTranslation from '../../../hooks/usePageTranslation';
import MainInput from '../../Inputs/MainInput';
import SearchLocationContainer from '../../../modules/search/containers/SearchLocation';

const useStyles = makeStyles((theme) => ({
  boxLocation: {
    paddingLeft: '6px',
  },
  location: {
    fontWeight: 600,
  },
  searchBox: {
    position: 'relative',
    margin: '4px 0 10px',
  },
  input: {
    fontSize: '12px',
    padding: '18px 15px',
    paddingLeft: '50px',
    backgroundColor: fade(theme.palette.grey[50], 0.7),

    border: `1px solid ${theme.palette.grey[50]}`,
    borderRadius: '15px',
    '&::placeholder': {
      opacity: '1',
      color: theme.palette.grey[100],
    },
  },
  inputLight: {
    backgroundColor: 'white',
    border: 'none',
  },
  searchIcon: {
    position: 'absolute',
    left: '17px',
    top: '16px',
    zIndex: 2,
  },
  searchIconImg: {
    width: '17px',
    height: '17px',
  },
  mapMobile: {
    flexGrow: 2,
    margin: '0 10px -10px',
  },
}));

interface IProps {
  theme?: 'light';
  onMap?: boolean
}

const SearchInput: React.FunctionComponent<IProps> = ({
  theme, onMap = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const classes = useStyles();
  const router = useRouter();
  const { t } = usePageTranslation('search', 'SearchInput');

  return (
    <Box className={clsx(onMap && classes.mapMobile)}>
      {isOpen && (
      <SearchLocationContainer
        onMap={onMap}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      )}
      {theme !== 'light' && (
        <Hidden smUp>
          {!onMap && (
            <Box className={clsx(classes.boxLocation)}>
              <Typography variant="caption" className={classes.location}>
                {t('typography')}
              </Typography>
            </Box>
          )}
        </Hidden>
      )}
      <Box mb={5} className={classes.searchBox}>
        <Hidden smUp>
          <Box className={classes.searchIcon}>
            <Image name="searchIcon" className={classes.searchIconImg} folder="Homepage" />
          </Box>
          <MainInput
            onClick={() => setIsOpen(true)}
            classes={{ input: clsx(classes.input, theme === 'light' && classes.inputLight) }}
            key={`${Math.floor((Math.random() * 1000))}-min`}
            defaultValue={router?.query?.address || ''}
            readOnly
            fullWidth
            placeholder={t('placeholder')}
            id="mainSearchField"
          />
        </Hidden>
        <Hidden only="xs">
          <PlacesAutoComplete onMap={onMap} />
        </Hidden>
      </Box>
    </Box>
  );
};

export default SearchInput;
