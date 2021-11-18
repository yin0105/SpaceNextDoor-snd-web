import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import {
  Grid, Box, Button, makeStyles,
} from '@material-ui/core';
import { useEffect } from 'react';
import Heading from '../../../../components/Heading';
import Details from '../../components/Details';
import { GET_SPACE_QUERY } from '../../queries';
import {
  ListSpaceQuery,
  ListSpaceQueryVariables,
} from '../../queries/__generated__/ListSpaceQuery';
import DetailsLoader from '../../components/DetailsLoader';
import usePageTranslation from '../../../../hooks/usePageTranslation';
import { getTranslatedName } from '../../../../utilities/market';

const useStyles = makeStyles({
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '53px 0',
    boxSizing: 'border-box',
    '& .MuiButton-containedPrimary': {
      background: '#00A0E3',
      borderRadius: '10px',
      height: '40px',
      lineHeight: '40px',
      minWidth: '121px',
      color: '#ffffff',
      marginLeft: '15px',
      boxShadow: 'none',
    },
    '& .MuiButton-root': {
      fontSize: '13px',
      width: '100%',
      maxWidth: '121px',
      height: '50px',
    },
  },
  cancelbtn: {
    color: '#989898',
  },
});

interface IItem {
  link?: string;
  title: string;
}

const Listings: React.FC = (): JSX.Element => {
  const classes = useStyles();
  const router = useRouter();
  const { t } = usePageTranslation('hostListings', 'ListingDetails');
  const spaceId = parseInt(router?.query?.spaceId as string, 10);
  const items: IItem[] = [
    {
      link: '/host/listings',
      title: t('itemsTitle1'),
    },
    {
      title: t('itemsTitle2'),
    },
  ];
  const breadcrumbProps: { items: IItem[] } = {
    items,
  };
  useEffect(() => {
    if (!spaceId) {
      router.push('/host/listings');
    }
  });

  const { loading, data } = useQuery<ListSpaceQuery, ListSpaceQueryVariables>(
    GET_SPACE_QUERY,
    { variables: { listId: spaceId } },
  );

  const listItem = data?.space;
  const siteId = listItem?.site?.id;

  const gotToEditSpace = () => {
    if (siteId) {
      router.push(`/host/listings/space/edit/${spaceId}`);
    }
  };

  return (
    <>
      <Grid container justify="center">
        <Grid item xs={10}>
          {loading ? <DetailsLoader /> : (
            <>
              <Heading title={t('headingTitle')} subTitle={`${getTranslatedName(listItem?.site, 'name', router.locale)} ${t('headingSubtitle')}`} breadcrumbProps={breadcrumbProps} />
              <Details item={listItem} />
            </>
          )}
          <Box className={classes.buttonWrapper}>
            <Button onClick={() => router.push('/host/listings')} className={classes.cancelbtn}>{t('cancel')}</Button>
            <Button variant="contained" color="primary" onClick={gotToEditSpace}>{t('edit')}</Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Listings;
