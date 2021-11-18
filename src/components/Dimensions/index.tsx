import { makeStyles } from '@material-ui/core';
import React from 'react';

interface IProps {
  width: number;
  length: number;
  unit: string;
}

const useStyles = makeStyles((theme) => ({
  heading: {
    fontWeight: 300,
    color: theme.palette.grey[300],
    fontSize: '1rem',
    paddingLeft: '5px',
  },
}));

const Dimensions: React.FC<IProps> = ({
  width, length, unit,
}) => {
  const classes = useStyles();

  return (
    <span className={classes.heading}>
      <span>{width}</span>
      {unit}
      {' '}
      x
      {' '}
      <span>{length}</span>
      {unit}
    </span>
  );
};

export default Dimensions;
