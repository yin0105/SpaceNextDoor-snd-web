import {
  makeStyles, FormControlLabel, Typography,
} from '@material-ui/core';
import PlacesCheckbox from '../Checkbox';

const useStyles = makeStyles((theme) => ({
  label: {
    fontWeight: 'normal',
    fontSize: '12px',
    color: '#070707',
  },
  allPlaces: {
    fontWeight: 700,
    fontSize: '12px',
  },
}));
interface IProps {
  label: string;
  value: number;
  checked: boolean;
  onChange: (event) => void;
}
const PlacesLabel: React.FC<IProps> = (props) => {
  const {
    label, value, onChange, checked,
  } = props;
  const classes = useStyles();
  return (

    <FormControlLabel
      control={(
        <PlacesCheckbox checked={checked} value={value} onChange={onChange} />
          )}
      label={(
        <Typography
          className={value === 0 ? classes.allPlaces : classes.label}
        >
          {label}
        </Typography>
    )}
    />

  );
};
export default PlacesLabel;
