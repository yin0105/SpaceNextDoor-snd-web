import React, { FC } from 'react';
import {
  Box,
  IconButton,
  Typography,
  makeStyles,
} from '@material-ui/core/';
import Image from '../Image';

interface IProps {
  title: string;
  cb: () => void;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      padding: '0',
    },
  },
  title: {
    marginLeft: 50,
  },
  arrowBack: {
    paddingLeft: 0,
  },
}));

const HeadingMobile: FC<IProps> = ({ title, cb }) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <IconButton className={classes.arrowBack} onClick={() => (cb ? cb() : window.history.back())}>
        <Image folder="CheckoutPage" name="arrowBack" />
      </IconButton>
      <Typography variant="h2" className={classes.title}>{title}</Typography>
    </Box>
  );
};

export default HeadingMobile;
