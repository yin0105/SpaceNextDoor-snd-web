import { makeStyles } from '@material-ui/core';
import React from 'react';
import Radio, { RadioProps } from '@material-ui/core/Radio';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
    padding: '0px',
  },
  icon: {
    borderRadius: '50%',
    width: 24,
    height: 24,
    boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: 'white',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '$root.Mui-focusVisible &': {
      outline: '2px auto #989898',
      outlineOffset: 2,
    },
    'input:hover ~ &': {
      backgroundColor: '#ebf1f5',
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: 'rgba(206,217,224,.5)',
    },
  },
  checkedIcon: {
    backgroundColor: theme.palette.primary.main,
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
      display: 'block',
      width: 24,
      height: 24,
      backgroundImage: 'radial-gradient(#fff,#fff 23%,transparent 25%)',
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: theme.palette.primary.main,
    },
  },
}));

const StyledRadio: React.FC<RadioProps> = (props) => {
  const classes = useStyles();

  return (
    <Radio
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
};

export default StyledRadio;
