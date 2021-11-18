// ----------------------
// Elastic search call requires a query object where all of the filters are present
// this function takes sites and spaces filters and returns the elastic search query object
// ----------------------

export interface ICoords {
  lat: number;
  lon: number;
}

export interface IBounds {
  top_left: ICoords;
  bottom_right: ICoords;
}
export interface ISiteFilters {
  isFeatured?: boolean;
  siteFeatureIds?: number[];
  latLng?: ICoords;
  distance?: number;
  polygon?: ICoords[];
  siteIds?: number[];
  districtIds?: number[];
  cityIds?: number[];
  countryId: number;
  cityId?: number;
  districtId?: number;
}

export interface ISpaceFilters {
  spaceTypeId?: number;
  spaceFeatureIds?: number[];
  priceRangeStart?: number;
  priceRangeEnd?: number;
  notRequireSpaces?: boolean;
  numberOfSpaces?: number;
}

type FiltersArray = { [key: string]: any }[];

const addFilter = (
  filters: FiltersArray,
  field: string,
  value: any,
  objectName = 'match',
) => {
  if (value != null) {
    const filter = {};
    filter[objectName] = {};
    filter[objectName][field] = value;
    filters.push(filter);
  }
};

const convertSitesFilter = (filter: ISiteFilters) => {
  const {
    isFeatured, siteFeatureIds, polygon,
    siteIds, countryId, cityId,
    districtId, districtIds,
    cityIds,
  } = filter;
  const filters: FiltersArray = [];

  if (!polygon?.length) {
    addFilter(filters, 'is_featured', isFeatured);
  }

  addFilter(filters, 'status', 'ACTIVE');
  addFilter(filters, 'address.country_id', countryId);
  if (siteIds?.length) {
    const ids: FiltersArray = [];
    for (let i = 0; i < siteIds.length; i += 1) {
      addFilter(ids, 'id', siteIds[i], 'term');
    }
    filters.push({
      bool: {
        should: ids,
      },
    });
    return filters;
  }

  if (districtIds?.length) {
    const ids: FiltersArray = [];
    for (let i = 0; i < districtIds.length; i += 1) {
      addFilter(ids, 'address.district_id', districtIds[i], 'term');
    }

    filters.push({
      bool: {
        should: ids,
      },
    });
  } else {
    addFilter(filters, 'address.district_id', districtId);
  }

  if (cityIds?.length) {
    const ids: FiltersArray = [];
    for (let i = 0; i < cityIds.length; i += 1) {
      addFilter(ids, 'address.city_id', cityIds[i], 'term');
    }
    filters.push({
      bool: {
        should: ids,
      },
    });
  } else {
    addFilter(filters, 'address.city_id', cityId);
  }

  if (siteFeatureIds?.length) {
    const featureIds: FiltersArray = [];
    for (let i = 0; i < siteFeatureIds.length; i += 1) {
      addFilter(featureIds, 'features', siteFeatureIds[i], 'term');
    }
    filters.push({
      bool: {
        should: featureIds,
      },
    });
  }
  // Send Filters conditionally, if site ids are given, no need to apply further filters
  return filters;
};

const convertSpacesFilter = (filter: ISpaceFilters, forMap = false) => {
  const {
    spaceTypeId, spaceFeatureIds, priceRangeStart, priceRangeEnd, numberOfSpaces = 100,
    notRequireSpaces,
  } = filter;
  const filters: FiltersArray = [];

  addFilter(filters, 'spaces.space_type', spaceTypeId);
  addFilter(filters, 'spaces.status', 'ACTIVE');

  if (priceRangeStart || priceRangeEnd) {
    const priceRange = {
      gte: priceRangeStart || 0,
      lte: priceRangeEnd || 1000000,
    };
    addFilter(filters, 'spaces.price.pre_month', priceRange, 'range');
  }

  if (spaceFeatureIds?.length) {
    const featureIds: FiltersArray = [];
    for (let i = 0; i < spaceFeatureIds.length; i += 1) {
      addFilter(featureIds, 'features', spaceFeatureIds[i], 'term');
    }
    filters.push({
      bool: {
        should: featureIds,
      },
    });
  }

  const nestedQuery = {
    nested: {
      path: 'spaces',
      query: {
        bool: {
          must: [...filters],
        },
      },
    },
  };

  const source = [
    'spaces.size',
    'spaces.size_unit',
    'spaces.length',
    'spaces.width',
    'spaces.available_units',
    'spaces.space_type',
    'spaces.features',
    'spaces.price.type',
    'spaces.price.currency',
    'spaces.status',
  ];

  const innerHits = {
    _source: [
      'spaces.id',
      'spaces.price.currency_sign',
      'spaces.price.pre_month',
    ],
    sort: [
      {
        'spaces.price.pre_month': {
          order: 'asc',
        },
      },
    ],
    from: 0,
    size: numberOfSpaces,
  };

  if (!forMap) {
    // eslint-disable-next-line
    innerHits._source = innerHits._source.concat(source);
  }

  if (!notRequireSpaces) {
    // eslint-disable-next-line
    nestedQuery.nested['inner_hits'] = innerHits
  }

  return nestedQuery;
};

// This function returns the object for 'query' parameter
// which is required when requesting data from elastic search

export const getElasticQuery = (
  siteFilters: ISiteFilters,
  spaceFilters: ISpaceFilters,
  forMap = false,
) => {
  const {
    countryId, cityId, districtId, latLng, distance, polygon,
  } = siteFilters;
  const spacesFilters = convertSpacesFilter(spaceFilters, forMap);
  const canSearchByLatLng = !(countryId || cityId || districtId);
  const filters = ({
    bool: {
      must: [
        ...convertSitesFilter(siteFilters),
      ],
    },
  });
  // Send Filters conditionally, if site ids are given, no need to apply filters
  filters.bool.must.push(spacesFilters);
  if (forMap && polygon) {
    // eslint-disable-next-line
    filters.bool['filter'] = {
      geo_polygon: {
        'address.geo_location': {
          points: polygon,
        },
      },
    };
  } else if (distance && latLng && canSearchByLatLng) {
    // eslint-disable-next-line
    filters.bool['filter'] = {
      geo_distance: {
        distance: `${siteFilters.distance}km`,
        'address.geo_location': siteFilters.latLng,
      },
    };
  }
  return filters;
};
