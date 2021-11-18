import {
  Box, makeStyles, Theme, Typography,
} from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: theme.palette.secondary.light,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    height: '40px',
    margin: '10px 0',
    borderRadius: '15px',
    width: 'max-content',
    maxWidth: '100%',
    color: theme.palette.secondary.main,
    [theme.breakpoints.down('sm')]: {
      height: 'max-content',
    },
  },
  text: {
    fontSize: '14px',
    lineHeight: '20px',
  },
  getAQuote: {
    color: theme.palette.grey[100],
    fontWeight: 600,
    textDecoration: 'underline',
    cursor: 'pointer',
  },
}));

interface IProps {
  text: string;
  subText?: string;
  onClick?: () => void;
}

const Error: React.FC<IProps> = ({ text, subText, onClick }) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Typography className={classes.text}>
        {text}
        {' '}
        {subText && (
          <span role="presentation" onClick={() => onClick?.()} className={classes.getAQuote}>
            {subText}
          </span>
        )}
      </Typography>
    </Box>
  );
};

export default Error;
