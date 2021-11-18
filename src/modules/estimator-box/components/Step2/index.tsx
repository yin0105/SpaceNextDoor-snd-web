import React, { FC } from 'react';
import {
  Box, Grid, Typography, TextField, IconButton, Theme, useMediaQuery,
} from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import clsx from 'clsx';

import useStyles from './step2.style';
import Image from '../../../../components/Image';
import { PrimaryButton, TextButton } from '../../../../components/Buttons';
import usePageTranslation from '../../../../hooks/usePageTranslation';
import EstimatorBoxStore, { ESTIMATOR_BOX_STORE } from '../../stores/EstimatorBoxStore';

interface IProps {
  [ESTIMATOR_BOX_STORE]?: EstimatorBoxStore
}

const Step2: FC<IProps> = ({
  estimatorBoxStore: {
    boxCount,
    incrementBoxCount,
    setBoxCount,
    incrementCurrentStep,
  },
}) => {
  const classes = useStyles();
  const { t } = usePageTranslation('estimatorBox', 'Step2');
  const triggerChange = (value : number) => {
    if (Number.isNaN(value)) {
      return;
    }
    setBoxCount(value);
  };
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.only('xs'));
  return (
    <Box className={classes.container}>
      <Box className={classes.header}>
        <Typography className={classes.blockTitle}>
          {t('typography1')}
        </Typography>
      </Box>
      <Box className={classes.boxSelection}>
        <Box className={classes.header}>
          <Typography variant="h3" className={classes.description}>{t('typography2')}</Typography>
        </Box>
        <Box className={classes.boxCounterBody}>
          <Box>
            <Image className={classes.boxImage} name="boxes" folder="Estimator/Box" />
          </Box>
          <Box className={classes.boxCounter}>
            <IconButton onClick={() => incrementBoxCount(-1)}>
              <Image name="remove" folder="Estimator/Box" />
            </IconButton>
            <TextField
              className={clsx(
                classes.boxCounterInput, boxCount > 999 && classes.boxCounterInputSmall,
              )}
              value={boxCount}
              type="number"
              onChange={(e) => triggerChange(parseInt(e.target.value, 10))}
              variant="outlined"
            />
            <IconButton onClick={() => incrementBoxCount(1)}>
              <Image name="add" folder="Estimator/Box" />
            </IconButton>
          </Box>
          <Box><Typography className={classes.textBoxes}>{t('typography3')}</Typography></Box>
        </Box>
      </Box>
      <Grid container justify={isMobile ? 'center' : 'space-between'} className={classes.button}>
        {!isMobile && (
        <Grid item>
          <TextButton
            className="textBack"
            onClick={() => incrementCurrentStep(-1)}
          >
            {t('button1')}
          </TextButton>
        </Grid>
        )}
        <Grid item>
          <PrimaryButton
            onClick={() => incrementCurrentStep(1)}
            className="textWhite btnEstimate"
          >
            {t('button2')}
          </PrimaryButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default inject(ESTIMATOR_BOX_STORE)(observer(Step2));
