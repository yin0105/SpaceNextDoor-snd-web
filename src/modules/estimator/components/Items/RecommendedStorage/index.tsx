import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import { useQuery } from '@apollo/client';

import usePageTranslation from '../../../../../hooks/usePageTranslation';
import { GetSpaceType, GetSpaceTypeVariables } from '../../../queries/__generated__/GetSpaceType';
import { GET_SPACE_TYPE } from '../../../queries';
import { useCurrentCountry } from '../../../../../utilities/market';

interface IProps {
  size: number;
  setSpaceTypeId: (id: number) => void
}

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: '36px',
    [theme.breakpoints.up('sm')]: {
      width: '50%',
    },
  },
  title: {
    [theme.breakpoints.up('md')]: {
      fontSize: '22px',
    },
    marginBottom: '10px',
    fontSize: '14px',
    fontWeight: 600,
  },
  box: {
    border: `1px solid ${theme.palette.grey[50]}`,
    display: 'grid',
    gridTemplateColumns: '100px 1fr',
    gridGap: '12px',
    padding: '20px',
    borderRadius: '22px',
  },
  image: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100px',
    height: '100px',
    backgroundColor: '#FFFFFF',
    borderRadius: '15px',
    filter: 'drop-shadow(0px 15px 40px rgba(51, 51, 51, 0.1))',
  },
  icon: {
    width: '85px',
    height: '73px',
  },
  info: {

  },
  header: {
    color: theme.palette.grey[200],
    '& .MuiTypography-caption': {
      fontSize: '16px',
      marginRight: '3px',
    },
  },
  bold: {
    fontWeight: 600,
  },
  description: {
    color: theme.palette.grey[100],
    fontSize: '12px',
  },
}));

const RecommendedStorage: FC<IProps> = ({ size, setSpaceTypeId }) => {
  const classes = useStyles();
  const { sizeUnit } = useCurrentCountry();
  const { t } = usePageTranslation('estimator', 'RecommendedStorage');

  const { loading, data } = useQuery<GetSpaceType, GetSpaceTypeVariables>(
    GET_SPACE_TYPE,
    {
      variables: {
        size: parseInt(String(size), 10),
        country: useCurrentCountry().name,
      },
    },
  );

  const spaceType = data?.space_types?.edges.length ? data?.space_types?.edges[0] : null;

  if (spaceType?.id) {
    setSpaceTypeId(spaceType?.id);
  }

  return (
    <Box className={classes.container}>
      <Typography className={classes.title}>
        {t('typography1')}
      </Typography>
      <Box className={classes.box}>
        <Box className={classes.image}>
          {spaceType?.icon && (
            <img className={classes.icon} src={spaceType?.icon} alt={spaceType?.name_en} />
          )}
        </Box>
        <Box className={classes.info}>
          <Box className={classes.header}>
            {loading ? (
              <Typography variant="caption">
                loading...
              </Typography>
            ) : (
              <>
                <Typography className={classes.bold} variant="caption">
                  {spaceType?.name_en || ''}
                </Typography>
                <Typography variant="caption">
                  {t('typography2')}
                </Typography>
                <Typography className={classes.bold} variant="caption">
                  (
                  {spaceType?.size_from}
                  {' '}
                  -
                  {' '}
                  {spaceType?.size_to}
                  {' '}
                  {sizeUnit}
                  )
                </Typography>
              </>
            )}
          </Box>
          <Box className={classes.description}>
            {t('box')}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default RecommendedStorage;
