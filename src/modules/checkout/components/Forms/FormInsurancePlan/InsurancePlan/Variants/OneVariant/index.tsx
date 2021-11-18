import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Box } from '@material-ui/core';
import StyledRadio from '../../../../RadioButton';
import Grey3Typography from '../../../../../../../../components/Typographies/Grey3Typography';
import Grey2Typography from '../../../../../../../../components/Typographies/Grey2Typography';
import PrimaryTypography from '../../../../../../../../components/Typographies/PrimaryTypography';
import usePageTranslation from '../../../../../../../../hooks/usePageTranslation';
import formatterMoney from '../../../../../../../../utilities/formatterMoney';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: '130px',
    minHeight: '130px',
    padding: '7px 7px 14px 16px',
    borderRadius: '10px',
    boxShadow: '0px 15px 40px rgba(51, 51, 51, 0.1)',
    backgroundColor: '#FFFFFF',
    cursor: 'pointer',
    [theme.breakpoints.up('sm')]: {
      minWidth: '168px',
      minHeight: '168px',
    },
  },
  checked: {
    border: `1px solid ${theme.palette.primary.main}`,
  },
  noChecked: {
    border: '1px solid #FFFFFF',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  headerText: {
    fontWeight: 600,
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.4rem',
    },
    height: '30px',
  },
  costsBox: {
    position: 'relative',
    paddingTop: '14px',
  },
  mostPopularBox: {
    position: 'absolute',
    top: '-3px',
    [theme.breakpoints.down('xs')]: {
      top: '-5px',
    },
  },
  costText: {
    [theme.breakpoints.up('sm')]: {
      fontSize: '2.2rem',
      lineHeight: '3rem',
    },
  },
  weekCostBox: {
    display: 'flex',
    flexDirection: 'column',
    lineHeight: '1rem',
  },
  weekCostText: {
    lineHeight: '1rem',
    fontWeight: 500,
    [theme.breakpoints.up('sm')]: {
      lineHeight: '2rem',
    },
  },
  nothingBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: '20px',
    [theme.breakpoints.up('sm')]: {
      marginTop: '26px',
    },
  },
  nothingText: {
    textAlign: 'center',
    fontSize: '1rem',
    lineHeight: '1.5rem',
  },
}));

interface IProps {
  id: number;
  title?: string;
  dayCost?: number;
  variant?: number;
  mostPopular?: boolean;
  value: number;
  handleChange: (e) => void;
  currency: string;
}

const OneVariant: React.FC<IProps> = (props) => {
  const classes = useStyles();
  const {
    id,
    title,
    dayCost,
    variant,
    mostPopular,
    value,
    handleChange,
    currency,
  } = props;
  const checked = value === id;
  const { t } = usePageTranslation('checkout', 'OneVariant');
  return (
    <Box
      className={
        checked
          ? clsx(classes.checked, classes.root)
          : clsx(classes.noChecked, classes.root)
      }
      onClick={() => handleChange(id)}
    >
      <Box className={classes.header}>
        <Box mt={3}>
          <Grey3Typography variant="body2" className={classes.headerText}>
            {title}
          </Grey3Typography>
        </Box>
        <Box>
          <StyledRadio
            value={variant}
            checked={checked}
          />
        </Box>
      </Box>
      {variant
        ? (
          <Box className={classes.costsBox}>
            {mostPopular
              ? (
                <Box className={classes.mostPopularBox}>
                  <PrimaryTypography variant="caption">
                    {t('primaryTypography')}
                  </PrimaryTypography>
                </Box>
              )
              : ''}
            <Grey3Typography className={classes.costText} variant="h4">
              {t('grey3Typography1')}
            </Grey3Typography>
            <Grey3Typography className={classes.costText} variant="h4">
              {`${currency}${Number.isInteger(variant) && formatterMoney(Number(variant))}`}
            </Grey3Typography>
          </Box>
        )
        : ''}
      {dayCost
        ? (
          <Box mt={2} className={classes.weekCostBox}>
            <Grey2Typography variant="caption" className={classes.weekCostText}>
              {t('grey2Typography1')}
            </Grey2Typography>
            <Grey2Typography variant="caption" className={classes.weekCostText}>
              {`${currency}${parseFloat((dayCost * 30).toFixed(1))} ${t('grey2Typography2')}`}
            </Grey2Typography>
          </Box>
        )
        : (
          <Box className={classes.nothingBox}>
            <Grey3Typography className={classes.nothingText}>
              {t('grey3Typography2')}
            </Grey3Typography>
          </Box>
        )}
    </Box>
  );
};

export default OneVariant;
