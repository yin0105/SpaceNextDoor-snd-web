import { withStyles, Typography } from '@material-ui/core';

const Grey2Typography = withStyles((theme) => ({
  root: {
    color: theme.palette.grey[100],
  },
}))(Typography);

export default Grey2Typography;
