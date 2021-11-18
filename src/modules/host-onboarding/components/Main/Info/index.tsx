import { Box, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import Image from '../../../../../components/Image';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#EAF0F6',
    height: '100%',
    minHeight: 'calc(100vh - 139px)',
    padding: '118px 0 0 48px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    [theme.breakpoints.down('sm')]: {
      height: 'auto',
      minHeight: 'auto',
      padding: '0',
    },
  },
  boxInfo: {
    position: 'relative',
    padding: '80px 25px 50px',
    borderRadius: '20px',
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 15px 40px 0px #E9E9E9',
    maxWidth: '370px',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
      borderRadius: '0',
      boxShadow: 'none',
      borderTop: `1px solid ${theme.palette.grey[50]}`,
    },
  },
  imageBox: {
    position: 'absolute',
    top: '38px',
    left: '30px',
  },
  text: {
    color: '#948EA2',
    fontSize: '1.6rem',
  },
}));

const Info: React.FC = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box className={classes.boxInfo}>
        <Box className={classes.imageBox}>
          <Image name="box" folder="LoginPage" />
        </Box>
        <Typography className={classes.text} variant="body1" />
      </Box>
    </Box>
  );
};

export default Info;
