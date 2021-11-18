import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import usePageTranslation from 'hooks/usePageTranslation';
import Grey3Typography from '../../../../../../../../components/Typographies/Grey3Typography';
import { MainTextField } from '../../../../../../../../components/Inputs/MainInput';

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
  inputData?: IInput;
  onChange?: (e) => void;
  required?: boolean
}

const OneInput: React.FC<IProps> = (props) => {
  const classes = useStyles();
  const {
    title,
    label,
    inputData,
    onChange,
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
      <Box mt={4} className={classes.textFieldBox}>
        <MainTextField
          error={!!errorMessage.length}
          helperText={errorMessage.length ? t(errorMessage) : ''}
          placeholder={label}
          fullWidth
          value={value}
          onChange={onChange}
          variant="outlined"
          className={classes.textField}
          inputProps={{
            className: classes.input,
          }}
          InputLabelProps={{
            className: classes.label,
          }}
        />
      </Box>
    </Box>
  );
};

export default OneInput;
