import React, { FC } from 'react';
import {
  makeStyles, Box, withStyles, Typography,
  useMediaQuery, Theme,
} from '@material-ui/core';
import { useRouter } from 'next/router';
import Info from './Info';
import Image from '../../../../components/Image';
import PrimaryButton from '../../../../components/Buttons/PrimaryButton';
import usePageTranslation from '../../../../hooks/usePageTranslation';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#EAF0F6',
    position: 'relative',
    height: '79.3000rem',
    [theme.breakpoints.up('md')]: { height: '50.8000rem' },
  },
  wrapper1: {
    position: 'absolute',
    width: '34.3173%',
    height: '21.2257%',
    left: '0.0000%',
    top: '0.0000%',
    [theme.breakpoints.up('md')]: { width: '18.9618%', height: '64.0945%' },
  },
  listYourSpace: {
    position: 'absolute',
    width: '83.2000%',
    height: '39.3443%',
    left: '7.4667%',
    top: '5.8008%',
    [theme.breakpoints.up('md')]: {
      width: '28.5417%',
      height: '80.9055%',
      left: '18.4722%',
      top: '7.4803%',
    },
  },
  textArea: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '86.4000%',
    height: '28.5259%',
    left: '6.9333%',
    top: '48.9281%',
    [theme.breakpoints.up('md')]: {
      width: '31.1806%',
      height: '46.8504%',
      left: '50.0694%',
      top: '26.5748%',
    },
  },
  wrapper2: {
    position: 'absolute',
    width: '19.2267%',
    height: '23.0769%',
    left: '80.7733%',
    top: '0.0000%',
    [theme.breakpoints.up('md')]: {
      width: '9.7625%',
      height: '64.3051%',
      left: '90.2458%',
      top: '28.5709%',
    },
  },
  wrapper3: {
    position: 'absolute',
    width: '28.9733%',
    height: '13.9975%',
    left: '0.0000%',
    top: '86.0025%',
    [theme.breakpoints.up('md')]: { display: 'none' },
  },
  actionBox: {
    width: '29.0000rem',
    height: '4.4210rem',
    marginTop: '5.0000rem',
    [theme.breakpoints.up('md')]: {
      width: '32.5000rem',
      height: '5.0000rem',
      marginTop: '4.4000rem',
    },
  },
  imageMobile: {
    display: 'block',
    width: '100%',
    height: '100%',
    [theme.breakpoints.up('md')]: { display: 'none' },
  },
  imageDesktop: {
    display: 'none',
    width: '100%',
    height: '100%',
    [theme.breakpoints.up('md')]: { display: 'block' },
  },
}));

const ButtonText = withStyles(
  (theme) => ({
    root: {
      color: 'white',
      fontWeight: 700,
      fontSize: '1.3000rem',
      lineHeight: '1.9500rem',
      [theme.breakpoints.up('md')]: {
        fontSize: '1.3000rem',
        lineHeight: '1.9500rem',
      },
    },
  }),
  {
    withTheme: true,
  },
)(Typography);

const ListYourSpace: FC = () => {
  const router = useRouter();
  const { t } = usePageTranslation('hostLanding', 'ListYourSpace');
  const classes = useStyles() as any;
  const goToHostOnBoarding = () => {
    router.push('/host-onboarding');
  };
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.between('xs', 'sm'));
  return (
    <>
      <Box className={classes.root}>
        <Box className={`${classes.wrapper1} ${classes.strechStyle}`}>
          {!isMobile ? (
            <Image
              name="cloud-left"
              folder="Host"
              extension="png"
              className={classes.imageDesktop}
            />
          ) : (
            <Image
              name="cloud-left-mobile"
              folder="Host"
              extension="png"
              className={classes.imageMobile}
            />
          )}
        </Box>
        <Box className={`${classes.listYourSpace} ${classes.strechStyle}`}>
          {!isMobile ? (
            <Image
              name="illus-host-onboarding"
              folder="Host"
              className={classes.imageDesktop}
            />
          ) : (
            <Image
              name="illus-host-onboarding-mobile"
              folder="Host"
              className={classes.imageMobile}
            />
          )}
        </Box>
        <Box className={classes.textArea}>
          <Info />
          <Box className={classes.actionBox}>
            <PrimaryButton onClick={goToHostOnBoarding} type="submit">
              <ButtonText>{t('buttonText')}</ButtonText>
            </PrimaryButton>
          </Box>
        </Box>
        <Box className={`${classes.wrapper2} ${classes.strechStyle}`}>
          {!isMobile ? (
            <Image
              name="cloud-right"
              folder="Host"
              extension="png"
              className={classes.imageDesktop}
            />
          ) : (
            <Image
              name="cloud-right-mobile"
              folder="Host"
              extension="png"
              className={classes.imageMobile}
            />
          )}
        </Box>
        <Box className={`${classes.wrapper3} ${classes.strechStyle}`}>
          <Image
            name="cloud-bottom-mobile"
            folder="Host"
            extension="png"
            className={classes.imageMobile}
          />
        </Box>
      </Box>
    </>
  );
};

export default ListYourSpace;
