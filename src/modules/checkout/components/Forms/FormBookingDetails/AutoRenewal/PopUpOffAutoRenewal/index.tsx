import {
  Box,
  Dialog,
  Hidden,
  IconButton,
} from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Image from '../../../../../../../components/Image';
import HeaderText from './HeaderText';
import Buttons from './Buttons';
import BodyText from './BodyText';

const useStyles = makeStyles((theme) => ({
  paper: {
    borderRadius: '15px',
  },
  headerBox: {
    padding: '20px 26px 7px 38px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: `2px solid ${theme.palette.grey[50]}`,
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'flex-end',
      borderBottom: '0',
      padding: '13px 4px 4px 0',
    },
  },
  bodyBox: {
    padding: '23px 43px 33px',
    [theme.breakpoints.down('xs')]: {
      padding: '0 20px 29px',
    },
  },
  buttonsBox: {
    display: 'flex',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    '& button': {
      paddingLeft: '23px',
      paddingRight: '23px',
    },
    '& >div:last-child': {
      marginLeft: '13px',
    },
  },
}));

interface IProps {
  isPopUpOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const PopUpOffAutoRenewal: React.FC<IProps> = (props) => {
  const classes = useStyles();
  const {
    isPopUpOpen,
    onConfirm,
    onCancel,
  } = props;

  return (
    <Dialog
      open={isPopUpOpen}
      onClose={onCancel}
      maxWidth="lg"
      PaperProps={{
        className: classes.paper,
      }}
    >
      <Box className={classes.headerBox}>
        <Hidden xsDown>
          <HeaderText />
        </Hidden>
        <Box>
          <IconButton onClick={onCancel}>
            <Image name="close" />
          </IconButton>
        </Box>
      </Box>
      <Box className={classes.bodyBox}>
        <BodyText />
        <Box className={classes.buttonsBox}>
          <Buttons handleCancel={onCancel} handleConfirm={onConfirm} />
        </Box>
      </Box>
    </Dialog>
  );
};

export default PopUpOffAutoRenewal;
