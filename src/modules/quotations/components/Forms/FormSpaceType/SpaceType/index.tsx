import {
  Box, makeStyles, Typography, useMediaQuery, Theme,
} from '@material-ui/core';
import StyledRadio from 'components/RadioButton';
import usePageTranslation from 'hooks/usePageTranslation';
import { useRouter } from 'next/router';
import React from 'react';
import { getTranslatedName } from 'utilities/market';
import { PlatformSpaceTypes_space_types_edges } from '../../../../queries/__generated__/PlatformSpaceTypes';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '300px',
    height: '180px',
    border: `2px solid ${theme.palette.grey[50]}`,
    borderRadius: '12px',
    margin: '10px 45px 10px 0',
    [theme.breakpoints.down('sm')]: {
      height: 'max-content',
      maxWidth: '48%',
      margin: '10px 0',
    },
  },
  section1: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingLeft: '10px',
    [theme.breakpoints.down('sm')]: {
      flexFlow: 'column',
      alignItems: 'center',
      height: '220px',
      paddingTop: '24px',
    },
  },
  image: {
    maxWidth: '110px',
    height: '120px',
    [theme.breakpoints.down('sm')]: {
      width: '100px',
      height: '100px',
    },
  },
  size: {
    maxWidth: '140px',
    paddingTop: '15px',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  name: {
    fontWeight: 600,
    fontSize: '16px',
  },
  sizeText: {
    fontWeight: 400,
    fontSize: '16px',
  },
  details: {
    fontSize: '12px',
    color: theme.palette.primary.main,
    marginTop: '15px',
    cursor: 'pointer',
  },
  radioContainer: {
    [theme.breakpoints.down('sm')]: {
      position: 'relative',
      left: '5px',
      bottom: '220px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      width: '150px',
    },
  },
  radio: {
    padding: '0',
    height: 'max-content',
    margin: '15px 15px 0 0',
  },
  section2: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '16px',
    borderTop: `2px solid ${theme.palette.grey[50]}`,
    margin: '0 15px',
    padding: '15px 0',
    [theme.breakpoints.down('sm')]: {
      alignItems: 'flex-start',
      flexFlow: 'column',
    },
  },
  price: {
    fontSize: '22px',
    fontWeight: 600,
    [theme.breakpoints.down('sm')]: {
      fontSize: '18px',
    },
  },
  priceText: {
    fontSize: '16px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',
    },
  },
  recommended: {
    background: `${theme.palette.primary.main}10`,
    padding: '2px 10px',
    color: theme.palette.primary.main,
    fontSize: '12px',
    fontWeight: 700,
    borderRadius: '15px',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      margin: '15px 15px 0 0',
      width: '104px',
    },
  },
}));

interface IProps {
  spaceType: PlatformSpaceTypes_space_types_edges;
  setSpaceType: (val: number) => void;
  checked: boolean;
  isEstimated: boolean;
  setSpaceTypeDetailsId: (val: number) => void;
  setIsOpen: (val: boolean) => void;
}

const SpaceType: React.FC<IProps> = ({
  spaceType,
  setSpaceType,
  checked,
  isEstimated,
  setSpaceTypeDetailsId,
  setIsOpen,
}) => {
  const classes = useStyles();
  const router = useRouter();
  const { t } = usePageTranslation('quotations', 'SpaceType');
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  return (
    <Box className={classes.root}>
      <Box className={classes.section1}>
        <img className={classes.image} src={spaceType.icon} alt="" />
        <Box className={classes.size}>
          <Typography className={classes.name}>
            {getTranslatedName(spaceType, 'name', router.locale)}
          </Typography>
          <Typography className={classes.sizeText}>
            {spaceType.size_from}
            {' '}
            -
            {spaceType.size_to}
            {' '}
            {spaceType.unit}
          </Typography>
          {isEstimated && !isMobile && (
            <Typography className={classes.recommended}>
              {t('typography1')}
            </Typography>
          )}
          <Typography
            onClick={() => {
              setSpaceTypeDetailsId(spaceType?.id);
              setIsOpen(true);
            }}
            className={classes.details}
          >
            {t('typography2')}
          </Typography>
        </Box>
        <Box className={classes.radioContainer}>
          {isEstimated && isMobile && (
            <Typography className={classes.recommended}>
              {t('typography1')}
            </Typography>
          )}
          <StyledRadio
            checked={checked}
            onChange={() => setSpaceType(spaceType.id)}
            className={classes.radio}
          />
        </Box>
      </Box>
      <Box className={classes.section2}>
        <Typography className={classes.priceText}>
          {t('typography3')}
        </Typography>
        <Typography className={classes.priceText}>
          <span className={classes.price}>
            {spaceType.spaces?.edges?.[0]?.prices?.[0]?.currency_sign}
            {spaceType.spaces?.edges?.[0]?.prices?.[0]?.price_per_month}
          </span>
          /
          {t('typography4')}
        </Typography>
      </Box>
    </Box>
  );
};

export default SpaceType;
