import React, { FC } from 'react';
import { Box, Typography, Hidden } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import clsx from 'clsx';

import { useStyles } from '../step1.style';
import Image from '../../../../../components/Image';
import usePageTranslation from '../../../../../hooks/usePageTranslation';
import EstimatorBoxStore, { ESTIMATOR_BOX_STORE } from '../../../stores/EstimatorBoxStore';

interface IProps {
  [ESTIMATOR_BOX_STORE]?: EstimatorBoxStore
}

const StandardBox: FC<IProps> = ({
  estimatorBoxStore: {
    isStandardBox,
    setIsStandardBox,
  },
}) => {
  const { t } = usePageTranslation('estimatorBox', 'StandardBox');
  const classes = useStyles();
  return (
    <Box
      className={clsx(
        classes.container, !isStandardBox && classes.containerInactive,
      )}
      onClick={() => setIsStandardBox(true)}
    >
      <Box className={classes.header}>
        <Box>
          <Typography className={classes.blockTitle}>
            {t('typography1')}
          </Typography>
          <Typography className={classes.blockDesc}>
            {t('typography2')}
          </Typography>
        </Box>
        <Image name={isStandardBox ? 'active' : 'inactive'} folder="Estimator/Box" />
      </Box>
      <Box className={classes.image}>
        <Image name="snd-box" folder="Estimator/Box" />
      </Box>
    </Box>
  );
};

export default inject(ESTIMATOR_BOX_STORE)(observer(StandardBox));
