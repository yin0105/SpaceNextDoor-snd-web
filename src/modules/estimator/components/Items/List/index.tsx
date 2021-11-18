import React, { FC } from 'react';
import { Box, Link, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';

import Image from '../../../../../components/Image';
import usePageTranslation from '../../../../../hooks/usePageTranslation';
import { ICategorySelectedItem } from '../../../stores/EstimatorStore';
import { useCurrentCountry, getTranslatedName } from '../../../../../utilities/market';

interface IProps {
  clearAll: () => void,
  clearOne: (catId: number, itemId: number) => void,
  items: ICategorySelectedItem[],
  itemsDimension: number,
  maxHeight?: string;
}

const useStyles = makeStyles((theme) => ({
  container: {
    padding: '16px 20px',
    border: `1px solid ${theme.palette.grey[50]}`,
    borderRadius: '22px',
    maxHeight: '630px',
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '40px',
      height: '520px',
    },
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '10px',
    fontSize: '1.2rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
    },
  },
  blockTitle: {
    fontWeight: 600,
    color: '#484451',
    fontSize: '1em',
    lineHeight: '20px',
    textTransform: 'uppercase',
  },
  link: {
    fontSize: '1em',
    cursor: 'pointer',
    textDecoration: 'none',
  },
  items: {
    color: theme.palette.grey[100],
    height: '500px',
    overflowY: 'scroll',
    paddingRight: '10px',
    '&::-webkit-scrollbar': {
      width: '0.4em',
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      outline: 'none',
      border: 'none',
    },
    [theme.breakpoints.down('sm')]: {
      height: '400px',
    },
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '&:not(:last-of-type)': {
      marginBottom: '10px',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.2rem',
    },
  },
  itemName: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.2rem',
    },
  },
  close: {
    cursor: 'pointer',
  },
  footer: {
    background: theme.palette.grey[50],
    height: '50px',
    width: '100%',
    padding: '15px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    left: 0,
    borderRadius: '0 0 22px 22px',
    fontSize: '1.4rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.2rem',
    },
    '& p': {
      fontSize: '1em',
    },
  },
}));

const List: FC<IProps> = ({
  clearAll, clearOne, items, itemsDimension, maxHeight,
}) => {
  const classes = useStyles();
  const { locale } = useRouter();
  const { sizeUnit } = useCurrentCountry();
  const { t } = usePageTranslation('estimator', 'List');
  if (!items.length) {
    return <></>;
  }

  return (
    <Box className={classes.container} style={maxHeight ? { maxHeight } : {}}>
      <Box className={classes.header}>
        <Typography className={classes.blockTitle}>
          {t('typography1')}
        </Typography>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <Link onClick={clearAll} className={classes.link}>
          {t('link')}
        </Link>
      </Box>
      <Box className={classes.items} style={maxHeight ? { maxHeight: parseInt(maxHeight, 10) - 100, height: '100%' } : {}}>
        {items.map((item, index) => (
          <Box className={classes.item} key={index}>
            <Typography>
              {getTranslatedName(item, 'name', locale)}
            </Typography>
            <Box className={classes.close} onClick={() => clearOne(item.catId, item.id)}>
              <Image name="close" folder="Estimator" />
            </Box>
          </Box>
        ))}
      </Box>
      <Box className={classes.footer}>
        <Typography>{t('typography2')}</Typography>
        <Typography>
          {itemsDimension}
          {' '}
          {sizeUnit}
        </Typography>
      </Box>
    </Box>
  );
};

export default List;
