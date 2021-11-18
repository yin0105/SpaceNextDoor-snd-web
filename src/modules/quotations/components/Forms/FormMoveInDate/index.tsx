import {
  Box, Typography, makeStyles, useMediaQuery, Theme,
} from '@material-ui/core';
import DayJS from 'components/DayJS';
import usePageTranslation from 'hooks/usePageTranslation';
import { inject, observer } from 'mobx-react';
import { QuotationsStore, QUOTATIONS_STORE_KEY } from 'modules/quotations/stores/QuotationsStore';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Promotions from './Promotions';
import SelectMoveInDate from './SelectMoveInDate';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: '100px',
    display: 'block !important',
  },
  heading: {
    fontSize: '30px',
    fontWeight: 700,
    margin: '20px 0 10px',
    lineHeight: '35px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '18px',
      lineHeight: '20px',
    },
  },
  subHeading: {
    fontSize: '16px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px',
      lineHeight: '20px',
    },
  },
  content: {
    display: 'flex',
  },
}));

interface IProps {
  [QUOTATIONS_STORE_KEY]?: QuotationsStore
}

const FormMoveInDate: React.FC<IProps> = ({ quotationsStore }) => {
  const classes = useStyles();
  const router = useRouter();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'));
  const { quotationDetails: { moveInDate, spaceId }, setQuotationDetails } = quotationsStore;
  const { t } = usePageTranslation('quotations', 'FormMoveInDate');
  const showPromotions = !!spaceId;
  useEffect(() => {
    if (router?.query?.move_in) {
      const moveIn = DayJS(router?.query?.move_in as string, 'DD-MM-YYYY');
      setQuotationDetails('moveInDate', moveIn);
    }
  }, []);

  return (
    <Box className={classes.root}>
      <Typography className={classes.heading}>{t('typography1')}</Typography>
      <Typography className={classes.subHeading}>{t('typography2')}</Typography>
      <Box className={classes.content} display="flex" justifyContent={showPromotions ? 'space-between' : 'center'} flexDirection={isMobile ? 'column' : 'row'}>
        <SelectMoveInDate showPromotions={showPromotions} onChange={(date) => setQuotationDetails('moveInDate', date)} value={moveInDate} minValue={DayJS().add(1, 'day')} />
        {showPromotions && <Promotions />}
      </Box>
    </Box>
  );
};

export default inject(QUOTATIONS_STORE_KEY)(observer(FormMoveInDate));
