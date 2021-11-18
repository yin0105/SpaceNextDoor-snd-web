import {
  Box, Breadcrumbs, Grid, Hidden, Link, makeStyles, Typography,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { useRouter } from 'next/router';

import SecondaryTypography from '../../../../components/Typographies/SecondaryTypography';
import WhiteTypography from '../../../../components/Typographies/WhiteTypography';
import usePageTranslation from '../../../../hooks/usePageTranslation';
import { objToQueryStr } from '../../../../utilities/objectToQueryString';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginTop: '10px',
  },
  firstItemBox: {
    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
    minWidth: '170px',
    borderRadius: '15px',
    backgroundColor: theme.palette.secondary.light,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '31px',
    [theme.breakpoints.only('xs')]: {
      height: '21px !important',
      minWidth: '112px',
    },
  },
  secondItemBox: {
    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
    minWidth: '170px',
    borderRadius: '15px',
    backgroundColor: theme.palette.secondary.main,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '31px',
    [theme.breakpoints.only('xs')]: {
      height: '21px !important',
      minWidth: '112px',
    },
  },
  loader: {
    backgroundColor: theme.palette.grey[50],
  },
  text: {
    fontSize: '1rem',
    fontWeight: 700,
    lineHeight: '1.7rem',
  },
  wrapper: {
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'flex-end',
    },
  },
}));

interface IProps {
  name: string;
  isFeatured: boolean;
  city: string;
  loading: boolean;
}

const Achievements: React.FC<IProps> = ({
  name, city, loading, isFeatured,
}) => {
  const classes = useStyles();
  const router = useRouter();
  const { t } = usePageTranslation('details', 'BreadCrumbs');
  return (
    <Box className={classes.root}>
      <Grid container alignItems="center">
        <Hidden only="xs">
          <Grid item xs={12} sm={7}>
            <Breadcrumbs aria-label="breadcrumb" separator=">">
              <Link color="inherit" href={`/${router.locale}/search`}>
                {t('search')}
              </Link>
              <Link color="inherit" href={`/${router.locale}/search?${objToQueryStr(router.query)}`}>
                {loading && (
                  <Skeleton variant="text" animation="wave" className={classes.loader} width={110} />
                )}
                {!loading && (
                  <span>
                    {t('storage')}
                    &nbsp;
                    {city}
                  </span>
                )}
              </Link>
              <Typography color="textPrimary">
                {loading && (
                  <Skeleton variant="text" animation="wave" className={classes.loader} width={150} />
                )}
                {!loading && name}
              </Typography>
            </Breadcrumbs>
          </Grid>
        </Hidden>
        {isFeatured && (
          <Grid item xs={12} sm={5}>
            <Grid container spacing={5} className={classes.wrapper}>
              <Grid item>
                <Box className={classes.firstItemBox}>
                  <SecondaryTypography className={classes.text}>
                    {t('secondTypography')}
                  </SecondaryTypography>
                </Box>
              </Grid>
              <Grid item>
                <Box className={classes.secondItemBox}>
                  <WhiteTypography className={classes.text}>
                    {t('whiteTypography')}
                  </WhiteTypography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default Achievements;
