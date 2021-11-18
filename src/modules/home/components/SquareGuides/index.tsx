import React from 'react';
import { Box, makeStyles, Divider } from '@material-ui/core';
import Rectangle from './Rectangle';
import Header from './Header';

interface IProps {
  isPopupContent?: boolean;
}

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: 0,
    [theme.breakpoints.up('md')]: {
      padding: '55px 200px 0',
    },
  },
  rootPopup: {
    margin: '0px 0px 25px',
    padding: '0',
    [theme.breakpoints.up('md')]: {
      margin: '0px 0px 25px',
      padding: '15px 15px 23px',
    },
  },
  divider: {
    marginTop: '40px',
    [theme.breakpoints.up('md')]: {
      marginTop: '60px',
      marginBottom: '50px',
    },
  },
}));

const SquareGuides: React.FC<IProps> = ({ isPopupContent }) => {
  const classes = useStyles();

  return (
    <Box p={12} className={!isPopupContent ? classes.root : classes.rootPopup}>
      <Header isPopupContent />
      <Rectangle />
      {!isPopupContent && <Divider className={classes.divider} />}
    </Box>
  );
};

export default SquareGuides;
