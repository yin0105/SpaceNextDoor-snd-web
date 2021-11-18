import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import dynamic from 'next/dynamic';

import Header from './components/Header';
import Categories from './components/Categories';
import FindStorage from './components/FindStorage';
import EstimatorStore, { ESTIMATOR_STORE } from './stores/EstimatorStore';

const Items = dynamic(() => import('./components/Items'));

interface IProps {
  [ESTIMATOR_STORE]?: EstimatorStore
}

const useStyles = makeStyles(() => ({
  root: {
    paddingTop: '17px',
    overflow: 'hidden',
  },
}));

const Estimator: React.FC<IProps> = ({ estimatorStore: { selectedSpaceTypeId } }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Header />
      <Categories />
      <Items />
      <FindStorage spaceTypeId={selectedSpaceTypeId} />
    </Box>
  );
};

export default inject(ESTIMATOR_STORE)(observer(Estimator));
