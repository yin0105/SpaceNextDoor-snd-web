import React from 'react';
import {
  Box, makeStyles, Typography,
} from '@material-ui/core';

import PrimaryTypography from '../../../../../components/Typographies/PrimaryTypography';
import Grey3Typography from '../../../../../components/Typographies/Grey3Typography';
import { MainTextField } from '../../../../../components/Inputs/MainInput';
import usePageTranslation from '../../../../../hooks/usePageTranslation';

const useStyles = makeStyles((theme) => ({
  inputBox: {
    position: 'relative',
    marginTop: '30px',
  },
  input: {
    fontSize: '1.55rem',
  },
  verifyBox: {
    position: 'absolute',
    top: '18px',
    right: '26px',
    cursor: 'pointer',
    zIndex: 2,
  },
  headerPINBox: {
    marginTop: '32px',
    marginBottom: '12px',
  },
  descriptionText: {
    color: theme.palette.grey[100],
  },
}));

interface IProps {
  type: string;
  email?: string;
  phoneNumber?: string;
  countryCode?: string;
  setStep: (move: number) => void;
  seconds: number;
}

const Info: React.FC<IProps> = (props) => {
  const classes = useStyles();

  const {
    type,
    email,
    seconds,
    countryCode,
    phoneNumber,
    setStep,
  } = props;

  const username = email || `${countryCode} ${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3, 6)} ${phoneNumber.slice(6, 9)}`;
  const { t } = usePageTranslation('login', 'Info');
  return (
    <>
      <Box className={classes.inputBox}>
        <Box className={classes.verifyBox} onClick={() => setStep(0)}>
          <PrimaryTypography>
            {t('primaryTypography')}
          </PrimaryTypography>
        </Box>
        <MainTextField
          disabled
          className={classes.input}
          value={username}
          fullWidth
          variant="outlined"
        />
      </Box>

      <Box className={classes.headerPINBox}>
        <Grey3Typography variant="h2">
          {t('grey3Typography')}
        </Grey3Typography>
      </Box>
      <Box>
        <Typography variant="body2" className={classes.descriptionText}>
          {`${t('descTextP1')} ${type === 'email' ? t('type1') : t('type2')}`}
          {' '}
          {countryCode ? `${countryCode} ` : ''}
          {email || phoneNumber}
          {t('descTextP2')}
          {' '}
          {seconds === 0 ? '' : seconds}
        </Typography>
      </Box>
    </>
  );
};

export default Info;
