import {
  Box, withStyles,
} from '@material-ui/core';

const FormLayout = withStyles((theme) => ({
  root: {
    paddingRight: '80px',
    [theme.breakpoints.down('sm')]: {
      paddingRight: '0',
    },
  },
}))(Box);

export default FormLayout;
