import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import { inject, observer } from 'mobx-react';

import StickyHeader from './components/StickyHeader';
import Header from './components/Header';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import EstimatorBoxStore, { ESTIMATOR_BOX_STORE } from './stores/EstimatorBoxStore';

interface IProps {
  [ESTIMATOR_BOX_STORE]?: EstimatorBoxStore
}

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: '17px',
    [theme.breakpoints.up('md')]: {
      paddingTop: '54px',
    },
    overflow: 'hidden',
  },
}));

const EstimatorBox: React.FC<IProps> = ({
  estimatorBoxStore: {
    currentStep,
  },
}) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      {currentStep > 1 && <StickyHeader />}
      <Header />
      {currentStep === 1 && <Step1 /> }
      {currentStep === 2 && <Step2 />}
      {currentStep === 3 && <Step3 /> }
    </Box>
  );
};

export default inject(ESTIMATOR_BOX_STORE)(observer(EstimatorBox));
