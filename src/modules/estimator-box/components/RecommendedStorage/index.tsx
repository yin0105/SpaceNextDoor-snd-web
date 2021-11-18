import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, Hidden } from '@material-ui/core';
import { useQuery } from '@apollo/client';

import usePageTranslation from '../../../../hooks/usePageTranslation';
import { GetSpaceType, GetSpaceTypeVariables } from '../../../estimator/queries/__generated__/GetSpaceType';
import { GET_SPACE_TYPE } from '../../../estimator/queries';
import StartingPrice from '../FindPrice';
import { useCurrentCountry } from '../../../../utilities/market';

interface IProps {
  size: number;
  setSpaceTypeId: (id: number) => void
}

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: '36px',
    [theme.breakpoints.up('sm')]: {
      // width: '80%',
    },
  },
  title: {
    [theme.breakpoints.up('sm')]: {
      fontSize: '22px',
      marginBottom: '0',
    },
    marginBottom: '25px',
    fontSize: '16px',
    fontWeight: 600,
  },
  box: {
    border: `1px solid ${theme.palette.grey[50]}`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    height: '168px',
    padding: '15px',
    marginBottom: '25px',
    borderRadius: '22px',
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'space-between',
      width: '528px',
      height: '374px',
      padding: '32px',
    },
  },
  boxBody: {
    display: 'flex',
    alignItems: 'center',
  },
  image: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      width: '250px',
      height: '183px',
    },
    backgroundColor: '#FFFFFF',
    borderRadius: '15px',
    filter: 'drop-shadow(0px 15px 40px rgba(51, 51, 51, 0.1))',
  },
  icon: {
    width: '80%',
    // height: '133.83px',
  },
  info: {
    paddingLeft: '10px',
    [theme.breakpoints.up('md')]: {
      paddingLeft: '30px',
    },
  },
  header: {
    fontSize: '16px',
    color: theme.palette.grey[200],
    marginRight: '3px',
    '& .MuiTypography-caption': {
      fontSize: '20px',
      marginRight: '3px',
    },
  },
  bold: {
    fontWeight: 600,
    [theme.breakpoints.up('md')]: {
      fontSize: '20px',
    },
    lineHeight: '30px',
  },
  description: {
    fontSize: '12px',
    color: theme.palette.grey[100],
    [theme.breakpoints.up('md')]: {
      marginTop: '20px',
      fontSize: '18px',
      lineHeight: '25px',
    },
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
      <Hidden smUp>
        <Typography className={classes.title}>
          {t('typography1')}
        </Typography>
      </Hidden>
      <Box className={classes.box}>
        <Hidden only="xs">
          <Typography className={classes.title}>
            {t('typography1')}
          </Typography>
        </Hidden>
        <Box className={classes.boxBody}>
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
                  <br />
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
        <Hidden only="xs"><>{spaceType?.id && <StartingPrice spaceTypeId={spaceType?.id} />}</></Hidden>
      </Box>
    </Box>
  );
};

export default RecommendedStorage;
