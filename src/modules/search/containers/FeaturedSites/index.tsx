import { Box } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import { useRouter } from 'next/router';
import SiteItem from '../../components/SiteItem';
import SpaceItem from '../../components/SpaceItem';
import { SitesListStore, SITES_STORE_KEY } from '../../stores/SitesListStore';
import { PromotionStore, PROMOTION_STORE_KEY } from '../../../checkout/stores/PromotionStore';
import filterSitesWithoutSpaces from '../../../../utilities/filterSitesWithoutSpaces';
import { getTranslatedName } from '../../../../utilities/market';

interface IProps {
  [SITES_STORE_KEY]?: SitesListStore;
  [PROMOTION_STORE_KEY]?: PromotionStore;
}

const FeaturedSitesContainer: React.FunctionComponent<IProps> = ({
  sitesStore,
  promotionStore,
}) => {
  const router = useRouter();
  const { publicPromotions } = promotionStore;
  const featuredSites = filterSitesWithoutSpaces(sitesStore.featuredSites);

  return (
    <Box mr={5} ml={5}>
      {featuredSites.map((site, i) => {
        const address = (router?.query?.address) as string;
        const keyword = address.includes(',') ? address.split(',')[0] : address;
        const regex = new RegExp(`${keyword}`, 'gi');
        const location = `${getTranslatedName(site?.address?.district, 'name', router.locale)}, ${getTranslatedName(site?.address?.city, 'name', router.locale)}`;
        const isMatched = Boolean(location.match(regex));

        return isMatched && (
          <SiteItem htmlId={`FeaturedSite${i + 1}`} key={`${site.id}_${i}`} isFeatured site={site} promotions={publicPromotions || []}>
            {site.spaces.edges.slice(0, 6).map((space) => (
              <SpaceItem key={space.id} {...space} />
            ))}
          </SiteItem>
        );
      })}
    </Box>
  );
};

export default inject(SITES_STORE_KEY, PROMOTION_STORE_KEY)(observer(FeaturedSitesContainer));
