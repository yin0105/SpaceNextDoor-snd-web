import { InputBase, withStyles, TextField } from '@material-ui/core';

const MainInput = withStyles((theme) => ({
  input: {
    backgroundColor: '#FFFFFF',
    border: `1px solid ${theme.palette.grey[50]}`,
    borderRadius: '15px',
    padding: '14px 15px',
    paddingLeft: '44px',
    '&::placeholder': {
      opacity: '1',
      color: theme.palette.grey[100],
    },
  },
}))(InputBase);

export const MainTextField = withStyles((theme) => ({
  root: {
    '& .MuiOutlinedInput-root': {
      backgroundColor: '#FFFFFF',
      border: `1px solid ${theme.palette.grey[50]}`,
      borderRadius: '15px',
      fontSize: '1.55rem',
      '&::placeholder': {
        opacity: '1',
        color: theme.palette.grey[100],
      },
    },
    '& .Mui-disabled': {
      overflow: 'hidden',
      backgroundColor: '#F3F3F3',
    },
  },
}))(TextField);

export default MainInput;
