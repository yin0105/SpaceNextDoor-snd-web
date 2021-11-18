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
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      padding: '0',
    },
  },
}));

interface IOption {
  name: string;
  sizeUnit: string;
  width: string;
  depth: string
  height: string;
  unit: string;
  price: string;
  checkedFeatures: number[];
  id?: number;
}

interface IProps {
  options: IOption[];
  setOptions: (options) => void;
}

const Inputs: React.FC<IProps> = (props) => {
  const classes = useStyles();
  const {
    options,
    setOptions,
  } = props;
  const option = options[0];
  const PRICE = 'price';

  const handleChangeInput = (property) => (e) => {
    const { value } = e.target;
    const validInp = /^[0-9]+$/;
    if (property !== PRICE && value !== '' && !validInp.test(value)) {
      return false;
    }
    return setOptions([...options.map((item, i) => (
      i === 0
        ? {
          ...item,
          [property]: value,
        }
        : item
    ))]);
  };
  const { t } = usePageTranslation('hostOnBoarding', 'EditingInputs');

  const country = useCurrentCountry();
  return (
    <Box className={classes.mainBox}>
      <OneInput
        propertyName={t('propertyName1')}
        propertyUnit={t('propertyUnit1')}
        propertyValue={option.unit}
        handleChangeProperty={handleChangeInput('unit')}
      />
      <OneInput
        propertyName={t('propertyName2')}
        propertyUnit={country?.currencySign}
        propertyValue={option.price}
        handleChangeProperty={handleChangeInput(PRICE)}
      />
    </Box>
  );
};

export default Inputs;
