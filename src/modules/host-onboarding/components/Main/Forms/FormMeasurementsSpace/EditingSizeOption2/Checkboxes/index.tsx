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

const useStyles = makeStyles((theme) => ({
  mainBox: {
    maxWidth: '630px',
    display: 'flex',
    flexDirection: 'column',
    margin: '14px auto 0',
    [theme.breakpoints.down('sm')]: {
      padding: '0',
    },
  },
  list: {
    margin: '15px 0 0',
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

interface IProps {
  featuresCategories: IFeatureCategory[];
  checkedFeatures: number[];
  setCheckedFeatures: (number) => void;
}

const CustomCheckbox = ({ label, onChange, checked }) => {
  const classes = useStyles();
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
  const classes = useStyles();
  const { locale } = useRouter();
  const { featuresCategories, checkedFeatures, setCheckedFeatures } = props;
  const handleChangeCheckbox = (id) => () => {
    const feature = checkedFeatures.filter((idChecked) => idChecked === id)[0];
    return feature
      ? setCheckedFeatures(checkedFeatures.filter((idChecked) => idChecked !== id))
      : setCheckedFeatures([...checkedFeatures, id]);
  };
  const checked = (id) => !!checkedFeatures.filter((idChecked) => idChecked === id)[0];
  const { t } = usePageTranslation('hostOnBoarding', 'EditingCheckboxes');

  return (
    <Box className={classes.mainBox}>
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
