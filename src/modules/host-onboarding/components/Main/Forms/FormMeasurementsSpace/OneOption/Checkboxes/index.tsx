import React from 'react';
import {
  Box,
  FormControlLabel,
  List,
  ListItem,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { useRouter } from 'next/router';
import { getTranslatedName } from 'utilities/market';
import StyledCheckbox from '../../../../../../../../components/Checkbox';
import usePageTranslation from '../../../../../../../../hooks/usePageTranslation';

const useStyles = makeStyles(() => ({
  list: {
    margin: '15px 0 35px',
    padding: '0',
    display: 'flex',
    flexWrap: 'wrap',
  },
  controlLabel: {
    marginRight: '0',
  },
  textCheckbox: {
    color: '#888888',
    fontWeight: 700,
    fontSize: '12px',
  },
  listItem: {
    padding: '0',
    width: 'auto',
    marginRight: '30px',
  },
  formBox: {
    marginTop: '42px',
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
  id?: number
}

interface IProps {
  options: IOption[];
  setOptions: (options) => void;
  featuresCategories: IFeatureCategory[];
}

const CustomCheckbox = (props) => {
  const classes = useStyles();
  const { label, onChange, checked } = props;
  return (
    <ListItem className={classes.listItem}>
      <FormControlLabel
        className={classes.controlLabel}
        control={(
          <StyledCheckbox
            checked={checked}
            onChange={onChange}
          />
        )}
        label={<Typography className={classes.textCheckbox}>{label}</Typography>}
      />
    </ListItem>
  );
};

const Checkboxes: React.FC<IProps> = (props) => {
  const { locale } = useRouter();
  const classes = useStyles();
  const {
    featuresCategories,
    options,
    setOptions,
  } = props;
  const option = options[0];
  const { t } = usePageTranslation('hostOnBoarding', 'OneOptionCheckboxes');
  const handleChangeCheckbox = (id) => () => {
    const feature = option.checkedFeatures.filter((idChecked) => idChecked === id)[0];
    return feature
      ? setOptions([...options.map((item, i) => (
        i === 0
          ? {
            ...item,
            checkedFeatures: item.checkedFeatures.filter((idChecked) => idChecked !== id),
          }
          : item
      ))])
      : setOptions([...options.map((item, i) => (
        i === 0
          ? {
            ...item,
            checkedFeatures: [...item.checkedFeatures, id],
          }
          : item
      ))]);
  };
  const checked = (id) => !!option.checkedFeatures.filter((idChecked) => idChecked === id)[0];
  return (
    <Box>
      <Box>
        <Typography variant="h3">
          {t('typography')}
        </Typography>
      </Box>
      <Box>
        <List className={classes.list}>
          {featuresCategories.map((category) => category.features.map((feature) => (
            <CustomCheckbox
              key={feature.id}
              label={getTranslatedName(feature, 'name', locale)}
              onChange={handleChangeCheckbox(feature.id)}
              checked={checked(feature.id)}
            />
          )))}
        </List>
      </Box>
    </Box>
  );
};

export default Checkboxes;
