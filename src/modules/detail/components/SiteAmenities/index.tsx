import {
  Box, fade, Grid, makeStyles, Theme, Typography, useMediaQuery,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import usePageTranslation from '../../../../hooks/usePageTranslation';
import { FragmentedFunction } from '../../../../typings/shared';
import { SiteAmenitiesDetailsFragment } from './__generated__/SiteAmenitiesDetailsFragment';
import { getTranslatedName } from '../../../../utilities/market';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: '40px',
    paddingBottom: '40px',
    borderBottom: `1px solid ${fade(theme.palette.grey[100], 0.1)}`,
    [theme.breakpoints.only('xs')]: {
      paddingBottom: '25px',
      paddingTop: '25px',
    },
  },
  itemsBox: {
    marginTop: '20px',
    display: 'flex',
  },
  itemBox: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    lineHeight: '40px',
    marginBottom: '5px',
  },
  imgBox: {
    position: 'relative',
    height: '30px',
    '& img': {
      width: '20px',
    },
  },
  textBox: {
    paddingLeft: '8px',
  },
  text: {
    color: '#888888',
  },
}));

type Props = { loading: boolean; } & SiteAmenitiesDetailsFragment;

type SiteAmenitiesType = FragmentedFunction<React.FunctionComponent<Props>, 'site'>;

const SiteAmenities: SiteAmenitiesType = ({ features, loading }) => {
  const classes = useStyles();
  const { locale } = useRouter();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.only('xs'));
  const { t } = usePageTranslation('details', 'SiteAmenities');
  const Loader = () => (
    <>
      {[1, 2, 3].map((i) => (
        <Box key={i} className={classes.itemBox}>
          <Box className={classes.imgBox}>
            <Skeleton variant="text" width={12} height={20} animation="wave" />
          </Box>
          <Box className={classes.textBox}>
            <Typography variant="body2" className={classes.text}>
              <Skeleton variant="text" width={80} animation="wave" />
            </Typography>
          </Box>
        </Box>
      ))}
    </>
  );

  return (
    <Box className={classes.root}>
      <Box>
        <Typography variant={isMobile ? 'h5' : 'h3'}>
          {t('title')}
        </Typography>
      </Box>
      <Box className={classes.itemsBox}>
        {loading && <Loader />}
        <Grid container>
          {!loading && features?.map((feat) => (
            <Grid key={feat.id} xs={6} sm={4} item>
              <Box className={classes.itemBox}>
                <Box className={classes.imgBox}>
                  <img src={feat.icon} alt={getTranslatedName(feat, 'name', locale)} />
                </Box>
                <Box className={classes.textBox}>
                  <Typography variant="body2" className={classes.text}>{getTranslatedName(feat, 'name', locale)}</Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

SiteAmenities.fragments = {
  site: gql`
    fragment SiteAmenitiesDetailsFragment on Site {
      features {
        id
        icon
        name_en
        name_th
        name_jp
        name_kr        
      }
    }
  `,
};

export default SiteAmenities;
