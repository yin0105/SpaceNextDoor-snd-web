import { Button, withStyles } from '@material-ui/core';

const WhiteButton = withStyles((theme) => ({
  root: {
    backgroundColor: '#FFFFFF',
    border: `1px solid ${theme.palette.grey[50]}`,
    borderRadius: '14px',
    '&:hover': {
      backgroundColor: '#FFFFFF',
    },
    padding: '15px 0',
  },
}))(Button);

export default WhiteButton;
