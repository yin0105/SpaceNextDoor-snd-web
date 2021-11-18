import { GetPublicPromotionsQuery_promotions_edges } from '../modules/checkout/queries/__generated__/GetPublicPromotionsQuery';

const findCustomerBuys = (
  promotion: GetPublicPromotionsQuery_promotions_edges,
  siteId: number,
) => promotion.customer_buys.find((buys) => (buys.site_ids || []).includes(siteId));

// filter promotions by site id
export const filterPromotions = (
  promotions: GetPublicPromotionsQuery_promotions_edges[],
  siteId: number,
): GetPublicPromotionsQuery_promotions_edges[] => {
  promotions = promotions || [];
  return promotions.filter((promo) => !!findCustomerBuys(promo, siteId));
};
