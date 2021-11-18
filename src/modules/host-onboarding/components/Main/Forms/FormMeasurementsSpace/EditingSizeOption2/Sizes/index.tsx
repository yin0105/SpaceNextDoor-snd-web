import React from 'react';
import {
  Box,
  makeStyles,
} from '@material-ui/core';
import FormLayout from '../../../../../../../../layouts/FormLayout';
import OneSize from './OneSize';
import usePageTranslation from '../../../../../../../../hooks/usePageTranslation';

const useStyles = makeStyles((theme) => ({
  mainBox: {
    maxWidth: '630px',
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      padding: '0',
      marginBottom: '30px',
    },
  },
  formLayout: {
    paddingRight: '330px',
    [theme.breakpoints.down('sm')]: {
      paddingRight: '0',
    },
  },
  formBox: {
    marginTop: '42px',
  },
  unitBox: {
    position: 'absolute',
    right: '60px',
    top: 'calc(50% - 12px)',
    zIndex: 2,
  },
  unitText: {
    fontWeight: 700,
    fontSize: '1.55rem',
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

interface IProps {
  sizeUnit: string;
  width: string;
  depth: string;
  height: string;
  setSizeUnit: (sizeUnit: string) => void;
  setWidth: (width: string) => void;
  setDepth: (depth: string) => void;
  setHeight: (height: string) => void;
}

const Sizes: React.FC<IProps> = (props) => {
  const classes = useStyles();
  const {
    sizeUnit,
    width,
    depth,
    height,
    setSizeUnit,
    setWidth,
    setDepth,
    setHeight,
  } = props;

  const { t } = usePageTranslation('hostOnBoarding', 'EditingSizes');

  const handleChangeSizeUnitSelect = (e) => {
    setSizeUnit(e.target.value);
  };
  const handleInputChange = (callback) => (e) => {
    const { value } = e.target;
    const validInp = /^[0-9]*\.?[0-9]*$/;
    if (value !== '' && !validInp.test(value)) {
      return false;
    }
    if (value.split('.')[1] && value.split('.')[1].length > 2) {
      return false;
    }
    return callback(value);
  };
  return (
    <Box className={classes.mainBox}>
      <FormLayout className={classes.formLayout}>
        <OneSize
          propertyName={t('propertyName1')}
          propertyValue={width}
          handleChangeProperty={handleInputChange(setWidth)}
          sizeUnit={sizeUnit}
          handleChangeSizeUnit={handleChangeSizeUnitSelect}
        />
        <OneSize
          propertyName={t('propertyName2')}
          propertyValue={depth}
          handleChangeProperty={handleInputChange(setDepth)}
          sizeUnit={sizeUnit}
          handleChangeSizeUnit={handleChangeSizeUnitSelect}
        />
        <OneSize
          propertyName={t('propertyName3')}
          propertyValue={height}
          handleChangeProperty={handleInputChange(setHeight)}
          sizeUnit={sizeUnit}
          handleChangeSizeUnit={handleChangeSizeUnitSelect}
        />
      </FormLayout>
    </Box>
  );
};

export default Sizes;
