import React from 'react';
import { Typography, Box, Divider } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    fontSize: '12px',
    lineHeight: '20px',
    color: theme.palette.grey[100],
  },
  divider: {
    maxWidth: '366px',
    margin: '28px 0px',
  },
  container: {
    maxWidth: '366px',
    height: '50px',
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& :first-child': {
      fontSize: '14px',
      lineHeight: '20px',
      letterSpacing: '0.5px',
    },
    '& :last-child': {
      fontSize: '12px',
      lineHeight: '20px',
      color: theme.palette.primary.main,
      cursor: 'pointer',
    },
  },

}));

interface IProps {
  lineBreak?: boolean;
  account: string;
  status: string;

}

const SocialAccount: React.FC<IProps> = ({ lineBreak, account, status }) => {
  const classes = useStyles();

  return (
    <>
      <Box component="div" className={classes.container}>
        <Box component="span">{account}</Box>
      </Box>
      <Typography variant="body2" className={classes.title}>{status}</Typography>
      {lineBreak && <Divider className={classes.divider} />}
    </>

  );
};

export default SocialAccount;
