import {
  Box, Grid, makeStyles, Typography,
} from '@material-ui/core';
import Image from '../../../../../../components/Image';
import Grey3Typography from '../../../../../../components/Typographies/Grey3Typography';
import PrimaryButton from '../../../../../../components/Buttons/PrimaryButton';
import WhiteTypography from '../../../../../../components/Typographies/WhiteTypography';
import Buttons from '../Buttons';
import OAuthButtons from './OAuthButtons';
import usePageTranslation from '../../../../../../hooks/usePageTranslation';

const useStyles = makeStyles((theme) => ({
  mainBox: {
    maxWidth: '630px',
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',
    padding: '100px 20px',
    [theme.breakpoints.down('sm')]: {
      padding: '20px',
    },
  },
  headerText: {
    lineHeight: '4.5rem',
  },

  formBox: {
    paddingTop: '16px',
  },
  logoLeftBox: {
    position: 'relative',
  },
  logoCheckBox: {
    position: 'absolute',
    bottom: '12px',
    right: '5px',
    display: 'flex',
    backgroundColor: theme.palette.primary.main,
    padding: '9px',
    border: '2px solid #FFFFFF',
    borderRadius: '50%',
  },
  logoBox: {
    width: '100%',
    borderRadius: '50%',
  },

  logoRightBox: {
    paddingTop: '8px',
    paddingLeft: '60px',
    paddingRight: '95px',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '0',
      paddingRight: '0',
    },
  },

  changePhotoBox: {
    marginTop: '24px',
    paddingRight: '60px',
    [theme.breakpoints.down('sm')]: {
      paddingRight: '0',
    },
  },
  changePhotoText: {
    fontWeight: 700,
    fontSize: '1.3rem',
  },

  beforeOAuthButtonsBox: {
    paddingTop: '55px',
    paddingBottom: '15px',
    [theme.breakpoints.down('sm')]: {
      paddingTop: '10px',
    },

  },
}));

interface IProps {
  changeStep: (step) => void
}

const FormLogo = (props: IProps) => {
  const classes = useStyles();
  const { changeStep } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    changeStep('next');
  };

  const { t } = usePageTranslation('hostOnBoarding', 'FormLogo');

  return (
    <Box className={classes.mainBox}>

      <Box>
        <Box>
          <Typography variant="h1" className={classes.headerText}>
            {t('typography')}
          </Typography>
        </Box>
      </Box>

      <Box className={classes.formBox}>
        <form onSubmit={handleSubmit}>
          <Grid container>
            <Grid item md={4} xs={12}>
              <Box className={classes.logoLeftBox}>
                <Box className={classes.logoBox}>
                  <Image name="avatar" folder="LoginPage" extension="jpg" fullWidth />
                  <Box className={classes.logoCheckBox}>
                    <Image name="checkLogo" folder="LoginPage" />
                  </Box>
                </Box>
              </Box>
            </Grid>

            <Grid item md={8} xs={12}>
              <Box className={classes.logoRightBox}>
                <Box>
                  <Grey3Typography />
                </Box>
                <Box className={classes.changePhotoBox}>
                  <PrimaryButton>
                    <input
                      type="file"
                      hidden
                    />
                    <WhiteTypography className={classes.changePhotoText}>
                      {t('whiteTypography')}
                    </WhiteTypography>
                  </PrimaryButton>
                </Box>
              </Box>
            </Grid>
          </Grid>

          <Box className={classes.beforeOAuthButtonsBox}>
            <Grey3Typography>
              {t('grey3Typography')}
            </Grey3Typography>
          </Box>

          <OAuthButtons />

          <Buttons isLoading={false} changeStep={changeStep} />
        </form>

      </Box>
    </Box>
  );
};

export default FormLogo;
