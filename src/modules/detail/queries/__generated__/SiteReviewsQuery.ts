/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SiteReviewsQuery
// ====================================================

export interface SiteReviewsQuery_sites_edges_reviews {
  total: number;
  average_rating: number;
}

export interface SiteReviewsQuery_sites_edges {
  id: number;
  google_reviews_widget_id: string | null;
  reviews: SiteReviewsQuery_sites_edges_reviews;
}

export interface SiteReviewsQuery_sites {
  edges: SiteReviewsQuery_sites_edges[];
}

export interface SiteReviewsQuery {
  sites: SiteReviewsQuery_sites;
}

export interface SiteReviewsQueryVariables {
  siteId: number;
}
