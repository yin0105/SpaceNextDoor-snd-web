import { Box, makeStyles } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import HostOnboardingStore, { ONBOARDING_STORE } from '../../stores/HostOnboardingStore';
import Info from './Info';
import ProgressLine from './ProgressLine';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '44px 84px',
    [theme.breakpoints.down('sm')]: {
      margin: '20px 30px',
    },
  },
}));

interface IProps {
  store?: HostOnboardingStore;
}

const Header: React.FC<IProps> = ({ store }) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      {store.currentStep > 0 && <Info />}
      <ProgressLine step={store.currentStep} />
    </Box>
  );
};

export default inject(ONBOARDING_STORE)(observer(Header));
