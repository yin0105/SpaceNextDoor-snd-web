/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SpacesQuery
// ====================================================

export interface SpacesQuery_spaces_edges_site {
  id: number;
}

export interface SpacesQuery_spaces_edges {
  id: number;
  site: SpacesQuery_spaces_edges_site;
}

export interface SpacesQuery_spaces {
  edges: SpacesQuery_spaces_edges[];
}

export interface SpacesQuery {
  spaces: SpacesQuery_spaces;
}

export interface SpacesQueryVariables {
  id: number;
}
