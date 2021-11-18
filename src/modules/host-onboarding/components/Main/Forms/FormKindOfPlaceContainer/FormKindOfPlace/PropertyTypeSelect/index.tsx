import {
  Box, makeStyles, MenuItem, Typography,
} from '@material-ui/core';
import { useRouter } from 'next/router';
import React from 'react';

import { CustomSelect, IconComponent, SelectInput } from '../../../../../../../../components/Inputs/MainSelect';
import Grey2Typography from '../../../../../../../../components/Typographies/Grey2Typography';
import Grey3Typography from '../../../../../../../../components/Typographies/Grey3Typography';
import usePageTranslation from '../../../../../../../../hooks/usePageTranslation';
import { getTranslatedName } from '../../../../../../../../utilities/market';

const useStyles = makeStyles(() => ({
  descriptionBasementBox: {
    paddingTop: '8px',
  },
  selectBasementBox: {
    position: 'relative',
    marginTop: '13px',
  },
  textColor: {
    color: '#948EA2',
  },
  selectLabelBox: {
    position: 'absolute',
    display: 'block',
    top: '16px',
    left: '15px',
    zIndex: 1,
  },
  selectLabel: {
    fontSize: '1.5rem',
  },
  hidden: {
    display: 'none',
  },
  inputSelect: {
    padding: '17px 26px 13px 12px',
  },
}));

interface IPropertyType {
  id: number;
  name_en: string;
}

interface IProps {
  propertyType: string;
  setPropertyType: (e) => void;
  propertyTypes: IPropertyType[];
}

const PropertyTypeSelect: React.FC<IProps> = (props) => {
  const classes = useStyles();
  const router = useRouter();
  const { propertyType, setPropertyType, propertyTypes } = props;
  const { t } = usePageTranslation('hostOnBoarding', 'PropertyTypeSelect');
  return (
    <>
      <Box>
        <Grey3Typography variant="h3">
          {t('grey3Typography')}
        </Grey3Typography>
      </Box>

      <Box className={classes.descriptionBasementBox}>
        <Typography variant="body2" className={classes.textColor}>
          {t('typography')}
        </Typography>
      </Box>

      <Box className={classes.selectBasementBox}>
        <Box className={propertyType ? classes.hidden : classes.selectLabelBox}>
          <Grey2Typography className={classes.selectLabel}>
            {t('containerGrey2Typography')}
          </Grey2Typography>
        </Box>
        <CustomSelect
          labelId="demo"
          fullWidth
          IconComponent={IconComponent}
          input={<SelectInput classes={{ input: classes.inputSelect }} />}
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
        >
          <MenuItem value="">{t('containerMenuItem')}</MenuItem>
          {propertyTypes.map((oneType) => (
            <MenuItem key={oneType.id} value={oneType.id}>{getTranslatedName(oneType, 'name', router?.locale)}</MenuItem>
          ))}
        </CustomSelect>
      </Box>

    </>
  );
};

export default PropertyTypeSelect;
