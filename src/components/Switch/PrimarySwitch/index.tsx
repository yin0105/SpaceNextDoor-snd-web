import React from 'react';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import Switch, { SwitchClassKey, SwitchProps } from '@material-ui/core/Switch';

interface Styles extends Partial<Record<SwitchClassKey, string>> {
  focusVisible?: string;
}

interface Props extends SwitchProps {
  classes: Styles;
}

const PrimarySwitch = withStyles((theme: Theme) => createStyles(
  {
    root: {
      width: 40,
      height: 24,
      padding: 0,
      margin: theme.spacing(1),
    },
    switchBase: {
      padding: 1,
      '&$checked': {
        transform: 'translateX(17px)',
        color: theme.palette.common.white,
        '& + $track': {
          backgroundColor: theme.palette.primary.main,
          opacity: 1,
          border: 'none',
        },
      },
      '&$focusVisible $thumb': {
        color: theme.palette.primary.main,
        border: '6px solid #fff',
      },
    },
    thumb: {
      width: 21,
      height: 21,
      background: 'white',
    },
    track: {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.grey[50],
      opacity: 1,
      transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
  },
))((allProps: Props) => {
  const {
    classes,
    ...props
  } = allProps;
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

interface IProps {
  checked: boolean;
  disabled?: boolean;
  handleChange: () => void;
}

const CustomizedSwitches:React.FC<IProps> = (props: IProps) => {
  const { checked, handleChange, disabled } = props;
  return (
    <FormGroup>
      <PrimarySwitch checked={checked} disabled={disabled} onChange={handleChange} name="checked" />
    </FormGroup>
  );
};

export default CustomizedSwitches;
