import { Box, makeStyles } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { inject, observer } from 'mobx-react';
import Image from '../../../../../components/Image';
import FormPhone from './FormPhone';
import FormLogo from './FormLogo';
// import FormKindOfPlace from './FormKindOfPlace';
import FormKindOfPlaceContainer from './FormKindOfPlaceContainer';
import FormPlaceLocated from './FormPlaceLocated';
import FormRightPlace from './FormRightPlace';
import FormSiteFeatures from './FormSiteFeatures';
import FormAddPhotos from './FormAddPhotos';
import FormDescribePlace from './FormDescribePlace';
import FormCreateTitle from './FormCreateTitle';
import FormMeasurementsSpace from './FormMeasurementsSpace';
import FinishListing from './FinishListing';
import HostOnboardingStore, { ONBOARDING_STORE } from '../../../stores/HostOnboardingStore';
import AuthStore, { AUTH_STORE_KEY } from '../../../../app/stores/AuthStore';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
  },
  imageBox: {
    position: 'absolute',
    top: '0px',
    left: '-5px',
    [theme.breakpoints.down('sm')]: {
      position: 'relative',
      left: '0px',
      display: 'flex',
      justifyContent: 'center',
    },
  },
  paddingRight: {
    paddingRight: '80px',
    [theme.breakpoints.down('sm')]: {
      paddingRight: '0',
    },
  },
  headerText: {
    fontSize: '3.7rem',
    lineHeight: '4.5rem',
  },
}));

interface IProps {
  store?: HostOnboardingStore;
  auth?: AuthStore;
  siteId?: any;
  spaceId?: number;
}

const Forms: React.FC<IProps> = ({
  store, auth, siteId, spaceId,
}) => {
  const classes = useStyles();
  const router = useRouter();

  const changeStep = (move: string) => {
    if (move === 'next') {
      store.nextStep();
    } else if (move === 'back') {
      store.prevStep();
    }
  };

  useEffect(() => {
    if (auth.isAuthenticated) {
      store.fetchSite(siteId);
    } else {
      store.goToStep(0, false);
    }

    if (spaceId) {
      store.goToStep(9);
    }
  }, [auth.isAuthenticated, auth.user]);

  const stepForm = useMemo(() => {
    switch (store.currentStep) {
      // switch (Number(2)) {
      case 0:
        return (
          <FormPhone
            step={store.currentStep}
            changeStep={(move) => {
              if (move === 'next') {
                store.nextStep();
                store.nextStep();
                // Skip logo step
              } else {
                changeStep(move);
              }
            }}
          />
        );
      case 1:
        return (<FormLogo changeStep={changeStep} />);
      case 2:
        // return (<FormKindOfPlace changeStep={changeStep} />);
        return (<FormKindOfPlaceContainer changeStep={changeStep} />);
      case 3:
        return (<FormPlaceLocated siteId={store.siteId} changeStep={changeStep} />);
      case 4:
        return (<FormRightPlace changeStep={changeStep} />);
      case 5:
        return (<FormSiteFeatures siteId={store.siteId} changeStep={changeStep} />);
      case 6:
        return (<FormAddPhotos siteId={store.siteId} changeStep={changeStep} />);
      case 7:
        return (<FormCreateTitle siteId={store.siteId} changeStep={changeStep} />);
      case 8:
        return (<FormDescribePlace siteId={store.siteId} changeStep={changeStep} />);
      case 9:
        return (
          <FormMeasurementsSpace
            siteId={store.siteId}
            spaceId={spaceId}
            changeStep={changeStep}
          />
        );
      case 10:
        return (<FinishListing />);
      default:
        router.push('/');
        return false;
    }
  }, [store.currentStep, store.siteId]);

  return (
    <Box className={classes.root}>
      <Box className={classes.imageBox}>
        <Image name="snd-logo" folder="Host" />
      </Box>
      {stepForm}
    </Box>
  );
};

export default inject(ONBOARDING_STORE, AUTH_STORE_KEY)(observer(Forms));
