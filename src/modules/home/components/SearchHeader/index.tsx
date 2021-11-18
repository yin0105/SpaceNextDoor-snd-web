import {
  Box, makeStyles, useMediaQuery, Theme,
} from '@material-ui/core';

import { useCurrentCountry } from 'utilities/market';

import Title from './Title';
import Search from './Search';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    overflow: 'hidden',
    borderBottomRightRadius: '20px',
    borderBottomLeftRadius: '20px',
    [theme.breakpoints.up('sm')]: {
      maxHeight: '570px',
    },
  },
  image: {
    width: '100%',
  },
  container: {
    position: 'absolute',
    bottom: '3px',
    width: '100%',
    [theme.breakpoints.down('lg')]: {
      bottom: '100px',
    },
    [theme.breakpoints.down('md')]: {
      bottom: '50px',
    },
    [theme.breakpoints.only('xs')]: {
      height: '100%',
      bottom: '3px',
    },
  },
  content: {
    maxWidth: '700px',
    margin: '0 auto',
    [theme.breakpoints.down('xs')]: {
      height: '97%',
      display: 'flex',
      flexFlow: 'column',
      justifyContent: 'space-between',
      padding: '10px 24px 0',
    },
  },
  desktopImage: {
    width: '100vw',
    position: 'relative',
    [theme.breakpoints.up('xl')]: {
      top: '-190px',
    },
    [theme.breakpoints.down('lg')]: {
      top: '-70px',
    },
    [theme.breakpoints.down('md')]: {
      top: '-30px',
    },
  },
  ThaiImage: {
    width: '100vw',
    height: '560px',
    backgroundSize: 'cover',
    backgroundPosition: '50% 50%',
    backgroundRepeat: 'no-repeat',
  },
  mobileImage: {
    width: '100vw',
    height: '395px',
    maxHeight: '395px',
    borderRadius: '0 0 20px 20px',
  },
}));

const SearchHeader = ({ showSearch = true }) => {
  const classes = useStyles();
  const { name } = useCurrentCountry();
  const desktopBg = `images/${name}/Homepage/banner-desktop.webp`;
  const mobileBg = `images/${name}/Homepage/banner-mobile.webp`;
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.only('xs'));
  return (
    <Box className={classes.root}>
      {isMobile
        ? (
          <img
            className={classes.mobileImage}
            src={mobileBg}
            alt=""
          />
        )
        : (
          <img
            className={classes.desktopImage}
            src={desktopBg}
            alt=""
          />
        )}
      <Box className={classes.container}>
        <Box className={classes.content}>
          <Title />
          {showSearch && <Search />}
        </Box>
      </Box>
    </Box>
  );
};

export default SearchHeader;
