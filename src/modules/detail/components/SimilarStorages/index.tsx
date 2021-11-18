import React, { useState } from 'react';
import {
  Box,
  makeStyles,
  Typography,
  Theme,
  useMediaQuery,
  IconButton,
  Hidden,
} from '@material-ui/core';
import { useSwipeable } from 'react-swipeable';
import clsx from 'clsx';
import { useKeenSlider } from 'keen-slider/react';
import Items from './Items';
import ItemsLoader from './Items/Loader';
import {
  SimilarStorageQuery,
} from '../../queries/__generated__/SimilarStorageQuery';
import usePageTranslation from '../../../../hooks/usePageTranslation';
import 'keen-slider/keen-slider.min.css';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '28px',
    backgroundColor: '#F4F4F4;',
    padding: '20px 0px 160px 0px',
    position: 'absolute',
    left: '0',
    width: '100%',
    [theme.breakpoints.only('xs')]: {
      marginBottom: '40px',
      paddingLeft: '10px',
    },
    [theme.breakpoints.only('sm')]: {
      paddingLeft: '0px',
    },
  },
  container: {
    [theme.breakpoints.up('lg')]: {
      padding: '0px 200px',
    },
    [theme.breakpoints.down('sm')]: {
      overflowX: 'hidden',
    },
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.up('sm')]: {
      paddingRight: '70px',
    },
  },
  headerRight: {
    display: 'flex',
    [theme.breakpoints.only('xs')]: {
      display: 'none',
    },
    [theme.breakpoints.only('sm')]: {
      display: 'none',
    },
  },
  pageTextSection: {
    paddingTop: '10px',
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: 'normal',
  },
  headerLeftArrow: {
    padding: '0px 20px',
  },
  arrowIcon: {
    cursor: 'pointer',
    padding: '0px',
  },
  dot: {
    width: '9px',
    height: '9px',
    borderRadius: '20px',
    backgroundColor: theme.palette.grey[50],
    marginRight: '5px',
  },
  dotActive: {
    backgroundColor: theme.palette.secondary.main,
  },
  dotWrap: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
    marginBottom: '20px',
  },
}));

interface IProps {
  data: SimilarStorageQuery;
  loading: boolean;
}

const SimilarStorages: React.FC<IProps> = ({ data, loading }) => {
  const classes = useStyles();
  const [page, setPage] = useState<number>(0);
  const [activeIndex, setActive] = useState<number>(0);

  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.between('xs', 'sm'));
  const sites = data?.sites?.edges || [];
  const TOTAL_ITEMS = sites.length;
  const itemsToShow = 3;
  const TOTAL_PAGES = !isMobile ? Math.ceil(TOTAL_ITEMS / itemsToShow) : (TOTAL_ITEMS);

  const items = isMobile
    ? sites
    : sites.slice(
      page * itemsToShow,
      Math.min((page + 1) * itemsToShow, TOTAL_ITEMS),
    );
  const pixels = activeIndex * -360;

  const position = {
    transform: `translateX(${String(pixels)}px)`,
    transitionTimingFunction: 'ease',
    transitionDuration: '0.2s',
  };
  // for desktop pagination
  const previousArrowClick = () => {
    const newPage = Math.max(page - 1, 0);
    setPage(newPage);
    setActive(newPage);
  };

  // for desktop pagination
  const forwardArrowClick = () => {
    if (page + 1 < TOTAL_PAGES) {
      setPage(page + 1);
      setActive(page + 1);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: forwardArrowClick,
    onSwipedRight: previousArrowClick,
  });
  const { t } = usePageTranslation('details', 'SimilarStorages');

  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(s) {
      setCurrentSlide(s.details().relativeSlide);
    },
  });

  return (
    <Box className={classes.root}>
      <Box className={classes.container}>
        <Box className={classes.header}>
          <Box>
            <Typography variant="h2">{t('title')}</Typography>
          </Box>
          <Box className={classes.headerRight}>
            <Typography className={classes.pageTextSection}>
              {`${page + 1}/${TOTAL_PAGES}`}
            </Typography>
            <Box className={classes.headerLeftArrow}>
              <IconButton
                onClick={previousArrowClick}
                className={classes.arrowIcon}
              >
                <img
                  src="/images/DetailPage/backRoundIcon.svg"
                  alt="previous"
                />
              </IconButton>
            </Box>
            <Box>
              <IconButton
                onClick={forwardArrowClick}
                className={classes.arrowIcon}
              >
                <img src="/images/DetailPage/forwardRoundIcon.svg" alt="next" />
              </IconButton>
            </Box>
          </Box>
        </Box>
        {!isMobile ? (
          <div ref={sliderRef} className="keen-slider">
            <div className="keen-slider__slide number-slide1">
              {loading ? <ItemsLoader /> : <Items similarStorages={items} />}
            </div>
          </div>
        ) : (
          <Box {...handlers} style={position}>
            {loading ? <ItemsLoader /> : <Items similarStorages={items} />}
          </Box>
        )}
        <Hidden mdUp>
          <Box className={classes.dotWrap}>
            {(items || []).map((_, idx) => (
              <Box
                key={idx}
                className={clsx(
                  classes.dot,
                  idx === activeIndex && classes.dotActive,
                )}
                onClick={() => {
                  setPage(idx);
                  setActive(idx);
                }}
              />
            ))}
          </Box>
        </Hidden>
      </Box>
    </Box>
  );
};

export default SimilarStorages;
