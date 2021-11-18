import React from 'react';
import {
  Box,
  makeStyles,
  Typography,
} from '@material-ui/core';
import Grey3Typography from '../../../../../../../components/Typographies/Grey3Typography';
import MainInput from '../../../../../../../components/Inputs/MainInput';
import FormLayout from '../../../../../../../layouts/FormLayout';
import usePageTranslation from '../../../../../../../hooks/usePageTranslation';

const useStyles = makeStyles((theme) => ({
  mainBox: {
    maxWidth: '630px',
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      padding: '0',
    },
  },
  formLayout: {
    display: 'flex',
    alignItems: 'center',
    margin: '20px 0 15px',
    paddingRight: '440px',
    '&>div:last-child': {
      marginLeft: '14px',
    },
    [theme.breakpoints.down('sm')]: {
      paddingRight: '0',
    },
  },
  input: {
    color: theme.palette.primary.main,
    paddingLeft: '15px',
  },
  formBox: {
    marginTop: '42px',
  },
  unit: {
    color: '#828282',
  },
}));

interface IProps {
  unit: string;
  price: string;
  setUnit: (unit: string) => void;
  setPrice: (price: string) => void;
}

const Inputs: React.FC<IProps> = (props) => {
  const classes = useStyles();
  const {
    unit,
    price,
    setUnit,
    setPrice,
  } = props;

  const { t } = usePageTranslation('hostOnBoarding', 'Inputs');

  const handleChangeUnitInput = (e) => {
    setUnit(e.target.value);
  };
  const handleChangePriceInput = (e) => {
    setPrice(e.target.value);
  };

  return (
    <Box className={classes.mainBox}>
      <Box>
        <Box>
          <Grey3Typography variant="h3">
            {t('grey3Typography1')}
          </Grey3Typography>
        </Box>
        <FormLayout className={classes.formLayout}>
          <Box>
            <MainInput
              fullWidth
              inputProps={{ className: classes.input }}
              value={unit}
              onChange={handleChangeUnitInput}
            />
          </Box>
          <Box>
            <Typography className={classes.unit} variant="h3">
              {t('typography')}
            </Typography>
          </Box>
        </FormLayout>
      </Box>
      <Box>
        <Box>
          <Grey3Typography variant="h3">
            {t('grey3Typography2')}
          </Grey3Typography>
        </Box>
        <FormLayout className={classes.formLayout}>
          <Box>
            <MainInput
              fullWidth
              inputProps={{ className: classes.input }}
              value={price}
              onChange={handleChangePriceInput}
            />
          </Box>
          <Box>
            <Typography className={classes.unit} variant="h3">
              $
            </Typography>
          </Box>
        </FormLayout>
      </Box>
    </Box>
  );
};

export default Inputs;
