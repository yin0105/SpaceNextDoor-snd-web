import React, { FC } from 'react';
import {
  Box, makeStyles, Typography, Theme, fade, useMediaQuery,
} from '@material-ui/core/';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme) => ({
  mobile: {
    display: 'block',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  card: {
    height: '200px',
    width: '100%',
    margin: '0 auto',
    border: `1px solid ${theme.palette.grey[50]}`,
    borderRadius: '22px',
    padding: '12px 20px',
    [theme.breakpoints.up('md')]: {
      height: '263px',
      width: '100%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  tags: {
    display: 'flex',
    marginBottom: '15px',
  },
  tag: {
    fontSize: '10px',
    width: '112px',
    height: '20px',
    marginRight: '10px',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textTransform: 'uppercase',
    fontWeight: 700,
    [theme.breakpoints.up('md')]: {
      marginBottom: '10px',
    },
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '118px 1fr',
    gridGap: '22px',
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: '135px 80px',
    },
    [theme.breakpoints.up('lg')]: {
      gridTemplateColumns: '287px 1fr',
    },
    [theme.breakpoints.up('xl')]: {
      gridTemplateColumns: '360px 1fr',
    },
  },
  info: {
    [theme.breakpoints.up('md')]: {
      paddingTop: '15px',
    },
  },
  price: {
    display: 'flex',
  },
  desktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  },
  imgSkeleton: {
    backgroundColor: fade(theme.palette.grey[50], 0.8),
    marginTop: '15px',
    borderRadius: '22px',
    width: '100%',
  },
  locationSkeleton: {
    display: 'grid',
    gridTemplateColumns: '30px 1fr',
    gridGap: '5px',
    marginBottom: '5px',
  },
  fullWidth: {
    width: '100%',
  },
}));

type ITypoSkeleton = {
  times?: number,
  height?: number,
  width?: number,
};

const TypographySkeleton: FC<ITypoSkeleton> = ({ times = 1, height = 15, width = 100 }) => {
  const classes = useStyles();
  return (
    <Typography className={classes.fullWidth}>
      {Array.from({ length: times }).map((_num, idx) => (
        <Skeleton key={idx} variant="text" height={height} animation="wave" width={`${width}%`} />
      ))}
    </Typography>
  );
};

const SkeletonLoader:FC = () => {
  const classes = useStyles();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  return (
    <div className={classes.card}>
      <Box className={classes.mobile}>
        <Box className={classes.tags}>
          {Array.from({ length: 2 }).map((_n, idx) => (
            <Box key={idx} className={classes.tag}>
              <TypographySkeleton times={1} height={30} width={100} />
            </Box>
          ))}
        </Box>
      </Box>
      <Box className={classes.grid}>
        <Box>
          <Skeleton
            variant="rect"
            className={classes.imgSkeleton}
            height={isMobile ? 100 : 200}
            animation="wave"
          />
        </Box>
        <Box className={classes.info}>
          <Box className={`${classes.tags} ${classes.desktop}`}>
            {Array.from({ length: 2 }).map((_num, idx) => (
              <Box key={idx} className={classes.tag}>
                <TypographySkeleton times={1} height={30} width={100} />
              </Box>
            ))}
          </Box>
          <TypographySkeleton times={2} height={20} />
          <Box className={classes.locationSkeleton}>
            <TypographySkeleton times={1} height={20} />
            <TypographySkeleton times={1} height={20} />
          </Box>
          <Box>
            <TypographySkeleton times={1} height={20} />
          </Box>
          <Box className={classes.price}>
            <TypographySkeleton times={2} width={100} />
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default SkeletonLoader;
