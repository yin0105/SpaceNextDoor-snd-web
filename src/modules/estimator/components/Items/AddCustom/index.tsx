import React, { FC } from 'react';
import { Box, InputAdornment } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { MainTextField } from '../../../../../components/Inputs/MainInput';
import Image from '../../../../../components/Image';
import usePageTranslation from '../../../../../hooks/usePageTranslation';
import { ICategoryItem } from '../../../stores/EstimatorStore';

interface IProps {
  onClick: () => void,
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
    border: `1px solid ${theme.palette.grey[50]}`,
    borderRadius: '15px',
    [theme.breakpoints.up('sm')]: {
      width: 'calc(50% - 20px)',
      maxWidth: '814px',
    },
  },
  textField: {
    '& .MuiOutlinedInput-root': {
      border: 'none',
    },
    '& fieldset': {
      border: 'none',
    },
  },
  inputAdornment: {
    padding: '16px 5px 16px 0',
    cursor: 'pointer',
  },
  iconButton: {
    padding: '3px',
  },
}));

const AddCustom: FC<IProps> = ({ onClick }) => {
  const classes = useStyles();
  const { t } = usePageTranslation('estimator', 'AddCustom');
  return (
    <Box className={classes.container} onClick={onClick} id="openAddCustomItemForm">
      <Box width="100%">
        <MainTextField
          className={classes.textField}
          fullWidth
          placeholder={t('placeholder')}
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment
                position="start"
                className={classes.inputAdornment}
              >
                <Image name="plus" folder="Estimator" />
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Box>
  );
};

export default AddCustom;
