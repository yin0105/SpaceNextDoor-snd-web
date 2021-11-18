import { Box, makeStyles } from '@material-ui/core';
import Image from '../../../../components/Image';

const useStyles = makeStyles(() => ({
  root: {
    marginTop: '20px',
  },
}));

const TopPicksHeading: React.FC = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Image name="topPics" folder="SearchLocation" />
    </Box>
  );
};

export default TopPicksHeading;
