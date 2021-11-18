import {
  Box,
  Dialog,
  fade,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Image from '../../../../components/Image';
import Grey3Typography from '../../../../components/Typographies/Grey3Typography';
import Grey2Typography from '../../../../components/Typographies/Grey2Typography';
import Buttons from './Buttons';
import usePageTranslation from '../../../../hooks/usePageTranslation';

const useStyles = makeStyles((theme) => ({
  paper: {
    borderRadius: '15px',
    maxWidth: '550px',
  },
  backdrop: {
    backgroundColor: fade(theme.palette.grey[200], 0.4),
  },
  headerBox: {
    height: '70px',
    display: 'flex',
    padding: '0 40px',
    alignItems: 'center',
    borderBottom: `2px solid ${fade(theme.palette.grey[100], 0.1)}`,

    '& img': {
      position: 'relative',
      top: '4px',
      marginRight: '10px',
    },

    [theme.breakpoints.down('xs')]: {
      justifyContent: 'flex-end',
      borderBottom: '0',
      padding: '13px 4px 4px 0',
    },
  },
  bodyBox: {
    padding: '23px 43px 33px',
    [theme.breakpoints.down('xs')]: {
      padding: '0 20px 29px',
    },
  },
  buttonsBox: {
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    '& button': {
      paddingLeft: '23px',
      paddingRight: '23px',
    },
    '& >div:last-child': {
      marginLeft: '13px',
    },
  },
  bodyTitleText: {
    fontWeight: 500,
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      fontWeight: 600,
    },
  },
  bodyDescriptionBox: {
    display: 'flex',
    justifyContent: 'center',
    margin: '11px 0 28px',
  },
  bodyDescriptionText: {
    whiteSpace: 'pre-line',
    textAlign: 'center',
  },
  bodyTitleBox: {
    display: 'flex',
    justifyContent: 'center',
    margin: '0 40px',
    [theme.breakpoints.down('xs')]: {
      margin: '0 20px',
    },
  },
}));

interface IProps {
  isPopUpOpen: boolean;
  onConfirm: () => void;
}

const SessionExpiredPopup: React.FC<IProps> = (props) => {
  const classes = useStyles();
  const { isPopUpOpen, onConfirm } = props;
  const { t } = usePageTranslation('checkout', 'SessionExpiredPopup');
  return (
    <Dialog
      open={isPopUpOpen}
      maxWidth="lg"
      BackdropProps={{ className: classes.backdrop }}
      PaperProps={{
        className: classes.paper,
      }}
    >
      <Box className={classes.headerBox}>
        <Typography variant="h3">
          <Image folder="CheckoutPage" name="timer-lg" />
          {t('typography')}
        </Typography>
      </Box>
      <Box className={classes.bodyBox}>
        <Box className={classes.bodyTitleBox}>
          <Grey3Typography variant="h3" className={classes.bodyTitleText}>
            {t('grey3Typography')}
          </Grey3Typography>
        </Box>
        <Box className={classes.bodyDescriptionBox}>
          <Grey2Typography variant="body1" className={classes.bodyDescriptionText}>
            {t('grey2Typography')}
          </Grey2Typography>
        </Box>
        <Box className={classes.buttonsBox}>
          <Buttons handleConfirm={onConfirm} />
        </Box>
      </Box>
    </Dialog>
  );
};

export default SessionExpiredPopup;
