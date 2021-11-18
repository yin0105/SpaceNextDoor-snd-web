import {
  Box, Grid, makeStyles, Theme, Typography, useMediaQuery,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { ISpace } from 'shared/interfaces';

import ImageLoader from '../../../../../../components/ImageLoader';
import usePageTranslation from '../../../../../../hooks/usePageTranslation';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: '15px',
  },
  text: {
    marginBottom: '40px',

    [theme.breakpoints.only('xs')]: {
      marginBottom: '10px',

      '& h6': {
        fontWeight: 600,
      },
    },
  },
  imageWrapper: {
    boxShadow: '0px 15px 40px rgba(51, 51, 51, 0.1)',
    width: '250px',
    height: '250px',
    borderRadius: '15px',
    padding: '35px',
    [theme.breakpoints.only('xs')]: {
      width: '100px',
      height: '100px',
      padding: '10px',

      '& img': {
        maxWidth: '100%',
      },
    },
  },
  featureList: {
    listStyle: 'none',
    margin: '0',
    marginLeft: '15px',
    padding: 0,

    [theme.breakpoints.only('xs')]: {
      marginLeft: '0',
    },

    '& p': {
      fontSize: '1.6rem',
      color: theme.palette.grey[100],
      marginLeft: '10px',

      [theme.breakpoints.only('xs')]: {
        fontSize: '1.2rem',
      },
    },
    '& li': {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '20px',

      [theme.breakpoints.only('xs')]: {
        marginBottom: '10px',
      },
    },
    '& span': {
      width: '14px',
      height: '14px',
      display: 'block',
      borderRadius: '50px',
      backgroundColor: '#7A7777',

      [theme.breakpoints.only('xs')]: {
        width: '6px',
        height: '6px',
      },
    },
  },
  imgLoader: {
    borderRadius: '15px',
  },
}));

interface IProps {
  features: ISpace['features'];
  size: number;
  unit: string;
  icon: string;
}

const SpaceDetails: React.FC<IProps> = ({
  features, unit, size, icon,
}) => {
  const classes = useStyles();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.only('xs'));
  const { t } = usePageTranslation('details', 'SpaceDetails');
  return (
    <Box className={classes.root}>
      <Box className={classes.text}>
        <Typography variant={isMobile ? 'h6' : 'h3'}>
          {t('title')}
          &nbsp;
          {size}
          &nbsp;
          {unit}
        </Typography>
      </Box>
      <Box>
        <Grid container>
          <Grid item xs={5} sm={6}>
            <Box className={classes.imageWrapper}>
              <ImageLoader
                loading={false}
                placeholder={(
                  <Skeleton height="100%" width="100%" className={classes.imgLoader} variant="rect" />
                )}
              >
                {icon && (
                  <img src={icon} alt="type icon" />
                )}
              </ImageLoader>
            </Box>
          </Grid>
          <Grid item xs={7} sm={6}>
            <ul className={classes.featureList}>
              {features.map((feat) => (
                <li key={feat.id}>
                  <span />
                  <Typography variant="body1">{feat.name_en}</Typography>
                </li>
              ))}
            </ul>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SpaceDetails;
