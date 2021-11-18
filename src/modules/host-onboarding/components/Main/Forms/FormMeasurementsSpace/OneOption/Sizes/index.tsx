import React from 'react';
import {
  Box, Divider,
  makeStyles,
  Typography,
} from '@material-ui/core';
import Grey3Typography from '../../../../../../../../components/Typographies/Grey3Typography';
import PrimaryTypography from '../../../../../../../../components/Typographies/PrimaryTypography';
import FormLayout from '../../../../../../../../layouts/FormLayout';
import OneSize from './OneSize';
import usePageTranslation from '../../../../../../../../hooks/usePageTranslation';
import { SpaceSizeUnit } from '../../../../../../../../typings/graphql.types';

const useStyles = makeStyles((theme) => ({
  mainBox: {
    margin: '0 auto 50px',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '30px',
    },
  },
  formLayout: {
    paddingRight: '330px',
    [theme.breakpoints.down('sm')]: {
      paddingRight: '0',
    },
  },
  totalAreaBox: {
    marginTop: '20px',
  },
  totalBox: {
    display: 'flex',
    marginTop: '10px',
    '&>h4:last-child': {
      marginLeft: '5px',
    },
  },
  divider: {
    margin: '15px 0 20px',
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

const Sizes: React.FC<IProps> = (props) => {
  const classes = useStyles();
  const {
    options,
    setOptions,
  } = props;
  const { t } = usePageTranslation('hostOnBoarding', 'OneOptionSizes');
  const option = options[0];
  const total = Number(option.width) * Number(option.depth);
  const handleChangeSizeUnitSelect = (e) => {
    setOptions([...options.map((item, i) => (
      i === 0
        ? { ...item, sizeUnit: e.target.value }
        : item
    ))]);
  };
  const handleInputChange = (property) => (e) => {
    const { value } = e.target;
    const validInp = /^[0-9]*\.?[0-9]*$/;
    if (value !== '' && !validInp.test(value)) {
      return false;
    }
    if (value.split('.')[1] && value.split('.')[1].length > 2) {
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
  return (
    <Box className={classes.mainBox}>
      <FormLayout className={classes.formLayout}>
        <OneSize
          propertyName={t('propertyName1')}
          propertyValue={option.width}
          handleChangeProperty={handleInputChange('width')}
          sizeUnit={option.sizeUnit}
          handleChangeSizeUnit={handleChangeSizeUnitSelect}
        />
        <OneSize
          propertyName={t('propertyName2')}
          propertyValue={option.depth}
          handleChangeProperty={handleInputChange('depth')}
          sizeUnit={option.sizeUnit}
          handleChangeSizeUnit={handleChangeSizeUnitSelect}
        />
        <OneSize
          propertyName={t('propertyName3')}
          propertyValue={option.height}
          handleChangeProperty={handleInputChange('height')}
          sizeUnit={option.sizeUnit}
          handleChangeSizeUnit={handleChangeSizeUnitSelect}
        />
        <Divider className={classes.divider} />
        <Box className={classes.totalAreaBox}>
          <Box>
            <Grey3Typography variant="h3">
              {t('grey3Typography')}
            </Grey3Typography>
          </Box>
          <Box className={classes.totalBox}>
            <PrimaryTypography variant="h4">
              {total}
            </PrimaryTypography>
            <Typography variant="h4">
              {option.sizeUnit === SpaceSizeUnit.sqft ? 'ft' : 'm'}
              ²
            </Typography>
          </Box>
        </Box>
      </FormLayout>
    </Box>
  );
};

export default Sizes;
