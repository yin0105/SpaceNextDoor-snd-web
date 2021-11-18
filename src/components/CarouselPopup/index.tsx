import { useKeenSlider } from 'keen-slider/react';
import { Box, Dialog, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import Image from '../Image';
import 'keen-slider/keen-slider.min.css';

interface IProps {
  isOpen: boolean;
  onClose(): void;
  images: string[];
  initialIndex?: number;
}

const useStyles = makeStyles((theme) => ({
  content: {
    height: '100%',
    [theme.breakpoints.down('sm')]: {
      margin: '20px',
    },
  },
  paper: {
    background: 'rgba(0, 0, 0, 0.7)',
  },
  img: {
    height: '600px',

    [theme.breakpoints.down('sm')]: {
      height: '400px',
    },
  },
  slide: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  thumbnailWrapper: {
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: '20px',
    height: '40px',
    margin: '0 auto',
    left: 0,
    right: 0,
  },
  thumbnail: {
    display: 'flex',
    cursor: 'pointer',
    width: '50px',
    overflow: 'hidden',
    marginRight: '10px',
    opacity: 0.4,

    '& img': {
      width: '100%',

      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },

    [theme.breakpoints.down('sm')]: {
      width: '10px',
      borderRadius: '50px',
      height: '10px',
      background: 'white',
    },

    '&:hover': {
      opacity: 1,
    },
  },
  active: {
    opacity: 1,
    border: '2px solid white',
  },
  arrow: {
    userSelect: 'none',
    position: 'absolute',
    display: 'flex',
    padding: '0 10px',
    top: 0,
    bottom: 0,
    zIndex: 80,
    opacity: 0.5,
    cursor: 'pointer',
    '&:hover': {
      opacity: 1,
    },
    '& img': {
      width: '30px',
    },
  },
  arrowRight: {
    right: '10px',
  },
  arrowLeft: {
    left: '10px',
  },
  close: {
    position: 'absolute',
    zIndex: 99,
    cursor: 'pointer',
    top: '10px',
    right: '10px',
    '& img': {
      width: '30px',
      opacity: '0.5',
    },

    [theme.breakpoints.down('sm')]: {
      top: '20px',
      right: '20px',
    },
  },
}));

const ChildKeenSlider = ({ images, classes, initialIndex }) => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    initial: initialIndex,
    slideChanged(s) {
      setCurrentSlide(s.details().relativeSlide);
    },
    loop: true,
  });

  return (
    <>
      <Box className={clsx(classes.arrow, classes.arrowLeft)} onClick={() => { slider.prev(); }}>
        <Image folder="DetailPage" name="arrow-left" />
      </Box>
      <div ref={sliderRef} className={`keen-slider ${classes.content}`}>
        {!!images.length && images.map((img, i) => (
          <div className={`keen-slider__slide ${classes.slide}`} key={i}>
            <img src={img} className={classes.img} alt="slide" />
          </div>
        ))}
      </div>
      <Box className={classes.thumbnailWrapper}>
        {images.map((img, i) => (
          <Box
            className={clsx(classes.thumbnail, i === currentSlide && classes.active)}
            onClick={() => { slider.moveToSlideRelative(i); }}
            key={i}
          >
            <img src={img} alt="thumbnail" />
          </Box>
        ))}
      </Box>
      <Box className={clsx(classes.arrow, classes.arrowRight)} onClick={() => { slider.next(); }}>
        <Image folder="DetailPage" name="arrow-right" />
      </Box>
    </>
  );
};

const CarouselPopup: React.FC<IProps> = ({
  isOpen, onClose, images, initialIndex,
}) => {
  const classes = useStyles();

  const renderKeenSlider = () => {
    if (!images.length) return null;
    return <ChildKeenSlider images={images} classes={classes} initialIndex={initialIndex} />;
  };

  return (
    <Dialog fullScreen open={isOpen} onClose={onClose} classes={{ paper: classes.paper }}>
      <Box className={classes.close} onClick={onClose}>
        <Image folder="" name="close_white" />
      </Box>
      {renderKeenSlider()}
    </Dialog>
  );
};

export default CarouselPopup;
