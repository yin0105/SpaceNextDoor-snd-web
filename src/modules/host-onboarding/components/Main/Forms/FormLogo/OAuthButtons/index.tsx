import {
  Grid, Box, Button, makeStyles, Typography,
} from '@material-ui/core';
import Image from '../../../../../../../components/Image';
import usePageTranslation from '../../../../../../../hooks/usePageTranslation';

const useStyles = makeStyles((theme) => ({
  buttonBox: {
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '10px',
    },
  },
  buttonImgBox: {
    position: 'absolute',
    top: '16px',
    left: '45px',
  },
  button: {
    position: 'relative',
    padding: '19px 53px 11px 78px',
    border: '1px solid #E9E9E9',
    borderRadius: '15px',
    textTransform: 'none',
  },
  buttonText: {
    fontSize: '13px',
    fontWeight: 700,
  },
}));

const OAuthButtons: React.FC = () => {
  const classes = useStyles();
  const { t } = usePageTranslation('hostOnBoarding', 'OAuthButtons');
  return (
    <Grid container>

      <Grid item sm={6} xs={12}>
        <Box className={classes.buttonBox}>
          <Button className={classes.button}>
            <Box className={classes.buttonImgBox}>
              <Image name="google" folder="LoginPage" />
            </Box>
            <Typography className={classes.buttonText}>
              {t('typography1')}
            </Typography>
          </Button>
        </Box>
      </Grid>

      <Grid item sm={6} xs={12}>
        <Box className={classes.buttonBox}>
          <Button className={classes.button}>
            <Box className={classes.buttonImgBox}>
              <Image name="facebook" folder="LoginPage" />
            </Box>
            <Typography className={classes.buttonText}>
              {t('typography2')}
            </Typography>
          </Button>
        </Box>
      </Grid>

    </Grid>
  );
};

export default OAuthButtons;
