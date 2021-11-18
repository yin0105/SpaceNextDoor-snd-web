import { Typography, withStyles } from '@material-ui/core';

const SecondaryTypography = withStyles((theme) => ({
  root: {
    color: theme.palette.secondary.main,
  },
}))(Typography);

export default SecondaryTypography;
