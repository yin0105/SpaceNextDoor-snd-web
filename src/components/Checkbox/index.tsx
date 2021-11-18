import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  iconOutside: {
    width: 19,
    height: 19,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconInside: {
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    width: 16,
    height: 16,
  },
  iconCheckedOutside: {
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: 5,
    width: 19,
    height: 19,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCheckedInside: {
    border: '1px solid #FFFFFF',
    borderRadius: 5,
    backgroundColor: theme.palette.primary.main,
    width: 17,
    height: 17,
  },
}));

const CheckedIcon: React.FC = () => {
  const classes = useStyles();
  return (
    <Box className={classes.iconCheckedOutside}>
      <Box className={classes.iconCheckedInside}> </Box>
    </Box>
  );
};

const Icon: React.FC = () => {
  const classes = useStyles();
  return (
    <Box className={classes.iconOutside}>
      <Box className={classes.iconInside}> </Box>
    </Box>
  );
};

// Inspired by blueprintjs
const StyledCheckbox: React.FC<CheckboxProps> = (props) => {
  const classes = useStyles();

  return (
    <Checkbox
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<CheckedIcon />}
      icon={<Icon />}
      inputProps={{ 'aria-label': 'decorative checkbox' }}
      {...props}
    />
  );
};

export default StyledCheckbox;
