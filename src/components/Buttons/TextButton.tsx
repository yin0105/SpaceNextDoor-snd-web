import { Button, withStyles } from '@material-ui/core';

const TextButton = withStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}))(Button);

export default TextButton;
