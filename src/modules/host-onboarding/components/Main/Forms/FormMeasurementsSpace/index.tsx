import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Box, makeStyles } from '@material-ui/core';
import { inject } from 'mobx-react';
import { OnboardingSitesQuery_sites_edges_spaces_edges } from 'modules/host-onboarding/queries/__generated__/OnboardingSitesQuery';
import usePageTranslation from 'hooks/usePageTranslation';
import Buttons from '../Buttons';
import EditingSizeOption2 from './EditingSizeOption2';
import { CREATE_SPACE, GET_FEATURE_CATEGORIES, UPDATE_SPACE } from '../queries/query';
import { CreateSpace, CreateSpaceVariables } from '../queries/__generated__/CreateSpace';
import { PlatformFeatureType } from '../../../../../../typings/graphql.types';
import OneOption from './OneOption';
import MiniOptions from './MiniOptions';
import handleSubmit from '../../../../../../utilities/handleSubmit';
import AddSizeOption from './AddSizeOption';
import { FeatureCategoriesQuery, FeatureCategoriesQueryVariables } from '../queries/__generated__/FeatureCategoriesQuery';
import HostOnboardingStore, { ONBOARDING_STORE } from '../../../../stores/HostOnboardingStore';
import { updateSpace, updateSpaceVariables } from '../queries/__generated__/updateSpace';
import { useCurrentCountry } from '../../../../../../utilities/market';

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
  error: {
    textAlign: 'right',
    color: '#FF0000',
  },
}));

interface IProps {
  siteId: number;
  changeStep: (act: string) => void;
  store?: HostOnboardingStore;
  spaceId?: number;
}

const FormMeasurementsSpace: React.FC<IProps> = (props) => {
  const classes = useStyles();
  const {
    changeStep, siteId, store, spaceId,
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [createSpace] = useMutation<CreateSpace, CreateSpaceVariables>(CREATE_SPACE);
  const [updateSpaceMutation] = useMutation<updateSpace, updateSpaceVariables>(UPDATE_SPACE);
  const { t } = usePageTranslation('hostOnBoarding', 'FormSpace');

  const [options, setOptions] = useState<any>([
    {
      name: t('defaultSpaceName'),
      sizeUnit: useCurrentCountry().sizeUnit,
      width: '2.50',
      depth: '4.00',
      height: '1.00',
      unit: '1',
      price: '1',
      checkedFeatures: [],
    },
  ]);

  const changeOpen = async () => {
    const body = document.body.style.overflow;
    document.body.style.overflow = body === 'hidden' ? 'unset' : 'hidden';
    setIsOpen(!isOpen);
  };

  const nextStep = async () => {
    setIsLoading(true);
    setError('');
    try {
      const promises = options.map((option) => {
        const payload = {
          name: option.name,
          height: Number(option.height),
          width: Number(option.width),
          length: Number(option.depth),
          size_unit: option.sizeUnit,
          price_per_month: Number(option.price),
          total_units: Number(option.unit),
          features_id: option.checkedFeatures,
        };

        if (option.id) {
          return updateSpaceMutation({
            variables: {
              spaceId: option.id,
              payload,
            },
          });
        }

        return createSpace({
          variables: {
            siteID: siteId,
            ...payload,
          },
        });
      });

      await Promise.all(promises);
    } catch (e) {
      setIsLoading(false);
      setError(e?.message);
      return;
    }
    setIsLoading(false);
    changeStep('next');
    store.fetchSite(siteId);
  };

  useEffect(() => {
    const spaces: OnboardingSitesQuery_sites_edges_spaces_edges[] = store.site?.spaces?.edges || [];
    if (spaces.length) {
      const items = spaces.map((item: OnboardingSitesQuery_sites_edges_spaces_edges) => ({
        id: item.id,
        name: item.name,
        sizeUnit: item?.size_unit,
        width: item?.width,
        depth: item?.length,
        height: item?.height,
        unit: item?.total_units,
        price: item?.prices?.[0]?.price_per_month,
        checkedFeatures: item?.features?.map((feat) => feat.id) || [],
        status: item?.status,
      }));
      setOptions(items);
    }
  }, [store.site, store.site?.spaces]);

  useEffect(() => {
    store.setStepSavingFunction(nextStep);
  }, [options]);

  const query = useQuery<FeatureCategoriesQuery, FeatureCategoriesQueryVariables>(
    GET_FEATURE_CATEGORIES,
    {
      variables: {
        offset: 0,
        limit: 10,
        type: PlatformFeatureType.SPACE,
        isActive: true,
      },
      fetchPolicy: 'network-only',
    },
  );
  const features = query.data?.feature_categories?.edges || [];

  return (
    <Box className={classes.mainBox}>
      {isOpen
        ? (
          <EditingSizeOption2
            features={features}
            isOpen={isOpen}
            changeOpen={changeOpen}
            options={options}
            setOptions={setOptions}
            spaceId={spaceId}
          />
        )
        : ''}
      {options.length === 1
        ? <OneOption features={features} options={options} setOptions={setOptions} /> : ''}
      {options.length > 1
        ? <MiniOptions features={features} options={options} setOptions={setOptions} /> : ''}
      <AddSizeOption changeOpen={changeOpen} />
      <form onSubmit={handleSubmit(nextStep, null)}>
        <Buttons isLoading={isLoading} changeStep={changeStep} />
      </form>
      {error && <span className={classes.error}>{error}</span>}
    </Box>
  );
};

export default inject(ONBOARDING_STORE)(FormMeasurementsSpace);
