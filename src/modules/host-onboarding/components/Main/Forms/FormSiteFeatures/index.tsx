import {
  Box, makeStyles, Typography, Grid, List,
} from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import { useQuery, useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { getTranslatedName } from 'utilities/market';
import Buttons from '../Buttons';
import Grey3Typography from '../../../../../../components/Typographies/Grey3Typography';
import { GET_FEATURE_CATEGORIES, UPDATE_SITE } from '../queries/query';
import Header from './Header';
import CustomCheckbox from './CustomCheckBox';
import { PlatformFeatureType } from '../../../../../../typings/graphql.types';
import FeaturesPlaceholder from './Placeholder';
import HostOnboardingStore, { ONBOARDING_STORE } from '../../../../stores/HostOnboardingStore';
import usePageTranslation from '../../../../../../hooks/usePageTranslation';

const useStyles = makeStyles((theme) => ({
  mainBox: {
    maxWidth: '630px',
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',
    padding: '100px 0px',
    [theme.breakpoints.down('sm')]: {
      padding: '20px',
    },
  },
  formBox: {
    marginTop: '26px',
  },
  textAfterHeader: {
    fontWeight: 700,
  },
  securityBox: {
    marginTop: '30px',
  },
  list: {
    padding: '0',
  },
  line: {
    border: '1px solid #E9E9E9',
    margin: '25px 0 25px 40px',
    [theme.breakpoints.down('sm')]: {
      margin: '16px',
    },
  },
}));

interface IProps {
  siteId: number;
  changeStep: (step) => void;
  store?: HostOnboardingStore;
}

const FormSiteFeatures = (props: IProps) => {
  const { locale } = useRouter();
  const classes = useStyles();
  const { siteId, changeStep, store } = props;
  const [featureIds, setFeatureIds] = useState([]);
  const [formLoading, setFormLoading] = useState(false);
  const [updateSite] = useMutation(UPDATE_SITE);
  const { loading, data } = useQuery(GET_FEATURE_CATEGORIES, {
    variables: {
      limit: 100,
      offset: 0,
      type: PlatformFeatureType.SITE,
      isActive: true,
    },
    fetchPolicy: 'network-only',
  });
  const featureCategories = data?.feature_categories?.edges || [];

  const { t } = usePageTranslation('hostOnBoarding', 'FormSiteFeatures');

  useEffect(() => {
    if (store?.site?.features) {
      setFeatureIds(store.site.features.map((feat) => feat.id));
    }
  }, [store.site?.features]);

  const handleSubmit = (e?: any) => {
    if (e) {
      e.preventDefault();
    }

    setFormLoading(true);
    updateSite({
      variables: {
        siteId,
        payload: { features_id: featureIds },
      },
    }).then((result: any): any => {
      setFormLoading(false);
      const { errors } = result;
      if (errors && errors[0]) {
        // eslint-disable-next-line no-console
        console.error(errors[0].message);
        return;
      }
      changeStep('next');
    })
      .catch((err: any): void => {
        setFormLoading(false);
        if (err.message !== '') {
          // eslint-disable-next-line no-console
          console.error(`${err.message}`);
        } else {
          // eslint-disable-next-line no-console
          console.error(err);
        }
      });
  };

  const handleCheckbox = (event) => {
    const { checked, value } = event.target;
    const checkboxValue = parseInt(value, 10);
    if (checked) {
      setFeatureIds([].concat(featureIds, [checkboxValue]));
    } else {
      setFeatureIds(featureIds.filter((id) => id !== checkboxValue).map((id) => id));
    }
  };

  useEffect(() => {
    props.store.setStepSavingFunction(handleSubmit);
  }, [store.siteId]);

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
          <Box>
            <Grey3Typography variant="body1" className={classes.textAfterHeader}>
              {t('grey3Typography')}
            </Grey3Typography>
          </Box>
          <Box className={classes.securityBox}>
            <Box>
              {
                loading && <FeaturesPlaceholder />
              }
              {
                !loading && featureCategories.map((featuredCategory, featuredCategoryIndex) => (
                  <Box key={featuredCategory?.id}>
                    <Grid container>
                      <Grid item md={2} xs={12}>
                        <Header name={getTranslatedName(featuredCategory, 'name', locale)} />
                      </Grid>
                      <Grid item md={10} xs={12}>
                        <Box>
                          <Grid container>
                            <Grid item xs={6}>
                              <List className={classes.list}>
                                {
                                  featuredCategory?.features
                                    .filter(
                                      (feature,
                                        index) => index < featuredCategory?.features?.length / 2,
                                    )
                                    .map(
                                      (feature) => (
                                        <CustomCheckbox
                                          key={feature?.id}
                                          label={getTranslatedName(feature, 'name', locale)}
                                          value={feature?.id}
                                          checked={featureIds.indexOf(feature?.id) >= 0}
                                          onChange={handleCheckbox}
                                        />
                                      ),
                                    )
                                }
                              </List>
                            </Grid>
                            <Grid item xs={6}>
                              <List className={classes.list}>
                                {
                                  featuredCategory?.features
                                    .filter(
                                      (feature,
                                        index) => index >= featuredCategory?.features?.length / 2,
                                    )
                                    .map(
                                      (feature) => (
                                        <CustomCheckbox
                                          key={feature?.id}
                                          label={getTranslatedName(feature, 'name', locale)}
                                          checked={featureIds.indexOf(feature?.id) >= 0}
                                          value={feature?.id}
                                          onChange={handleCheckbox}
                                        />
                                      ),
                                    )
                                }
                              </List>
                            </Grid>
                          </Grid>
                        </Box>
                      </Grid>
                    </Grid>
                    {
                      featuredCategoryIndex < featureCategories?.length - 1
                      && <Box className={classes.line} />
                    }
                  </Box>
                ))
              }
            </Box>
          </Box>
          <Buttons isLoading={formLoading} changeStep={changeStep} />
        </form>
      </Box>
    </Box>
  );
};

export default inject(ONBOARDING_STORE)(observer(FormSiteFeatures));
