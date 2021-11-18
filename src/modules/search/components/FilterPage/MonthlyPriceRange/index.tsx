import {
  Box, fade, Hidden, makeStyles, Slider, Theme, Typography, useMediaQuery, withStyles,
} from '@material-ui/core';
import debounce from 'lodash/debounce';
import { inject, observer } from 'mobx-react';
import { useCallback, useEffect, useState } from 'react';
import usePageTranslation from '../../../../../hooks/usePageTranslation';
import { SitesListStore } from '../../../stores/SitesListStore';
import { useCurrentCountry } from '../../../../../utilities/market';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '26px 26px 0',
    borderBottom: `1px solid ${fade(theme.palette.grey[100], 0.1)}`,
    [theme.breakpoints.up('sm')]: {
      height: '144px',
      border: `1px solid ${theme.palette.grey[50]}`,
      margin: '17px 26px 0',
      borderRadius: '12px',
      padding: '20px 20px 0',
      '& h4': {
        ...theme.typography.body1,
      },
    },
  },
  sliderBox: {
    margin: '54px 28px 0',
    [theme.breakpoints.up('sm')]: {
      margin: '56px 28px 0',
    },
  },
  title: {
    padding: '0 30px',
  },
}));

const CustomSlider = withStyles((theme) => ({
  root: {
    color: theme.palette.secondary.main,
    height: '8px',
    '& input + span + span': {
      left: '-20px !important',
      [theme.breakpoints.up('sm')]: {
        left: '-25px !important',
      },
    },
  },
  thumb: {
    height: '20px',
    width: '20px',
    marginTop: '-8px',
    marginLeft: '-12px',
    backgroundColor: '#FFFFFF',
    border: `2px solid ${theme.palette.secondary.main}`,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50%)',
    '& *': {
      backgroundColor: 'black',
      color: '#FFFFFF',
      fontSize: '0.9rem',
    },
  },
  track: {
    height: 5,
    borderRadius: 4,
  },
  rail: {
    height: 4,
    borderRadius: 4,
    color: theme.palette.grey[50],
  },
  mark: {
    color: '#FFFFFF',
    top: '34px',
  },
  markLabel: {
    top: '12px',
    left: '108% !important',
    [theme.breakpoints.up('sm')]: {
      top: '6px',
      left: '113% !important',
    },
  },
}))(Slider);

interface IProps {
  sitesStore?: SitesListStore;
}

const MonthlyPriceRange: React.FC<IProps> = ({ sitesStore }) => {
  const classes = useStyles();
  const isAutoApplied = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));
  const debouncedApply = useCallback(debounce(() => sitesStore.applyFilters(), 500), []);
  const { maxFilterPrice, currencySign } = useCurrentCountry();
  const marks = [
    {
      value: 0,
      label: currencySign,
    },
    {
      value: 100,
      label: currencySign,
    },
  ];
  const [prices, setPrices] = useState<[number, number]>([0, maxFilterPrice]);
  const priceStart = sitesStore.filters.price_start;
  const priceEnd = sitesStore.filters.price_end;

  const newPrices = (): [number, number] => [
    prices[0] >= maxFilterPrice ? priceStart || 0 : prices[0],
    prices[1] <= 0 ? priceEnd || maxFilterPrice : prices[1],
  ];

  useEffect(() => {
    setPrices([priceStart || 0, priceEnd || maxFilterPrice]);
  }, [priceStart, priceEnd]);

  const handleChange = (event, newValue) => {
    setPrices([newValue[0], newValue[1]]);
    if (isAutoApplied) {
      debouncedApply();
    }
  };

  const handleChangeCommit = () => {
    const vals = newPrices();
    sitesStore.setFilter('price_start', vals[0]);
    sitesStore.setFilter('price_end', vals[1]);
  };

  const { t } = usePageTranslation('search', 'MonthlyPriceRange');

  return (
    <Box>
      <Hidden only="xs">
        <Typography variant="h4" className={classes.title}>
          {t('typography1')}
        </Typography>
      </Hidden>
      <Box className={classes.root}>
        <Box>
          <Typography variant="h4">
            {t('typography2')}
          </Typography>
        </Box>
        <Box className={classes.sliderBox}>
          <CustomSlider
            marks={marks}
            value={newPrices()}
            onChange={handleChange}
            onChangeCommitted={handleChangeCommit}
            max={maxFilterPrice}
            min={0}
            valueLabelDisplay="on"
            aria-labelledby="range-slider"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default inject('sitesStore')(observer(MonthlyPriceRange));
