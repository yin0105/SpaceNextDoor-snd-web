import {
  Box,
  Dialog,
  fade,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Image from '../../../../components/Image';
import { Grey3Typography, Grey2Typography } from '../../../../components/Typographies';
import Buttons from './Buttons';
import usePageTranslation from '../../../../hooks/usePageTranslation';

const useStyles = makeStyles((theme) => ({
  paper: {
    borderRadius: '15px',
    maxWidth: '500px',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(5),
    color: theme.palette.grey[500],
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
      textAlign: 'center',
      borderBottom: '0',
      padding: '80px 40px 4px 40px',
    },
  },
  headerTitle: {
    marginTop: '10px',
    paddingRight: '30px',
    [theme.breakpoints.down('xs')]: {
      marginTop: '25px',
    },
  },
  bodyBox: {
    padding: '23px 43px 33px',
    [theme.breakpoints.down('xs')]: {
      padding: '20px 20px 29px',
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
      display: 'none',
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
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  bodyDescriptionTextMobile: {
    display: 'none',
    [theme.breakpoints.down('xs')]: {
      whiteSpace: 'pre-line',
      textAlign: 'center',
      display: 'block',
    },
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
  showCloseIcon: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

const AffiliatePopup: React.FC<IProps> = ({
  isPopUpOpen,
  showCloseIcon,
  onClose,
  onConfirm,
}) => {
  const classes = useStyles();
  const { t } = usePageTranslation('checkout', 'AffiliatePopup');

  const dialogContents = (closeIcon = false) => (
    <>
      <Box className={classes.headerBox}>
        <Image folder="CheckoutPage" name="alert" />
        <Box className={classes.headerTitle}>
          <Grey3Typography variant="h5">
            {t('typography')}
          </Grey3Typography>
        </Box>
        {closeIcon && (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <Image folder="CheckoutPage" name="close" />
          </IconButton>
        )}
      </Box>
      <Box className={classes.bodyBox}>
        <Box className={classes.bodyTitleBox}>
          <Grey3Typography variant="h5" className={classes.bodyTitleText}>
            {t('grey3Typography')}
          </Grey3Typography>
        </Box>
        <Box className={classes.bodyDescriptionBox}>
          <Grey2Typography variant="body1" className={classes.bodyDescriptionText}>
            {t('grey2Typography')}
          </Grey2Typography>
        </Box>
        <Box className={classes.bodyDescriptionBox}>
          <Grey2Typography variant="body1" className={classes.bodyDescriptionTextMobile}>
            {t('Mobilegrey2Typography')}
          </Grey2Typography>
        </Box>
        <Box className={classes.buttonsBox}>
          <Buttons handleConfirm={onConfirm} />
        </Box>
      </Box>
    </>
  );

  return (
    <Dialog
      open={isPopUpOpen}
      maxWidth="lg"
      BackdropProps={{ className: classes.backdrop }}
      PaperProps={{
        className: classes.paper,
      }}
      onClose={onClose}
    >
      {dialogContents(showCloseIcon)}
    </Dialog>
  );
};

export default AffiliatePopup;
