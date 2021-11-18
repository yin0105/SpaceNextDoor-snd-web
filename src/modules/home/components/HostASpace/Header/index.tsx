import { Box, makeStyles } from '@material-ui/core';
import WhiteTypography from '../../../../../components/Typographies/WhiteTypography';
import usePageTranslation from '../../../../../hooks/usePageTranslation';

const useStyles = makeStyles((theme) => ({
  header: {
    [theme.breakpoints.up('md')]: {
      fontSize: '34px',
      lineHeight: '50px',
    },
  },
}));

const Header = () => {
  const classes = useStyles();
  const { t } = usePageTranslation('home', 'HostASpace');
  return (
    <Box pr={10}>
      <WhiteTypography variant="h3" className={classes.header}>
        {t('header')}
      </WhiteTypography>
    </Box>
  );
};

export default Header;
