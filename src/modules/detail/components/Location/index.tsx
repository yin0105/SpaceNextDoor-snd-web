import { Skeleton } from '@material-ui/lab';
import { Box, makeStyles } from '@material-ui/core';
import Grey3Typography from '../../../../components/Typographies/Grey3Typography';
import Image from '../../../../components/Image';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
  rootWithMargin: {
    position: 'relative',
    marginTop: '22px',
  },
  imgBox: {
    position: 'absolute',
    top: '0px',
    left: '0px',
  },
  textBox: {
    paddingLeft: '18px',
  },
  loader: {
    backgroundColor: theme.palette.grey[50],
  },
}));

interface IProps {
  location: string;
  loading: boolean;
  addMargin?: boolean;
}

const Location: React.FC<IProps> = ({ location, loading, addMargin = true }) => {
  const classes = useStyles();
  return (
    <Box className={addMargin ? classes.rootWithMargin : classes.root}>
      <Box className={classes.imgBox}>
        <Image name="location" folder="DetailPage" />
      </Box>
      <Box className={classes.textBox}>
        <Grey3Typography variant="body2">
          {loading ? <Skeleton variant="text" width={250} className={classes.loader} animation="wave" /> : location}
        </Grey3Typography>
      </Box>
    </Box>
  );
};

export default Location;
