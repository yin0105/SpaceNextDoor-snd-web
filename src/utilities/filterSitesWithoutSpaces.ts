import { ISite } from 'shared/interfaces';

const filterSitesWithoutSpaces = (sites: ISite[]) => {
  const sitesFilteredSpaces = sites.map((site) => {
    const filteredSpaces = site.spaces?.edges
      .filter((space) => !!space?.prices?.[0]?.price_per_month);
    return {
      ...site,
      spaces: {
        edges: filteredSpaces,
      },
    };
  });
  return sitesFilteredSpaces.filter((site) => !!site.spaces.edges.length);
};

export default filterSitesWithoutSpaces;
