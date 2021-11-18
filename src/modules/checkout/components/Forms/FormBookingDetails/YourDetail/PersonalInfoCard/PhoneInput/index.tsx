import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, MenuItem } from '@material-ui/core';
import { useCurrentCountry } from 'utilities/market';

import Grey2Typography from 'components/Typographies/Grey2Typography';
import usePageTranslation from 'hooks/usePageTranslation';
import Grey3Typography from '../../../../../../../../components/Typographies/Grey3Typography';
import { MainTextField } from '../../../../../../../../components/Inputs/MainInput';
import {
  SelectInput,
  CustomSelect,
  IconComponent,
} from '../../../../../../../../components/Inputs/MainSelect';
import countryCodes from '../../../../../../../../shared/country-codes';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: '4px',
    [theme.breakpoints.up('sm')]: {
      marginBottom: '25px',
    },
  },
  title: {
    fontWeight: 600,
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.4rem',
    },
  },
  textFieldBox: {
    marginTop: '4px',
    [theme.breakpoints.up('sm')]: {
      marginTop: '17px',
    },
  },
  textField: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.grey[50],
        border: '1px',
      },
    },
  },
  input: {
    fontSize: '1.2rem',
    padding: '15px 13px',
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.6rem',
    },
  },
  label: {
    fontSize: '1.2rem',
    fontWeight: 400,
    color: theme.palette.grey[100],
    transform: 'translate(9px, 16px) scale(1)',
  },

  // country code input style
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
  inputSelect: {
    padding: '20px 26px 15px 12px',
    border: '1px solid #E9E9E9',
  },
  inputAdornment: {
    borderRight: `1px solid ${theme.palette.grey[50]}`,
    padding: '16px 5px 16px 0',
    '&>p': {
      color: theme.palette.grey[100],
      fontSize: '1.55rem',
    },
  },
  required: {
    width: '6px',
    height: '6px',
    color: 'red',
    borderRadius: '50px',
    marginLeft: '4px',
  },
}));

interface IInput {
  value: string;
  errorMessage: string;
}

interface IProps {
  title: string;
  label: string;
  countryCode: string;
  handleCountryChange: (e) => void;
  inputData?: IInput;
  onChange?: (e) => void;
  required?: boolean;
}

const OneInput: React.FC<IProps> = (props) => {
  const classes = useStyles();
  const {
    title,
    inputData,
    onChange,
    countryCode,
    handleCountryChange,
    required,
  } = props;
  const { value, errorMessage } = inputData;
  const { t } = usePageTranslation('common', 'BookingStoreErrors');

  return (
    <Box className={classes.root}>
      <Box>
        <Grey3Typography variant="caption" className={classes.title}>
          {title}
        </Grey3Typography>
        {required && <span className={classes.required}>*</span>}
      </Box>
      <Box className={classes.selectBox}>
        <Box className={countryCode ? classes.hidden : classes.selectLabelBox}>
          <Grey2Typography className={classes.selectLabel}>
            {`${useCurrentCountry().name} (${useCurrentCountry().phoneCode})`}
          </Grey2Typography>
        </Box>
        <CustomSelect
          labelId="countryCode"
          fullWidth
          IconComponent={IconComponent}
          input={<SelectInput classes={{ input: classes.inputSelect }} />}
          value={countryCode}
          onChange={handleCountryChange}
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
      <Box mt={4} className={classes.textFieldBox}>
        <MainTextField
          error={!!errorMessage.length}
          helperText={errorMessage.length ? t(errorMessage) : ''}
          className={classes.textField}
          value={value}
          type="number"
          onChange={onChange}
          fullWidth
          variant="outlined"
        />
      </Box>
    </Box>
  );
};

export default OneInput;
