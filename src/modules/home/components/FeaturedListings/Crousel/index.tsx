import React from 'react';
import {
  Box, makeStyles, useMediaQuery, Theme, Link,
} from '@material-ui/core/';
import { useRouter } from 'next/router';
import { useKeenSlider } from 'keen-slider/react';
import Image from '../../../../../components/Image';
import { scrollTop } from '../../../../../utilities/scrollTop';

const useStyles = makeStyles((theme) => ({
  image: {
    '& img': {
      height: '118px',
      width: '118px',
      maxWidth: '100%',
      maxHeight: '100%',
      minHeight: '100%',
      minWidth: '100%',
      objectFit: 'cover',
      borderRadius: '16px',
    },
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  hide: {
    display: 'none !important',
  },
  carouselContainer: {
    paddingTop: '15px',
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  },
  carousel: {
    display: 'flex',
    transition: '1s',
    borderRadius: '16px',
    height: 'fit-content',
  },
  carouselImage: {
    height: '209px',
    maxWidth: '100%',
    maxHeight: '100%',
    minHeight: '100%',
    minWidth: '100%',
    objectFit: 'cover',
    borderRadius: '15px',
  },
  arrow: {
    height: '24px',
    width: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(255, 255, 255, 0.7)',
    borderRadius: '50%',
    position: 'absolute',
    top: 'calc(50% - 12px)',
    cursor: 'pointer',
  },
  points: {
    display: 'none',
    position: 'absolute',
    bottom: '42px',
    gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
    gridGap: '10px',
    left: 'calc(50% - 50px)',
    [theme.breakpoints.up('md')]: {
      bottom: '30px',
      display: 'grid',
    },
    '& > div': {
      width: '9px',
      height: '9px',
      background: theme.palette.secondary.light,
      borderRadius: '50%',
    },
  },
  activePoint: {
    background: `${theme.palette.secondary.main} !important`,
  },
  link: {
    cursor: 'pointer',
  },
  arrowLeft: {
    left: '10px',
  },
  arrowRight: {
    right: '10px',
  },
}));

interface IFeaturedSitesImageCarouselProps {
  images: string[];
  country: string;
  cityId: number;
  siteId: number;
}

const ChildKeenSlider = ({ images, classes, goToSiteDetails }) => {
  const [currentSlides, setCurrentSlides] = React.useState(0);
  const [keenSliderRef, keenSlider] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(s) {
      setCurrentSlides(s.details().relativeSlide);
    },
    loop: true,
  });
  if (!images.length) {
    return null;
  }

  return (
    <Box className={classes.carouselContainer}>
      <div className="navigation-wrapper">
        <div ref={keenSliderRef} className="keen-slider">
          { images.map((e) => (
            <div key={e} className="keen-slider__slide">
              <Link
                className={classes.link}
                onClick={() => goToSiteDetails()}
              >
                <img key={e} className={classes.carouselImage} src={e} alt={e} role="presentation" />
              </Link>
            </div>
          )) }
        </div>
        {keenSlider && (
          <>
            <Box className={`${classes.arrow} ${classes.arrowLeft} ${images?.length === 1 ? classes.hide : ''}`} onClick={() => { keenSlider.prev(); }}>
              <Image name="arrow-left" folder="Homepage" />
            </Box>
            <Box className={`${classes.arrow} ${classes.arrowRight} ${images?.length === 1 ? classes.hide : ''}`} onClick={() => { keenSlider.next(); }}>
              <Image name="arrow-right" folder="Homepage" />
            </Box>
          </>
        ) }
      </div>
      <Box className={classes.points}>
        {keenSlider && [...Array(keenSlider.details().size).keys()].map((idx) => (
          <Box
            key={idx}
            className={idx === currentSlides ? classes.activePoint : ''}
          />
        ))}
      </Box>
    </Box>
  );
};

const FeaturedSitesImageCarousel: React.FC<IFeaturedSitesImageCarouselProps> = ({
  images, country, cityId, siteId,
}: IFeaturedSitesImageCarouselProps) => {
  const classes = useStyles();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.only('xs'));
  const isPc = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
  const router = useRouter();

  const goToSiteDetails = () => {
    const url = `/${router.locale}/details/${siteId}?location=${country}&city_id=${cityId}`;
    if (isMobile) {
      router.push(url).then(() => scrollTop());
      return;
    }

    window.open(url);
  };

  const renderKeenSlider = () => {
    if (!isPc) return null;
    return (
      <ChildKeenSlider
        images={images}
        classes={classes}
        goToSiteDetails={goToSiteDetails}
      />
    );
  };

  return (
    <Box>
      <Box className={classes.image}>
        {
          images.length > 0 && (
            <Link
              className={classes.link}
              onClick={() => goToSiteDetails()}
            >
              <img className={classes.carouselImage} src={images[0]} alt={images[0]} />
            </Link>
          )
        }
      </Box>
      {renderKeenSlider()}
    </Box>
  );
};

export default FeaturedSitesImageCarousel;
