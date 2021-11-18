import { Typography, withStyles } from '@material-ui/core';

const PrimaryTypography = withStyles((theme) => ({
  root: {
    color: theme.palette.primary.main,
  },
}))(Typography);

export default PrimaryTypography;
