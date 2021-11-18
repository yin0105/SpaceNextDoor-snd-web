import { Box, Button, makeStyles } from '@material-ui/core';
import { useRouter } from 'next/router';
import usePageTranslation from '../../../../../hooks/usePageTranslation';
import { scrollTop } from '../../../../../utilities/scrollTop';

const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.up('md')]: {
      maxWidth: '388px',
      minWidth: '300px',
      margin: '20px auto 0',
    },
  },
  button: {
    backgroundColor: '#F9E2C7',
    borderRadius: '15px',
    color: theme.palette.secondary.main,
    padding: '10px',
    fontWeight: 700,
    width: '100%',
    height: '50px',
    fontSize: '13px',
    lineHeight: '19.5px',
    [theme.breakpoints.up('md')]: {
      fontSize: '24px',
      maxWidth: '390px',
      marginTop: '40px',
      fontWeight: 600,
      height: '60px',
    },
    '&:hover': {
      backgroundColor: '#F9E2C7',
    },
  },
}));

const ButtonHost = () => {
  const router = useRouter();
  const goToHostPage = () => {
    router.push('/host').then(() => scrollTop());
  };
  const classes = useStyles();
  const { t } = usePageTranslation('home', 'HostASpace');
  return (
    <Box mt={10} className={classes.container}>
      <Button id="hostASpaceButton" className={classes.button} onClick={goToHostPage} fullWidth>{t('button')}</Button>
    </Box>
  );
};

export default ButtonHost;
