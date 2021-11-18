/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PlatformFeatureTypeFilter, PlatformFeatureType } from "./../../../../typings/graphql.types";

// ====================================================
// GraphQL query operation: PlatformFeaturesQuery
// ====================================================

export interface PlatformFeaturesQuery_feature_categories_edges_features {
  id: number;
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
  description_en: string | null;
  description_th: string | null;
  description_kr: string | null;
  description_jp: string | null;
  icon: string | null;
  type: PlatformFeatureType;
}

export interface PlatformFeaturesQuery_feature_categories_edges {
  id: number;
  name_en: string;
  name_kr: string;
  name_jp: string;
  name_th: string;
  features: PlatformFeaturesQuery_feature_categories_edges_features[];
}

export interface PlatformFeaturesQuery_feature_categories {
  edges: PlatformFeaturesQuery_feature_categories_edges[];
}

export interface PlatformFeaturesQuery {
  feature_categories: PlatformFeaturesQuery_feature_categories;
}

export interface PlatformFeaturesQueryVariables {
  type?: PlatformFeatureTypeFilter | null;
}
