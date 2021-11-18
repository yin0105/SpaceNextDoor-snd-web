import { DocumentNode } from 'graphql';

/**
 * Usage:
 *  type SiteItemType = FragmentedFunction<React.FunctionComponent<Props>, 'site'|'post'>
 *  const SiteItem: SiteItemType = ....
 *
 *  SiteItem.fragments = {
 *   post: gq.l``,
 *   site: gq.l``
 *  };
 */
export type FragmentedFunction<T, V extends string> = T & {
  fragments: { [K in V]: DocumentNode }
};
