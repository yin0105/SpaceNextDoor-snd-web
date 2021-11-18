import React, { FC } from 'react';
import { Box, makeStyles } from '@material-ui/core/';
import Step, { StepType } from './Step';
import usePageTranslation from '../../../../../hooks/usePageTranslation';

const useStyles = makeStyles((theme) => ({
  steps: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridColumnGap: '2rem',
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
      gridColumnGap: '10rem',
    },
  },
  step: {
    marginBottom: '4.6rem',
  },
  stepTitle: {
    display: 'flex',
    alignItems: 'center',
    color: '#000000',
    marginBottom: '3rem',
    [theme.breakpoints.up('md')]: {
      marginBottom: '2.5rem',
    },
    '& .MuiTypography-root': {
      fontWeight: 600,
      fontSize: '1.4rem',
      [theme.breakpoints.up('md')]: {
        fontSize: '1.6rem',
      },
    },
  },
  stepIcon: {
    background: '#3A3A3C',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '38px',
    width: '38px',
    marginRight: '1rem',
    '& img': {
      height: '2rem',
      width: '2rem',
    },
  },
  stepText: {},
}));

const Steps: FC = () => {
  const classes = useStyles();
  const { t } = usePageTranslation('hostLanding', 'Steps');
  const steps: StepType[] = [
    {
      icon: 'step-1',
      title: t('title1'),
      text: t('text1'),
    },
    {
      icon: 'step-2',
      title: t('title2'),
      text: t('text2'),
    },
    {
      icon: 'step-3',
      title: t('title3'),
      text: t('text3'),
    },
    {
      icon: 'step-4',
      title: t('title4'),
      text: t('text4'),
    },
    {
      icon: 'step-5',
      title: t('title5'),
      text: t('text5'),
    },

  ];
  return (
    <Box className={classes.steps}>
      {steps.map((step, index) => (
        <Step
          key={index}
          step={step}
          stepClass={classes.step}
          stepTitleClass={classes.stepTitle}
          stepIconClass={classes.stepIcon}
          stepTextClass={classes.stepText}
        />
      ))}
    </Box>
  );
};

export default Steps;
