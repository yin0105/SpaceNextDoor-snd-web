import { useState } from 'react';
import {
  Box, Grid, makeStyles, Tabs, Tab, Typography,
} from '@material-ui/core';

import Image from '../../../components/Image';
import LoginWithEmail from './ByEmail';
import LoginWithPhone from './ByPhone';
import usePageTranslation from '../../../hooks/usePageTranslation';
//
const useStyles = makeStyles((theme) => ({
  wrapper: {
    margin: '104px auto',
    padding: '0 20px',
    [theme.breakpoints.down('sm')]: {
      margin: '26px auto',
    },
  },
  header: {
    textAlign: 'center',
    marginBottom: '10px',
  },
  tabs: {
    width: 440,
  },
  tabsContainer: {
    borderBottom: `1px solid ${theme.palette.grey[50]}`,
  },
  tab: {
    border: '1px red solid',
  },
  tabWrapper: {
    flexDirection: 'row',
    '&>img': {
      marginBottom: '0px !important',
      marginRight: 5,
    },
  },
}));

const Login = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const { t } = usePageTranslation('login', 'Login');
  return (
    <Box>
      <Box className={classes.wrapper}>
        <Typography variant="h2" className={classes.header}>
          {t('typography1')}
        </Typography>
        <Grid
          container
          spacing={0}
          alignItems="center"
          justify="center"
        >

          <Box className={classes.tabs}>
            <Tabs
              value={value}
              onChange={(e, v) => setValue(v)}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              className={classes.tabsContainer}
            >
              <Tab
                label={<Typography variant="h5">{t('typography2')}</Typography>}
                icon={<Image name="email" folder="LoginPage" />}
                classes={{ wrapper: classes.tabWrapper }}
                id="viaEmail"
              />
              <Tab
                label={<Typography variant="h5">{t('typography3')}</Typography>}
                icon={<Image name="mobile" folder="LoginPage" />}
                classes={{ wrapper: classes.tabWrapper }}
                id="viaPhoneNumber"
              />
            </Tabs>

            {value === 0 && <LoginWithEmail />}
            {value === 1 && <LoginWithPhone />}

          </Box>

        </Grid>
      </Box>
    </Box>
  );
};

export default Login;
