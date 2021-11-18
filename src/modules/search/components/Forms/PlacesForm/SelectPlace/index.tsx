import React, { useEffect } from 'react';
import {
  Box, Typography, Theme, List,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/styles';
import ClevertapReact from 'clevertap-react';
import usePageTranslation from 'hooks/usePageTranslation';
import CustomCheckbox, { CheckboxLabelTypes } from 'modules/host-onboarding/components/Main/Forms/FormSiteFeatures/CustomCheckBox';
import { getTranslatedName, useCurrentCountry } from 'utilities/market';
import { getLocalStorage } from 'utilities/localStorage';
import { useRouter } from 'next/router';
import { inject, observer } from 'mobx-react';
import { SitesListStore, SITES_STORE_KEY } from 'modules/search/stores/SitesListStore';
import DayJS from 'components/DayJS';
import { PrimaryButton } from 'components/Buttons';
import queryString from 'query-string';
import PlacesBreadcrumb from '../Breadcrumb';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: '15px 28px 0',
    height: 'max-content',
    minHeight: '99px',
  },
  choices: {
    display: 'flex',
    borderBottom: `2px solid ${theme.palette.grey[50]}`,
  },
  choice: {
    borderBottom: `2px solid ${theme.palette.primary.main}`,
    fontSize: '14px',
    lineHeight: '18px',
    fontWeight: 600,
    paddingBottom: '12px',
    marginBottom: '-2px',
  },
  container: {
    marginTop: '40px',
  },
  allDistricts: {
    '& li': {
      width: '100%',
      paddingLeft: '0',
    },
  },
  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginRight: '20%',
    background: '#FFFFFF',
    [theme.breakpoints.down('sm')]: {
      bottom: 0,
      position: 'fixed',
      width: '100vw',
      boxShadow: '0px -5px 10px 0px #e9e9e9',
      padding: '0px 0px 12px 12px',
    },

  },
  skeleton: {
    margin: '10px 15px',
    height: '145px',
    borderRadius: '8px',
  },
  button: {
    width: 'max-content',
    padding: '15px 35px',
    color: 'white',
    fontSize: '13px',
    fontWeight: 700,
    marginTop: '57px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',
      width: '400px',
      fontWeight: 'bold',
      height: '56px',
      margin: '30px 5px 0px 5px',
    },
  },
  clearLink: {
    width: '250px',
    padding: '15px 35px',
    fontSize: '13px',
    fontWeight: 700,
    marginTop: '57px',
    marginRight: '40px',
    cursor: 'pointer',
    color: '#00A0E3',
    [theme.breakpoints.down('sm')]: {
      padding: '15px 0px',
      width: '388px',
      margin: '30px 30px 0px 0px',
    },
  },
  list: {
    display: 'flex',
    flexWrap: 'wrap',
    '& li': {
      width: '33.3%',
      paddingLeft: '0',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
    },
  },
}));

interface IProps {
  [SITES_STORE_KEY]?: SitesListStore

}

const SelectPlace: React.FC<IProps> = ({ sitesStore }) => {
  const classes = useStyles();
  const router = useRouter();
  const currentCountry = useCurrentCountry().name;
  const { t } = usePageTranslation('search', 'SelectPlaces');
  const {
    districts, districtFilterIds, cityFilterIds, cities, getDistricts, getCities, isLoading,
  } = sitesStore;

  const placeNames:string[] = [];

  const moveInDate = router?.query?.move_in
    ? DayJS(router?.query?.move_in as string, 'DD-MM-YYYY').format('YYYY-MM-DD')
    : DayJS().add(1, 'day').format('YYYY-MM-DD');

  const countryId = +router?.query?.country_id;
  const countryName = router?.query?.country_name;
  let breadCrumbs:any[] = [];
  if (getLocalStorage('breadCrumbs')) {
    const jsonStr = getLocalStorage('breadCrumbs');
    breadCrumbs = JSON.parse(jsonStr);
    breadCrumbs.push({ title: t('NavPlaces'), link: '' });
  }

  useEffect(() => {
    if (countryName.includes('Japan')) {
      getCities({
        countryId,
        moveInDate,
      });
    } else {
      getDistricts({
        countryId,
        moveInDate,
      });
    }
  }, []);

  const setDistrictIds = (val: number[]) => {
    sitesStore.setDistrictFilterIds(val);
  };

  const setCityIds = (val: number[]) => {
    sitesStore.setCityFilterIds(val);
  };

  const handleDistrictChange = (id: number) => {
    if (id === 0) {
      setDistrictIds([0]);
    } else if (districtFilterIds.indexOf(id) >= 0) {
      setDistrictIds(districtFilterIds.filter((districtId) => districtId !== id));
    } else {
      setDistrictIds([...districtFilterIds, id]);
    }
  };

  const handleCityChange = (id: number) => {
    if (id === 0) {
      setCityIds([0]);
    } else if (districtFilterIds.indexOf(id) >= 0) {
      setCityIds(districtFilterIds.filter((districtId) => districtId !== id));
    } else {
      setCityIds([...districtFilterIds, id]);
    }
  };

  const clearAllLocations = () => {
    if (countryName.includes('Japan')) {
      sitesStore.setCityFilterIds([]);
    } else {
      sitesStore.setDistrictFilterIds([]);
    }
  };

  const searchStorage = () => {
    if (countryName.includes('Japan')) {
      cities.forEach((c) => {
        if (sitesStore.cityFilterIds.includes(c?.id)) {
          placeNames.push(getTranslatedName(c, 'name', router.locale));
        }
      });
    } else {
      districts.forEach((d) => {
        if (sitesStore.districtFilterIds.includes(d?.id)) {
          placeNames.push(getTranslatedName(d, 'name', router.locale));
        }
      });
    }

    const params = {
      address: placeNames.join(', '),
      country_id: countryId,
      filterBy: countryName.includes('Japan') ? 'cities' : 'districts',
      districtIds: JSON.stringify(sitesStore.districtFilterIds),
      cityIds: JSON.stringify(sitesStore.cityFilterIds),
    };

    const trackingPayload = {
      searchedAddress: placeNames.join(', '),
      language: router.locale,
      country: currentCountry,
      platform: 'WEB',
    };
    ClevertapReact.event('search', trackingPayload);

    router.push(`/search?${queryString.stringify(params)}`);
  };

  const showAllOptions = () => (
    <Box className={classes.allDistricts}>
      {countryName.includes('Japan') ? (
        <CustomCheckbox
          label={t('allDistricts')}
          checked={cityFilterIds.indexOf(0) === 0 && cityFilterIds.length === 1}
          value={0}
          onChange={() => handleCityChange(0)}
        />
      )
        : (
          <CustomCheckbox
            label={t('allDistricts')}
            checked={districtFilterIds.indexOf(0) === 0 && districtFilterIds.length === 1}
            value={0}
            onChange={() => handleDistrictChange(0)}
          />
        )}

    </Box>
  );

  const showDistricts = () => (
    <List className={classes.list}>
      {districts.map((district) => (
        <CustomCheckbox
          key={district?.id}
          label={getTranslatedName(district, 'name', router.locale)}
          checked={districtFilterIds.indexOf(district?.id) >= 0}
          value={district?.id}
          onChange={() => handleDistrictChange(district?.id)}
        />
      ))}
    </List>
  );

  const showPrefectures = () => (
    <List className={classes.list}>
      {cities.map((city) => (
        <CustomCheckbox
          key={city?.id}
          label={getTranslatedName(city, 'name', router.locale)}
          checked={cityFilterIds.indexOf(city?.id) >= 0}
          value={city?.id}
          onChange={() => handleCityChange(city?.id)}
          labelType={CheckboxLabelTypes.PLACES_LABEL}
        />
      ))}
    </List>
  );

  const enableIfSelected = () => {
    if (countryName.includes('Japan')) {
      if (cityFilterIds.length <= 0) {
        return true;
      }
    } else if (districtFilterIds.length <= 0) {
      return true;
    }
    return false;
  };

  return (
    <>
      <Box className={classes.root} fontSize={12}>
        <PlacesBreadcrumb items={breadCrumbs} />
        <Box className={classes.choices}>
          <Typography className={classes.choice}>{t('typography1')}</Typography>
        </Box>

        {isLoading ? <Skeleton width={450} className={classes.skeleton} variant="text" animation="wave" /> : (
          <Box className={classes.container}>
            {showAllOptions()}
            {countryName.includes('Japan') ? showPrefectures() : showDistricts()}

          </Box>
        )}
      </Box>
      <Box className={classes.btnContainer}>

        <Box onClick={clearAllLocations} className={classes.clearLink}>
          {(cityFilterIds.length > 0 || districtFilterIds.length > 0)
      && <Typography>{t('clearAllLocations')}</Typography>}
        </Box>

        <PrimaryButton className={classes.button} onClick={() => searchStorage()} disabled={enableIfSelected()}>{t('typography3')}</PrimaryButton>
      </Box>
    </>
  );
};

export default inject(SITES_STORE_KEY)(observer(SelectPlace));
