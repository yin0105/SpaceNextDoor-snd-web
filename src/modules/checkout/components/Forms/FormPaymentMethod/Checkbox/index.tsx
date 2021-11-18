import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, FormControlLabel } from '@material-ui/core';
import StyledCheckbox from '../../../../../../components/Checkbox';
import usePageTranslation from '../../../../../../hooks/usePageTranslation';

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginRight: '0',
  },
  label: {
    color: '#333333',
    marginRight: '0',
    fontWeight: 400,
    fontSize: '1.2rem',
    lineHeight: '1.8rem',
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.6rem',
    },
  },
}));

const CustomCheckbox = ({ label }) => {
  const classes = useStyles();
  return (
    <FormControlLabel
      className={classes.formControl}
      classes={{
        label: classes.label,
      }}
      control={(
        <StyledCheckbox />
      )}
      label={label}
    />
  );
};

const Checkbox: React.FC = () => {
  const { t } = usePageTranslation('checkout', 'Checkbox');
  return (
    <Box mt={10} mb={12}>
      <CustomCheckbox label={t('label')} />
    </Box>
  );
};

export default Checkbox;
