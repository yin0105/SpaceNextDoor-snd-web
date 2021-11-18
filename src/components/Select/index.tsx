import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  MenuItem,
  Select,
  InputBase,
} from '@material-ui/core';
import Image from '../Image';
import usePageTranslation from '../../hooks/usePageTranslation';

const BootstrapInput = withStyles(() => ({
  root: {
    margin: '20px auto',
    border: '1px solid #E9E9E9',
    borderRadius: '12px',
    '& > img': {
      position: 'absolute',
      right: '15px',
      pointerEvents: 'none',
    },
  },
  input: {
    color: '#989898',
    fontSize: '12px',
    padding: '12px 30px',

    '&.MuiSelect-select.MuiSelect-select': {
      paddingRight: '60px',
    },
    '&:focus': {
      background: 'transparent',
    },
  },
}))(InputBase);

const useStyles = makeStyles({
  root: {
    backgroundColor: '',
  },
  select: {
    '& .MuiMenu-paper': {
      marginTop: '11px',
      borderRadius: '12px',
      boxShadow: 'none',
      border: '2px solid #E9E9E9',
    },
    '& .MuiMenuItem-root': {
      padding: '15px 20px',
    },
  },
});

const SelectComponent: any = ({
  value,
  handleChange,
  tabs,
}) => {
  const classes = useStyles();
  const { t } = usePageTranslation('hostReservation', 'ComponentsSelect');
  const translationTabs: string[] = [t('all'), t('confirmed'), t('completed'), t('cancelled')];

  return (
    <>
      <Select
        value={value}
        fullWidth
        onChange={(e) => handleChange(e, e.target.value)}
        input={<BootstrapInput />}
        className={classes.select}
        IconComponent={() => <Image name="arrow-down" folder="Host" />}
        MenuProps={{
          className: classes.select,
          getContentAnchorEl: null,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        }}
      >
        {tabs?.map((e:any, i:number) => (
          <MenuItem key={i} value={e}>{translationTabs[i]}</MenuItem>
        ))}
      </Select>
    </>
  );
};

export default SelectComponent;
