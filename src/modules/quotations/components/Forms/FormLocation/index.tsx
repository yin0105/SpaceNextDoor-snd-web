import { Box, makeStyles, Typography } from '@material-ui/core';
import usePageTranslation from 'hooks/usePageTranslation';
import { useRouter } from 'next/router';
import React from 'react';
import { useCurrentCountry } from 'utilities/market';
import { inject, observer } from 'mobx-react';
import { QuotationsStore, QUOTATIONS_STORE_KEY } from 'modules/quotations/stores/QuotationsStore';
import SelectLocation from './SelectLocation';
import Error from '../../Error';
import Loader from './Loader';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'column',
    maxWidth: '1040px',
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      paddingBottom: '100px',
    },
  },
  head: {
    display: 'flex',
    flexFlow: 'column',
    marginTop: '15px',
  },
  title: {
    fontWeight: 'bold',
    fontSize: '30px',
    lineHeight: '30px',
    margin: '15px 0',
    [theme.breakpoints.down('sm')]: {
      fontSize: '18px',
      lineHeight: '20px',
      marginTop: '5px',
    },
  },
  subtitle: {
    fontSize: '16px',
    lineHeight: '20px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px',
      lineHeight: '20px',
    },
  },
}));

interface IProps {
  [QUOTATIONS_STORE_KEY]?: QuotationsStore
}

const FormLocation: React.FC<IProps> = ({ quotationsStore }) => {
  const classes = useStyles();
  const router = useRouter();
  const { t } = usePageTranslation('quotations', 'FormLocation');
  const country = useCurrentCountry();
  const { spaceTypes, districts, isLoading } = quotationsStore;

  return (
    <Box className={classes.root}>
      <Box className={classes.head}>
        <Typography className={classes.title}>{t('typography1', { location: router?.query?.address as string || country.name })}</Typography>
        <Typography className={classes.subtitle}>{t('typography2')}</Typography>
      </Box>
      <Box minHeight="60px">
        {!!districts.length && !isLoading && !spaceTypes.length && <Error text={t('error')} />}
      </Box>
      {!!districts.length && <SelectLocation />}
      {isLoading && !districts.length && <Loader />}
    </Box>
  );
};

export default inject(QUOTATIONS_STORE_KEY)(observer(FormLocation));
