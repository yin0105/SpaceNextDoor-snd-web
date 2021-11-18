import React from 'react';
import {
  Modal, makeStyles, Box, IconButton,
} from '@material-ui/core';

import SquareGuides from '../../../../home/components/SquareGuides';
import Image from '../../../../../components/Image';

interface IProps {
  isOpen?: boolean,
  toggleModal?: (e:any) => void
}

const useStyles = makeStyles((theme) => ({
  modelContent: {
    maxWidth: '1200px',
    padding: '20px',
    borderRadius: '40px',
    backgroundColor: 'white',
    margin: '20% auto',
    minWidth: '300px',
    height: 'fit-content',
    '&:focus': {
      outline: 'none',
    },
    [theme.breakpoints.down('xs')]: {
      margin: '30vw 5px 0px 5px',
    },
    [theme.breakpoints.down('sm')]: {
      margin: '30vw 5px 0px 5px',
    },
    [theme.breakpoints.down('md')]: {
      margin: '50vw 5px 0px 5px',
    },
  },
  modelClose: {
    direction: 'rtl',
  },
}));

const SquareGuidesModal: React.FC<IProps> = ({ isOpen, toggleModal }) => {
  const classes = useStyles();
  return (
    <Modal open={isOpen}>
      <Box className={classes.modelContent}>
        <Box className={classes.modelClose}>
          <IconButton id="closeSquareGuidesModal" onClick={toggleModal}>
            <Image name="close" />
          </IconButton>
        </Box>
        <SquareGuides isPopupContent />
      </Box>
    </Modal>
  );
};

export default SquareGuidesModal;
