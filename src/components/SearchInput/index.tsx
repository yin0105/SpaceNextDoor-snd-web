import {
  Box, TextField,
} from '@material-ui/core';
import Image from '../Image';
import useStyles from './styles';

const SearchInput: React.FunctionComponent<any> = (props: any) => {
  const classes = useStyles();
  return (
    <Box>
      <TextField
        InputProps={{
          startAdornment: (
            <Image name="searchIcon" folder="Homepage" />
          ),
        }}
        classes={{ root: classes.input }}
        autoFocus={false}
        {...props}
      />
    </Box>
  );
};

export default SearchInput;
