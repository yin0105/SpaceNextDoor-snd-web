import { Box, Grid, makeStyles } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import dynamic from 'next/dynamic';
import HostOnboardingStore, { ONBOARDING_STORE } from '../../stores/HostOnboardingStore';

import GetHelpButton from '../GetHelpButton';
import Image from '../../../../components/Image';

const Forms = dynamic(import('./Forms'), { ssr: false });

const useStyles = makeStyles((theme) => ({
  item: {
    [theme.breakpoints.up('sm')]: {
      paddingLeft: 105,
    },
  },
  rightBox: {
    background: '#EAF0F7',
  },
}));

interface IProps {
  [ONBOARDING_STORE]?: HostOnboardingStore;
  siteId?: number;
  spaceId?: number
}

const Main: React.FC<IProps> = ({ siteId, spaceId, store }) => {
  const classes = useStyles();
  const showFinishImage = store?.currentStep === 10;
  return (
    <Box>
      <Grid container>
        <Grid item md={7} xs={12} className={classes.item}>
          <Forms siteId={siteId} spaceId={spaceId} />
        </Grid>
        {showFinishImage ? (
          <Grid md={5} item xs={12}>
            <Box>
              <Image name="illus-host-onboarding-success" folder="Host" />
            </Box>
          </Grid>
        ) : (<Grid md={5} item xs={12} className={classes.rightBox} />)}
      </Grid>
      <GetHelpButton />
    </Box>
  );
};

export default inject(ONBOARDING_STORE)(observer(Main));
