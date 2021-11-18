import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: '14px',
    padding: '15px 0',
    color: 'white',
    fontSize: theme.typography.body1.fontSize,
    width: '160px',
    margin: '15px auto',
    fontWeight: 600,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
    '&.Mui-disabled': {
      backgroundColor: '#E5E5E5 !important',
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: 5,
      height: 5,
      background: 'rgba(255, 255, 255, .5)',
      opacity: 0,
      borderRadius: '100%',
      transform: 'scale(1, 1) translate(-50%)',
      transformOrigin: '50% 50%',
    },
    '&:focus:not(:active)::after': {
      animation: '$ripple 1s ease-out',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(0, 0)',
      opacity: 1,
    },
    '20%': {
      transform: 'scale(25, 25)',
      opacity: 1,
    },
    '100%': {
      opacity: 0,
      transform: 'scale(40, 40)',
    },
  },
  paperWidthSm: {
    width: '96vw',
    maxWidth: '96vw',
  },
  paperScrollPaper: {
    height: '94vh',
    maxHeight: '94vh',
  },
  close: {
    position: 'absolute',
    width: '25px',
    right: '30px',
    top: '15px',
    cursor: 'pointer',
  },
}));

export { useStyles };
