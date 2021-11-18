import { withStyles, Typography } from '@material-ui/core';

const ErrorTypography = withStyles((theme) => ({
  root: {
    color: theme.palette.error.main,
  },
}))(Typography);

export default ErrorTypography;
