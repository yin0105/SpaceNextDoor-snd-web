import React, { useEffect, useState } from 'react';
import {
  Box,
  Divider,
  makeStyles,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import handleSubmit from '../../../../../../../utilities/handleSubmit';
import Sizes from './Sizes';
import Inputs from './Inputs';
import Checkboxes from './Checkboxes';
import PrimaryButton from '../../../../../../../components/Buttons/PrimaryButton';
import WhiteTypography from '../../../../../../../components/Typographies/WhiteTypography';
import { MainTextField } from '../../../../../../../components/Inputs/MainInput';
import usePageTranslation from '../../../../../../../hooks/usePageTranslation';
import { useCurrentCountry } from '../../../../../../../utilities/market';

const useStyles = makeStyles((theme) => ({
  mainBox: {
    position: 'fixed',
    top: '0px',
    left: '0px',
    width: '100vw',
    height: '100vh',
    zIndex: 100,
    display: 'flex',
    flexDirection: 'column',
    padding: '80px 0',
    overflowY: 'scroll',
    overflowX: 'hidden',
    [theme.breakpoints.down('sm')]: {
      padding: '0',
    },
  },
  backgroundBox: {
    position: 'fixed',
    top: '0px',
    left: '0px',
    width: '100vw',
    height: '100vh',
    opacity: 0.9,
    backgroundColor: '#2A2A2A',
  },
  hidden: {
    display: 'none',
  },
  containerBox: {
    zIndex: 99,
    maxWidth: '860px',
    margin: '0 auto',
    backgroundColor: '#F3F7F9',
    padding: '34px 42px 42px 55px',
    borderRadius: '15px',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100vw',
      width: '100vw',
      borderRadius: '0',
      padding: '20px 10px',
    },
  },
  formBox: {
    marginTop: '6px',
  },
  dividerTop: {
    margin: '24px 0 10px',
    [theme.breakpoints.down('sm')]: {
      margin: '15px 0 10px',
    },
  },
  layoutBox: {
    [theme.breakpoints.down('sm')]: {
      maxWidth: '630px',
      margin: '0 auto',
    },
  },
  input: {
    paddingLeft: '15px',
    fontWeight: 700,
  },
  dividerBottom: {
    margin: '36px 0 30px',
    [theme.breakpoints.down('sm')]: {
      margin: '15px 0 10px',
    },
  },
  buttonBox: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    maxWidth: '120px',
  },
  btnLoading: {
    position: 'absolute',
    left: '50px',
    top: '10px',
  },
  error: {
    textAlign: 'right',
    color: '#FF0000',
  },
}));

interface IFeature {
  id: number;
  name_en: string;
}

interface IFeatureCategory {
  features: IFeature[]
}

interface IOption {
  name: string;
  sizeUnit: string;
  width: string;
  depth: string
  height: string;
  unit: string;
  price: string;
  status: string;
  id?: number;
}

interface IProps {
  isOpen: boolean;
  options: IOption[];
  changeOpen: () => void;
  setOptions: (options) => void;
  features: IFeatureCategory[];
  index?: number;
  spaceId?: number;
  isLoading?: boolean;
  apiError?: string;
}

const EditingSizeOption2: React.FC<IProps> = (props) => {
  const classes = useStyles();
  const {
    isOpen,
    options,
    changeOpen,
    setOptions,
    features,
    index,
    spaceId,
    isLoading,
    apiError,
  } = props;
  const currentCountry = useCurrentCountry();
  const initialState = typeof index === 'number'
    ? { ...options[index] }
    : {
      id: undefined,
      name: '',
      sizeUnit: currentCountry.sizeUnit,
      width: '2.50',
      depth: '4.00',
      height: '1.00',
      unit: '1',
      price: '1',
      checkedFeatures: [],
    };

  const [name, setName] = useState(initialState.name);
  const [error, setError] = useState('');
  const [sizeUnit, setSizeUnit] = useState(initialState.sizeUnit);
  const [width, setWidth] = useState(initialState.width);
  const [depth, setDepth] = useState(initialState.depth);
  const [height, setHeight] = useState(initialState.height);
  const [unit, setUnit] = useState(initialState.unit);
  const [price, setPrice] = useState(initialState.price);
  const [checkedFeatures, setCheckedFeatures] = useState(initialState.checkedFeatures);
  const { t } = usePageTranslation('hostOnBoarding', 'EditingSizeOption2');

  useEffect(() => {
    setName(initialState.name);
    setSizeUnit(initialState.sizeUnit);
    setWidth(initialState.width);
    setDepth(initialState.depth);
    setHeight(initialState.height);
    setUnit(initialState.unit);
    setPrice(initialState.price);
    setCheckedFeatures(initialState.checkedFeatures);
  }, [initialState?.id]);

  const handleChangeNameInput = (e) => {
    setError('');
    setName(e.target.value);
  };

  const handleSaveOption = () => {
    if (name === '') {
      return setError(t('error'));
    }
    changeOpen();

    return typeof index === 'number'
      ? setOptions([...options.map((item, i) => (
        index === i
          ? {
            id: item.id,
            status: item.status,
            name,
            sizeUnit,
            width,
            depth,
            height,
            unit,
            price,
            checkedFeatures,
            size: Number(width) * Number(height) * Number(depth),
          }
          : item
      ))])
      : setOptions([...options, {
        name,
        sizeUnit,
        width,
        depth,
        height,
        unit,
        price,
        checkedFeatures,
        size: Number(width) * Number(height) * Number(depth),
      }]);
  };
  return (
    <Box className={isOpen ? classes.mainBox : classes.hidden}>
      <Box
        className={isOpen ? classes.backgroundBox : classes.hidden}
        onClick={() => !spaceId && changeOpen()}
      />
      <Box className={classes.containerBox}>
        <Box className={classes.layoutBox}>
          <Typography variant="h1">
            {t('typography')}
          </Typography>
        </Box>
        <Box className={classes.formBox}>
          <form onSubmit={handleSubmit(handleSaveOption, '')}>
            <Box className={classes.layoutBox}>
              <MainTextField
                variant="outlined"
                fullWidth
                placeholder={t('placeholder')}
                inputProps={{ className: classes.input }}
                value={name}
                onChange={handleChangeNameInput}
                error={!!error.length}
                helperText={error.length ? error : ''}
              />
            </Box>
            <Divider className={classes.dividerTop} />
            <Sizes
              sizeUnit={sizeUnit}
              width={width}
              height={height}
              depth={depth}
              setSizeUnit={setSizeUnit}
              setWidth={setWidth}
              setHeight={setHeight}
              setDepth={setDepth}
            />
            <Inputs
              unit={unit}
              price={price}
              setUnit={setUnit}
              setPrice={setPrice}
            />
            <Checkboxes
              featuresCategories={features}
              checkedFeatures={checkedFeatures}
              setCheckedFeatures={setCheckedFeatures}
            />
            <Divider className={classes.dividerBottom} />
            <Box className={classes.buttonBox}>
              <PrimaryButton type="submit" className={classes.button}>
                <WhiteTypography>
                  {t('whiteTypography')}
                  {!!isLoading && (
                    <CircularProgress color="inherit" className={classes.btnLoading} />
                  )}
                </WhiteTypography>
              </PrimaryButton>
            </Box>
          </form>
          {apiError && <span className={classes.error}>{apiError}</span>}
        </Box>
      </Box>
    </Box>
  );
};

export default EditingSizeOption2;
