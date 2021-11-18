import {
  Box, Button, Grid, Typography,
} from '@material-ui/core';
import { inject } from 'mobx-react';
import dynamic from 'next/dynamic';
import SizeEstimator from '../FilterPage/SizeEstimator';
import MonthlyPriceRange from '../FilterPage/MonthlyPriceRange';
import { SitesListStore } from '../../stores/SitesListStore';
import usePageTranslation from '../../../../hooks/usePageTranslation';
import FeaturesAmenities from '../FilterPage/FeaturesAmenities';

interface IProps {
  sitesStore?: SitesListStore;
}

const DesktopFilters: React.FC<IProps> = ({ sitesStore }) => {
  const { t } = usePageTranslation('search', 'FiltersDesktop');
  return (
    <>
      <Box pl={14} mb={10} style={{ marginBottom: '12px' }}>
        <Grid container alignItems="center" style={{ marginTop: '15px' }}>
          <Grid item sm={6}>
            <Typography variant="h2" style={{ fontSize: '2.8rem' }}>
              {t('typography')}
            </Typography>
          </Grid>
          <Grid item sm={6}>
            {sitesStore.isFiltersApplied && (
              <Button
                color="primary"
                size="large"
                id="FiltersDesktop_clearAllFilters"
                onClick={() => {
                  sitesStore.resetFilters();
                  sitesStore.fetchFeaturedSites();
                  sitesStore.fetchSites();
                  sitesStore.fetchSiteMarkers();
                }}
                style={{ fontSize: '14px', textTransform: 'none', marginLeft: '15px' }}
              >
                {t('button')}
              </Button>
            )}
          </Grid>
        </Grid>
      </Box>
      <Box>
        <MonthlyPriceRange />
        <SizeEstimator />
        <FeaturesAmenities />
      </Box>
    </>
  );
};

export default inject('sitesStore')(DesktopFilters);
