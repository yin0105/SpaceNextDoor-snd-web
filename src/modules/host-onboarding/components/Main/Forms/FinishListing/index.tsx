import {
  Box, List, ListItem, ListItemText, makeStyles, Typography,
} from '@material-ui/core';
import { inject } from 'mobx-react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import Grey3Typography from '../../../../../../components/Typographies/Grey3Typography';
import PrimaryButton from '../../../../../../components/Buttons/PrimaryButton';
import Image from '../../../../../../components/Image';
import HostOnboardingStore, { ONBOARDING_STORE } from '../../../../stores/HostOnboardingStore';
import usePageTranslation from '../../../../../../hooks/usePageTranslation';

const useStyles = makeStyles((theme) => ({
  mainBox: {
    maxWidth: '630px',
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',
    padding: '50px 20px',
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
    marginTop: '40px',
    marginLeft: '-20px',
  },
  heading: {
    textDecoration: 'underline',
  },
  listItem: {
    marginBottom: '20px',
  },
  listItemText: {
    marginLeft: '20px',
  },
  finishButton: {
    color: '#FFFFFF',
    fontWeight: 700,
    fontSize: '1.6rem',
    width: '150px',
    padding: '11px 0',
  },
}));

interface IProps {
  store?: HostOnboardingStore;
}

const FinishListing = (props: IProps) => {
  const classes = useStyles();
  const { store: { goToStep, setStepSavingFunction } } = props;
  const router = useRouter();
  const { t } = usePageTranslation('hostOnBoarding', 'FinishListing');
  const links = [
    { title: t('linkTitle1'), step: 2 },
    { title: t('linkTitle2'), step: 3 },
    { title: t('linkTitle3'), step: 6 },
    { title: t('linkTitle4'), step: 7 },
    { title: t('linkTitle5'), step: 9 },
  ];
  const finishWizard = () => router.push('/host/listings');

  useEffect(() => {
    setStepSavingFunction(finishWizard);
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
        <Box className={classes.paddingRight}>
          <Box>
            <Grey3Typography variant="body1">
              {t('grey3Typography')}
            </Grey3Typography>
          </Box>
          <Box className={classes.boldBox}>
            <List>
              {links.map((link, i) => (
                <ListItem key={i} button className={classes.listItem}>
                  <Image name="check_dark" extension="svg" />
                  <ListItemText
                    className={classes.listItemText}
                    onClick={() => goToStep(link.step, true)}
                  >
                    <Grey3Typography variant="h3" className={classes.heading}>
                      {link.title}
                    </Grey3Typography>
                  </ListItemText>
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </Box>
      <Box mt={30}>
        <PrimaryButton className={classes.finishButton} onClick={finishWizard}>
          {t('primaryButton')}
        </PrimaryButton>
      </Box>
    </Box>
  );
};

export default inject(ONBOARDING_STORE)(FinishListing);
