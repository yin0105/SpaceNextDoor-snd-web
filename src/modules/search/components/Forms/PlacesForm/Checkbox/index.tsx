import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import { Box } from '@material-ui/core';
import Image from '../../../../../../components/Image';

const useStyles = makeStyles((theme) => ({
  root: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  iconOutside: {
    width: 15,
    height: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconInside: {
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    width: 15,
    height: 15,
  },
  iconCheckedOutside: {
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: 5,
    width: 15,
    height: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCheckedInside: {
    backgroundColor: theme.palette.primary.main,
    width: 13,
    height: 13,
    '& img': {
      position: 'relative',
      top: '-5px',
    },
  },
}));

const CheckedIcon = () => {
  const classes = useStyles();
  return (
    <Box className={classes.iconCheckedOutside}>
      <Box className={classes.iconCheckedInside}>
        <Image className="checkmark" name="white-checkmark" />
      </Box>
    </Box>
  );
};

const Icon = () => {
  const classes = useStyles();
  return (
    <Box className={classes.iconOutside}>
      <Box className={classes.iconInside}> </Box>
    </Box>
  );
};

interface IProps {
  value: number;
  checked: boolean;
  onChange: (event) => void;
}

const PlacesCheckbox = (props: IProps): JSX.Element => {
  const classes = useStyles();
  const { value, onChange, checked } = props;
  const handleCheck = (event) => {
    onChange(event);
  };
  return (
    <Checkbox
      className={classes.root}
      disableRipple
      value={value}
      checked={checked}
      color="default"
      checkedIcon={<CheckedIcon />}
      icon={<Icon />}
      onChange={handleCheck}
      inputProps={{ 'aria-label': 'decorative checkbox' }}
    />
  );
};

// Inspired by blueprintjs
export default PlacesCheckbox;
