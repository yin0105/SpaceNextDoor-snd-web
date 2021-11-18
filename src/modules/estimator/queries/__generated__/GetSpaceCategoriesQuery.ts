/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SpaceCategoryItemSizeUnit } from "./../../../../typings/graphql.types";

// ====================================================
// GraphQL query operation: GetSpaceCategoriesQuery
// ====================================================

export interface GetSpaceCategoriesQuery_space_categories_edges_items {
  id: number;
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
  height: number;
  width: number;
  dimension: number;
  unit: SpaceCategoryItemSizeUnit;
}

export interface GetSpaceCategoriesQuery_space_categories_edges {
  id: number;
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
  icon: string;
  items: GetSpaceCategoriesQuery_space_categories_edges_items[];
}

export interface GetSpaceCategoriesQuery_space_categories {
  edges: GetSpaceCategoriesQuery_space_categories_edges[];
}

export interface GetSpaceCategoriesQuery {
  space_categories: GetSpaceCategoriesQuery_space_categories;
}
