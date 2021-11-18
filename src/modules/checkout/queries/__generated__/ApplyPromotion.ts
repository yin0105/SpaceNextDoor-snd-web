/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ApplyPromotion
// ====================================================

export interface ApplyPromotion_applyPromotion_promotion {
  id: number;
  name_en: string;
  code: string | null;
}

export interface ApplyPromotion_applyPromotion {
  price_per_month: number;
  total: number;
  discounted_amount: number;
  total_after_discount: number;
  promotion: ApplyPromotion_applyPromotion_promotion | null;
}

export interface ApplyPromotion {
  applyPromotion: ApplyPromotion_applyPromotion;
}

export interface ApplyPromotionVariables {
  moveInDate: any;
  moveOutDate?: any | null;
  spaceId: number;
  promoCode: string;
}
