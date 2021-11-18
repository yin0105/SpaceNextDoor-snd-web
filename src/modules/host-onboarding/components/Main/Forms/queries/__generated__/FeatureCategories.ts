/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SortBy, PlatformFeatureType } from "../../../../../../../typings/graphql.types";

// ====================================================
// GraphQL query operation: FeatureCategories
// ====================================================

export interface FeatureCategories_feature_categories_page_info {
  total: number;
  has_more: boolean | null;
  skip: number;
  limit: number;
}

export interface FeatureCategories_feature_categories_edges_features {
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

export interface FeatureCategories_feature_categories_edges {
  id: number;
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
  features: FeatureCategories_feature_categories_edges_features[];
}

export interface FeatureCategories_feature_categories {
  page_info: FeatureCategories_feature_categories_page_info;
  edges: FeatureCategories_feature_categories_edges[];
}

export interface FeatureCategories {
  feature_categories: FeatureCategories_feature_categories;
}

export interface FeatureCategoriesVariables {
  skip: number;
  limit: number;
  name_en: SortBy;
  space: PlatformFeatureType;
  is_active: boolean;
}
