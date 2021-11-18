/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SortBy } from "./../../../../../../../typings/graphql.types";

// ====================================================
// GraphQL query operation: GetPropertyTypes
// ====================================================

export interface GetPropertyTypes_property_types_page_info {
  total: number;
  has_more: boolean | null;
  skip: number;
  limit: number;
}

export interface GetPropertyTypes_property_types_edges {
  id: number;
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
}

export interface GetPropertyTypes_property_types {
  page_info: GetPropertyTypes_property_types_page_info;
  edges: GetPropertyTypes_property_types_edges[];
}

export interface GetPropertyTypes {
  property_types: GetPropertyTypes_property_types;
}

export interface GetPropertyTypesVariables {
  skip: number;
  limit: number;
  name_en: SortBy;
}
