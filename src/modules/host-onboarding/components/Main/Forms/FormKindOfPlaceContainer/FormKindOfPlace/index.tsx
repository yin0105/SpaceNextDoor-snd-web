import { Box, makeStyles } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import Buttons from '../../Buttons';
import Grey3Typography from '../../../../../../../components/Typographies/Grey3Typography';
import PropertyTypeSelect from './PropertyTypeSelect';
import FloorSelect from './FloorSelect';
import Radios from './Radios';
import FormLayout from '../../../../../../../layouts/FormLayout';
import { ProviderType, SortBy } from '../../../../../../../typings/graphql.types';
import {
  GetPropertyTypes,
  GetPropertyTypesVariables,
} from '../../queries/__generated__/GetPropertyTypes';
import { CREATE_SITE, GET_PROPERTY_TYPES, UPDATE_SITE } from '../../queries/query';
import { CreateSite, CreateSiteVariables } from '../../queries/__generated__/CreateSite';
import HostOnboardingStore from '../../../../../stores/HostOnboardingSiteStore';
import { UpdateSite, UpdateSiteVariables } from '../../queries/__generated__/UpdateSite';
import usePageTranslation from '../../../../../../../hooks/usePageTranslation';

const useStyles = makeStyles((theme) => ({
  mainBox: {
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',
    padding: '100px 0px',
    [theme.breakpoints.down('sm')]: {
      padding: '20px',
    },
  },
  paddingRight: {
    paddingRight: '170px',
    [theme.breakpoints.down('sm')]: {
      paddingRight: '0',
    },
  },
  formBox: {
    marginTop: '36px',
  },

  selectPartHeaderBox: {
    marginTop: '40px',
  },
  selectPartBox: {
    marginTop: '25px',
  },
  descriptionPartBox: {
    marginTop: '25px',
  },
  buttons: {
    paddingTop: '100px',
    [theme.breakpoints.down('sm')]: {
      paddingTop: '20px',
    },
  },
  inputSelect: {
    padding: '17px 26px 13px 12px',
  },
  textColor: {
    color: '#948EA2',
  },
}));

interface IProps {
  changeStep: (step) => void,
  store?: HostOnboardingStore;
}

const FormKindOfPlace: React.FC<IProps> = ({ changeStep, store }) => {
  const classes = useStyles();

  const [propertyType, setPropertyType] = useState('');
  const [floor, setFloor] = useState('');
  const [provider, setProviderVal] = React.useState(ProviderType.BUSINESS);
  const [createSite] = useMutation<CreateSite, CreateSiteVariables>(CREATE_SITE);
  const [updateSite] = useMutation<UpdateSite, UpdateSiteVariables>(UPDATE_SITE);
  const queryPropertyTypes = useQuery<GetPropertyTypes, GetPropertyTypesVariables>(
    GET_PROPERTY_TYPES, {
      variables: {
        skip: 0,
        limit: 10,
        name_en: SortBy.asc,
      },
    },
  );
  const propertyTypes = queryPropertyTypes.data?.property_types?.edges || [];

  useEffect(() => {
    setFloor(store.site?.floor as any);
    setPropertyType(store?.site?.property_type?.id as any);
    setProviderVal(store?.site?.provider_type);
  }, [store?.site?.floor, store?.site?.property_type?.id, store?.site?.provider_type]);
  const handleSubmit = async (e?: any) => {
    if (e) {
      e.preventDefault();
    }

    if (!store.siteId) {
      const res = await createSite({
        variables: {
          property_type_id: parseInt(propertyType, 10),
          rules_id: [],
          policies_id: [],
          features_id: [],
          provider_type: provider,
          floor: parseInt(floor, 10),
        },
      });
      store.setSiteId(res?.data?.createSite?.id);
    } else {
      await updateSite({
        variables: {
          siteId: store.siteId,
          payload: {
            property_type_id: parseInt(propertyType, 10),
            provider_type: provider,
            floor: parseInt(floor, 10),
          },
        },
      });
    }

    changeStep('next');
  };

  useEffect(() => {
    store.setStepSavingFunction(handleSubmit);
  }, [
    propertyType,
    provider,
    floor,
  ]);
  const { t } = usePageTranslation('hostOnBoarding', 'FormKindOfPlace');
  return (
    <Box className={classes.mainBox}>
      <Box>
        <Box>
          <Grey3Typography variant="h1">
            {t('grey3Typography1')}
          </Grey3Typography>
        </Box>
      </Box>
      <Box className={classes.formBox}>

        <form onSubmit={handleSubmit}>
          <FormLayout>
            <Box className={classes.paddingRight}>
              <PropertyTypeSelect
                propertyTypes={propertyTypes}
                propertyType={propertyType}
                setPropertyType={setPropertyType}
              />
              <FloorSelect floor={floor} setFloor={setFloor} />
            </Box>

            <Box className={classes.selectPartHeaderBox}>
              <Grey3Typography variant="h3">
                {t('grey3Typography2')}
              </Grey3Typography>
            </Box>

            <Box className={classes.selectPartBox}>
              <Radios value={provider} setSelectedValue={setProviderVal} />
            </Box>
            {/* <Box className={classes.descriptionPartBox}>
              <Typography variant="body1" className={classes.textColor}>
                {t('containerTypography')}
              </Typography>
            </Box> */}
            <Box className={classes.buttons}>
              <Buttons isLoading={false} changeStep={changeStep} disableBack />
            </Box>
          </FormLayout>
        </form>

      </Box>
    </Box>
  );
};

export default FormKindOfPlace;
