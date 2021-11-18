import { Box, makeStyles } from '@material-ui/core';
import WhiteTypography from '../../../../../components/Typographies/WhiteTypography';
import usePageTranslation from '../../../../../hooks/usePageTranslation';

const useStyles = makeStyles((theme) => ({
  description: {
    [theme.breakpoints.up('md')]: {
      fontSize: '24px',
      lineHeight: '50px',
    },
  },
}));

const Description = () => {
  const classes = useStyles();
  const { t } = usePageTranslation('home', 'HostASpace');
  return (
    <Box mt={10}>
      <WhiteTypography variant="body2" className={classes.description}>
        {t('desc')}
      </WhiteTypography>
    </Box>
  );
};

export default Description;
