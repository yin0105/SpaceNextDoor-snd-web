import { Box, makeStyles, Typography } from '@material-ui/core';
import usePageTranslation from 'hooks/usePageTranslation';
import { inject, observer } from 'mobx-react';
import {
  QuotationsStore,
  QUOTATIONS_STORE_KEY,
} from 'modules/quotations/stores/QuotationsStore';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SpaceTypeDetails from 'modules/detail/components/SpacetypeDetails';
import { PlatformSpaceTypesQuery_space_types_edges } from 'modules/detail/queries/__generated__/PlatformSpaceTypesQuery';
import Estimate from './Estimate';
import SpaceType from './SpaceType';
import Error from '../../Error';
import Loader from './Loader';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '1040px',
    display: 'flex',
    flexWrap: 'wrap',
    paddingBottom: '100px',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'space-between',
    },
  },
  heading: {
    fontSize: '30px',
    fontWeight: 700,
    lineHeight: '35px',
    margin: '30px 0 20px 0',
    width: '100%',
  },
  container: {
    '& p': {
      lineHeight: '50px',
      fontSize: '34px',
      fontWeight: 600,
      [theme.breakpoints.down('sm')]: {
        fontSize: '12px',
        lineHeight: '18px',
      },
    },
    display: 'flex',
    flexFlow: 'column',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '45%',
    maxWidth: '45%',
    height: '180px',
  },
  estimate: {
    color: theme.palette.primary.main,
    textDecoration: 'underline',
    cursor: 'pointer',
  },
}));

interface IProps {
  [QUOTATIONS_STORE_KEY]?: QuotationsStore;
}

const FormSpaceType: React.FC<IProps> = ({ quotationsStore }) => {
  const classes = useStyles();
  const router = useRouter();
  const { t } = usePageTranslation('quotations', 'FormSpaceType');
  const [showRecommendationError, setShowRecommendationError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [spaceTypeDetailsId, setSpaceTypeDetailsId] = useState(0);
  const {
    spaceTypes,
    allSpaceTypes,
    showEstimator,
    setShowEstimator,
    quotationDetails: { spaceTypeId: selectedSpaceTypeId },
    setQuotationDetails,
    estimatedSpaceTypeId,
    setEstimatedSpaceTypeId,
    isLoading,
  } = quotationsStore;

  useEffect(
    () => () => {
      setShowEstimator(false);
    },
    [],
  );

  const setSpaceTypeId = (val: number) => {
    const spaceTypesIds = spaceTypes.map((st) => st.id);
    if (spaceTypesIds.includes(val)) {
      setQuotationDetails('spaceTypeId', val);
      return;
    }
    const currentIndex = allSpaceTypes.indexOf(
      allSpaceTypes.filter((st) => st.id === val)[0],
    );
    let order = 1;
    if (currentIndex === allSpaceTypes.length) {
      order = -1;
    }
    for (
      let i = currentIndex;
      i < allSpaceTypes.length && i >= 0;
      i += order
    ) {
      const recommendedSpaceTypeId = allSpaceTypes[i].id;
      if (spaceTypesIds.includes(recommendedSpaceTypeId)) {
        setShowRecommendationError(true);
        setQuotationDetails('spaceTypeId', recommendedSpaceTypeId);
        return;
      }
    }
  };

  return (
    <Box className={classes.root}>
      {/* eslint-disable-next-line */}
      {isLoading ? <Loader />
        : !showEstimator ? (
          <>
            {' '}
            <Typography className={classes.heading}>
              {t('typography1')}
            </Typography>
            {showRecommendationError && (
              <Error
                text={t('text')}
                subText={t('subText')}
                onClick={() => router.push({
                  pathname: '/search',
                  query: { ...router.query, space_type: selectedSpaceTypeId },
                })}
              />
            )}
            {spaceTypes.map((spaceType) => (
              <SpaceType
                key={spaceType?.id}
                checked={spaceType.id === selectedSpaceTypeId}
                spaceType={spaceType}
                setSpaceType={setSpaceTypeId}
                isEstimated={estimatedSpaceTypeId === spaceType.id}
                setSpaceTypeDetailsId={setSpaceTypeDetailsId}
                setIsOpen={setIsOpen}
              />
            ))}
            <SpaceTypeDetails
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              spaceTypeId={spaceTypeDetailsId}
              setSpaceTypeId={setSpaceTypeId}
              spaceTypes={
                spaceTypes as unknown as PlatformSpaceTypesQuery_space_types_edges[]
              }
            />
            <Box className={classes.container}>
              <Typography>{t('typography2')}</Typography>
              <Typography
                onClick={() => setShowEstimator(true)}
                className={classes.estimate}
              >
                {t('typography3')}
              </Typography>
            </Box>
          </>
        ) : (
          <Estimate
            setSpaceTypeId={setSpaceTypeId}
            setEstimatedSpaceTypeId={setEstimatedSpaceTypeId}
          />
        )}
    </Box>
  );
};

export default inject(QUOTATIONS_STORE_KEY)(observer(FormSpaceType));
