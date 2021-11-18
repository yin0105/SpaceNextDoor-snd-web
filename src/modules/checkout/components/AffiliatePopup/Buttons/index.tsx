import { Box } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PrimaryButton from '../../../../../components/Buttons/PrimaryButton';
import WhiteTypography from '../../../../../components/Typographies/WhiteTypography';
import usePageTranslation from '../../../../../hooks/usePageTranslation';

const useStyles = makeStyles((theme) => ({
  buttonBox: {
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
    justifyContent: 'center',
  },
  confirmButtonText: {
    fontWeight: 700,
    fontSize: '1.3rem',
  },
}));

interface IProps {
  handleConfirm: () => void;
}

const Buttons: React.FC<IProps> = (props) => {
  const classes = useStyles();
  const {
    handleConfirm,
  } = props;
  const { t } = usePageTranslation('checkout', 'AffiliatePopup');
  return (
    <>
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
