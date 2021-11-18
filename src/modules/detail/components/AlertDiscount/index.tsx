import { makeStyles, Box } from '@material-ui/core';
import usePageTranslation from '../../../../hooks/usePageTranslation';

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#E6F9F1',
    [theme.breakpoints.up('md')]: {
      margin: '20px 60px',
      borderRadius: '22px',
      width: '350px',
      padding: '0 30px 23px',
    },
    [theme.breakpoints.up('sm')]: {
      margin: '20px 60px',
      borderRadius: '22px',
      width: '350px',
      padding: '0 30px 23px',
    },
  },
  container: {
    display: 'flex',
  },
  image: {
    margin: '20px 8px',
  },
  textDiscount: {
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '0.5px',
  },
}));

const AlertDiscount = () => {
  const classes = useStyles();
  const { t } = usePageTranslation('details', 'QuotationAlert');

  return (
    <div className={classes.root}>
      <Box className={classes.container}>
        <Box className={classes.image}>
          <img src="/images/DetailPage/percent-green.svg" alt="" />
        </Box>
        <Box>
          <p className={classes.textDiscount}>{t('typography1')}</p>
          <p>{t('typography2')}</p>
        </Box>
      </Box>
    </div>
  );
};
export default AlertDiscount;
