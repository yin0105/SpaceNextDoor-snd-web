import React, { FC, useState } from 'react';
import { Box, InputLabel, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import clsx from 'clsx';
import { MainTextField } from '../../../../../components/Inputs/MainInput';
import Checkbox from '../../../../../components/Checkbox';
import SecondaryButton from '../../../../../components/Buttons/SecondaryButton';
import usePageTranslation from '../../../../../hooks/usePageTranslation';
import { ICategoryItem } from '../../../stores/EstimatorStore';

interface IProps {
  onAdd: (item: ICategoryItem) => void;
  setAddingItem: (addingItem: boolean) => void;
}

const useStyles = makeStyles((theme) => ({
  container: {
    border: `1px solid ${theme.palette.grey[50]}`,
    borderRadius: '12px',
    padding: '25px 20px 35px',
    marginBottom: '10px',
    boxShadow: '0px 15px 40px rgba(51, 51, 51, 0.1)',
    position: 'absolute',
    top: '60px',
    width: '100%',
    height: 'fit-content',
    backgroundColor: '#FFFFFF',
    zIndex: 1,
    [theme.breakpoints.up('md')]: {
      width: 'fit-content',
      maxWidth: '420px',
      top: '65px',
    },
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '10px',
  },
  blockTitle: {
    fontWeight: 600,
    fontSize: '10px',
    color: '#484451',
    lineHeight: '20px',
    textTransform: 'uppercase',
  },
  name: {
    border: `1px solid ${theme.palette.grey[50]}`,
    borderRadius: '15px',
  },
  textField: {
    '& .MuiOutlinedInput-root': {
      border: 'none',
    },
    '& fieldset': {
      border: 'none',
    },
  },
  sizes: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridGap: '12px',
    margin: '20px 0',
    height: '90px',
    '&>.MuiBox-root>p': {
      textTransform: 'uppercase',
      marginBottom: '10px',
    },
    '& input': {
      border: `1px solid ${theme.palette.grey[50]}`,
      borderRadius: '15px',
      marginRight: '3px',
      textAlign: 'center',
    },
    '& .MuiBox-root .MuiBox-root': {
      display: 'flex',
      alignItems: 'center',
      color: theme.palette.grey[100],
    },
  },
  stackable: {
    '& .MuiCheckbox-root': {
      paddingLeft: 0,
    },
    '& label': {
      fontSize: '12px',
      color: theme.palette.grey[100],
      display: 'flex',
      alignItems: 'center',
    },
  },
  button: {
    textTransform: 'uppercase',
    textAlign: 'right',
    '& button': {
      fontSize: '13px',
      padding: '10px 20px',
      width: 'auto',
      borderRadius: '100px',
    },
  },
  close: {
    cursor: 'pointer',
    width: '20px',
    height: '20px',
  },
  error: {
    '& .MuiOutlinedInput-root': {
      color: 'red',
    },
  },
}));

const AddCustomForm: FC<IProps> = ({ onAdd, setAddingItem }) => {
  const [name, setName] = useState('');
  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);
  const [depth, setDepth] = useState(null);
  const [isStackable, setIsStackable] = useState(false);
  const [hasTriedAdding, setHasTriedAdding] = useState(false);
  const { t } = usePageTranslation('estimator', 'AddCustomForm');
  const classes = useStyles();

  const checkValidSubmission = () => {
    if (!hasTriedAdding) {
      setHasTriedAdding(true);
    }
    if (name && width > 0 && height > 0 && depth > 0) {
      return true;
    }
    return false;
  };

  const setValue = (newVal: string) => {
    const val = parseFloat(newVal);
    if (val > 0) return val;
    return 0;
  };

  const addItem = () => {
    onAdd({
      id: Date.now(),
      name_en: name,
      width,
      height,
      dimension: depth,
      count: 1,
      isStackable,
    });
  };
  const required = (
    <Typography
      style={{ marginLeft: '10px' }}
      variant="subtitle1"
      color="error"
    >
      *
      {t('required')}
    </Typography>
  );

  const isValid = (field: any) => ((!field && hasTriedAdding) ? 'error' : 'inherit');
  return (
    <Box className={classes.container}>
      <Box className={classes.header}>
        <Typography className={classes.blockTitle}>
          {t('typography1')}
        </Typography>
        <img
          src="https://static.spacenextdoor.com/icons/close.svg"
          alt=""
          className={classes.close}
          onClick={() => setAddingItem(false)}
        />
      </Box>
      <Box>
        <Box height={65}>
          <Box className={classes.name}>
            <MainTextField
              className={clsx(classes.textField,
                isValid(name) === 'error' && classes.error)}
              fullWidth
              placeholder={t('placeholder')}
              variant="outlined"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </Box>
          {isValid(name) === 'error' && required}
        </Box>
        <Box className={classes.sizes}>
          <Box>
            <Typography color={isValid(width)}>{t('typography2')}</Typography>
            <Box>
              <MainTextField
                className={classes.textField}
                fullWidth
                variant="outlined"
                placeholder="0"
                value={width}
                onChange={(event) => setWidth(setValue(event.target.value))}
                type="number"
              />
              <Typography>cm</Typography>
            </Box>
            {isValid(width) === 'error' && required}
          </Box>
          <Box>
            <Typography color={isValid(height)}>{t('typography3')}</Typography>
            <Box>
              <MainTextField
                className={classes.textField}
                fullWidth
                variant="outlined"
                placeholder="0"
                value={height}
                onChange={(event) => setHeight(setValue(event.target.value))}
                type="number"
              />
              <Typography>cm</Typography>
            </Box>
            {isValid(height) === 'error' && required}
          </Box>
          <Box>
            <Typography color={isValid(depth)}>{t('typography4')}</Typography>
            <Box>
              <MainTextField
                className={classes.textField}
                fullWidth
                variant="outlined"
                placeholder="0"
                value={depth}
                onChange={(event) => setDepth(setValue(event.target.value))}
                type="number"
              />
              <Typography>cm</Typography>
            </Box>
            {isValid(depth) === 'error' && required}
          </Box>
        </Box>
        <Box className={classes.stackable}>
          <InputLabel>
            <Checkbox
              value={isStackable}
              onChange={() => setIsStackable(!isStackable)}
            />
            {t('inputLabel')}
          </InputLabel>
        </Box>
      </Box>
      <Box className={classes.button}>
        <SecondaryButton
          onClick={() => {
            if (checkValidSubmission()) addItem();
          }}
        >
          {t('secondaryButton')}
        </SecondaryButton>
      </Box>
    </Box>
  );
};

export default AddCustomForm;
