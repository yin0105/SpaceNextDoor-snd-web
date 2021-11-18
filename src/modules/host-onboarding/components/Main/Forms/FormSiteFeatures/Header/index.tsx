import { Box, Hidden, makeStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import PrimaryTypography from '../../../../../../../components/Typographies/PrimaryTypography';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  lineBox: {
    display: 'flex',
    marginLeft: '25px',
    flexGrow: 1,
    margin: '10px 0',
  },
  line: {
    border: '1px solid #E9E9E9',
  },
  textBox: {
    height: 'fit-content',
    display: 'flex',
  },
  text: {
    fontWeight: 700,
  },
}));

interface IProps {
  name: string;
  loading?: boolean;
}

const defaultProps = {
  loading: false,
};

const Header = (props: IProps) => {
  const { name, loading } = props;
  const classes = useStyles();

  return (
    <Box className={classes.root}>

      <Hidden smDown>
        <Box className={classes.lineBox}>
          <Box className={classes.line}> </Box>
        </Box>
      </Hidden>
      <Box className={classes.textBox}>
        <PrimaryTypography variant="body2" className={classes.text}>
          {loading ? <Skeleton variant="text" width={55} height={20} /> : name}
        </PrimaryTypography>
      </Box>

      <Hidden smDown>
        <Box className={classes.lineBox}>
          <Box className={classes.line}> </Box>
        </Box>
      </Hidden>
    </Box>
  );
};

Header.defaultProps = defaultProps;

export default Header;
