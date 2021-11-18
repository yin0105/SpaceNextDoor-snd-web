import React, { FC } from 'react';
import { Box, Typography } from '@material-ui/core/';
import Image from '../../../../../../components/Image';

export interface StepType {
  icon: string,
  title: string,
  text: string,
}

interface IProps {
  step: StepType,
  stepClass: string,
  stepTitleClass: string,
  stepIconClass: string,
  stepTextClass: string,
}

const Step: FC <IProps> = ({
  step, stepClass, stepTitleClass, stepIconClass, stepTextClass,
}) => (
  <Box className={stepClass}>
    <Box className={stepTitleClass}>
      <Box className={stepIconClass}>
        <Image name={step.icon} folder="Host" />
      </Box>
      <Typography>
        {step.title}
      </Typography>
    </Box>
    <Box>
      <Typography className={stepTextClass}>
        {step.text}
      </Typography>
    </Box>
  </Box>
);

export default Step;
