import { Box, makeStyles } from '@material-ui/core';
import SearchInput from '../../../../../components/Search/SearchInput';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      position: 'initial',
      maxHeight: '50px',
      marginBottom: '15px',
      '& div': {
        margin: '0',
      },
    },
  },
  input: {
    fontSize: '12px',
    lineHeight: '20px',
    [theme.breakpoints.up('md')]: {
      fontSize: '20px',
      lineHeight: '30px',
    },
  },
  searchIcon: {
    position: 'absolute',
    zIndex: 2,
    left: '12px',
    top: '12px',
    [theme.breakpoints.up('md')]: {
      left: '17px',
      top: '17px',
    },
  },
}));

const Search: React.FC = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <SearchInput theme="light" />
    </Box>
  );
};

export default Search;
