import {
  Box, CircularProgress, InputAdornment, makeStyles, MenuItem, Typography,
} from '@material-ui/core';
import { useMutation } from '@apollo/client';
import React, { useState } from 'react';

import Grey2Typography from '../../../../../../../components/Typographies/Grey2Typography';
import PrimaryTypography from '../../../../../../../components/Typographies/PrimaryTypography';
import { MainTextField } from '../../../../../../../components/Inputs/MainInput';
import {
  SelectInput,
  CustomSelect,
  IconComponent,
} from '../../../../../../../components/Inputs/MainSelect';
import Buttons from '../../Buttons';
import FormLayout from '../../../../../../../layouts/FormLayout';
import handleSubmit from '../../../../../../../utilities/handleSubmit';
import { SEND_OTP } from '../../../../../../shared/queries/query';
import { SendOTPQuery, SendOTPQueryVariables } from '../../../../../../shared/queries/__generated__/SendOTPQuery';
import usePageTranslation from '../../../../../../../hooks/usePageTranslation';

const useStyles = makeStyles((theme) => ({
  textBox: {
    marginTop: '56px',
    [theme.breakpoints.down('sm')]: {
      marginTop: '10px',
    },
  },
  text: {
    fontSize: '1.6rem',
    color: '#948EA2',
  },

  root: {
    margin: '12px 0',
  },
  inputs: {
    paddingRight: '82px',
    [theme.breakpoints.down('sm')]: {
      paddingRight: '0',
    },
  },

  selectBox: {
    marginTop: '10px',
    position: 'relative',
  },
  selectLabelBox: {
    position: 'absolute',
    display: 'block',
    top: '18px',
    left: '13px',
    zIndex: 1,
  },
  selectLabel: {
    fontSize: '1.8rem',
  },
  hidden: {
    display: 'none',
  },
  searchLabel: {
    fontSize: '1.8rem',
  },
  inputBox: {
    position: 'relative',
    marginTop: '30px',
  },
  btnLoading: {
    position: 'absolute',
    right: '0px',
    top: '-10px',
  },
  input: {
    fontSize: '18px',
  },
  inputSelect: {
    padding: '21px 26px 17px 12px',
  },
  inputAdornment: {
    borderRight: `1px solid ${theme.palette.grey[50]}`,
    padding: '16px 5px 16px 0',
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

}));

interface ICountryCode {
  name: string;
  dial_code: string;
  code: string;
}

interface IProps {
  countryCodes: ICountryCode[];
  basement: string;
  setBasement: (e) => void;
  phoneNumber: string;
  setPhoneNumber: (number: string) => void;
  changeStep: (act: string) => void;
  currentStep?: number;
}

const FormAddNumber: React.FC<IProps> = (props) => {
  const classes = useStyles();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sendOTP] = useMutation<SendOTPQuery, SendOTPQueryVariables>(SEND_OTP);

  const {
    countryCodes,
    basement,
    setBasement,
    phoneNumber,
    setPhoneNumber,
    changeStep,
    currentStep,
  } = props;

  const { t } = usePageTranslation('hostOnBoarding', 'FormAddNumber');

  const handleChangeSelect = (e) => {
    setBasement(e.target.value);
  };

  const handleTranslation = (msg) => {
    const MASSAGER_ERROR = 'Username can either be phone number or email!';
    if (msg === MASSAGER_ERROR) {
      return t('grey3Typography');
    }
    return t('grey3Typography1');
  };

  const verifyNumber = async () => {
    setIsLoading(true);
    const username = basement + phoneNumber;
    try {
      await sendOTP({ variables: { username } });
    } catch (e) {
      setIsLoading(false);
      return setError(handleTranslation(e.message));
    }
    return changeStep('next');
  };

  const handleChangePhoneNumber = (e) => {
    setError('');
    const { value } = e.target;
    const validInp = /^[0-9]+$/;
    if (value !== '' && !validInp.test(value)) {
      return false;
    }
    return setPhoneNumber(value);
  };

  return (
    <>
      <Box className={classes.textBox}>
        <Typography variant="body2" className={classes.text}>
          {t('typography')}
        </Typography>
      </Box>
      <Box className={classes.root}>

        <form onSubmit={handleSubmit(verifyNumber, null)}>

          <FormLayout>

            <Box className={classes.selectBox}>
              <Box className={basement ? classes.hidden : classes.selectLabelBox}>
                <Grey2Typography className={classes.selectLabel}>
                  Singapore (+65)
                </Grey2Typography>
              </Box>
              <CustomSelect
                labelId="demo"
                fullWidth
                IconComponent={IconComponent}
                input={<SelectInput classes={{ input: classes.inputSelect }} />}
                value={basement}
                onChange={handleChangeSelect}
              >
                {countryCodes.map((item) => (
                  <MenuItem
                    key={item.name}
                    value={item.dial_code}
                  >
                    {`${item.name} (${item.dial_code})`}
                  </MenuItem>
                ))}
              </CustomSelect>
            </Box>

            <Box className={classes.inputBox}>
              <Box className={classes.verifyBox} onClick={verifyNumber}>
                {!!isLoading && (
                  <div className={classes.btnLoading}>
                    <CircularProgress color="primary" />
                  </div>
                )}
                <PrimaryTypography>
                  {t('primaryTypography')}
                </PrimaryTypography>
              </Box>
              <MainTextField
                error={!!error.length}
                helperText={error.length ? error : ''}
                className={classes.input}
                value={phoneNumber}
                onChange={handleChangePhoneNumber}
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
          </FormLayout>

          <Buttons currentStep={currentStep} disabled isLoading={false} changeStep={changeStep} />
        </form>

      </Box>
    </>
  );
};

export default FormAddNumber;
