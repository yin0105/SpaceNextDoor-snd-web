import {
  makeStyles, ListItem,
} from '@material-ui/core';
import FeatureLabel from '../Label';
import PlacesLabel from '../../../../../../search/components/Forms/PlacesForm/Label';

const useStyles = makeStyles((theme) => ({
  label: {
    fontWeight: 700,
    fontSize: '12px',
    color: '#888888',
  },
  listItem: {
    paddingBottom: '0',
    paddingTop: '0',
    paddingRight: '0',
  },
}));

export enum CheckboxLabelTypes {
  FEATURE_LABEL,
  PLACES_LABEL,
}
interface IProps {
  label: string;
  value: number;
  checked: boolean;
  labelType?: CheckboxLabelTypes;
  onChange: (event) => void;
}

const CustomCheckbox: React.FC<IProps> = (props) => {
  const {
    label, value, onChange, checked, labelType,
  } = props;
  const classes = useStyles();
  return (
    <ListItem className={classes.listItem}>
      {labelType && CheckboxLabelTypes.PLACES_LABEL !== labelType
        ? <FeatureLabel label={label} checked={checked} value={value} onChange={onChange} />
        : <PlacesLabel label={label} checked={checked} value={value} onChange={onChange} />}
    </ListItem>
  );
};
export default CustomCheckbox;
