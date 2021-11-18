import {
  Box, Button, Grid, makeStyles, Typography, CircularProgress, List, MenuItem,
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { inject, observer } from 'mobx-react';
import PlacesAutocomplete, {
  getLatLng,
  geocodeByPlaceId,
} from 'react-places-autocomplete';

import Buttons from '../Buttons';
import Grey3Typography from '../../../../../../components/Typographies/Grey3Typography';
import MainInput from '../../../../../../components/Inputs/MainInput';
import Grey2Typography from '../../../../../../components/Typographies/Grey2Typography';
import Image from '../../../../../../components/Image';
import LocationSelect from './LocationSelect';
import { GET_COUNTRIES, UPDATE_SITE } from '../queries/query';
import { PAGINATION_LIMIT } from '../../../../../../config';
import { getPlaceDetailsByCoords } from '../../../../../../shared/google-api';
import HostOnboardingStore, { ONBOARDING_STORE } from '../../../../stores/HostOnboardingStore';
import usePageTranslation from '../../../../../../hooks/usePageTranslation';

const useStyles = makeStyles((theme) => ({
  mainBox: {
    maxWidth: '630px',
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',
    padding: '100px 20px',
    [theme.breakpoints.down('sm')]: {
      padding: '20px',
    },
  },
  paddingRight: {
    paddingRight: '168px',
    [theme.breakpoints.down('sm')]: {
      paddingRight: '0',
    },
  },
  formBox: {
    marginTop: '22px',
  },

  useCurrentLocationBox: {
    position: 'relative',
    marginTop: '20px',
  },
  buttonImageBox: {
    position: 'absolute',
    top: '10px',
    left: '57px',
  },
  useCurrentLocationButton: {
    textTransform: 'none',
    border: '1px solid black',
    borderRadius: '15px',
    padding: '12px 64px 12px 88px',
  },
  useCurrentLocationButtonText: {
    fontSize: '1.55rem',
  },

  headerBox: {
    marginTop: '24px',
  },
  inputBox: {
    marginTop: '16px',
  },
  input: {
    paddingLeft: '15px',
  },
  location: {
    paddingLeft: '0px',
    '& input': {
      paddingLeft: '15px',
    },
  },
  descriptionInputBox: {
    marginTop: '8px',
  },
  error: {
    borderColor: '#E53535',
    '& input': {
      borderColor: '#E53535',
    },
  },
  errorText: {
    color: '#E53535',
  },
  btnLoading: {
    position: 'absolute',
    left: '10px',
    top: '2px',
  },
  suggestionContainer: {
    marginTop: 5,
    overflow: 'scroll',
    position: 'absolute',
    zIndex: 99,
    backgroundColor: '#FFFFFF',
    border: `1px solid ${theme.palette.grey[50]}`,
  },
}));

interface IProps {
  siteId: number;
  changeStep: (step) => void;
  store?: HostOnboardingStore;
}

interface ILocation {
  id: number;
  name_en: string;
  name_th: string;
  name_kr: string;
  name_jp: string;
}

const FormPlaceLocated = (props: IProps) => {
  const classes = useStyles();
  const { siteId, changeStep, store: { site } } = props;

  // get countries list
  const query = useQuery(GET_COUNTRIES, {
    variables: {
      limit: PAGINATION_LIMIT,
      offset: 0,
    },
  });
  const countries = query.data?.countries?.edges || [];

  //
  const [updateSite] = useMutation(UPDATE_SITE);

  //
  const [form, setForm] = useState({
    country_id: { val: '', errorClass: '', isRequired: true },
    city_id: { val: '', errorClass: '', isRequired: true },
    district_id: { val: '', errorClass: '', isRequired: true },
    street: { val: '', errorClass: '', isRequired: true },
    flat: { val: '', errorClass: '', isRequired: false },
    postal_code: { val: '', errorClass: '', isRequired: true },
    lat: { val: 0, errorClass: '', isRequired: true },
    lng: { val: 0, errorClass: '', isRequired: true },
  });
  const [loading, setLoading] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [loadingLocationError, setLoadingLocationError] = useState(false);

  const setFormVal = (name, val) => {
    setForm({ ...form, [name]: val });
  };

  //
  const [cities, setCities] = useState<ILocation[]>([]);
  const [districts, setDistricts] = useState<ILocation[]>([]);
  const selectCountry = (val) => {
    if (val) {
      const country = countries.find((c) => c.id === val);
      setCities(country.cities);
    }

    const errorClass = val === '' ? classes.error : '';
    setFormVal('country_id', { ...form.country_id, val, errorClass });
  };

  const selectCity = (val) => {
    if (val) {
      const cntry = countries.find((c) => c.id === form.country_id.val);
      const city = cntry.cities.find((c) => c.id === val);
      setDistricts(city.districts);
    }

    const errorClass = val === '' ? classes.error : '';
    setFormVal('city_id', { ...form.city_id, val, errorClass });
  };

  const setDistrict = (val) => {
    const errorClass = val === '' ? classes.error : '';
    setFormVal('district_id', { ...form.district_id, val, errorClass });
  };

  const populateLocationFields = (countryName: string, areas: string[]) => {
    const formData = {
      country_id: undefined,
      city_id: undefined,
      district_id: undefined,
    };
    const country = countries.find((c) => c.name_en === countryName);
    if (country) {
      formData.country_id = { ...form.country_id, val: country.id, errorClass: '' };
      setCities(country.cities);

      //
      const city = country.cities.find((c) => areas.includes(c.name_en));
      if (city) {
        formData.city_id = { ...form.city_id, val: city.id, errorClass: '' };

        setDistricts(city.districts);
      }
    }

    return formData;
  };

  useEffect(() => {
    const address = site?.address;
    setForm({
      country_id: { val: address?.country?.id as any || '', errorClass: '', isRequired: true },
      city_id: { val: address?.city?.id as any || '', errorClass: '', isRequired: true },
      district_id: { val: address?.district?.id as any || '', errorClass: '', isRequired: true },
      street: { val: address?.street || '', errorClass: '', isRequired: true },
      flat: { val: address?.flat || '', errorClass: '', isRequired: false },
      postal_code: { val: address?.postal_code || '', errorClass: '', isRequired: true },
      lat: { val: address?.lat || null, errorClass: '', isRequired: true },
      lng: { val: address?.lng || null, errorClass: '', isRequired: true },
    });
    populateLocationFields(address?.country?.name_en, [address?.city?.name_en]);
  }, [
    site?.address?.city?.id,
    site?.address?.country?.id,
    site?.address?.district?.id,
    site?.address?.flat,
    site?.address?.postal_code,
    site?.address?.street,
    site?.address?.lat,
    site?.address?.lng,
    query.loading,
  ]);

  const handleChangeFlatInput = (e): void => {
    const { value } = e.target;
    if (value.length > 2) {
      return;
    }

    const errorClass = value === '' ? classes.error : '';
    setFormVal('flat', { ...form.flat, val: value, errorClass });
  };

  const handleChangePostcodeInput = (e): void => {
    const { value } = e.target;
    if (value.length > 6) {
      return;
    }

    const errorClass = value.trim() === '' ? classes.error : '';
    setFormVal('postal_code', { ...form.postal_code, val: value, errorClass });
  };

  const handleSelectStreet = async (val, placeId) => {
    const errorClass = val.trim() === '' ? classes.error : '';

    const formData = { ...form };
    const location = await geocodeByPlaceId(placeId);
    const latlng = await getLatLng(location[0]);
    formData.street = { ...form.street, val, errorClass };
    formData.lat = { ...form.lat, val: latlng.lat, errorClass };
    formData.lng = { ...form.lng, val: latlng.lng, errorClass };

    // check if have postal code, then populate it
    location[0]?.address_components?.forEach((comp) => {
      if (comp.types.includes('postal_code')) {
        formData.postal_code = { ...form.postal_code, val: comp.long_name, errorClass: '' };
      }
    });

    setForm(formData);
  };

  const handleChangeStreet = (street) => {
    setFormVal('street', { ...form.street, val: street });
  };

  const useCurrentLocation = async () => {
    setLoadingLocation(true);
    setLoadingLocationError(false);

    const options = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 0,
    };

    const success = async (pos) => {
      setLoadingLocation(false);
      const crd = pos.coords;
      const place = await getPlaceDetailsByCoords(crd.latitude, crd.longitude);

      //
      const errorClass = place.street.trim() === '' ? classes.error : '';

      const formData = { ...form };
      formData.street = { ...form.street, val: place.street, errorClass };
      formData.lat = { ...form.lat, val: crd.latitude, errorClass };
      formData.lng = { ...form.lng, val: crd.longitude, errorClass };

      if (place.country) {
        const fields = populateLocationFields(place.country, place.areas);
        if (fields.country_id) {
          formData.country_id = fields.country_id;
        }

        if (fields.city_id) {
          formData.city_id = fields.city_id;
        }
      }

      if (place.postal_code) {
        formData.postal_code = { ...form.postal_code, val: place.postal_code, errorClass: '' };
      }

      setForm(formData);
    };

    const error = (err) => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
      setLoadingLocation(false);
      setLoadingLocationError(true);
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
  };

  const validateForm = () => {
    let isValid = true;
    const data = {};
    const formData = { ...form };
    // eslint-disable-next-line no-restricted-syntax
    for (const key of Object.keys(form)) {
      if (form[key].isRequired && !form[key].val) {
        let { val } = form[key];
        if (form[key].val?.trim) {
          val = form[key].val.trim();
        }
        const errorClass = val === '' ? classes.error : '';
        formData[key] = { ...form[key], val: form[key].val, errorClass };

        if (errorClass) {
          isValid = false;
        }
      }

      data[key] = form[key].val;
    }
    setForm(formData);

    return {
      isValid,
      data,
    };
  };

  const handleSubmit = (e?: any) => {
    if (e) {
      e.preventDefault();
    }

    const formValidated = validateForm();
    if (!formValidated.isValid) {
      return;
    }

    setLoading(true);
    updateSite({
      variables: {
        siteId,
        payload: { address: formValidated.data },
      },
    }).then((result: any): any => {
      setLoading(false);
      const { errors } = result;
      if (errors && errors[0]) {
        console.error(errors[0].message);
        return;
      }
      changeStep('next');
    })
      .catch((error: any): void => {
        setLoading(false);
        if (error.message !== '') {
          console.error(`${error.message}`);
        } else {
          console.error(error);
        }
      });
  };

  useEffect(() => {
    props.store.setStepSavingFunction(handleSubmit);
  }, [
    form.country_id,
    form.city_id,
    form.district_id,
    form.flat,
    form.lat,
    form.lng,
    form.postal_code,
    form.street,
  ]);

  const { t } = usePageTranslation('hostOnBoarding', 'FormPlaceLocated');

  return (
    <Box className={classes.mainBox}>
      <Box>
        <Box>
          <Typography variant="h1">
            {t('typography')}
          </Typography>
        </Box>
      </Box>

      <Box className={classes.formBox}>

        <form onSubmit={handleSubmit}>
          <Box className={classes.paddingRight}>
            <Box>
              <Grey3Typography variant="body2" />
            </Box>

            <Box className={classes.useCurrentLocationBox}>
              <Box className={classes.buttonImageBox}>
                <Image name="location" />
              </Box>
              <Button className={classes.useCurrentLocationButton} onClick={useCurrentLocation}>
                <Grey3Typography className={classes.useCurrentLocationButtonText}>
                  {t('grey3Typography1')}
                </Grey3Typography>
                {loadingLocation && (
                  <div className={classes.btnLoading}>
                    <CircularProgress />
                  </div>
                )}
              </Button>
            </Box>
            {!loadingLocation && loadingLocationError && (
              <Box>
                <Grey2Typography variant="body2" className={classes.errorText}>
                  {t('grey2Typography1')}
                </Grey2Typography>
              </Box>
            )}

            <Box className={classes.headerBox}>
              <Grey3Typography variant="h3">
                {t('grey3Typography2')}
              </Grey3Typography>
            </Box>
            <LocationSelect
              label={t('label1')}
              location={form.country_id.val}
              setLocation={selectCountry}
              locations={countries}
              isError={!!form.country_id.errorClass}
            />

            <Box className={classes.headerBox}>
              <Grey3Typography variant="h3">
                {t('grey3Typography3')}
              </Grey3Typography>
            </Box>
            <LocationSelect
              label={t('label2')}
              location={form.city_id.val}
              setLocation={selectCity}
              locations={cities}
              isError={!!form.city_id.errorClass}
            />

            <Box className={classes.headerBox}>
              <Grey3Typography variant="h3">
                {t('grey3Typography4')}
              </Grey3Typography>
            </Box>
            <LocationSelect
              label={t('label3')}
              location={form.district_id.val}
              setLocation={setDistrict}
              locations={districts}
              isError={!!form.district_id.errorClass}
            />

            <Box className={classes.headerBox}>
              <Grey3Typography variant="h3">
                {t('grey3Typography5')}
              </Grey3Typography>
            </Box>
            <Box className={classes.inputBox}>
              <PlacesAutocomplete
                value={form.street.val}
                onChange={handleChangeStreet}
                onSelect={handleSelectStreet}
              >
                {({
                  getInputProps, suggestions, getSuggestionItemProps, loading: suggestionLoading,
                }) => (
                  <>
                    <MainInput
                      fullWidth
                      className={`${classes.input} ${classes.location} ${form.street.errorClass}`}
                      {...getInputProps({ placeholder: t('placeholder') })}
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
            <Box>
              <Grey2Typography variant="body2" className={classes.descriptionInputBox}>
                {t('grey2Typography2')}
              </Grey2Typography>
            </Box>

            <Box className={classes.headerBox}>
              <Grey3Typography variant="h3">
                {t('grey3Typography6')}
              </Grey3Typography>
            </Box>
            <Box className={classes.inputBox}>
              <MainInput
                fullWidth
                placeholder="2"
                type="tel"
                inputProps={{ className: `${classes.input} ${form.flat.errorClass}` }}
                value={form.flat.val}
                onChange={handleChangeFlatInput}
              />
            </Box>
            <Box>
              <Grey2Typography variant="body2" className={classes.descriptionInputBox}>
                {t('grey2Typography3')}
              </Grey2Typography>
            </Box>

            <Grid container spacing={10} className={classes.headerBox}>
              <Grid item md={6} xs={12}>
                <Box>
                  <Box>
                    <Grey3Typography variant="h3">
                      {t('grey3Typography7')}
                    </Grey3Typography>
                  </Box>
                  <Box className={classes.inputBox}>
                    <MainInput
                      placeholder="456845"
                      type="tel"
                      inputProps={{ className: `${classes.input} ${form.postal_code.errorClass}` }}
                      value={form.postal_code.val}
                      onChange={handleChangePostcodeInput}
                    />
                  </Box>
                  <Box>
                    <Grey2Typography variant="body2" className={classes.descriptionInputBox}>
                      e.g. 578493
                    </Grey2Typography>
                  </Box>
                </Box>

              </Grid>
            </Grid>

          </Box>

          <Buttons changeStep={changeStep} isLoading={loading} />
        </form>

      </Box>
    </Box>
  );
};

export default inject(ONBOARDING_STORE)(observer(FormPlaceLocated));
