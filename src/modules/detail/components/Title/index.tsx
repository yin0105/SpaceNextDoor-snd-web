import { Box, makeStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import Grey3Typography from '../../../../components/Typographies/Grey3Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '10px',
    paddingRight: '75px',
  },
  text: {
    lineHeight: '2.5rem',
    fontSize: '2.2rem',
    fontWeight: 700,
    textTransform: 'capitalize',
  },
  loader: {
    backgroundColor: theme.palette.grey[100],
    borderRadius: '10px',
  },
}));

interface IProps {
  name: string;
  loading: boolean;
}

const Title: React.FC<IProps> = ({ name, loading }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Grey3Typography variant="h1" className={classes.text}>
        {loading ? <Skeleton variant="text" height={35} width={300} className={classes.loader} animation="wave" /> : name}
      </Grey3Typography>
    </Box>
  );
};

export default Title;
