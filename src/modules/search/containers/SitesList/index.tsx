import { Box, Typography } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useRouter } from 'next/router';

import dynamic from 'next/dynamic';
import SiteItem from '../../components/SiteItem';
import SpaceItem from '../../components/SpaceItem';
import { SitesListStore, SITES_STORE_KEY } from '../../stores/SitesListStore';
import { PromotionStore, PROMOTION_STORE_KEY } from '../../../checkout/stores/PromotionStore';
import usePageTranslation from '../../../../hooks/usePageTranslation';
import filterSitesWithoutSpaces from '../../../../utilities/filterSitesWithoutSpaces';
import { getTranslatedName } from '../../../../utilities/market';

const SiteItemLoader = dynamic(() => import('../../components/SiteItemLoader'), { ssr: false });

interface IProps {
  [SITES_STORE_KEY]?: SitesListStore;
  [PROMOTION_STORE_KEY]?: PromotionStore
}

const SitesListContainer: React.FunctionComponent<IProps> = ({
  sitesStore, promotionStore: { publicPromotions },
}) => {
  const router = useRouter();
  const { t } = usePageTranslation('search', 'SitesList');
  const { hasMore } = sitesStore;
  const sites = filterSitesWithoutSpaces(sitesStore.sites);

  return (
    <Box mr={5} ml={5} mt={20}>
      {!!sites.length && (
        <Box mb={8} ml={7}>
          <Typography variant="h3">
            {t('typography')}
          </Typography>
        </Box>
      )}
      <InfiniteScroll
        dataLength={sites.length}
        next={() => sitesStore.fetchSites()}
        hasMore={hasMore}
        loader={<SiteItemLoader />}
      >
        {sites.map((site, i) => {
          const address = (router?.query?.address) as string;
          let isMatched = true;
          if (address) {
            const keyword = address.includes(',') ? address.split(',')[0] : address;
            const regex = new RegExp(`${keyword}`, 'gi');
            const location = `${getTranslatedName(site?.address?.district, 'name', router.locale)}, ${getTranslatedName(site?.address?.city, 'name', router.locale)}`;
            isMatched = Boolean(location.match(regex));
          }

          return isMatched && (
            <SiteItem htmlId={`Site${i + 1}`} key={`${site.id}_${i}`} site={site} promotions={publicPromotions || []}>
              {site.spaces.edges.slice(0, 6).map((space) => (
                <SpaceItem key={space.id} {...space} />
              ))}
            </SiteItem>
          );
        })}
      </InfiniteScroll>
      <br />
      <br />
      <br />
    </Box>
  );
};

export default inject(SITES_STORE_KEY, PROMOTION_STORE_KEY)(observer(SitesListContainer));
