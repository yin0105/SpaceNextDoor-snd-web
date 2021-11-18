import { makeStyles, Box, fade } from '@material-ui/core';
import React from 'react';
import Image from '../Image';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    backgroundColor: fade(theme.palette.grey[50], 0.8),

    '& img': {
      alignSelf: 'center',
      width: '100px',
    },
  },
}));

const Placeholder: React.FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Image folder="DetailPage" name="placeholder" extension="png" />
    </Box>
  );
};

export default Placeholder;
