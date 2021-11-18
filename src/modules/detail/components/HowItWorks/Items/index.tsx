import { Box, makeStyles, Grid } from '@material-ui/core';
import usePageTranslation from '../../../../../hooks/usePageTranslation';
import OneItem from './OneItem';

const useStyles = makeStyles({
  root: {
    marginTop: '5px',
  },
});

const Items: React.FC = () => {
  const classes = useStyles();
  const { t } = usePageTranslation('details', 'Items');
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
      <Grid container>
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
