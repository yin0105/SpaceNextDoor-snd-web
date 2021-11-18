import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import { useQuery } from '@apollo/client';

import usePageTranslation from '../../../../hooks/usePageTranslation';
import { GET_SPACE_PRICE_BY_TYPE } from '../../../estimator/queries';
import { GetSpacePriceByType, GetSpacePriceByTypeVariables } from '../../../estimator/queries/__generated__/GetSpacePriceByType';
import { useCurrentCountry } from '../../../../utilities/market';

interface IProps {
  spaceTypeId: number,
}

const useStyle = makeStyles(() => ({
  text: {
    display: 'flex',
    fontSize: '16px',
    '& .MuiTypography-overline': {
      fontSize: '16px',
      marginRight: '3px',
      textTransform: 'none',
    },
  },
  bold: {
    fontWeight: 600,
    fontSize: '22px',
    margin: '0 0 0 10px',
  },
  link: {
    textDecoration: 'none !important',
  },
}));

const FindPrice: FC<IProps> = ({ spaceTypeId }) => {
  const classes = useStyle();
  const { t } = usePageTranslation('estimator', 'FindStorage');

  const { data } = useQuery<GetSpacePriceByType, GetSpacePriceByTypeVariables>(
    GET_SPACE_PRICE_BY_TYPE,
    { variables: { spaceTypeId, country: useCurrentCountry().name } },
  );

  const space = data?.spaces?.edges.length ? data?.spaces?.edges[0] : null;
  const price = space?.prices.length ? space?.prices[0] : null;

  return (
    <Box className={classes.text}>
      <Typography>
        {t('typography1')}
      </Typography>
      <Typography className={classes.bold}>
        {price?.currency_sign || ''}
        {price?.price_per_month || 0}
      </Typography>
      <Typography>
        /
        {' '}
        {t('typography2')}
      </Typography>
    </Box>
  );
};

export default FindPrice;
