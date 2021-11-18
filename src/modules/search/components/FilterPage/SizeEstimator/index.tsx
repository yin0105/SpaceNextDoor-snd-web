import {
  Box,
  fade,
  makeStyles,
  Typography,
  Link,
} from '@material-ui/core';

import { useRouter } from 'next/router';
import Options from './Options';
import Image from '../../../../../components/Image';
import usePageTranslation from '../../../../../hooks/usePageTranslation';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '15px 25px 0',
    paddingBottom: '30px',
    [theme.breakpoints.only('xs')]: {
      borderBottom: `1px solid ${fade(theme.palette.grey[100], 0.1)}`,
    },
    [theme.breakpoints.up('sm')]: {
      minHeight: '900px',
    },
  },
  beforeTitle: {
    display: 'flex',
    margin: '10px 0',
  },
  ask: {
    marginLeft: '8px',
    color: theme.palette.grey[100],
  },
  title: {
    margin: '14px 2px 15px',
  },
  options: {},
  estimate: {
    textDecoration: 'underline',
    cursor: 'pointer',
  },
  link: {
    textDecoration: 'none !important',
  },
}));

const SizeEstimator: React.FC = () => {
  const classes = useStyles();
  const { t } = usePageTranslation('search', 'SizeEstimator');
  const router = useRouter();

  return (
    <Box className={classes.root}>
      <Box className={classes.title}>
        <Typography variant="h4">
          {t('typography2')}
        </Typography>
      </Box>
      <Box className={classes.beforeTitle}>
        <Box>
          <Image name="help" folder="SearchLocation" />
        </Box>
        <Box className={classes.ask}>
          <Link className={classes.link} color="inherit" href={`/${router.locale}/estimator`}>
            <Typography
              className={classes.estimate}
              variant="body2"
            >
              {t('typography1')}
            </Typography>
          </Link>
        </Box>
      </Box>
      <Box className={classes.options}>
        <Options />
      </Box>
    </Box>
  );
};

export default SizeEstimator;
