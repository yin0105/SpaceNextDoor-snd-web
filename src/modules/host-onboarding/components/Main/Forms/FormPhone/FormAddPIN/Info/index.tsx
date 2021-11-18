import {
  Box, InputAdornment, makeStyles, Typography,
} from '@material-ui/core';
import React, { useEffect } from 'react';
import PrimaryTypography from '../../../../../../../../components/Typographies/PrimaryTypography';
import Grey3Typography from '../../../../../../../../components/Typographies/Grey3Typography';
import { MainTextField } from '../../../../../../../../components/Inputs/MainInput';
import FormLayout from '../../../../../../../../layouts/FormLayout';
import usePageTranslation from '../../../../../../../../hooks/usePageTranslation';

const useStyles = makeStyles((theme) => ({
  inputBox: {
    position: 'relative',
    marginTop: '30px',
  },
  input: {
    fontSize: '1.55rem',
  },
  inputAdornment: {
    borderRight: `1px solid ${theme.palette.grey[50]}`,
    padding: '16px 5px 16px 0',
    backgroundColor: '#F3F3F3',
    '&>p': {
      color: theme.palette.grey[100],
      fontSize: '1.55rem',
    },
  },
  verifyBox: {
    position: 'absolute',
    top: '18px',
    right: '26px',
    cursor: 'pointer',
    zIndex: 2,
  },
  editBox: {
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
    color: '#948EA2',
  },
}));

interface IProps {
  phoneNumber: string;
  basement: string;
  changeStep: (move: string) => void;
  seconds: number;
}

const Info: React.FC<IProps> = (props) => {
  const classes = useStyles();

  const {
    seconds,
    basement,
    phoneNumber,
    changeStep,
  } = props;
  const phoneNumberWithSpace = `${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3, 6)} ${phoneNumber.slice(6, 9)}`;
  const { t } = usePageTranslation('hostOnBoarding', 'FormAddPINInfo');
  return (
    <FormLayout>
      <Box className={classes.inputBox}>
        <Box className={classes.verifyBox} onClick={() => changeStep('back')}>
          <PrimaryTypography>
            {t('box')}
          </PrimaryTypography>
        </Box>
        <MainTextField
          disabled
          className={classes.input}
          value={phoneNumberWithSpace}
          fullWidth
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment
                position="start"
                className={classes.inputAdornment}
              >
                {basement}
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box className={classes.headerPINBox}>
        <Grey3Typography variant="h2">
          {t('grey3Typography')}
        </Grey3Typography>
      </Box>
      <Box>
        <Typography className={classes.descriptionText}>
          {t('typographyP1')}
          {' '}
          {basement}
          {' '}
          {phoneNumber}
          {t('typographyP2')}
          {' '}
          {seconds === 0 ? '' : seconds}
        </Typography>
      </Box>
    </FormLayout>
  );
};

export default Info;
