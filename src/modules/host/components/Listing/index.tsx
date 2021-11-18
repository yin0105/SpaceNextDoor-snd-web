import React, { Fragment, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import { Box } from '@material-ui/core';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useRouter } from 'next/router';

import Heading from '../../../../components/Heading';
import ListItem from '../ListItem';
import ListTable from '../ListTable';
import useStyles from './styles';
import HostListLoader from '../HostListLoader';
import HostListsStore from '../../stores/HostListingsStore';
import SearchListings from '../../containers/SearchListings';
import EmptyListing from '../EmptyListing';
import usePageTranslation from '../../../../hooks/usePageTranslation';
import { getTranslatedPlace } from '../../../../utilities/locations';
import { useCurrentCountry, getTranslatedName } from '../../../../utilities/market';

interface IListingProps {
  hostListsStore?: HostListsStore;
}

const Listing: React.FunctionComponent<IListingProps> = ({
  hostListsStore,
}) => {
  const currentCountry = useCurrentCountry();
  const classes = useStyles();
  const router = useRouter();
  const {
    lists,
    hasMore,
    fetchLists,
    isLoading,
  } = hostListsStore;

  useEffect(() => {
    fetchLists({});
  }, []);

  const renderLoader = () => (
    [1, 2, 3].map((item: any) => (
      <HostListLoader key={item} />
    ))
  );
  const { t } = usePageTranslation('hostListings', 'Listing');
  return (
    <>
      <Box mb={40}>
        <Heading title={t('headingTitle')} subTitle={t('headingSubtitle')} showFilter />
        <Box className={classes.searchWrapper}>
          <SearchListings />
        </Box>
        {isLoading && renderLoader()}
        {!isLoading && lists.length === 0 ? <EmptyListing /> : null}
        <InfiniteScroll
          dataLength={lists.length}
          next={() => fetchLists({ isLoadMore: true })}
          hasMore={hasMore}
          scrollThreshold={0.9}
          loader={<HostListLoader />}
        >
          {lists
            .filter((site) => site?.address?.country?.id === currentCountry?.id)
            .map((site, i) => (
              <Fragment key={`${site.id}_${i}`}>
                {i !== 0 && <Box className={classes.dividerLine} />}
                <Box mb={10}>
                  <Accordion
                    TransitionProps={{ unmountOnExit: true }}
                    classes={{ root: classes.accordion }}
                  >
                    <AccordionSummary classes={{ content: classes.accordionContent }}>
                      <ListItem
                        imgSrc={site?.images[0] || ''}
                        title={getTranslatedName(site, 'name', router.locale) || t('listItemTitle')}
                        address={getTranslatedPlace(site?.address, router.locale)}
                        rating={0}
                        id={site?.id || null}
                      />
                    </AccordionSummary>
                    <AccordionDetails>
                      <ListTable siteId={site?.id} />
                    </AccordionDetails>
                  </Accordion>
                </Box>
              </Fragment>
            ))}
        </InfiniteScroll>
        {/* <Box style={{ textAlign: 'right', paddingTop: '23px', marginBottom: '20px' }}>
          <Button
            className={classes.getHelpButton}
            variant="contained"
            color="secondary"
            startIcon={<Image name="Gethelp" folder="Host" />}
          >
            Get Help
          </Button>
        </Box> */}
      </Box>
    </>
  );
};

export default inject('hostListsStore')(observer(Listing));
