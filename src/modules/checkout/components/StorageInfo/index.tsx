import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid } from '@material-ui/core';
import Info from './Info';
import StorageImage from './StorageImage';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: '20px',
    padding: '20px 19px',
    backgroundColor: '#EAF0F6',
    borderRadius: '22px',
    marginBottom: '8px',
    [theme.breakpoints.up('sm')]: {
      marginBottom: '0',
      marginTop: '0px',
    },
  },
}));

interface IProps {
  subTotal: string;
}
const StorageInfo: React.FC<IProps> = ({ subTotal }) => {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <Grid container>
        <Grid item container xs={5}>
          <StorageImage />
        </Grid>
        <Grid item xs={7}>
          <Info subTotal={subTotal} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default StorageInfo;
