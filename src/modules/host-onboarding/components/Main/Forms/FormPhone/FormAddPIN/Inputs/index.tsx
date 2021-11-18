import {
  Box, makeStyles,
} from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  pinBox: {},
  pinInput: {
    textAlign: 'center',
    lineHeight: '40px',
    fontSize: '3rem',
    fontWeight: 600,

    width: '40px',
    marginTop: '25px',
    marginRight: '25px',
    border: 'none',
    borderBottom: `3px solid ${theme.palette.primary.main}`,
    '&:focus': {
      outline: 'none',
    },
  },
  pinInputWithoutBorder: {
    textAlign: 'center',
    lineHeight: '40px',
    fontSize: '3rem',
    fontWeight: 600,
    width: '40px',
    marginTop: '25px',
    marginRight: '25px',
    border: 'none',
    borderBottom: '3px solid #FFFFFF',
    '&:focus': {
      outline: 'none',
    },
  },
  pinInputError: {
    textAlign: 'center',
    lineHeight: '40px',
    fontSize: '3rem',
    fontWeight: 600,
    width: '40px',
    marginTop: '25px',
    marginRight: '25px',
    border: 'none',
    borderBottom: `3px solid ${theme.palette.error.main}`,
    '&:focus': {
      outline: 'none',
    },
  },
}));

interface IPin {
  pin1: string;
  pin2: string;
  pin3: string;
  pin4: string;
  pin5: string;
  pin6: string;
}

interface IProps {
  pin: IPin;
  handleChangePIN: (pin) => void;
  error: string;
}

const InputsPIN: React.FC<IProps> = (props) => {
  const classes = useStyles();

  const {
    pin,
    handleChangePIN,
    error,
  } = props;
  let inputStyle;
  if (error) {
    inputStyle = classes.pinInputError;
  } else {
    inputStyle = classes.pinInputWithoutBorder;
  }
  return (
    <Box className={classes.pinBox}>
      <input
        name="pin-1"
        type="tel"
        maxLength={1}
        className={pin.pin1 ? inputStyle : classes.pinInput}
        value={pin.pin1}
        onChange={handleChangePIN}
      />
      <input
        name="pin-2"
        type="tel"
        maxLength={1}
        className={pin.pin2 ? inputStyle : classes.pinInput}
        value={pin.pin2}
        onChange={handleChangePIN}
      />
      <input
        name="pin-3"
        type="tel"
        maxLength={1}
        className={pin.pin3 ? inputStyle : classes.pinInput}
        value={pin.pin3}
        onChange={handleChangePIN}
      />
      <input
        name="pin-4"
        type="tel"
        maxLength={1}
        className={pin.pin4 ? inputStyle : classes.pinInput}
        value={pin.pin4}
        onChange={handleChangePIN}
      />
      <input
        name="pin-5"
        type="tel"
        maxLength={1}
        className={pin.pin5 ? inputStyle : classes.pinInput}
        value={pin.pin5}
        onChange={handleChangePIN}
      />
      <input
        name="pin-6"
        type="tel"
        maxLength={1}
        className={pin.pin6 ? inputStyle : classes.pinInput}
        value={pin.pin6}
        onChange={handleChangePIN}
      />
    </Box>
  );
};

export default InputsPIN;
