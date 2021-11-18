import {
  fade, InputBase, Select, withStyles,
} from '@material-ui/core';
import React from 'react';

export const CustomSelect = withStyles(() => ({
  icon: {
    marginRight: '13px',
  },
}))(Select);

interface IProps {
  className: string;
}

export const IconComponent: React.FC<IProps> = ({ className }) => <img className={className} src="/images/SearchLocation/select.svg" alt="img" />;

export const SelectInput = withStyles((theme) => ({
  input: {
    borderRadius: 14,
    position: 'relative',
    backgroundColor: fade(theme.palette.grey[50], 0.2),
    border: `1px solid ${fade(theme.palette.grey[50], 0.2)}`,
    fontSize: 12,

    transition: theme.transitions.create(['border-color', 'box-shadow']),

    '&:focus': {
      borderRadius: 14,
      borderColor: '#80bdff',
      backgroundColor: theme.palette.background.paper,
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);
