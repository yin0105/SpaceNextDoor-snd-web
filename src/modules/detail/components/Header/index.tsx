import {
  Box, fade, Grid, Hidden, IconButton, makeStyles,
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useState } from 'react';
import CarouselPopup from '../../../../components/CarouselPopup';
import Image from '../../../../components/Image';
import ImageLoader from '../../../../components/ImageLoader';
import { getResizedURL } from '../../../../utilities/imageResizer';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    marginTop: '50px',
    marginBottom: '20px',
    position: 'relative',

    [theme.breakpoints.only('xs')]: {
      marginTop: '0px',
      marginBottom: '0px',
      padding: '24px 24px 5px',
    },
  },
  imgWrapper: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: '15px',
    backgroundColor: fade(theme.palette.grey[50], 0.8),
  },
  mainImageWrapper: {
    height: '400px',
    position: 'relative',

    [theme.breakpoints.only('xs')]: {
      height: '190px',
    },
  },
  secondaryImageWrapper: {
    height: '190px',
    marginLeft: '20px',
    marginBottom: '20px',
    minWidth: '400px',

    [theme.breakpoints.only('xs')]: {
      marginLeft: '10px',
      height: '90px',
      minWidth: '120px',
      maxWidth: '120px',
      marginBottom: '10px',
    },
  },
  smallImageWrapper: {
    height: '190px',
    marginLeft: '20px',
    minWidth: '190px',

    [theme.breakpoints.only('xs')]: {
      marginLeft: '10px',
      height: '90px',
      minWidth: '120px',
      maxWidth: '120px',
    },
  },
  imgSkeleton: {
    backgroundColor: fade(theme.palette.grey[50], 0.8),
  },
  img: {
    minWidth: '100%',
    minHeight: '100%',
    height: 'inherit',
    width: 'inherit',
    maxHeight: 'inherit',
    maxWidth: 'inherit',
    objectFit: 'cover',
    objectPosition: 'center',
    cursor: 'pointer',
  },
  backBtnWrapper: {
    position: 'absolute',
    left: '-3px',
    top: '-3px',
  },
  placeholder: {
    position: 'absolute',
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    '& img': {
      alignSelf: 'center',
      width: '110px',

      [theme.breakpoints.only('xs')]: {
        width: '70px',
      },
    },
  },
  moreImages: {
    fontSize: theme.typography.h2.fontSize,
    fontWeight: 700,
    color: fade('#FFFFFF', 0.8),
    cursor: 'pointer',
    backgroundColor: fade(theme.palette.grey[200], 0.5),
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
}));

interface IProps {
  images: string[];
  loading: boolean;
}

const Header: React.FC<IProps> = ({ images, loading }) => {
  const classes = useStyles();
  const router = useRouter();
  const [sliderOpen, setOpen] = useState(false);
  const [initialIndex, setInitialIndex] = useState(0);

  return (
    <Box className={classes.wrapper}>
      <CarouselPopup
        isOpen={sliderOpen}
        initialIndex={initialIndex}
        images={images.map((i) => getResizedURL(i, { width: 1500 }))}
        onClose={() => setOpen(false)}
      />
      <Grid container>
        <Grid item xs={7} sm={7}>
          <Box className={clsx(classes.mainImageWrapper, classes.imgWrapper)}>
            <Hidden smUp>
              <Box className={classes.backBtnWrapper}>
                <IconButton component="span" onClick={() => router.back()}>
                  <Image name="backIcon" folder="DetailPage" />
                </IconButton>
              </Box>
            </Hidden>

            {!loading && !images[0] && (
              <Box className={classes.placeholder}>
                <Image name="placeholder" folder="DetailPage" extension="png" />
              </Box>
            )}

            <ImageLoader
              loading={loading}
              placeholder={(
                <Skeleton
                  variant="rect"
                  className={classes.imgSkeleton}
                  height={400}
                  width="100%"
                  animation="wave"
                />
              )}
            >
              {!loading && images[0] && (
                <img
                  className={classes.img}
                  onClick={() => {
                    setInitialIndex(0);
                    setOpen(true);
                  }}
                  src={getResizedURL(images[0], { width: 700 })}
                  alt="Main site cover"
                />
              )}
            </ImageLoader>
          </Box>
        </Grid>
        <Grid item xs={5} sm={5}>
          <Grid container>
            <Grid item sm={12}>
              <Box className={clsx(classes.secondaryImageWrapper, classes.imgWrapper)}>
                <ImageLoader
                  loading={loading}
                  placeholder={(
                    <Skeleton
                      variant="rect"
                      className={classes.imgSkeleton}
                      height={190}
                      width="100%"
                      animation="wave"
                    />
                  )}
                >
                  {!loading && images[1] && (
                    <img
                      className={classes.img}
                      onClick={() => {
                        setInitialIndex(1);
                        setOpen(true);
                      }}
                      src={getResizedURL(images[1], { width: 450 })}
                      alt="Secondary small cover"
                    />
                  )}
                </ImageLoader>

                {!loading && !images[1] && (
                  <Box className={classes.placeholder}>
                    <Image name="placeholder" folder="DetailPage" extension="png" />
                  </Box>
                )}
              </Box>
            </Grid>
            <Grid item sm={12}>
              <Grid container>
                <Grid item sm={6}>
                  <Box className={clsx(classes.smallImageWrapper, classes.imgWrapper)}>
                    <ImageLoader
                      loading={loading}
                      placeholder={(
                        <Skeleton
                          variant="rect"
                          className={classes.imgSkeleton}
                          height={190}
                          width="100%"
                          animation="wave"
                        />
                      )}
                    >
                      {!loading && images[2] && (
                        <img
                          className={classes.img}
                          onClick={() => {
                            setInitialIndex(2);
                            setOpen(true);
                          }}
                          src={getResizedURL(images[2], { width: 300 })}
                          alt="Small site"
                        />
                      )}
                    </ImageLoader>

                    {!loading && !images[2] && (
                      <Box className={classes.placeholder}>
                        <Image name="placeholder" folder="DetailPage" extension="png" />
                      </Box>
                    )}
                  </Box>
                </Grid>
                <Hidden only="xs">
                  <Grid item sm={6}>
                    <Box className={clsx(classes.smallImageWrapper, classes.imgWrapper)}>
                      {(images.length - 4) > 0 && (
                        <Box
                          className={classes.moreImages}
                          onClick={() => {
                            setInitialIndex(3);
                            setOpen(true);
                          }}
                        >
                          +
                          {images.length - 4}
                        </Box>
                      )}
                      <ImageLoader
                        loading={loading}
                        placeholder={(
                          <Skeleton
                            variant="rect"
                            className={classes.imgSkeleton}
                            height={190}
                            width="100%"
                            animation="wave"
                          />
                        )}
                      >

                        {!loading && images[3] && (
                          <img
                            className={classes.img}
                            src={getResizedURL(images[3], { width: 300 })}
                            onClick={() => {
                              setInitialIndex(3);
                              setOpen(true);
                            }}
                            alt="Small site"
                          />
                        )}
                      </ImageLoader>

                      {!loading && !images[3] && (
                        <Box className={classes.placeholder}>
                          <Image name="placeholder" folder="DetailPage" extension="png" />
                        </Box>
                      )}
                    </Box>
                  </Grid>
                </Hidden>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Header;
