import { Box, Dialog, makeStyles } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import Header from './Header';
import SizeEstimator from './SizeEstimator';
import MonthlyPriceRange from './MonthlyPriceRange';
import FeaturesAmenities from './FeaturesAmenities';
import Actions from './Actions';
import { SitesListStore } from '../../stores/SitesListStore';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#FFFFFF',
    overflowX: 'hidden',
  },
});

interface IProps {
  sitesStore?: SitesListStore;
}

const FilterPage: React.FC<IProps> = ({ sitesStore }) => {
  const classes = useStyles();
  return (
    <Dialog open={sitesStore.isFilterPopupActive} style={{ zIndex: 130000000 }} fullScreen>
      <Box className={classes.root}>
        <Header />
        <SizeEstimator />
        <MonthlyPriceRange />
        <FeaturesAmenities />
        <Actions />
      </Box>
    </Dialog>
  );
};

export default inject('sitesStore')(observer(FilterPage));
