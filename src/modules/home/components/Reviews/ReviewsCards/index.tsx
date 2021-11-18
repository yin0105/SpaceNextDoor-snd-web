import { Box, makeStyles } from '@material-ui/core';
import usePageTranslation from '../../../../../hooks/usePageTranslation';
import OneCard from './OneCard';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('md')]: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridGap: '20px',
    },
  },
}));

const useReviews = () => {
  const { t } = usePageTranslation('home', 'ReviewCards');
  return [
    {
      fullName: t('name1'),
      stars: 4,
      live: t('live1'),
      description: t('desc1'),
    },
    {
      fullName: t('name2'),
      stars: 4,
      live: t('live2'),
      description: t('desc2'),
    },
    {
      fullName: t('name3'),
      stars: 4,
      live: t('live3'),
      description: t('desc3'),
    },
    {
      fullName: t('name4'),
      stars: 4,
      live: t('live4'),
      description: t('desc4'),
    },
  ];
};

const ReviewsCards = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      {useReviews().map((item) => (
        <OneCard key={item.description} info={item} />
      ))}
    </Box>
  );
};

export default ReviewsCards;
