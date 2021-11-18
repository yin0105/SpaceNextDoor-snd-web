import { Box, Grid, makeStyles } from '@material-ui/core';
import usePageTranslation from '../../../../../hooks/usePageTranslation';
import OneItem from './OneItem';

const content = (t: (field: string) => string) => [
  {
    img: 'price',
    description: t('desc1'),
    title: t('title1'),
  },
  {
    img: 'booking',
    description: t('desc2'),
    title: t('title2'),
  },
  {
    img: 'payments',
    description: t('desc3'),
    title: t('title3'),
  },
  {
    img: 'insurance',
    description: t('desc4'),
    title: t('title4'),
  },
  {
    img: 'logistics',
    description: t('desc5'),
    title: t('title5'),
  },
  {
    img: 'IoT',
    description: t('desc6'),
    title: t('title6'),
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    borderBottom: `2px solid ${theme.palette.grey[100]}19`,
    paddingBottom: '40px',
    [theme.breakpoints.up('md')]: {
      paddingBottom: '80px',
      marginBottom: '60px',
    },
  },
}));

const Body = () => {
  const classes = useStyles();
  const { t } = usePageTranslation('home', 'Body');

  return (
    <Box width="100%" className={classes.root}>
      <Grid container spacing={6}>
        {content(t).map((item) => (
          <Grid item xs={6} md={4} key={item.title}>
            <OneItem img={item.img} title={item.title} description={item.description} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Body;
