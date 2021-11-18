import { withStyles, Typography } from '@material-ui/core';

const Grey1Typography = withStyles((theme) => ({
  root: {
    color: theme.palette.grey[50],
  },
}))(Typography);

export default Grey1Typography;
