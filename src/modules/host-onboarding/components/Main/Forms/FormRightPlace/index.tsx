import { Box, makeStyles, Typography } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import { useEffect } from 'react';

import Buttons from '../Buttons';
import Grey3Typography from '../../../../../../components/Typographies/Grey3Typography';
import { LocationMap } from './map';
import HostOnboardingStore, { ONBOARDING_STORE } from '../../../../stores/HostOnboardingStore';
import usePageTranslation from '../../../../../../hooks/usePageTranslation';

const useStyles = makeStyles((theme) => ({
  mainBox: {
    maxWidth: '630px',
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',
    padding: '100px 20px',
    [theme.breakpoints.down('sm')]: {
      padding: '20px',
    },
  },
  formBox: {
    marginTop: '27px',
  },
  paddingRight: {
    paddingRight: '80px',
    [theme.breakpoints.down('sm')]: {
      paddingRight: '0',
    },
  },
  boldBox: {
    marginTop: '31px',
  },

  mapBox: {
    marginTop: '100px',
    [theme.breakpoints.down('sm')]: {
      marginTop: '20px',
    },
  },
}));

interface IProps {
  changeStep: (step) => void;
  store?: HostOnboardingStore;
}

const FormRightPlace = (props: IProps) => {
  const classes = useStyles();
  const { changeStep, store } = props;
  const { t } = usePageTranslation('hostOnBoarding', 'FormRightPlace');
  const handleSubmit = (e?: any) => {
    if (e) {
      e.preventDefault();
    }

    changeStep('next');
  };

  useEffect(() => {
    store.fetchSite(store.siteId);
    store.setStepSavingFunction(handleSubmit);
  }, []);

  return (
    <Box className={classes.mainBox}>
      <Box>
        <Box>
          <Typography variant="h1">
            {t('typography')}
          </Typography>
        </Box>
      </Box>
      <Box className={classes.formBox}>
        <form onSubmit={handleSubmit}>
          <Box className={classes.paddingRight}>
            <Box>
              <Grey3Typography variant="body1" />
            </Box>
            <Box className={classes.boldBox}>
              <Grey3Typography variant="h4" />
            </Box>
          </Box>

          <Box className={classes.mapBox}>
            {store.site?.address?.lat && (
              <LocationMap
                coords={{ lat: store.site?.address?.lat, lng: store.site?.address?.lng }}
                loadingElement={<div style={{ height: '100%' }} />}
                containerElement={<div style={{ height: '400px' }} />}
                mapElement={<div style={{ height: '100%' }} />}
              />
            )}
          </Box>

          <Buttons isLoading={false} changeStep={changeStep} />
        </form>

      </Box>
    </Box>
  );
};

export default inject(ONBOARDING_STORE)(observer(FormRightPlace));
