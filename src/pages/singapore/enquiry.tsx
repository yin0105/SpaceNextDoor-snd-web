import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Widget } from '@typeform/embed-react';
import { ESTIMATION_FORM_ID } from 'config';

const useStyles = makeStyles((theme) => ({
  override: {
    padding: 'unset',
    [theme.breakpoints.up('sm')]: {
      maxWidth: 'unset',
      margin: 'unset',
    },
  },
  typeFormStyle: {
    position: 'inherit',
    height: '100vh',
  },
}));

const Enquiry: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.override}>
      <Widget id={ESTIMATION_FORM_ID} className={classes.typeFormStyle} />
    </div>
  );
};

export default Enquiry;
