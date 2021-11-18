import React, { useState } from 'react';
import {
  Box, makeStyles,
} from '@material-ui/core/';
import clsx from 'clsx';
import Image from '../Image';
import ImageLoader from '../ImageLoader';
import Placeholder from '../Placeholder';

const useStyles = makeStyles((theme) => ({
  carousel: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: '1s',
    borderRadius: '16px',
    overflow: 'hidden',
    position: 'relative',
    height: 'inherit',
    width: 'inherit',
  },
  carouselImage: {
    height: 'inherit',
    width: 'inherit',
    minWidth: '100%',
    borderRadius: '16px',
    minHeight: '100%',
    objectFit: 'cover',
    cursor: 'pointer',
    transition: '0.3s ease-in-out',
    userSelect: 'none',
  },
  arrow: {
    height: '24px',
    zIndex: 2,
    width: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(255, 255, 255, 0.7)',
    borderRadius: '50%',
    cursor: 'pointer',
    '& img': {
      width: '6px !important',
      height: '11px !important',
    },
  },
  arrowContainer: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '16px',
    justifyContent: 'center',
    height: '100%',
    width: '40px',
    position: 'absolute',
    zIndex: 2,
    userSelect: 'none',
  },
  points: {
    position: 'absolute',
    bottom: '22px',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      bottom: '10px',
    },
    '& > div': {
      width: '9px',
      height: '9px',
      marginRight: '10px',
      background: theme.palette.secondary.light,
      borderRadius: '50%',
    },
  },
  activePoint: {
    background: `${theme.palette.secondary.main} !important`,
  },
  arrowLeft: {
    left: '0px',
  },
  arrowRight: {
    right: '0px',
  },
}));

interface IProps {
  images: string[];
  onClick?(): void;
  htmlId: string;
}

const ImagesSlider: React.FC<IProps> = ({ images, onClick, htmlId }) => {
  const classes = useStyles();
  const [index, setIndex] = useState(0);

  const slideRight = (e: any) => {
    e.stopPropagation();
    if (index === (images.length - 1)) {
      setIndex(0);
      return;
    }
    setIndex(index + 1); // increases index by 1
  };

  const slideLeft = (e: any) => {
    e.stopPropagation();
    if (index === 0) {
      setIndex(images.length - 1);
      return;
    }
    setIndex(index - 1);
  };

  if (!images.length || !images[0]) {
    return <ImageLoader placeholder={<Placeholder />} />;
  }

  return (
    <Box className={classes.carousel}>
      <Box
        className={clsx(classes.arrowContainer, classes.arrowLeft)}
        onClick={slideLeft}
        id={`imageSlideLeft${htmlId}`}
      >
        <Box className={classes.arrow}>
          <Image name="arrow-left" folder="Homepage" />
        </Box>
      </Box>
      {images.map((img, k) => (
        <img
          key={k}
          className={classes.carouselImage}
          onClick={onClick}
          style={{ transform: `translate3d(${(index - (0.5 * images.length - 0.5)) * -1 * 100}%, 0, 0)` }}
          src={img}
          alt={img}
          role="presentation"
          loading="lazy"
        />
      ))}
      <Box
        className={clsx(classes.arrowContainer, classes.arrowRight)}
        onClick={slideRight}
        id={`imageSlideRight${htmlId}`}
      >
        <Box className={classes.arrow}>
          <Image name="arrow-right" folder="Homepage" />
        </Box>
      </Box>
      {images.length > 1 && (
        <Box className={classes.points}>
          {images.map((_, j) => (
            <Box
              key={j}
              className={j === index ? classes.activePoint : ''}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ImagesSlider;
