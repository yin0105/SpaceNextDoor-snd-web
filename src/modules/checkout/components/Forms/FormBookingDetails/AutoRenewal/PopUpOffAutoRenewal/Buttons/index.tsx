import { Box } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import WhiteButton from '../../../../../../../../components/Buttons/WhiteButton';
import Grey2Typography from '../../../../../../../../components/Typographies/Grey2Typography';
import PrimaryButton from '../../../../../../../../components/Buttons/PrimaryButton';
import WhiteTypography from '../../../../../../../../components/Typographies/WhiteTypography';
import usePageTranslation from '../../../../../../../../hooks/usePageTranslation';

const useStyles = makeStyles((theme) => ({
  buttonBox: {
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  cancelButtonText: {
    fontWeight: 500,
    fontSize: '1.3rem',
  },
  confirmButtonText: {
    fontWeight: 700,
    fontSize: '1.3rem',
  },
}));

interface IProps {
  handleCancel: () => void;
  handleConfirm: () => void;
}

const Buttons: React.FC<IProps> = (props) => {
  const classes = useStyles();
  const {
    handleCancel,
    handleConfirm,
  } = props;
  const { t } = usePageTranslation('checkout', 'AutoRenewalButtons');
  return (
    <>
      <Box className={classes.buttonBox}>
        <WhiteButton fullWidth onClick={handleCancel}>
          <Grey2Typography className={classes.cancelButtonText}>
            {t('grey2Typography')}
          </Grey2Typography>
        </WhiteButton>
      </Box>
      <Box className={classes.buttonBox}>
        <PrimaryButton fullWidth onClick={handleConfirm}>
          <WhiteTypography className={classes.confirmButtonText}>
            {t('whiteTypography')}
          </WhiteTypography>
        </PrimaryButton>
      </Box>
    </>
  );
};

export default Buttons;
