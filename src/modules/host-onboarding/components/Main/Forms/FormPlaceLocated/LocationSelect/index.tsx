import { Box, makeStyles, MenuItem } from '@material-ui/core';
import { useRouter } from 'next/router';
import React from 'react';

import Grey2Typography from '../../../../../../../components/Typographies/Grey2Typography';
import { CustomSelect, IconComponent, SelectInput } from '../../../../../../../components/Inputs/MainSelect';
import { getTranslatedName } from '../../../../../../../utilities/market';

const useStyles = makeStyles({
  selectLocationBox: {
    position: 'relative',
    marginTop: '16px',
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
  error: {
    borderColor: '#E53535',
  },
});

interface Location {
  id: number;
  name_en: string;
  name_th: string;
  name_kr: string;
  name_jp: string;
}
interface IProps {
  label: string,
  locations: Location[],
  location: string;
  setLocation: (e) => void;
  isError?: boolean;
}

const LocationSelect: React.FC<IProps> = (props:IProps) => {
  const classes = useStyles();
  const router = useRouter();
  const {
    location, setLocation, locations, label, isError,
  } = props;

  const handleChangeLocationSelect = (e) => {
    setLocation(e.target.value);
  };

  return (
    <Box className={classes.selectLocationBox}>
      <Box className={location ? classes.hidden : classes.selectLabelBox}>
        <Grey2Typography className={classes.selectLabel}>
          {label}
        </Grey2Typography>
      </Box>
      <CustomSelect
        labelId="demo"
        fullWidth
        IconComponent={IconComponent}
        input={<SelectInput classes={{ input: `${classes.inputSelect} ${isError ? classes.error : ''}` }} />}
        value={location}
        onChange={handleChangeLocationSelect}
      >
        <MenuItem value="">{label}</MenuItem>
        {locations.map((loc) => <MenuItem key={loc.id} value={loc.id}>{getTranslatedName(loc, 'name', router?.locale)}</MenuItem>)}
      </CustomSelect>
    </Box>

  );
};

LocationSelect.defaultProps = {
  isError: null,
};

export default LocationSelect;
