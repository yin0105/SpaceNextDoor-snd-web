import { Box, makeStyles, Typography } from '@material-ui/core';
import usePageTranslation from '../../../../hooks/usePageTranslation';
import Items from './Items';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '24px',
  },
  headerBox: {
    [theme.breakpoints.only('xs')]: {
      display: 'flex',
      justifyContent: 'center',
    },
  },
}));

const HowItWorks: React.FunctionComponent = () => {
  const classes = useStyles();
  const { t } = usePageTranslation('details', 'HowItWorks');
  return (
    <Box className={classes.root}>
      <Box className={classes.headerBox}>
        <Typography variant="h2">
          {t('h2')}
        </Typography>
      </Box>
      <Items />
    </Box>
  );
};

export default HowItWorks;
