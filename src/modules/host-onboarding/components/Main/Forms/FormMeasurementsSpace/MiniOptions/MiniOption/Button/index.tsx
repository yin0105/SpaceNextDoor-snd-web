import { Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import Actions from './Actions';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  buttonBox: {
    maxWidth: '32px',
    height: '32px',
    position: 'relative',
  },
  button: {
    padding: '10px 0',
    minWidth: '32px',
    height: '32px',
  },
  insideButtonBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    margin: '1.5px',
    width: '3px',
    height: '3px',
    backgroundColor: 'black',
    borderRadius: '50%',
  },
  background: {
    position: 'fixed',
    top: '0px',
    zIndex: 1,
    minHeight: '100vh',
    height: '100%',
    width: '100vw',
  },
});

interface IProps {
  changeOpenEdit: () => void;
  deleteOption: () => void;
}

const Dot = () => {
  const classes = useStyles();
  return (
    <Box className={classes.dot}> </Box>
  );
};

const OptionButton: React.FC<IProps> = (props) => {
  const classes = useStyles();
  const {
    changeOpenEdit,
    deleteOption,
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  const changeOpenActions = (callback) => () => {
    setIsOpen(!isOpen);
    callback();
  };
  return (
    <Box className={classes.root}>
      <Box className={classes.buttonBox}>
        <Button className={classes.button} onClick={() => setIsOpen(!isOpen)}>
          <Box className={classes.insideButtonBox}>
            <Dot />
            <Dot />
            <Dot />
          </Box>
        </Button>
        {isOpen ? <Actions changeOpenEdit={changeOpenActions(changeOpenEdit)} deleteOption={changeOpenActions(deleteOption)} /> : ''}
        {isOpen
          ? <Box className={classes.background} onClick={() => setIsOpen(!isOpen)}> </Box>
          : ''}
      </Box>
    </Box>
  );
};

export default OptionButton;
