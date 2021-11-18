/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PlatformFeatureType } from "./../../../../../../../typings/graphql.types";

// ====================================================
// GraphQL query operation: FeatureCategoriesQuery
// ====================================================

export interface FeatureCategoriesQuery_feature_categories_page_info {
  total: number;
  has_more: boolean | null;
  skip: number;
  limit: number;
}

export interface FeatureCategoriesQuery_feature_categories_edges_features {
  id: number;
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
  description_en: string | null;
  description_th: string | null;
  description_jp: string | null;
  description_kr: string | null;
  icon: string | null;
  type: PlatformFeatureType;
  is_active: boolean;
}

export interface FeatureCategoriesQuery_feature_categories_edges {
  id: number;
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
  features: FeatureCategoriesQuery_feature_categories_edges_features[];
}

export interface FeatureCategoriesQuery_feature_categories {
  page_info: FeatureCategoriesQuery_feature_categories_page_info;
  edges: FeatureCategoriesQuery_feature_categories_edges[];
}

export interface FeatureCategoriesQuery {
  feature_categories: FeatureCategoriesQuery_feature_categories;
}

export interface FeatureCategoriesQueryVariables {
  limit: number;
  offset: number;
  isActive: boolean;
  type: PlatformFeatureType;
}
