import {
  Box, Typography, makeStyles, withStyles,
} from '@material-ui/core';
import usePageTranslation from '../../../../../hooks/usePageTranslation';

const useStyles = makeStyles((theme) => ({
  header: {
    fontSize: '34px',
    marginTop: '16px',
    marginBottom: '2px',
  },
}));

const ReviewTypography = withStyles((theme) => ({
  root: {
    fontSize: '22px',
    fontWeight: 600,
    lineHeight: '30px',
    [theme.breakpoints.up('md')]: {
      fontSize: '34px',
      lineHeight: '50px',
      marginBottom: '6px',
    },
  },
}))(Typography);

const Header = () => {
  const classes = useStyles();
  const { t } = usePageTranslation('home', 'ReviewsHeader');
  return (
    <Box>
      <ReviewTypography variant="h2" className={classes.header}>
        {t('h2')}
      </ReviewTypography>
    </Box>
  );
};

export default Header;
