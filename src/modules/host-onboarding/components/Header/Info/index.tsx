import { Box, Button, makeStyles } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import { useRouter } from 'next/router';
import Grey2Typography from '../../../../../components/Typographies/Grey2Typography';
import PrimaryTypography from '../../../../../components/Typographies/PrimaryTypography';
import usePageTranslation from '../../../../../hooks/usePageTranslation';
import HostOnboardingStore, { ONBOARDING_STORE } from '../../../stores/HostOnboardingStore';

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
  a: {
    textDecoration: 'none',
    textTransform: 'none',
  },
});

interface IProps {
  store?: HostOnboardingStore;
}

const Info: React.FC<IProps> = ({ store }) => {
  const classes = useStyles();
  const router = useRouter();
  const { t } = usePageTranslation('hostOnBoarding', 'Info');
  return (
    <Box className={classes.root}>
      <Box>
        <Grey2Typography variant="h3">
          {/* Saved 10 minutes ago */}
        </Grey2Typography>
      </Box>
      {/* <Box>
        <Image name="ellipse" folder="LoginPage" />
      </Box> */}
      <Box>
        <Button
          className={classes.a}
          onClick={() => {
            if (store.stepSavingFunction) {
              store.stepSavingFunction();
              router.push('/');
            }
          }}
        >
          <PrimaryTypography variant="h3">
            {t('primaryTypography')}
          </PrimaryTypography>
        </Button>
      </Box>
    </Box>
  );
};

export default inject(ONBOARDING_STORE)(observer(Info));
