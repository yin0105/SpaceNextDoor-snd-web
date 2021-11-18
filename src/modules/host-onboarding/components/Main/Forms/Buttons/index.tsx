import {
  Box, Button, makeStyles, CircularProgress,
} from '@material-ui/core';

import React from 'react';
import Image from '../../../../../../components/Image';
import PrimaryTypography from '../../../../../../components/Typographies/PrimaryTypography';
import PrimaryButton from '../../../../../../components/Buttons/PrimaryButton';
import usePageTranslation from '../../../../../../hooks/usePageTranslation';

const useStyles = makeStyles((theme) => ({
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
    borderTop: '1px solid #E9E9E9',
    paddingTop: '30px',
    [theme.breakpoints.down('sm')]: {
      marginTop: '30px',
    },
  },

  backButtonBox: {
    position: 'relative',
  },
  backButtonImageBox: {
    position: 'absolute',
    top: '16px',
    left: '9px',
  },
  backButton: {
    borderRadius: '14px',
    padding: '18px 24px 18px 80px',
    paddingLeft: '40px',
  },
  nextButton: {
    padding: '18px 52px',
  },
  buttonBackText: {
    color: '#00A0E3',
    fontWeight: 700,
    fontSize: '1.6rem',
  },
  buttonNextText: {
    color: '#FFFFFF',
    fontWeight: 700,
    fontSize: '1.6rem',
  },
  btnLoading: {
    position: 'absolute',
    left: '50px',
    top: '10px',
  },
}));

interface IProps {
  changeStep: (move:string)=>void;
  isLoading?: boolean;
  disabled?: boolean;
  disableBack?: boolean;
  currentStep?: number;
}

const defaultProps = {
  disabled: false,
  isLoading: false,
};

const Buttons: React.FC<IProps> = (props) => {
  const {
    isLoading, changeStep, disabled, disableBack = false, currentStep,
  } = props;

  const classes = useStyles();
  const { t } = usePageTranslation('hostOnBoarding', 'Buttons');
  return (
    <Box className={classes.buttons}>

      <Box className={classes.backButtonBox}>
        <Box className={classes.backButtonImageBox}>
          <Image name="arrowLeft" folder="LoginPage" />
        </Box>
        <Box>
          <Button
            disabled={disableBack}
            className={classes.backButton}
            onClick={() => (currentStep !== 0 ? changeStep('back') : window.history.back())}
          >
            <PrimaryTypography className={classes.buttonBackText}>
              {t('primaryTypography')}
            </PrimaryTypography>
          </Button>
        </Box>
      </Box>

      <Box>
        <PrimaryButton
          disabled={!!disabled || !!isLoading}
          type="submit"
          className={classes.nextButton}
        >
          <Box className={classes.buttonNextText}>
            {t('box')}
            {!!isLoading && (
              <CircularProgress color="inherit" className={classes.btnLoading} />
            )}
          </Box>
        </PrimaryButton>
      </Box>
    </Box>
  );
};

Buttons.defaultProps = defaultProps;

export default Buttons;
