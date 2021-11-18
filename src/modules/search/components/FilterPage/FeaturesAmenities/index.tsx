import {
  Box, Grid, makeStyles, Typography,
  FormControlLabel, Checkbox, fade, useMediaQuery, Theme,
} from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import { useRouter } from 'next/router';
import { getTranslatedName } from 'utilities/market';
import usePageTranslation from '../../../../../hooks/usePageTranslation';
import { PlatformFeatureType } from '../../../../../typings/graphql.types';
import PlatformFeaturesContainer from '../../../containers/PlatformFeatures';
import { PlatformFeaturesQuery_feature_categories_edges } from '../../../queries/__generated__/PlatformFeaturesQuery';
import { SitesListStore } from '../../../stores/SitesListStore';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '28px 24px 34px',
    paddingBottom: '22px',
    [theme.breakpoints.only('xs')]: {
      borderBottom: `1px solid ${fade(theme.palette.grey[100], 0.1)}`,
    },
  },
  color: {
    color: theme.palette.grey[100],
  },
  title: {
    margin: '0 4px',
  },
  variants: {
    margin: '18px 3px 0',
  },
  checkbox: {
    color: theme.palette.primary.main,
    transform: 'scale(1.2)',
  },
}));

interface IProps {
  sitesStore?: SitesListStore;
  data: PlatformFeaturesQuery_feature_categories_edges[];
}

const FeaturesList: React.FC<IProps> = inject('sitesStore')(observer(({ sitesStore, data }) => {
  const { locale } = useRouter();
  const isAutoApplied = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));
  const classes = useStyles();
  return (
    <Grid container>
      {data.map((cat) => (
        cat.features.map((feat, i) => (
          <Grid key={feat.id} item xs={6} sm={12} lg={12} xl={12}>
            <FormControlLabel
              className={classes.color}
              control={(
                <Checkbox
                  id={`featureAmenity${i + 1}`}
                  className={classes.checkbox}
                  name={`checkbox_${feat.id}`}
                  onChange={() => {
                    const typeMapper = {
                      [PlatformFeatureType.SITE]: 'site_features',
                      [PlatformFeatureType.SPACE_TYPE]: 'space_features',
                    };

                    if (
                      (sitesStore.filters[typeMapper[feat.type]] || {})[feat.id]
                    ) {
                      sitesStore.removeFilter(typeMapper[feat.type] as any, feat.id);
                    } else {
                      sitesStore.setFilter(typeMapper[feat.type] as any, feat.id);
                    }

                    if (isAutoApplied) {
                      sitesStore.applyFilters();
                    }
                  }}
                  value={
                    !!(sitesStore?.filters?.site_features?.[feat.id]
                      || sitesStore?.filters?.space_features?.[feat.id])
                  }
                  checked={
                    !!(sitesStore?.filters?.site_features?.[feat.id]
                      || sitesStore?.filters?.space_features?.[feat.id])
                  }
                  color="primary"
                />
              )}
              label={getTranslatedName(feat, 'name', locale)}
            />
          </Grid>
        ))
      ))}
    </Grid>
  );
}));

const FeaturesAmenities: React.FC = () => {
  const classes = useStyles();
  const { t } = usePageTranslation('search', 'FeaturesAmenities');
  return (
    <Box className={classes.root}>
      <Box className={classes.title}>
        <Typography variant="h4">
          {t('typography')}
        </Typography>
      </Box>
      <Box className={classes.variants}>
        <PlatformFeaturesContainer>
          {(data) => <FeaturesList data={data} />}
        </PlatformFeaturesContainer>
      </Box>
    </Box>
  );
};

export default FeaturesAmenities;
