import React, { FC } from 'react';
import { Box, Typography } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import clsx from 'clsx';

import { useStyles } from '../step1.style';
import Image from '../../../../../components/Image';
import { MainTextField } from '../../../../../components/Inputs/MainInput';
import usePageTranslation from '../../../../../hooks/usePageTranslation';
import EstimatorBoxStore, { ESTIMATOR_BOX_STORE, IBoxItem } from '../../../stores/EstimatorBoxStore';

interface IProps {
  [ESTIMATOR_BOX_STORE]?: EstimatorBoxStore
}

const CustomBox: FC<IProps> = ({
  estimatorBoxStore: {
    setIsStandardBox,
    isStandardBox,
    customBoxItem: {
      width, height, depth,
    },
    setSelectedBoxItem,
  },
}) => {
  const classes = useStyles();

  const onDimensionChange = (field: keyof (IBoxItem), val: number) => {
    let newVal = val;
    if (Number.isNaN(newVal) || newVal < 0) {
      newVal = 0;
    }
    setSelectedBoxItem({
      width, height, depth, ...{ [field]: newVal },
    });
  };

  const { t } = usePageTranslation('estimatorBox', 'CustomBox');
  return (
    <Box
      className={clsx(
        classes.container, isStandardBox && classes.containerInactive,
      )}
      onClick={() => setIsStandardBox(false)}
    >
      <Box className={classes.header}>
        <Typography className={classes.blockTitle}>
          {t('typography1')}
        </Typography>
        <Image name={!isStandardBox ? 'active' : 'inactive'} folder="Estimator/Box" />
      </Box>
      <Box className={classes.form}>
        <Box className={classes.sizes}>
          <Box>
            <Typography>
              {t('typography2')}
            </Typography>
            <Box>
              <MainTextField
                className={classes.textField}
                fullWidth
                variant="outlined"
                placeholder="0"
                value={width}
                onChange={(e) => onDimensionChange('width', parseInt(e.target.value, 10))}
                type="number"
              />
              <Typography>
                cm
              </Typography>
            </Box>
          </Box>
          <Box>
            <Typography>
              {t('typography3')}
            </Typography>
            <Box>
              <MainTextField
                className={classes.textField}
                fullWidth
                variant="outlined"
                placeholder="0"
                value={height}
                onChange={(e) => onDimensionChange('height', parseInt(e.target.value, 10))}
                type="number"
              />
              <Typography>
                cm
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box className={classes.sizes}>
          <Box>
            <Typography>
              {t('typography4')}
            </Typography>
            <Box>
              <MainTextField
                className={classes.textField}
                fullWidth
                variant="outlined"
                placeholder="0"
                value={depth}
                onChange={(e) => onDimensionChange('depth', parseInt(e.target.value, 10))}
                type="number"
              />
              <Typography>
                cm
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default inject(ESTIMATOR_BOX_STORE)(observer(CustomBox));
