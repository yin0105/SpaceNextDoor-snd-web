import { useRouter } from 'next/router';
import {
  Box, makeStyles, Grid, Button, Typography,
} from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import HostOnboardingStore from '../../../host-onboarding/stores/HostOnboardingStore';
import usePageTranslation from '../../../../hooks/usePageTranslation';

const useStyles = makeStyles({
  root: {
    marginTop: '60px',
    flexGrow: 1,
  },
  box: {
    backgroundColor: '#FFD8C8',
    padding: '60px',
    borderRadius: '22px',
  },
  text: {
    margin: '22px 0px',
    float: 'left',
    width: '100%',
  },
  button: {
    width: '150px',
    height: '37px',
    borderRadius: '5.89671px',
    fontSize: '9.58216px',
    fontWeight: 'bold',
    lineHeight: '23px',
    letterSpacing: '0.01em',
    color: '#fff',
    boxShadow: 'none',
    background: '#EA5B21',
    '&:hover': {
      backgroundColor: '#FF9056',
      boxShadow: 'none',
    },
  },
});

interface IProps {
  onboardingStore?: HostOnboardingStore
}

const EmptyListing: React.FC<IProps> = ({ onboardingStore }) => {
  const classes = useStyles();
  const router = useRouter();

  const goToCreateSite = () => {
    onboardingStore.goToStep(2);
    router.push('/host-onboarding');
  };

  const { t } = usePageTranslation('hostListings', 'EmptyListing');

  return (
    <Box className={classes.root}>
      <Grid spacing={4} container className={classes.box}>
        <Grid item xs={12} xl={8}>
          <Typography variant="h4" gutterBottom>
            {t('typography1')}
          </Typography>
          <Typography gutterBottom className={classes.text}>
            {t('typography2')}
          </Typography>
          <Button className={classes.button} variant="contained" onClick={() => goToCreateSite()}>
            {t('button')}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default inject('onboardingStore')(observer(EmptyListing));
