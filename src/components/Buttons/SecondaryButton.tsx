import { Button, withStyles } from '@material-ui/core';

const SecondaryButton = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.light,
    border: `1px solid ${theme.palette.grey[50]}`,
    borderRadius: '14px',
    color: theme.palette.secondary.main,
    fontWeight: 600,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    },
    width: '100%',
    padding: '15px 0',
  },
}))(Button);

export default SecondaryButton;
