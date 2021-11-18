import React from 'react';
import Modal from '@material-ui/core/Modal';
import { Divider, Grid, Button } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Image from '../../../../components/Image';
import useStyles from './styles';
import usePageTranslation from '../../../../hooks/usePageTranslation';

interface IModalProps {
  isVisible: boolean,
  onClose: () => void;
}

const ReservationModal: React.FC<IModalProps> = (
  isVisible,
  onClose,
): JSX.Element => {
  const classes = useStyles();
  const { t } = usePageTranslation('hostReservation', 'Modal');
  return (
    <Modal
      className={classes.modal}
      open={!!isVisible}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={!!isVisible}>
        <div className={classes.paper}>
          <Grid container className={classes.header}>
            <Grid item container xs={12}>
              <Grid item className={classes.alertIcon} xs={2}>
                <Image name="alert" folder="Host" />
              </Grid>
              <Grid item xs={8} className={classes.headerTitle}>{t('headerTitle')}</Grid>
              <Grid item xs={2} className={classes.IconClose} onClick={onClose}>
                <Image name="close" />
              </Grid>
            </Grid>
          </Grid>
          <Divider />
          <Grid container justify="center">
            <Grid item xs={9} className={classes.subtitle}>
              {t('subtitle')}
            </Grid>
            <Grid item xs={9} className={classes.message}>
              {t('message1')}
              <br />
              {t('message2')}
            </Grid>
          </Grid>
          <Grid container justify="flex-end" className={classes.footer}>
            <Button variant="outlined" className={`${classes.cancleBtn} ${classes.btn} `}>{t('cancel')}</Button>
            <Button variant="outlined" className={`${classes.confrimBtn} ${classes.btn}`}>{t('confirm')}</Button>
          </Grid>
        </div>
      </Fade>
    </Modal>
  );
};

export default ReservationModal;
