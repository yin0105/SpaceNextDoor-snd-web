import { Box, Typography } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grey2Typography from '../../Typographies/Grey2Typography';
import PrimaryButton from '../../Buttons/PrimaryButton';
import usePageTranslation from '../../../hooks/usePageTranslation';

const useStyles = makeStyles(() => ({
  heading: {
    marginBottom: '5px',
  },
  button: {
    color: 'white',
    fontWeight: 700,
    fontSize: '1.3rem',
  },
}));

interface IProps {
  onClick(): void;
}

const Login: React.FC<IProps> = ({ onClick }) => {
  const classes = useStyles();
  const { t } = usePageTranslation('homeLayout', 'Login');
  return (
    <Box>
      <Typography variant="h2" className={classes.heading}>{t('h2')}</Typography>
      <Grey2Typography variant="body1">{t('grey2Typography')}</Grey2Typography>
      <br />
      <PrimaryButton className={classes.button} onClick={onClick}>{t('primaryButton')}</PrimaryButton>
    </Box>
  );
};

export default Login;
