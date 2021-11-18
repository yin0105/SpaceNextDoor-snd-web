import {
  Box, makeStyles, Typography, Hidden,
} from '@material-ui/core';
import Image from '../../../../../components/Image';
import usePageTranslation from '../../../../../hooks/usePageTranslation';

const useStyles = makeStyles((theme) => ({
  reviews: {
    color: '#888888',
    [theme.breakpoints.up('md')]: {
      fontSize: '16px',
      marginBottom: '10px',
    },
  },
  seeAll: {
    color: theme.palette.primary.main,
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  starsContainer: {
    height: '17px',
    marginTop: '2px',
    marginBottom: '6px',
    [theme.breakpoints.up('md')]: {
      height: '26px',
      marginTop: '6px',
      marginBottom: '28px',
    },
  },
}));

const Statistic = () => {
  const classes = useStyles();
  const { t } = usePageTranslation('home', 'Statistic');
  return (
    <Box width="100%" display="flex" p={1}>
      <Box display="flex" flexDirection="column" pr={4}>
        <Hidden xsUp>
          <Box>
            <Typography variant="body2" className={classes.reviews}>
              4.9/5 (4,623
              {' '}
              {t('typography1')}
              )
            </Typography>
          </Box>
        </Hidden>
        <Box className={classes.starsContainer}>
          <Image name="stars" folder="Homepage" fullWidth />
        </Box>
      </Box>
      <Hidden xsUp>
        <Box>
          <Typography variant="body2" className={classes.seeAll}>
            {t('typography2')}
          </Typography>
        </Box>
      </Hidden>
    </Box>
  );
};

export default Statistic;
