import {
  Box, makeStyles, Theme, Typography,
} from '@material-ui/core';
import usePageTranslation from 'hooks/usePageTranslation';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import queryString from 'query-string';
import AffiliateTypeform from 'modules/detail/components/AffiliateTypeform';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: theme.palette.secondary.light,
    minHeight: '90px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '18px',
    borderRadius: '15px',
    marginTop: '30px',
    maxWidth: '685px',
    marginLeft: '10px',
  },
  text: {
    fontSize: '14px',
    lineHeight: '20px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',
    },
  },
  getAQuote: {
    color: theme.palette.secondary.main,
    fontWeight: 600,
    textDecoration: 'underline',
    cursor: 'pointer',
  },
}));

const GetAQuote: React.FC = () => {
  const classes = useStyles();
  const { t } = usePageTranslation('quotations', 'GetAQuote');
  const router = useRouter();
  const [isTypeformOpen, setIsTypeformOpen] = useState(false);
  const {
    // eslint-disable-next-line
    address, country_id, city_id, district_id, lat, lng,
  } = router.query;
  const query = {
    address,
    country_id,
    city_id,
    district_id,
    lat,
    lng,
  };

  const clickHandler = () => {
    if (router.defaultLocale === 'ja') {
      setIsTypeformOpen(true);
      return;
    }
    router.push(`/get-a-quote?${queryString.stringify(query)}`);
  };

  return (
    <Box className={classes.root}>
      <Typography className={classes.text}>
        {t('typography1')}
        {' '}
        <span
          role="presentation"
          onClick={clickHandler}
          className={classes.getAQuote}
        >
          {t('typography2')}
        </span>
      </Typography>
      <AffiliateTypeform isOpen={isTypeformOpen} setIsOpen={setIsTypeformOpen} />
    </Box>
  );
};

export default GetAQuote;
