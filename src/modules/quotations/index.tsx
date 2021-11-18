import { Box, makeStyles } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import {
  QuotationsStore,
  QUOTATIONS_STORE_KEY,
} from 'modules/quotations/stores/QuotationsStore';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useCurrentCountry } from 'utilities/market';
import DayJS from 'components/DayJS';
import ProgressLine from 'modules/host-onboarding/components/Header/ProgressLine';
import Forms from './components/Forms';
import Footer from './components/Footer';
import Header from './components/Header';
import Thanks from './components/Thanks';
import AuthStore, { AUTH_STORE_KEY } from '../app/stores/AuthStore';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: '100vw',
    height: '100vh',
    maxWidth: '100vw',
    maxHeight: '100vh',
    margin: 0,
    overflowX: 'hidden',
  },
  content: {
    maxWidth: '1065px',
    margin: '0 auto',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      padding: '15px',
    },
  },
  progress: {
    '& div': {
      margin: '0 auto',
      maxWidth: '1065px',
    },
  },
  containerFooter: {
    width: '100vw',
    background: 'white',
    position: 'fixed',
    bottom: 0,
    boxShadow: `0px -5px 10px 0px ${theme.palette.grey[50]}`,
  },
  rootFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '80px',
    maxWidth: '1040px',
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      padding: '0 15px',
    },
  },
  textButtonBack: {
    marginLeft: '-41px',
    color: theme.palette.primary.main,
    '&:hover': {
      background: 'initial',
    },
  },
  buttonBack: {
    width: '140px',
    height: '50px',
    fontSize: 13,
    fontWeight: 600,
  },
}));

interface IProps {
  [QUOTATIONS_STORE_KEY]?: QuotationsStore;
  [AUTH_STORE_KEY]?: AuthStore;
}

const QuotationFlow: React.FC<IProps> = ({ quotationsStore, auth }) => {
  const classes = useStyles();
  const router = useRouter();
  const country = useCurrentCountry();
  const {
    currentStep,
    getDistricts,
    getSpaceTypes,
    totalSteps,
    districts,
    quotationDetails,
    isSuccess,
  } = quotationsStore;

  const moveInDate = router?.query?.move_in
    ? DayJS(router?.query?.move_in as string, 'DD-MM-YYYY').format('YYYY-MM-DD')
    : DayJS().add(1, 'day').format('YYYY-MM-DD');

  useEffect(() => {
    getDistricts({
      countryId: country.id,
      moveInDate,
    });
  }, []);

  useEffect(() => {
    if (districts.length) {
      getSpaceTypes({
        country: country.name,
      });
    }
  }, [districts, quotationDetails.districtIds]);

  return (
    <Box className={classes.paper}>
      <Header />
      {!isSuccess ? (
        <>
          <Box className={classes.progress}>
            <ProgressLine step={currentStep} totalSteps={totalSteps} />
          </Box>
          <Box className={classes.content}>
            <Forms currentStep={currentStep} />
          </Box>
          <Footer
            containerFooter={classes.containerFooter}
            rootFooter={classes.rootFooter}
            textButtonBack={classes.textButtonBack}
            buttonBack={classes.buttonBack}
          />
        </>
      ) : (
        <Thanks />
      )}
    </Box>
  );
};

export default inject(QUOTATIONS_STORE_KEY, AUTH_STORE_KEY)(observer(QuotationFlow));
