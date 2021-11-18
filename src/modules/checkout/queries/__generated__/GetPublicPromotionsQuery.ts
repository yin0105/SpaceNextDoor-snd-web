/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPublicPromotionsQuery
// ====================================================

export interface GetPublicPromotionsQuery_promotions_edges_customer_buys {
  id: number;
  site_ids: number[] | null;
}

export interface GetPublicPromotionsQuery_promotions_edges {
  id: number;
  name_en: string;
  name_th: string;
  name_jp: string;
  description_en: string | null;
  description_th: string | null;
  description_jp: string | null;
  customer_buys: GetPublicPromotionsQuery_promotions_edges_customer_buys[];
}

export interface GetPublicPromotionsQuery_promotions {
  edges: GetPublicPromotionsQuery_promotions_edges[];
}

export interface GetPublicPromotionsQuery {
  promotions: GetPublicPromotionsQuery_promotions;
}
