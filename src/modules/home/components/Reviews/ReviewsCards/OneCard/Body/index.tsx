import {
  Box, makeStyles, Typography, Hidden,
} from '@material-ui/core';
import usePageTranslation from '../../../../../../../hooks/usePageTranslation';

const useStyles = makeStyles((theme) => ({
  description: {
    color: '#888888',
  },
  link: {
    color: theme.palette.primary.main,
  },
  title: {
    marginTop: '4px',
    marginBottom: '4px',
    [theme.breakpoints.up('md')]: {
      marginTop: '10px',
      marginBottom: '10px',
    },
  },
}));

type BodyInfo = {
  description: string
};

type Props = {
  bodyInfo: BodyInfo
};

const Body = (props: Props) => {
  const classes = useStyles();
  const { bodyInfo: { description } } = props;
  const { t } = usePageTranslation('home', 'OneCardBody');
  return (
    <Box pt={8} pb={8}>
      <Box>
        <Typography variant="body2" className={classes.description}>
          {description}
          <Hidden xsUp>

            <span className={classes.link}>{t('span')}</span>
          </Hidden>
        </Typography>
      </Box>
    </Box>
  );
};

export default Body;
