/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: HostListingSitesQuery
// ====================================================

export interface HostListingSitesQuery_sites_page_info {
  total: number;
  has_more: boolean | null;
  skip: number;
  limit: number;
}

export interface HostListingSitesQuery_sites_edges_address_country {
  id: number;
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
}

export interface HostListingSitesQuery_sites_edges_address_city {
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
}

export interface HostListingSitesQuery_sites_edges_address_district {
  name_en: string;
  name_th: string;
  name_jp: string;
  name_kr: string;
}

export interface HostListingSitesQuery_sites_edges_address {
  country: HostListingSitesQuery_sites_edges_address_country;
  city: HostListingSitesQuery_sites_edges_address_city;
  district: HostListingSitesQuery_sites_edges_address_district;
}

export interface HostListingSitesQuery_sites_edges {
  id: number;
  name: string | null;
  name_en: string | null;
  name_th: string | null;
  name_jp: string | null;
  name_kr: string | null;
  description: string | null;
  images: string[] | null;
  address: HostListingSitesQuery_sites_edges_address | null;
}

export interface HostListingSitesQuery_sites {
  page_info: HostListingSitesQuery_sites_page_info;
  edges: HostListingSitesQuery_sites_edges[];
}

export interface HostListingSitesQuery {
  sites: HostListingSitesQuery_sites;
}

export interface HostListingSitesQueryVariables {
  limit: number;
  offset: number;
  search?: string | null;
}
