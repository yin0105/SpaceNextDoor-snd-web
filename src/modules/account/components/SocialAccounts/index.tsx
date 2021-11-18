import React from 'react';
import { Typography, Box, Divider } from '@material-ui/core';
import useStyles from '../styles';
import SocialAccount from '../SocialAccount';
import { ProfileQuery_profile } from '../../../shared/queries/__generated__/ProfileQuery';

interface IProps {
  title: string;
  user: ProfileQuery_profile;
}

const SocialAccounts: React.FC<IProps> = ({ title, user }) => {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.root}>
        <Typography variant="h6" className={classes.title}>
          {title}
        </Typography>
        <SocialAccount
          account="Facebook"
          status={user?.google_user_id ? 'Connected' : 'Disconnected'}
          lineBreak
        />
        <SocialAccount
          account="Google"
          status={user?.google_user_id ? 'Connected' : 'Disconnected'}
        />
      </Box>
      <Divider />
    </>
  );
};

export default SocialAccounts;
