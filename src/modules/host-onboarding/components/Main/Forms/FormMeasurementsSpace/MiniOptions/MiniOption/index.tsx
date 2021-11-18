import React, { useState } from 'react';
import { Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Title from './Title';
import Size from './Size';
import Variant from './Variant';
import OptionButton from './Button';
import EditingSizeOption2 from '../../EditingSizeOption2';

const useStyles = makeStyles({
  root: {
    padding: '25px 20px 30px 5px',
    borderBottom: '1px solid #E9E9E9',
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
  status: string
  id?: number;
}

interface IProps {
  options: IOption[];
  index: number;
  features: IFeatureCategory[];
  deleteOption: () => void;
  setOptions: (options) => void;
}

const MiniOption: React.FC<IProps> = (props) => {
  const classes = useStyles();
  const {
    options,
    index,
    features,
    setOptions,
    deleteOption,
  } = props;
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const changeOpen = async () => {
    const body = document.body.style.overflow;
    document.body.style.overflow = body === 'hidden' ? 'unset' : 'hidden';
    setIsOpenEdit(!isOpenEdit);
  };
  const option = options[index];
  const size = parseFloat((Number(option.width) * Number(option.depth)).toString()).toFixed(2);
  return (
    <Box className={classes.root}>
      <EditingSizeOption2
        index={index}
        isOpen={isOpenEdit}
        options={options}
        changeOpen={changeOpen}
        setOptions={setOptions}
        features={features}
        spaceId={option.id}
      />
      <Grid container>
        <Grid item xs={5}>
          <Title title={option.name} index={index} />
        </Grid>
        <Grid item xs={3}>
          <Size sizeUnit={option.sizeUnit} size={size} />
        </Grid>
        <Grid item xs={3}>
          <Variant units={option.unit} />
        </Grid>
        <Grid item xs={1}>
          <OptionButton changeOpenEdit={changeOpen} deleteOption={deleteOption} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default MiniOption;
