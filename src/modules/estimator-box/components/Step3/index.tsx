import React, { FC } from 'react';
import {
  Box, Typography, Grid, Link, Hidden,
} from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import clsx from 'clsx';

import { useRouter } from 'next/router';
import useStyles from '../Step2/step2.style';
import Image from '../../../../components/Image';
import usePageTranslation from '../../../../hooks/usePageTranslation';
import RecommendedStorage from '../RecommendedStorage';
import FindStorage from '../FindStorage';
import EstimatorBoxStore, { ESTIMATOR_BOX_STORE } from '../../stores/EstimatorBoxStore';
import { PrimaryButton, TextButton } from '../../../../components/Buttons';
import { useCurrentCountry } from '../../../../utilities/market';

interface IProps {
  [ESTIMATOR_BOX_STORE]?: EstimatorBoxStore
}

const Step3: FC<IProps> = ({
  estimatorBoxStore: {
    boxCount,
    isStandardBox,
    selectedSpaceTypeId,
    itemsDimension,
    incrementCurrentStep,
    setSpaceTypeId,
    setCurrentCountry,
  },
}) => {
  const classes = useStyles();
  const { t } = usePageTranslation('estimatorBox', 'Step3');
  const router = useRouter();
  setCurrentCountry(useCurrentCountry()?.name);

  return (
    <Grid item className={classes.container}>
      <Box className={classes.header}>
        <Typography className={classes.blockTitle}>
          {t('typography1')}
        </Typography>
      </Box>
      <Box className={classes.boxSelectionFlex}>
        <Box className={classes.boxCounterResult}>
          <Box>
            <Image className={classes.boxImageSmall} name="boxes" folder="Estimator/Box" />
          </Box>
          <Box className={classes.boxCounterColumn}>
            <Typography
              variant="h3"
              className={clsx(
                classes.counterNumber,
                boxCount > 999 && classes.counterNumberSmall,
              )}
            >
              {boxCount}
            </Typography>
            <Typography variant="h3" className={classes.boxLabel}>{isStandardBox ? t('typography2') : t('typography3')}</Typography>
          </Box>
        </Box>

        <Box className={classes.recommendedContainer}>
          <RecommendedStorage size={itemsDimension} setSpaceTypeId={setSpaceTypeId} />
        </Box>
      </Box>
      <Hidden smUp>
        <FindStorage spaceTypeId={selectedSpaceTypeId} />
      </Hidden>
      <Hidden only="xs">
        <Grid container justify="space-between" className={classes.button}>
          <Grid item>
            <TextButton
              className="textBack"
              onClick={() => incrementCurrentStep(-1)}
            >
              {t('button1')}
            </TextButton>
          </Grid>
          <Grid item>
            <Link className={classes.link} color="inherit" href={`/${router.locale}/search?space_type=${selectedSpaceTypeId}`}>
              <PrimaryButton
                className="textWhite btnFindStorage"
              >
                {t('button2')}
              </PrimaryButton>
            </Link>
          </Grid>
        </Grid>
      </Hidden>
    </Grid>
  );
};

export default inject(ESTIMATOR_BOX_STORE)(observer(Step3));
