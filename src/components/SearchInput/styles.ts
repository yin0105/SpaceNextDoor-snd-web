import { fade, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  option: {
    padding: '15px 30px',
  },
  group: {
    borderRadius: '15px',
  },
  skeleton: {
    margin: '10px 15px',
    height: '35px',
    borderRadius: '8px',
    backgroundColor: fade(theme.palette.grey[50], 0.8),
  },
  input: {
    width: '70%',
    '& .MuiInputBase-input': {
      paddingLeft: '25px',
    },
    '& div:before': {
      display: 'none',
    },
    '& div:after': {
      display: 'none',
    },
    '& div': {
      padding: '10px 30px !important',
      '& div': {
        display: 'none',
      },
    },
    borderRadius: '15px',
    backgroundColor: fade(theme.palette.grey[50], 0.7),
  },
}));

export default useStyles;
