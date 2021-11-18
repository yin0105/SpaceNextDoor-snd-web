import React, { FC } from 'react';
import { Box, makeStyles, Grid } from '@material-ui/core';
import OneItem from './OneItem';
import usePageTranslation from '../../../../../hooks/usePageTranslation';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '5px',
  },
  grid: {
    [theme.breakpoints.up('md')]: {
      '& .MuiGrid-item': {
        display: 'flex',
        justifyContent: 'center',
        '&:first-of-type': {
          justifyContent: 'flex-start',
        },
        '&:last-of-type': {
          justifyContent: 'flex-end',
        },
      },
    },
  },
}));

const Items: FC = () => {
  const classes = useStyles();
  const { t } = usePageTranslation('home', 'Items');

  const steps = [
    {
      title: t('find'),
      description: t('findDesc'),
    },
    {
      title: t('book'),
      description: t('bookDesc'),
    },
    {
      title: t('move'),
      description: t('moveDesc'),
    },

  ];

  return (
    <Box className={classes.root}>
      <Grid container className={classes.grid}>
        {steps.map((step, i) => (
          <Grid key={i} item xs={12} sm={4} lg={4}>
            <OneItem title={step.title} description={step.description} stepId={i + 1} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Items;
