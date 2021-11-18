import React from 'react';
import {
  Box,
  makeStyles,
  Typography,
} from '@material-ui/core';
import Grey3Typography from '../../../../../../../../../components/Typographies/Grey3Typography';
import MainInput from '../../../../../../../../../components/Inputs/MainInput';
import FormLayout from '../../../../../../../../../layouts/FormLayout';

const useStyles = makeStyles((theme) => ({
  titleBox: {
    margin: '24px 0 10px',
  },
  formLayout: {
    display: 'flex',
    alignItems: 'center',
    '&>div:last-child': {
      marginLeft: '14px',
    },
    [theme.breakpoints.down('sm')]: {
      paddingRight: '0',
    },
  },
  inputBox: {
    maxWidth: '135px',
  },
  input: {
    color: theme.palette.primary.main,
    paddingLeft: '15px',
  },
  unit: {
    color: '#828282',
  },
}));

interface IProps {
  propertyName: string;
  propertyUnit: string;
  propertyValue: string;
  handleChangeProperty: (propertyValue) => void;
}

const OneInput: React.FC<IProps> = (props) => {
  const classes = useStyles();
  const {
    propertyName,
    propertyUnit,
    propertyValue,
    handleChangeProperty,
  } = props;

  return (
    <Box>
      <Box className={classes.titleBox}>
        <Grey3Typography variant="h3">
          {propertyName}
        </Grey3Typography>
      </Box>
      <FormLayout className={classes.formLayout}>
        <Box className={classes.inputBox}>
          <MainInput
            fullWidth
            inputProps={{ className: classes.input }}
            value={propertyValue}
            onChange={handleChangeProperty}
          />
        </Box>
        <Box>
          <Typography className={classes.unit} variant="h3">
            {propertyUnit}
          </Typography>
        </Box>
      </FormLayout>
    </Box>
  );
};

export default OneInput;
