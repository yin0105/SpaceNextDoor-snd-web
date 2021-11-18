import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, Link } from '@material-ui/core';
import { useQuery } from '@apollo/client';

import { useRouter } from 'next/router';
import PrimaryButton from '../../../../components/Buttons/PrimaryButton';
import usePageTranslation from '../../../../hooks/usePageTranslation';
import { GET_SPACE_PRICE_BY_TYPE } from '../../../estimator/queries';
import { GetSpacePriceByType, GetSpacePriceByTypeVariables } from '../../../estimator/queries/__generated__/GetSpacePriceByType';
import { useCurrentCountry } from '../../../../utilities/market';

interface IProps {
  spaceTypeId: number,
}

const useStyle = makeStyles((theme) => ({
  container: {
    position: 'fixed',
    background: 'white',
    width: '100%',
    zIndex: 99,
    bottom: 0,
    borderRadius: '22px 22px 0 0',
    boxShadow: '0px 15px 40px rgba(51, 51, 51, 0.1)',
    padding: '15px 25px',
    backgroundColor: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.up('sm')]: {
      boxShadow: 'none',
      width: '50%',
      padding: 0,
      marginBottom: '250px',
    },
  },
  text: {
    fontSize: '14px',
    '& .MuiTypography-overline': {
      fontSize: '14px',
      marginRight: '3px',
      textTransform: 'none',
    },
  },
  bold: {
    fontWeight: 600,
  },
  button: {
    '& button': {
      fontWeight: 600,
      fontSize: '13px',
      color: '#FFFFFF',
      padding: '14px 30px',
      [theme.breakpoints.up('sm')]: {
        padding: '14px 100px',
      },
    },
  },
  link: {
    textDecoration: 'none !important',
  },
}));

const FindStorage: FC<IProps> = ({ spaceTypeId }) => {
  const classes = useStyle();
  const { t } = usePageTranslation('estimator', 'FindStorage');
  const router = useRouter();

  const { data } = useQuery<GetSpacePriceByType, GetSpacePriceByTypeVariables>(
    GET_SPACE_PRICE_BY_TYPE,
    { variables: { spaceTypeId, country: useCurrentCountry().name } },
  );

  const space = data?.spaces?.edges.length ? data?.spaces?.edges[0] : null;
  const price = space?.prices.length ? space?.prices[0] : null;

  return (
    <Box className={classes.container}>
      <Box className={classes.text}>
        <Typography>
          {t('typography1')}
        </Typography>
        <Typography variant="overline" className={classes.bold}>
          {price?.currency_sign || ''}
          {price?.price_per_month || 0}
          /
        </Typography>
        <Typography variant="overline">
          {t('typography2')}
        </Typography>
      </Box>
      <Box className={classes.button}>
        <Link className={classes.link} color="inherit" href={`/${router.locale}/search?space_type=${spaceTypeId}`}>
          <PrimaryButton>
            {t('typography3')}
          </PrimaryButton>
        </Link>
      </Box>
    </Box>
  );
};

export default FindStorage;
