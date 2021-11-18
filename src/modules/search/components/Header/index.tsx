import { Box, makeStyles, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { inject, observer } from 'mobx-react';
import { useRouter } from 'next/router';
import GetAQuote from 'modules/quotations/components/GetAQuote';
import Grey2Typography from '../../../../components/Typographies/Grey2Typography';
import usePageTranslation from '../../../../hooks/usePageTranslation';
import { SitesListStore } from '../../stores/SitesListStore';
import { getTranslatedName, useCurrentCountry } from '../../../../utilities/market';

const useStyles = makeStyles({
  root: {
    padding: '15px 28px 0',
    height: 'max-content',
    minHeight: '99px',
    '& h1': {
      fontSize: '1.8rem',
      margin: 0,
    },
    '& h2': {
      fontSize: '1.4rem',
      margin: 0,
    },
  },
  secondLine: {
    marginTop: '6px',
  },
  thirdLine: {
    margin: '18px 0',
  },
  quote: {
    '& div': {
      margin: 0,
    },
  },
});

interface IProps {
  sitesStore?: SitesListStore;
}

const Header: React.FC<IProps> = ({ sitesStore }) => {
  const classes = useStyles();
  const { t } = usePageTranslation('search', 'SearchHeader');
  const country = useCurrentCountry();
  const router = useRouter();

  return (
    <Box className={classes.root}>
      <Box>
        <h1>
          {sitesStore.isLoading && <Skeleton width={150} variant="text" animation="wave" />}
          {!sitesStore.isLoading && t('typography1', { countryName: router?.query?.address as string || getTranslatedName(country, 'name', router.locale) })}
        </h1>
      </Box>
      {/* HIDDEN because the total does not match the number of displayed sites */}
      {/* <Box className={classes.secondLine}>
        <h2>
          {sitesStore.isLoading && <Skeleton width={200} variant="text" animation="wave" />}
          {!sitesStore.isLoading && (
            <span>
              {sitesStore.total}
              &nbsp;
              {t('typography2', { countryName: country })}
            </span>
          )}
        </h2>
      </Box> */}
      <Box className={classes.thirdLine}>
        <Grey2Typography variant="body2">
          {t('grey2Typography')}
        </Grey2Typography>
      </Box>
      <Box className={classes.quote}>
        <GetAQuote />
      </Box>
    </Box>
  );
};

export default inject('sitesStore')(observer(Header));
