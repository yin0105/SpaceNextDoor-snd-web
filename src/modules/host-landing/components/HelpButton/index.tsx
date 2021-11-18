import React, { FC } from 'react';
import { Box, Button, makeStyles } from '@material-ui/core';
import WhiteTypography from '../../../../components/Typographies/WhiteTypography';
import Image from '../../../../components/Image';
import usePageTranslation from '../../../../hooks/usePageTranslation';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    right: '5rem',
    top: 'calc(100vh - 9rem)',
    backgroundColor: '#FF9056',
    borderRadius: '2rem',
  },
  button: {
    padding: '1.3rem 2.0rem 1.3rem 6.0rem',
    borderRadius: '2rem',
    textTransform: 'none',
  },
  boxImage: {
    position: 'absolute',
    top: '0.8rem',
    left: '2rem',
  },
  buttonText: {
    fontWeight: 700,
  },
}));

const HelpButton: FC = () => {
  const classes = useStyles();
  const { t } = usePageTranslation('hostLanding', 'HelpButton');
  return (
    <Box className={classes.root}>
      <Box className={classes.boxImage}>
        <Image name="getHelp" folder="LoginPage" />
      </Box>
      <Button className={classes.button}>
        <WhiteTypography variant="h4" className={classes.buttonText}>
          {t('whiteTypography')}
        </WhiteTypography>
      </Button>
    </Box>
  );
};

export default HelpButton;
