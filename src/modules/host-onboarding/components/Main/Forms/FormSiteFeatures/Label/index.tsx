import {
  makeStyles, FormControlLabel,
} from '@material-ui/core';
import FeatureCheckbox from '../CheckBox';

const useStyles = makeStyles((theme) => ({
  label: {
    fontWeight: 700,
    fontSize: '12px',
    color: '#888888',
  },
}));
interface IProps {
  label: string;
  value: number;
  checked: boolean;
  onChange: (event) => void;
}
const FeatureLabel: React.FC<IProps> = (props) => {
  const {
    label, value, onChange, checked,
  } = props;
  const classes = useStyles();
  return (
    <FormControlLabel
      control={(
        <FeatureCheckbox checked={checked} value={value} onChange={onChange} />
        )}
      label={label}
      classes={classes}
    />
  );
};
export default FeatureLabel;
