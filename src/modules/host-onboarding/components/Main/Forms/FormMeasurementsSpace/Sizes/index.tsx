import React, { useState } from 'react';
import {
  Box, Divider,
  makeStyles,
  MenuItem, Select,
  Typography,
} from '@material-ui/core';
import Grey3Typography from '../../../../../../../components/Typographies/Grey3Typography';
import {
  IconComponent,
  SelectInput,
} from '../../../../../../../components/Inputs/MainSelect';
import PrimaryTypography from '../../../../../../../components/Typographies/PrimaryTypography';
import FormLayout from '../../../../../../../layouts/FormLayout';
import { MainTextField } from '../../../../../../../components/Inputs/MainInput';
import usePageTranslation from '../../../../../../../hooks/usePageTranslation';

const useStyles = makeStyles((theme) => ({
  mainBox: {
    maxWidth: '630px',
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto 50px',
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
  selectBox: {
    position: 'relative',
    margin: '10px 0',
  },
  select: {
    position: 'absolute',
    top: '20px',
    right: '10px',
    maxWidth: '80px',
    paddingRight: '0',
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
  selectSelect: {
    paddingRight: '42px',
  },
  selectFocused: {
    backgroundColor: 'none',
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
  const { t } = usePageTranslation('hostOnBoarding', 'Sizes');
  const [total, setTotal] = useState(8);
  const handleChangeSizeUnitSelect = (e) => {
    setSizeUnit(e.target.value);
  };
  const handleChangeWidthInput = (e) => {
    setWidth(e.target.value);
    setTotal(Number(e.target.value) * Number(depth) * Number(height));
  };
  const handleChangeDepthInput = (e) => {
    setDepth(e.target.value);
    setTotal(Number(width) * Number(e.target.value) * Number(height));
  };
  const handleChangeHeightInput = (e) => {
    setHeight(e.target.value);
    setTotal(Number(width) * Number(depth) * Number(e.target.value));
  };
  return (
    <Box className={classes.mainBox}>
      <FormLayout className={classes.formLayout}>
        <Box>
          <Box>
            <Grey3Typography variant="h3">
              {t('grey3Typography1')}
            </Grey3Typography>
          </Box>
          <Box className={classes.selectBox}>
            <MainTextField
              fullWidth
              value={width}
              onChange={handleChangeWidthInput}
              variant="outlined"
            />
            <Select
              labelId="demo"
              fullWidth
              className={classes.select}
              IconComponent={IconComponent}
              classes={{
                select: classes.selectSelect,
              }}
              input={(
                <SelectInput
                  classes={{
                    input: classes.inputSelect,
                  }}
                />
              )}
              value={sizeUnit}
              onChange={handleChangeSizeUnitSelect}
            >
              <MenuItem value="m">m</MenuItem>
              <MenuItem value="ft">ft</MenuItem>
            </Select>
          </Box>
        </Box>
        <Box>
          <Box>
            <Grey3Typography variant="h3">
              {t('grey3Typography2')}
            </Grey3Typography>
          </Box>
          <Box className={classes.selectBox}>
            <MainTextField
              fullWidth
              value={depth}
              onChange={handleChangeDepthInput}
              variant="outlined"
            />
            <Select
              labelId="demo"
              fullWidth
              className={classes.select}
              IconComponent={IconComponent}
              classes={{
                select: classes.selectSelect,
              }}
              input={(
                <SelectInput
                  classes={{
                    input: classes.inputSelect,
                  }}
                />
              )}
              value={sizeUnit}
              onChange={handleChangeSizeUnitSelect}
            >
              <MenuItem value="m">m</MenuItem>
              <MenuItem value="ft">ft</MenuItem>
            </Select>
          </Box>
        </Box>
        <Box>
          <Box>
            <Grey3Typography variant="h3">
              {t('grey3Typography3')}
            </Grey3Typography>
          </Box>
          <Box className={classes.selectBox}>
            <MainTextField
              fullWidth
              value={height}
              onChange={handleChangeHeightInput}
              variant="outlined"
            />
            <Select
              labelId="demo"
              fullWidth
              className={classes.select}
              IconComponent={IconComponent}
              classes={{
                select: classes.selectSelect,
              }}
              input={(
                <SelectInput
                  classes={{
                    input: classes.inputSelect,
                  }}
                />
              )}
              value={sizeUnit}
              onChange={handleChangeSizeUnitSelect}
            >
              <MenuItem value="m">m</MenuItem>
              <MenuItem value="ft">ft</MenuItem>
            </Select>
          </Box>
        </Box>
        <Divider />
        <Box className={classes.totalAreaBox}>
          <Box>
            <Grey3Typography variant="h3">
              {t('grey3Typography4')}
            </Grey3Typography>
          </Box>
          <Box className={classes.totalBox}>
            <PrimaryTypography variant="h4">{total}</PrimaryTypography>
            <Typography variant="h4">
              {sizeUnit}
              ²
            </Typography>
          </Box>
        </Box>
      </FormLayout>
    </Box>
  );
};

export default Sizes;
