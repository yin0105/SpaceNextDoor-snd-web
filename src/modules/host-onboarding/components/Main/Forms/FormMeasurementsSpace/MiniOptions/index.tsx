import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import MiniOption from './MiniOption';
import Grey3Typography from '../../../../../../../components/Typographies/Grey3Typography';
import usePageTranslation from '../../../../../../../hooks/usePageTranslation';

const useStyles = makeStyles({
  root: {
    marginBottom: '50px',
  },
});

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
  status: string;
}

interface IProps {
  options: IOption[];
  features: IFeatureCategory[];
  setOptions: (options) => void;
}

const MiniOptions: React.FC<IProps> = (props) => {
  const classes = useStyles();
  const {
    options,
    features,
    setOptions,
  } = props;
  const { t } = usePageTranslation('hostOnBoarding', 'MiniOptions');
  const deleteOption = (index) => () => {
    // setOptions([...options.filter((item, i) => (
    //   i !== index
    // ))]);
  };
  return (
    <>
      <Box mb={5}>
        <Typography variant="h1">
          {t('typography')}
        </Typography>
      </Box>
      <Box mb={12}>
        <Grey3Typography variant="body1">
          {t('grey3Typography')}
        </Grey3Typography>
      </Box>
      <Box className={classes.root}>
        {options.map((item, i) => (
          <MiniOption
            key={`${i}-${item.name}`}
            index={i}
            options={options}
            features={features}
            setOptions={setOptions}
            deleteOption={deleteOption(i)}
          />
        ))}
      </Box>
    </>
  );
};

export default MiniOptions;
