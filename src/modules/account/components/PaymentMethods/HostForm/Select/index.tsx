import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  MenuItem,
  Select,
  InputBase,
} from '@material-ui/core';
import Image from '../../../../../../components/Image';
import usePageTranslation from '../../../../../../hooks/usePageTranslation';

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

interface IItem {
  label: string;
  value: any;
}

interface IProps {
  value?: string;
  handleChange?: (e: any) => void;
  items: IItem[]
}

const SelectComponent: any = ({
  value,
  handleChange,
  items,
}) => {
  const classes = useStyles();
  const { t } = usePageTranslation('hostAccount', 'Select');
  return (
    <>
      <Select
        value={value}
        fullWidth
        placeholder={t('placeholder')}
        onChange={(e) => {
          if (handleChange) {
            handleChange(e);
          }
        }}
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
        {items?.map((item: IItem, i: number) => (
          <MenuItem key={i} value={item.value}>{item.label}</MenuItem>
        ))}
        {
          !items.length && <MenuItem disabled>{t('menuItem')}</MenuItem>
        }
      </Select>
    </>
  );
};

export default SelectComponent;
