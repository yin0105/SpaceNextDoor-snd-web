import React, { FC } from 'react';
import {
  Box, Grid, Typography, Hidden, Theme, useMediaQuery,
} from '@material-ui/core';
import { inject, observer } from 'mobx-react';

import * as Carousel from '../../../../components/Carousel';
import { PrimaryButton } from '../../../../components/Buttons';
import StandardBox from './StandardBox';
import CustomBox from './CustomBox';
import usePageTranslation from '../../../../hooks/usePageTranslation';
import EstimatorBoxStore, { ESTIMATOR_BOX_STORE } from '../../stores/EstimatorBoxStore';
import { useStylesStep1 } from './step1.style';

interface IProps {
  [ESTIMATOR_BOX_STORE]?: EstimatorBoxStore
}

const Step1: FC<IProps> = ({
  estimatorBoxStore: {
    isStandardBox,
    incrementCurrentStep,
  },
}) => {
  const classes = useStylesStep1();
  const { t } = usePageTranslation('estimatorBox', 'Step1');
  const carouselOptions = {
    startAt: isStandardBox ? 0 : 1,
    type: 'slider',
    perView: 1,
    breakpoints: {
      600: {
        gap: 10,
        peek: { before: 50, after: 90 },
      },
      375: {
        gap: 10,
        peek: { before: 40, after: 50 },
      },
    },
    perTouch: 1,
  };
  const handleNext = () => {
    incrementCurrentStep(1);
  };
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.only('xs'));
  return (
    <Box className={classes.container}>
      <Box className={classes.header}>
        <Typography className={classes.blockTitle}>
          {t('typography1')}
        </Typography>
      </Box>
      <Grid item className={classes.boxSelection}>
        <Hidden smUp>
          <Carousel.Component options={carouselOptions}>
            <Carousel.Slide key={1}>
              <StandardBox />
            </Carousel.Slide>
            <Carousel.Slide key={2}>
              <CustomBox />
            </Carousel.Slide>
          </Carousel.Component>
        </Hidden>
        <Hidden only="xs">
          <Grid container justify="center">
            <Grid item><StandardBox /></Grid>
            <Grid item><CustomBox /></Grid>
          </Grid>
        </Hidden>
      </Grid>
      <Grid container justify={isMobile ? 'center' : 'flex-end'} className={classes.button}>
        <Grid item>
          <PrimaryButton onClick={handleNext} className="textWhite">{t('button2')}</PrimaryButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default inject(ESTIMATOR_BOX_STORE)(observer(Step1));
