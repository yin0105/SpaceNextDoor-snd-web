import { useQuery } from '@apollo/client';
import { Box, Typography, makeStyles } from '@material-ui/core';
import usePageTranslation from 'hooks/usePageTranslation';
import { inject, observer } from 'mobx-react';
import Categories from 'modules/estimator/components/Categories';
import Items from 'modules/estimator/components/Items';
import { GET_SPACE_TYPE } from 'modules/estimator/queries';
import {
  GetSpaceType,
  GetSpaceTypeVariables,
} from 'modules/estimator/queries/__generated__/GetSpaceType';
import EstimatorStore, {
  ESTIMATOR_STORE,
} from 'modules/estimator/stores/EstimatorStore';
import React from 'react';
import { useCurrentCountry } from 'utilities/market';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      width: '102%',
    },
  },
  title: {
    fontSize: '30px',
    fontWeight: 700,
    lineHeight: '35px',
    marginTop: '30px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '18px',
      lineHeight: '20px',
    },
  },
  subtitle: {
    fontSize: '16px',
    lineHeight: '20px',
    marginTop: '5px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px',
      lineHeight: '20px',
    },
  },
}));

interface IProps {
  [ESTIMATOR_STORE]?: EstimatorStore;
  setSpaceTypeId: (val: number) => void;
  setEstimatedSpaceTypeId: (val: number) => void;
}

const Estimate: React.FC<IProps> = ({
  estimatorStore,
  setSpaceTypeId,
  setEstimatedSpaceTypeId,
}) => {
  const { itemsDimension } = estimatorStore;
  const classes = useStyles();
  const { t } = usePageTranslation('quotations', 'Estimate');
  const country = useCurrentCountry();
  const { loading, data } = useQuery<GetSpaceType, GetSpaceTypeVariables>(
    GET_SPACE_TYPE,
    {
      variables: {
        size: parseInt(String(itemsDimension), 10),
        country: country.name,
      },
    },
  );

  const spaceType = data?.space_types?.edges.length
    ? data?.space_types?.edges[0]
    : null;

  if (spaceType?.id) {
    setSpaceTypeId(spaceType.id);
    setEstimatedSpaceTypeId(spaceType.id);
  }

  return (
    <Box className={classes.root}>
      <Typography className={classes.title}>{t('typography1')}</Typography>
      <Typography className={classes.subtitle}>{t('typography2')}</Typography>
      <Categories />
      <Items hideRecommended maxHeight="220px" />
    </Box>
  );
};

export default inject(ESTIMATOR_STORE)(observer(Estimate));
