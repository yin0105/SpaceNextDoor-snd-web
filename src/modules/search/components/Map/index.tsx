import { Box, makeStyles } from '@material-ui/core';
import Image from '../../../../components/Image';

const useStyles = makeStyles({
  root: {
    position: 'relative',
    marginTop: '-20px',
    marginBottom: '-60px',
  },
  image: {
    width: '100%',
  },
});

const Map = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Image name="map" folder="SearchLocation" fullWidth />
    </Box>
  );
};

export default Map;
