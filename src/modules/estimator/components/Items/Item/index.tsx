import React, { FC } from 'react';
import { Box, Typography, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import { getTranslatedName } from 'utilities/market';
import { ICategoryItem } from '../../../stores/EstimatorStore';

interface IProps {
  item: ICategoryItem,
  selectItem: (itemId: number, count: number) => void,
}

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: '34px',
    padding: '0 26px',
    [theme.breakpoints.up('sm')]: {
      padding: 0,
    },
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    '&:not(:last-of-type)': {
      marginBottom: '10px',
    },
    [theme.breakpoints.up('sm')]: {
      marginBottom: '10px',
    },
  },
  count: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: `1px solid ${theme.palette.grey[50]}`,
    width: '55px',
    height: '50px',
    borderRadius: '12px',
    marginRight: '10px',
    fontSize: '15px',
  },
  info: {
    fontSize: '1.6rem',
    lineHeight: '20px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.2rem',
    },
  },
  active: {
    borderColor: '#00A0E3',
    color: '#00A0E3',
    '& input': {
      color: '#00A0E3',
    },
  },
  title: {
    fontWeight: 500,
    fontSize: 'inherit',
  },
  size: {
    color: theme.palette.grey[100],
    fontSize: '1.4rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: 'inherit',
    },
  },
  counterField: {
    '& .MuiOutlinedInput-input': {
      padding: '18.5px 2px 18.5px 16px',
      fontSize: 15.47,
      textAlign: 'center',
      [theme.breakpoints.down('sm')]: {
        padding: '18.5px 10px',
      },
    },
    '& .MuiOutlinedInput-root': {
      fontSize: '1.55rem',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
  },
}));

const Item: FC<IProps> = ({
  item,
  selectItem,
}) => {
  const classes = useStyles();
  const {
    count, width, height, dimension, id,
  } = item;
  const { locale } = useRouter();
  const counterHandler = (e) => {
    let value = +e.target.value;
    if (value >= 100) {
      value = 99;
    }
    selectItem(id, value);
    e.target.value = value.toString();
  };

  return (
    <Box className={classes.item}>
      <Box className={`${classes.count} ${count ? classes.active : ''}`}>
        <TextField
          className={classes.counterField}
          value={count}
          type="number"
          onChange={counterHandler}
          fullWidth
          variant="outlined"
        />
      </Box>
      <Box className={classes.info}>
        <Typography className={`${classes.title} ${count ? classes.active : ''}`}>
          {getTranslatedName(item, 'name', locale)}
        </Typography>
        <Typography className={classes.size}>
          W:
          {' '}
          {width}
          cm x H:
          {' '}
          {height}
          cm x D:
          {' '}
          {dimension}
          cm
        </Typography>
      </Box>
    </Box>
  );
};

export default Item;
