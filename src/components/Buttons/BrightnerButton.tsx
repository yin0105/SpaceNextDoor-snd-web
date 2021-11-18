import { Button, withStyles } from '@material-ui/core';

const BrightenerButton = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.light,
    borderRadius: '12px',
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    },
    width: '100%',
    padding: '15px 0',
  },
}))(Button);

export default BrightenerButton;
