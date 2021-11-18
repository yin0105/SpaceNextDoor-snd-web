import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import Grey2Typography from '../../../../../../../../../components/Typographies/Grey2Typography';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
});

interface IProps {
  units: string;
}

const Variant: React.FC<IProps> = (props) => {
  const classes = useStyles();
  const { units } = props;
  return (
    <Box className={classes.root}>
      <Grey2Typography variant="h1">
        {`x ${units}`}
      </Grey2Typography>
    </Box>
  );
};

export default Variant;
