import { Box, makeStyles } from '@material-ui/core';
import React from 'react';
import FormLocation from './FormLocation';
import FormMoveInDate from './FormMoveInDate';
import FormPersonalInfo from './FormPersonalInfo';
import FormSpaceType from './FormSpaceType';

const useStyles = makeStyles((theme) => ({}));

interface IProps {
  currentStep: number;
}

const Forms: React.FC<IProps> = ({ currentStep }) => {
  const classes = useStyles();
  const step = () => {
    switch (currentStep) {
      case 1:
        return <FormLocation />;
      case 2:
        return <FormSpaceType />;
      case 3:
        return <FormMoveInDate />;
      case 4:
        return <FormPersonalInfo />;
      default:
        return <></>;
    }
  };

  return step();
};

export default Forms;
