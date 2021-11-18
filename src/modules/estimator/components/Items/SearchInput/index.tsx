import {
  Box,
  InputAdornment,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { inject, observer } from 'mobx-react';

import { MainTextField } from '../../../../../components/Inputs/MainInput';
import Image from '../../../../../components/Image';
import usePageTranslation from '../../../../../hooks/usePageTranslation';
import EstimatorStore, { ESTIMATOR_STORE } from '../../../stores/EstimatorStore';

interface IProps {
  [ESTIMATOR_STORE]?: EstimatorStore
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '25px',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
      maxWidth: '814px',
      marginBottom: '40px',
    },
  },
  textField: {
    '& .MuiOutlinedInput-root': {
      backgroundColor: theme.palette.grey[50],
      border: 'none',
    },
    '& fieldset': {
      border: 'none',
    },
    '& .MuiOutlinedInput-adornedStart': {
      paddingLeft: 24,
      [theme.breakpoints.down('sm')]: {
        backgroundColor: 'white',
        boxShadow:
          'rgb(0 0 0 / 10%) 0px 4px 6px -3px, rgb(0 0 0 / 5%) 0px 14px 14px 1px, rgb(0 0 0 / 5%) 0px 2px 18px 3px',
      },
    },
    '& input': {
      fontSize: '2rem',
      [theme.breakpoints.down('sm')]: {
        fontSize: '1.2rem',
      },
    },
  },
  inputAdornment: {
    padding: '16px 0 16px 0',
    marginRight: 27.43,
    [theme.breakpoints.down('sm')]: {
      marginRight: 15.67,
      '& img': {
        maxWidth: 13,
        maxHeight: 13,
      },
    },
  },
}));

const SearchInput: React.FC<IProps> = ({
  estimatorStore: { searchItems, filterStr },
}) => {
  const classes = useStyles();
  const { t } = usePageTranslation('estimator', 'SearchInput');

  return (
    <Box className={classes.container}>
      <Box width="100%">
        <MainTextField
          className={classes.textField}
          fullWidth
          placeholder={t('placeholder')}
          variant="outlined"
          value={filterStr}
          onChange={({ target: { value } }) => searchItems(value)}
          InputProps={{
            startAdornment: (
              <InputAdornment
                position="start"
                className={classes.inputAdornment}
              >
                <Image name="searchIcon" folder="Homepage" />
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Box>
  );
};

export default inject(ESTIMATOR_STORE)(observer(SearchInput));
