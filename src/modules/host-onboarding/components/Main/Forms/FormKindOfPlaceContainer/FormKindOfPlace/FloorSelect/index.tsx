import {
  Box, makeStyles, MenuItem, Typography,
} from '@material-ui/core';
import React from 'react';
import {
  CustomSelect,
  IconComponent,
  SelectInput,
} from '../../../../../../../../components/Inputs/MainSelect';
import Grey2Typography from '../../../../../../../../components/Typographies/Grey2Typography';
import Grey3Typography from '../../../../../../../../components/Typographies/Grey3Typography';
import usePageTranslation from '../../../../../../../../hooks/usePageTranslation';

const useStyles = makeStyles(() => ({
  selectFloorHeaderBox: {
    paddingTop: '44px',
  },
  selectFloorBox: {
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
  descriptionFloorBox: {
    paddingTop: '7px',
  },
  textColor: {
    color: '#948EA2',
  },
}));

interface IProps {
  floor: string;
  setFloor: (e) => void
}

const FloorSelect: React.FC<IProps> = (props) => {
  const classes = useStyles();
  const {
    floor,
    setFloor,
  } = props;
  const floors = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const handleChangeFloorSelect = (e) => {
    setFloor(e.target.value);
  };
  const { t } = usePageTranslation('hostOnBoarding', 'FloorSelect');
  return (
    <>
      <Box className={classes.selectFloorHeaderBox}>
        <Grey3Typography variant="h3">
          {t('grey3Typography')}
        </Grey3Typography>
      </Box>

      <Box className={classes.selectFloorBox}>
        <Box className={floor ? classes.hidden : classes.selectLabelBox}>
          <Grey2Typography className={classes.selectLabel}>
            {t('grey2Typography')}
          </Grey2Typography>
        </Box>
        <CustomSelect
          labelId="demo"
          fullWidth
          IconComponent={IconComponent}
          input={<SelectInput classes={{ input: classes.inputSelect }} />}
          value={floor}
          onChange={handleChangeFloorSelect}
        >
          {floors.map((numb) => (
            <MenuItem key={numb} value={numb}>{numb}</MenuItem>
          ))}
        </CustomSelect>
      </Box>

      {/* <Box className={classes.descriptionFloorBox}>
        <Typography variant="body2" className={classes.textColor}>
          {t('containerTypography')}
        </Typography>
      </Box> */}
    </>
  );
};

export default FloorSelect;
