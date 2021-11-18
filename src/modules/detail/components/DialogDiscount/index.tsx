import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import React, { useState, FC } from 'react';
import { makeStyles, Box } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import {
  withStyles, WithStyles, createStyles, Theme,
} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PrimaryButton from '../../../../components/Buttons/PrimaryButton';
import usePageTranslation from '../../../../hooks/usePageTranslation';

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative',
    borderRadius: '15px',
  },
  paperWidthSm: {
    width: '544px',
  },
  dialogTitle: {
    borderBottom: '2px solid #989898',
    opacity: '0.1',
  },
  textDialogTitle: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 600,
    fontSize: '18px',
    lineHeight: '20px',
    margin: '20px 60px',
  },
  imageDialogTitle: {
    marginRight: '2%',
  },
  textDiscountDialogContent: {
    fontWeight: 500,
    fontSize: '18px',
    lineHeight: '30px',
    textAlign: 'center',
  },
  textDialogContent: {
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '20px',
    textAlign: 'center',
    color: '#989898',
  },
  bottomDialog: {
    display: 'flex',
    justifyContent: 'center !important',
  },
  button: {
    color: 'white',
    fontSize: '1.3rem',
    fontWeight: 700,
    width: '125px',
  },
}));

const styles = (theme: Theme) => createStyles({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(0),
    color: theme.palette.grey[500],
  },
});

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const {
    children, classes, onClose, ...other
  } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogDiscount: FC = () => {
  const [open, setOpen] = useState(true);
  const classes = useStyles();
  const { t } = usePageTranslation('details', 'QuotationDialog');

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{ paper: classes.root, paperWidthSm: classes.paperWidthSm }}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          <Box className={classes.textDialogTitle}>
            <img className={classes.imageDialogTitle} src="/images/DetailPage/percent-orange.svg" alt="" />
            {t('typography1')}
          </Box>
        </DialogTitle>
        <div className={classes.dialogTitle} />
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Box className={classes.textDiscountDialogContent}>
              {t('typography2')}
            </Box>
            <Box className={classes.textDialogContent}>
              {t('typography3')}
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.bottomDialog}>
          <PrimaryButton
            onClick={handleClose}
            className={classes.button}
          >
            {t('primaryButton')}
          </PrimaryButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default DialogDiscount;
