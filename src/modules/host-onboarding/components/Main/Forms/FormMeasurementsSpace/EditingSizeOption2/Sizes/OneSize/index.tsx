import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, MenuItem, Select } from '@material-ui/core';

import Grey3Typography from '../../../../../../../../../components/Typographies/Grey3Typography';
import { MainTextField } from '../../../../../../../../../components/Inputs/MainInput';
import { IconComponent, SelectInput } from '../../../../../../../../../components/Inputs/MainSelect';
import { SpaceSizeUnit } from '../../../../../../../../../typings/graphql.types';
import { useCurrentCountry } from '../../../../../../../../../utilities/market';

const useStyles = makeStyles((theme) => ({
  titleBox: {
    margin: '10px 0 5px',
  },
  inputBox: {
    position: 'relative',
  },
  input: {
    fontSize: '1.55rem',
    fontWeight: 600,
    color: theme.palette.primary.main,
  },
  select: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    maxWidth: '80px',
    backgroundColor: '#FFFFFF',
    padding: '10px 0',
    '& .MuiSelect-select.MuiSelect-select': {
      paddingRight: '40px',
      boxShadow: 'none',
      border: 'none',
    },
  },
  inputSelect: {
    display: 'flex',
    justifyContent: 'flex-end',
    fontWeight: 600,
    padding: '0 42px 0 12px',
    border: 'none',
    backgroundColor: 'transparent',
    '& :focus': {
      backgroundColor: 'transparent',
    },
  },
}));

interface IProps {
  propertyName: string;
  sizeUnit: string;
  propertyValue: string;
  handleChangeSizeUnit: (e) => void;
  handleChangeProperty: (e) => void;
}

const OneSize: React.FC<IProps> = (props) => {
  const classes = useStyles();
  const [error, setError] = useState('');
  const {
    propertyName,
    sizeUnit,
    propertyValue,
    handleChangeSizeUnit,
    handleChangeProperty,
  } = props;
  const handleChangeInput = (e) => {
    if (Number(e.target.value.split('.')[0]) > 1000 || Number(e.target.value) > 1000) {
      return setError('Your space looks too big, contact our customer service for support');
    }
    setError('');
    return handleChangeProperty(e);
  };

  const country = useCurrentCountry();

  return (
    <Box>
      <Box className={classes.titleBox}>
        <Grey3Typography variant="h3">
          {propertyName}
        </Grey3Typography>
      </Box>
      <Box className={classes.inputBox}>
        <MainTextField
          fullWidth
          InputProps={{
            className: classes.input,
          }}
          value={propertyValue}
          onChange={handleChangeInput}
          error={!!error.length}
          helperText={error.length ? error : ''}
          variant="outlined"
        />
        <Select
          labelId="demo"
          fullWidth
          className={classes.select}
          IconComponent={IconComponent}
          input={(
            <SelectInput
              classes={{
                input: classes.inputSelect,
              }}
            />
          )}
          value={sizeUnit}
          onChange={handleChangeSizeUnit}
        >
          <MenuItem value={country?.sizeUnit}>
            {country?.sizeUnit === SpaceSizeUnit.sqft ? 'ft' : 'm'}
          </MenuItem>
        </Select>
      </Box>
    </Box>
  );
};

export default OneSize;
