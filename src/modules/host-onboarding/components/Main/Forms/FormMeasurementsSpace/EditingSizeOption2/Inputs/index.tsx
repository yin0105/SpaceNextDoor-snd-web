import React from 'react';
import {
  Box,
  makeStyles,
} from '@material-ui/core';

import OneInput from './OneInput';
import usePageTranslation from '../../../../../../../../hooks/usePageTranslation';
import { useCurrentCountry } from '../../../../../../../../utilities/market';

const useStyles = makeStyles((theme) => ({
  mainBox: {
    maxWidth: '630px',
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      padding: '0',
    },
  },
}));

interface IProps {
  unit: string;
  price: string;
  setUnit: (unit: string) => void;
  setPrice: (price: string) => void;
}

const Inputs: React.FC<IProps> = (props) => {
  const classes = useStyles();
  const {
    unit,
    price,
    setUnit,
    setPrice,
  } = props;

  const { t } = usePageTranslation('hostOnBoarding', 'EditingInputs');

  const handleChangeInput = (callback) => (e) => {
    const { value } = e.target;
    const validInp = /^[0-9]+$/;
    if (value !== '' && !validInp.test(value)) {
      return false;
    }
    return callback(value);
  };

  return (
    <Box className={classes.mainBox}>
      <OneInput
        propertyName={t('propertyName1')}
        propertyUnit={t('propertyUnit1')}
        propertyValue={unit}
        handleChangeProperty={handleChangeInput(setUnit)}
      />
      <OneInput
        propertyName={t('propertyName2')}
        propertyUnit={useCurrentCountry()?.currencySign}
        propertyValue={price}
        handleChangeProperty={handleChangeInput(setPrice)}
      />
    </Box>
  );
};

export default Inputs;
