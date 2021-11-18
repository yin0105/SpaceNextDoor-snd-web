import {
  Box, makeStyles, withStyles, Typography,
} from '@material-ui/core';
import { useTranslatedCountryName } from 'utilities/market';
import usePageTranslation from '../../../../../hooks/usePageTranslation';

const TitleTypography = withStyles((theme) => ({
  root: {
    color: 'white',
    fontSize: '30px',
    fontWeight: 700,
    lineHeight: '35px',
    [theme.breakpoints.up('md')]: {
      fontSize: '64px',
      lineHeight: '70px',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      '-webkit-line-clamp': 3, /* number of lines to show */
      '-webkit-box-orient': 'vertical',
      maxWidth: '720px',
    },
  },
}))(Typography);

const SubtitleTypography = withStyles((theme) => ({
  root: {
    color: 'white',
    fontSize: '12px',
    fontWeight: 'normal',
    lineHeight: '35px',
    [theme.breakpoints.up('md')]: {
      fontSize: '22px',
      lineHeight: '35px',
    },
  },
}))(Typography);

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  row: {
    [theme.breakpoints.up('md')]: {
      marginBottom: '10px',
    },
  },
}));

const Title = () => {
  const classes = useStyles();
  const { t } = usePageTranslation('home', 'SearchHeaderTitle');
  return (
    <Box className={classes.root} p={4}>
      <Box className={classes.row}>
        <TitleTypography variant="h1">
          {t('titleTypographyLine1')}
          {' '}
          <br />
          {t('titleTypographyLine2')}
          {' '}
          <br />
          {t('titleTypographyLine3', { country: useTranslatedCountryName() })}
        </TitleTypography>
      </Box>
      <Box className={classes.row}>
        {' '}
        <br />
        <SubtitleTypography variant="subtitle1">
          {t('subtitleTypography')}
        </SubtitleTypography>
      </Box>
    </Box>
  );
};

export default Title;
