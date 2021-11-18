import React from 'react';
import { Box, makeStyles, Typography } from '@material-ui/core';
import Sizes from './Sizes';
import Inputs from './Inputs';
import Checkboxes from './Checkboxes';
import Grey3Typography from '../../../../../../../components/Typographies/Grey3Typography';
import usePageTranslation from '../../../../../../../hooks/usePageTranslation';

const useStyles = makeStyles(() => ({
  formBox: {
    marginTop: '18px',
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
  checkedFeatures: number[];
  id?: number;
}

interface IProps {
  options: IOption[];
  setOptions: (options) => void;
  features: IFeatureCategory[];
}

const OneOption: React.FC<IProps> = (props) => {
  const classes = useStyles();
  const {
    options,
    setOptions,
    features,
  } = props;
  const { t } = usePageTranslation('hostOnBoarding', 'OneOption');
  return (
    <>
      <Box>
        <Typography variant="h1">
          {t('typography')}
        </Typography>
      </Box>
      <Box>
        <Grey3Typography variant="body1" />
      </Box>
      <Box className={classes.formBox}>
        <Sizes
          options={options}
          setOptions={setOptions}
        />
        <Inputs
          options={options}
          setOptions={setOptions}
        />
        <Checkboxes
          options={options}
          setOptions={setOptions}
          featuresCategories={features}
        />
      </Box>
    </>
  );
};

export default OneOption;
