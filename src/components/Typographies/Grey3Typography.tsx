import { Typography, withStyles } from '@material-ui/core';

const Grey3Typography = withStyles((theme) => ({
  root: {
    color: theme.palette.grey[200],
  },
}))(Typography);

export default Grey3Typography;
