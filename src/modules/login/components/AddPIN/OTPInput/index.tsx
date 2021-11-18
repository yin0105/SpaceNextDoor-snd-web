import { Box, makeStyles } from '@material-ui/core';
import React from 'react';
import OtpInput from 'react-otp-input';

const useStyles = makeStyles((theme) => ({
  pinInput: {
    textAlign: 'center',
    lineHeight: '40px',
    fontSize: '3rem',
    fontWeight: 600,
    width: '50px !important',
    marginTop: '25px',
    marginRight: '25px',
    border: 'none',
    borderBottom: `3px solid ${theme.palette.primary.main}`,
    [theme.breakpoints.up('xs')]: {
      width: '30px !important',
    },
    [theme.breakpoints.up('sm')]: {
      width: '50px !important',
    },
    [theme.breakpoints.up('md')]: {
      width: '50px !important',
    },
    '&:focus': {
      outline: 'none',
    },
  },
  focus: {
    outline: 'none',
  },
  pinInputWithoutBorder: {
    textAlign: 'center',
    lineHeight: '40px',
    fontSize: '3rem',
    fontWeight: 600,
    width: '50px',
    marginTop: '25px',
    marginRight: '5px',
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
    width: '50px !important',
    [theme.breakpoints.up('xs')]: {
      width: '30px !important',
    },
    [theme.breakpoints.up('sm')]: {
      width: '50px !important',
    },
    [theme.breakpoints.up('md')]: {
      width: '50px !important',
    },
    marginTop: '25px',
    marginRight: '25px',
    [theme.breakpoints.up('sm')]: {
      width: '30px !important',
    },
    border: 'none',
    borderBottom: `3px solid ${theme.palette.error.main}`,
    '&:focus': {
      outline: 'none',
    },
  },
}));

interface IProps {
  otp: string;
  handleOTPChange: (otp) => void;
  error: boolean;
}

const OTPInput: React.FC<IProps> = (props) => {
  const classes = useStyles();
  const {
    otp, handleOTPChange, error,
  } = props;

  return (
    <Box>
      <OtpInput
        value={otp}
        onChange={handleOTPChange}
        numInputs={6}
        inputStyle={classes.pinInput}
        focusStyle={classes.focus}
        hasErrored={error}
        errorStyle={classes.pinInputError}
        isInputNum
      />
    </Box>
  );
};

export default OTPInput;
