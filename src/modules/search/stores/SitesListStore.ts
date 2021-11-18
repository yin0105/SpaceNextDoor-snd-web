/* eslint prefer-destructuring: 0 */
import {
  observable, action, runInAction, computed, makeAutoObservable,
} from 'mobx';
import DayJS, { Dayjs } from 'dayjs';
import CustomParse from 'dayjs/plugin/customParseFormat';
import pickBy from 'lodash/pickBy';
import identity from 'lodash/identity';
import Router from 'next/router';
import { FixedCountry } from 'typings/graphql.types';
import {
  getElasticQuery, ICoords, ISiteFilters, ISpaceFilters,
} from 'utilities/getElasticQuery';
import getAvailableStock from 'utilities/getAvailableStock';
import elasticSearch, { IParams } from 'utilities/elasticSearch';
import getAvailableSites from 'utilities/getAvailableSites';
import convertSitesToGraphqlFormat from 'utilities/convertSitesToGraphqlFormat';
import { GoogleMap } from 'react-google-maps';
import { ILocalizedNames, ISite } from 'shared/interfaces';
import { getCountry } from 'utilities/market';
import { IElasticSite } from 'pages/api/es';
import filterSitesWithoutSpaces from 'utilities/filterSitesWithoutSpaces';
import { IDistrict } from 'utilities/searchByLocation';
import countries from '../../../../public/locations.json';

import {
  PAGINATION_LIMIT, MAP_PAGINATION_LIMIT,
} from '../../../config';
import { scrollTop } from '../../../utilities/scrollTop';

DayJS.extend(CustomParse);

export interface FetchSitesOptions {
  cityId?: number;
  districtId?: number;
}
interface IFilters {
  space_type?: number;
  price_start?: number;
  price_end?: number;
  site_features?: boolean;
  space_features?: boolean;
  size?: number;
}
interface IESFilterArgs {
  isFeatured?: boolean;
  distance?: number;
  latLng?: ICoords;
  polygon?: ICoords[]
  forMap?: boolean;
  notRequireSpaces?: boolean;
  siteIds?: number[];
  districtIds?: number[];
  cityIds?: number[];
  countryId?: number;
  cityId?: number;
  districtId?: number;
}

export const SITES_STORE_KEY = 'sitesStore';

const DEFAULT_SOURCE = [
  'id',
  'address.country_id',
  'address.city_id',
  'address.district_id',
  'name',
  'description',
  'images',
  'address.geo_location',
  'stock_management_type',
  'total_active_spaces',
];
export class SitesListStore {
  constructor() {
    makeAutoObservable(this, {
      setFilter: action,
    });
    this.filters = this.getInitialFilters();
    this.initializeData();
  }

  private SEARCH_RADIUS: number[];

  private offset = 0;

  @observable radius: number;

  @observable featuredRadius: number;

  @observable polygon: ICoords[];

  @observable searchedLatLon: { lat: number; lon: number };

  @observable sites: ISite[] = [];

  @observable featuredSites: ISite[] = [];

  @observable mapSites: ISite[] = [];

  @observable total = 0;

  @observable featuredTotal = 0;

  @observable hasMore = false;

  @observable mapHasMore = false;

  @observable isLoading = false;

  @observable isLoadingForMap = false;

  @observable isFeaturedSitesLoading = false;

  @observable isFilterPopupActive = false;

  @observable countryId: number;

  @observable cityId: number;

  @observable districtId: number;

  @observable districts: ILocalizedNames[] = [];

  @observable cities: ILocalizedNames[] = [];

  @observable filters: IFilters = {};

  @observable moveInDate: Dayjs = DayJS().add(1, 'day');

  @observable moveOutDate: Dayjs = null;

  @observable isMapPopupActive = false;

  @observable currentCountry: FixedCountry = FixedCountry.Singapore;

  @observable mapRef: React.MutableRefObject<GoogleMap>;

  @observable markers: any[] = [];

  @observable siteIds: number[] = [];

  @observable districtFilterIds: number[] = [];

  @observable cityFilterIds: number[] = [];

  @observable mapOffset = 0;

  @action
  setCountryId = (id: number): void => {
    this.countryId = id;
  };

  @action
  setCityId = (id: number) => {
    this.cityId = id;
  };

  @action
  setDistrictId = (id: number) => {
    this.districtId = id;
  };

  @action
  setDistrictFilterIds = (ids: number[]) => {
    this.districtFilterIds = ids;
  };

  @action
  setCityFilterIds = (ids: number[]) => {
    this.cityFilterIds = ids;
  };

  @action sortMapSites = (id: number) => {
    // eslint-disable-next-line
    this.mapSites = this.mapSites.sort((x, y) => (x.id === id ? -1 : y.id === id ? 1 : 0));
  };

  @action setMapRef = (ref: React.MutableRefObject<GoogleMap>) => {
    this.mapRef = ref;
  };

  @action setPolygon = (polygon: ICoords[]) => {
    this.polygon = polygon;
  };

  @action setSearchedLatLon = (latLon: { lat: number, lon: number }) => {
    this.searchedLatLon = latLon;
  };

  @action setCurrentCountry = (country: FixedCountry): void => {
    this.currentCountry = country;
  };

  @action
  toggleMapPopup = (state: 'ACTIVE' | 'CLOSED'): void => {
    this.isMapPopupActive = state === 'ACTIVE';
  };

  @action
  mapPanTo = (coords: { lat: number, lng: number }) => {
    this.mapRef.current.panTo(coords);
    this.updatePolygon();
  };

  @action
  getDistricts = async (args: { countryId: number; moveInDate: string }) => {
    this.isLoading = true;
    const { countryId, moveInDate } = args;
    const params: IParams = {
      query: {
        bool: {
          must: [
            {
              match: {
                status: 'ACTIVE',
              },
            },
            {
              match: {
                'address.country_id': countryId,
              },
            },
            {
              nested: {
                path: 'spaces',
                query: {
                  bool: {
                    must: [
                      {
                        match: {
                          'spaces.status': 'ACTIVE',
                        },
                      },
                    ],
                  },
                },
              },
            },
          ],
        },
      },
      fields: [],
      // eslint-disable-next-line
      _source: ["id", "address.district_id"],
      from: 0,
      size: 10000,
    };
    try {
      const res = await elasticSearch.search(params);
      // eslint-disable-next-line
      const siteIds = res.data.hits.hits.map((hit) => hit._source?.id);

      const stock = await getAvailableStock({
        site_ids: siteIds,
        move_in_date: moveInDate,
      });

      const sites = res.data.hits.hits.filter((site) => {
        const availableSites = stock.data.sites.filter(
          // eslint-disable-next-line
          (s) => s.id === site._source?.id
        );
        return !!availableSites.length;
      });

      const locations = countries.filter((country) => country.id === countryId);
      const districts: ILocalizedNames[] = [];

      locations.forEach((location) => {
        location.cities.forEach((city) => {
          city.districts.forEach((district) => {
            for (let i = 0; i < sites.length; i += 1) {
              const site = sites[i];
              // eslint-disable-next-line
              if (site._source.address.district_id === district.id) {
                districts.push(district);
                break;
              }
            }
          });
        });
      });

      this.districts = districts;
      this.isLoading = false;
    } catch (error) {
      console.log(error);
    }
  };

  @action
  getCities = async (args: { countryId: number; moveInDate: string }) => {
    this.isLoading = true;
    const { countryId, moveInDate } = args;
    const params: IParams = {
      query: {
        bool: {
          must: [
            {
              match: {
                status: 'ACTIVE',
              },
            },
            {
              match: {
                'address.country_id': countryId,
              },
            },
            {
              nested: {
                path: 'spaces',
                query: {
                  bool: {
                    must: [
                      {
                        match: {
                          'spaces.status': 'ACTIVE',
                        },
                      },
                    ],
                  },
                },
              },
            },
          ],
        },
      },
      fields: [],
      // eslint-disable-next-line
      _source: ["id", "address.city_id"],
      from: 0,
      size: 10000,
    };
    try {
      const res = await elasticSearch.search(params);
      // eslint-disable-next-line
      const siteIds = res.data.hits.hits.map((hit) => hit._source?.id);

      const stock = await getAvailableStock({
        site_ids: siteIds,
        move_in_date: moveInDate,
      });

      const sites = res.data.hits.hits.filter((site) => {
        const availableSites = stock.data.sites.filter(
          // eslint-disable-next-line
          (s) => s.id === site._source?.id
        );
        return !!availableSites.length;
      });

      const locations = countries.filter((country) => country.id === countryId);
      const cities: ILocalizedNames[] = [];

      locations.forEach((location) => {
        location.cities.forEach((city) => {
          for (let i = 0; i < sites.length; i += 1) {
            const site = sites[i];
            // eslint-disable-next-line
            if (site._source.address.city_id === city.id) {
              cities.push(city);
              break;
            }
          }
        });
      });
      this.isLoading = false;
      this.cities = cities;
    } catch (error) {
      console.log(error);
    }
  };

  @action
  updatePolygon = () => {
    const boundss = this.mapRef.current.getBounds();
    const northEast = boundss.getNorthEast();
    const southWest = boundss.getSouthWest();
    const bounds = {
      top_left: {
        lat: northEast.lat(),
        lon: northEast.lng(),
      },
      bottom_right: {
        lat: southWest.lat(),
        lon: southWest.lng(),
      },
    };

    const height = bounds.bottom_right.lon - bounds.top_left.lon;
    const width = bounds.bottom_right.lat - bounds.top_left.lat;

    const polygon = [
      {
        lat: bounds.top_left.lat + width,
        lon: bounds.top_left.lon,
      },
      {
        lat: bounds.top_left.lat,
        lon: bounds.top_left.lon,
      },
      {
        lat: bounds.top_left.lat,
        lon: bounds.top_left.lon + height,
      },
      {
        lat: bounds.bottom_right.lat,
        lon: bounds.bottom_right.lon,
      },
      {
        lat: bounds.top_left.lat + width,
        lon: bounds.top_left.lon,
      },
    ];
    this.setPolygon(polygon);
  };

  private initializeData() {
    if (typeof window === 'undefined') {
      return;
    }

    const params = Router.query as any;
    this.moveInDate = params.move_in ? DayJS(params.move_in as string, 'DD-MM-YYYY') : this.moveInDate;
    this.moveOutDate = params.move_out ? DayJS(params.move_out as string, 'DD-MM-YYYY') : null;
    const { searchRadius } = getCountry(Router.locale);
    this.SEARCH_RADIUS = searchRadius;
    this.radius = searchRadius[0];
    this.featuredRadius = searchRadius[0];
    if (!params.move_in && (Router.pathname === '/search' || Router.pathname === '/details')) {
      Router.push({
        pathname: Router.pathname,
        query: {
          ...Router.query,
          move_in: this.moveInDate.format('DD-MM-YYYY'),
        } as any,
      });
    }
  }

  private getInitialFilters = () => {
    let params = {} as any;

    if (typeof window !== 'undefined') {
      params = Router.query as any;
    }

    const {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      space_type, price_start, price_end, site_features, space_features,
    } = params;

    const initialFilters = {
      space_type: space_type && parseInt(space_type, 10),
      price_start: parseInt(price_start, 10),
      price_end: parseInt(price_end, 10),
    } as any;

    if (space_features) {
      initialFilters.space_features = ([].concat(space_features))
        .reduce((obj, id) => Object.assign(obj, { [id]: true }), {});
    }

    if (site_features) {
      initialFilters.site_features = ([].concat(site_features))
        .reduce((obj, id) => Object.assign(obj, { [id]: true }), {});
    }

    return pickBy(initialFilters, identity);
  };

  private setTotalResults() {
    Router.push({
      pathname: Router.pathname,
      query: {
        ...Router.query,
        total_results: this.total,
      },
    });
  }

  private getElasticFilters(args: IESFilterArgs) {
    let siteFeatureIds = [];
    if (this.filters.site_features) {
      siteFeatureIds = Object.keys(this.filters.site_features);
    }
    const siteFilters: ISiteFilters = {
      isFeatured: args.isFeatured,
      siteFeatureIds,
      distance: args.distance,
      polygon: args.polygon,
      siteIds: args.siteIds,
      latLng: args.latLng,
      countryId: args.countryId,
      cityId: args.cityId,
      districtId: args.districtId,
      districtIds: args?.districtIds,
      cityIds: args?.cityIds,
    };

    let spaceFeatureIds = [];
    if (this.filters.space_features) {
      spaceFeatureIds = Object.keys(this.filters.space_features);
    }
    const spaceFilters: ISpaceFilters = {
      spaceTypeId: this.filters.space_type,
      spaceFeatureIds,
      priceRangeStart: this.filters.price_start,
      priceRangeEnd: this.filters.price_end,
      notRequireSpaces: args.notRequireSpaces,
    };
    const query = getElasticQuery(siteFilters, spaceFilters, !!args.forMap);
    return query;
  }

  @action
  clearSites = () => {
    this.sites = [];
    this.featuredSites = [];
    this.mapSites = [];
    this.offset = 0;
    this.total = 0;
  };

  private getSites = async (args: IParams) => {
    const response = await elasticSearch.search(args);
    const siteIds = response.data.hits.hits.map((site) => site.fields?.id[0]);
    let converted: ISite[] = [];
    if (siteIds.length) {
      const stockServiceParams = {
        site_ids: siteIds,
        move_in_date: this.moveInDate.format('YYYY-MM-DD'),
      };
      const availableSites = await getAvailableSites(response.data, stockServiceParams);
      converted = await convertSitesToGraphqlFormat(availableSites);
    }
    return { sites: converted, total: response.data.hits.total.value };
  };

  private getMapSites = async (args: IParams, forMarkers = false) => {
    const response = await elasticSearch.search(args);
    const siteIds = response.data.hits.hits.map((site) => site.fields?.id[0]);
    let fields: { [key: string]: any }[] = [];

    const stockServiceParams = {
      site_ids: siteIds,
      move_in_date: this.moveInDate.format('YYYY-MM-DD'),
    };
    let availableSites: IElasticSite[] = [];

    if (siteIds.length) {
      availableSites = await getAvailableSites(response.data, stockServiceParams, forMarkers);
      if (forMarkers) {
        const ids = availableSites.map((s) => s.fields.id[0]);
        this.siteIds = ids;
        fields = availableSites.map((s) => s.fields);
        return { sites: [], total: response.data.hits.total.value, fields };
      }
    }

    const sites = await convertSitesToGraphqlFormat(availableSites);
    return { sites, total: response.data.hits.total.value };
  };

  @action
  fetchSiteMarkers = async (viewMap = false) => {
    this.isLoadingForMap = true;
    this.markers = [];
    this.mapOffset = 0;
    const canSearchByLatLng = !(this.countryId || this.cityId || this.districtId);
    const viewMapArgs: IESFilterArgs = {
      notRequireSpaces: true,
    };
    if (this.searchedLatLon?.lat && this.searchedLatLon?.lon && canSearchByLatLng) {
      viewMapArgs.latLng = this.searchedLatLon;
      viewMapArgs.distance = Math.max(this.radius, this.featuredRadius);
    } else {
      viewMapArgs.countryId = this.countryId;
      viewMapArgs.cityId = this.cityId;
      viewMapArgs.districtId = this.districtId;
    }
    const onMapArgs = {
      polygon: this.polygon,
      forMap: true,
      notRequireSpaces: true,
    };
    // The intended behaviour of this function was to only treat the onMapArgs which are the
    // arguments that come into play when the user interacts with the map while viewMapArgs are
    // the ones which are sent when the map is opened.
    // For our usecase, where the map should have the same sites as search listings when first
    // opened, 'viewMapArgs' were introduced to the function. The 'viewMap' param is default to
    // false to show the original intended behaviour of the function.
    const query = this.getElasticFilters(viewMap ? viewMapArgs : onMapArgs);
    const requestParams = {
      query,
      fields: ['id', 'address.geo_location'],
      _source: ['id'],

      from: 0,
      size: 1000,
    };
    const res = await this.getMapSites(requestParams, true);

    runInAction(() => {
      this.markers = res.fields || [];
      this.mapSites = [];
      this.fetchMapSites();
    });
  };

  @action
  fetchMapSites = async () => {
    let res = {
      sites: [],
      total: 0,
    };
    const query = this.getElasticFilters({
      countryId: this.countryId,
      polygon: this.polygon,
      forMap: true,
      siteIds: this.siteIds?.slice(this.mapOffset, this.mapOffset + MAP_PAGINATION_LIMIT),
    });

    const requestParams = {
      query,
      fields: ['id'],
      _source: DEFAULT_SOURCE,
      sort: [
        {
          total_active_spaces: {
            order: 'desc',
          },
        },
      ],
      from: 0,
      size: MAP_PAGINATION_LIMIT,
    };
    // eslint-disable-next-line
    res = await this.getMapSites(requestParams);
    runInAction(() => {
      this.mapSites = this.mapSites.concat(res.sites);
      const filterSites = filterSitesWithoutSpaces(this.mapSites);
      const marks = this.markers.slice(0, this.mapSites.length).filter(
        (m) => !!filterSites.filter((s) => s.id === m.id[0]).length,
      );
      this.markers = marks.concat(this.markers.slice(this.mapSites.length, this.markers.length));
      this.mapHasMore = this.mapSites.length < this.siteIds.length;
      this.mapOffset += MAP_PAGINATION_LIMIT;
      this.isLoadingForMap = false;
    });
  };

  @action
  fetchMarkerSite = async (id: number, sort: boolean) => {
    let res = {
      sites: [],
      total: 0,
    };
    const country = getCountry(Router.defaultLocale);
    const query = getElasticQuery({ siteIds: [id], countryId: country.id }, {});
    const requestParams = {
      query,
      fields: ['id'],
      _source: DEFAULT_SOURCE,
      sort: [
        {
          total_active_spaces: {
            order: 'desc',
          },
        },
      ],
      from: 0,
      size: 1,
    };
    // eslint-disable-next-line
    res = await this.getMapSites(requestParams);
    runInAction(() => {
      this.mapSites = sort
        ? res.sites.concat(this.mapSites)
        : this.mapSites.concat(res.sites);
      this.mapHasMore = this.mapSites.length < this.siteIds.length;
    });
  };

  @action
  fetchFeaturedSites = async (resetRadius = false) => {
    this.isFeaturedSitesLoading = true;
    if (resetRadius) this.featuredRadius = this.SEARCH_RADIUS[0];
    let i = 0;
    let res = {
      sites: [],
      total: 0,
    };
    const canSearchByLatLng = !(this.countryId || this.cityId || this.districtId);
    do {
      const args: IESFilterArgs = {
        isFeatured: true,
        distance: this.featuredRadius,
      };
      if (canSearchByLatLng && this.searchedLatLon?.lat && this.searchedLatLon?.lon) {
        args.latLng = this.searchedLatLon;
      } else {
        args.countryId = this.countryId;
        args.cityId = this.cityId;
        args.districtId = this.districtId;
      }
      const query = this.getElasticFilters(args);
      const requestParams: IParams = {
        query,
        fields: ['id'],
        _source: DEFAULT_SOURCE,
        sort: [
          {
            total_active_spaces: {
              order: 'desc',
            },
          },
        ],
        from: 0,
        size: 10,
      };
      // eslint-disable-next-line
      res = await this.getSites(requestParams);
      if (!res.sites.length) {
        i += 1;
        this.featuredRadius = this.SEARCH_RADIUS[i] || this.SEARCH_RADIUS[2];
      }
    } while (!res.sites.length && i <= 2 && canSearchByLatLng);

    runInAction(() => {
      this.isFeaturedSitesLoading = false;
      this.featuredSites = res.sites;
      this.featuredTotal = res.total;
    });
  };

  @action
  fetchSites = async (resetRadius = false) => {
    this.isLoading = true;
    if (resetRadius) this.radius = this.SEARCH_RADIUS[0];
    let i = 0;
    let res = {
      sites: [],
      total: 0,
    };
    const canSearchByLatLng = !(this.countryId || this.cityId || this.districtId);
    do {
      const args: IESFilterArgs = {
        isFeatured: false,
        distance: this.radius,
      };
      if (canSearchByLatLng && this.searchedLatLon?.lat && this.searchedLatLon?.lon) {
        args.latLng = this.searchedLatLon;
      } else {
        args.countryId = this.countryId;
        args.cityId = this.cityId;
        args.districtId = this.districtId;
        args.districtIds = this.districtFilterIds;
        args.cityIds = this.cityFilterIds;
      }

      const query = this.getElasticFilters(args);
      const requestParams: IParams = {
        query,
        fields: ['id'],
        _source: [
          'id',
          'address.country_id',
          'address.city_id',
          'address.district_id',
          'name',
          'description',
          'images',
          'address.geo_location',
          'stock_management_type',
          'total_active_spaces',
        ],
        sort: [
          {
            total_active_spaces: {
              order: 'desc',
            },
          },
        ],
        from: this.offset,
        size: PAGINATION_LIMIT,
      };

      // eslint-disable-next-line
      res = await this.getSites(requestParams);
      if (!res.sites.length) {
        i += 1;
        this.radius = this.SEARCH_RADIUS[i] || this.SEARCH_RADIUS[2];
      }
    } while (!res.sites.length && i <= 2 && canSearchByLatLng);

    runInAction(() => {
      this.isLoading = false;
      this.sites = this.sites.concat(res.sites);
      this.offset = this.sites.length;
      this.total = res.total || this.featuredTotal;
      this.hasMore = this.sites.length < this.total;
      this.setTotalResults();
    });
  };

  @action
  setFilter = (name: keyof IFilters, value: number): void => {
    if (name === 'space_features' || name === 'site_features') {
      this.filters[name] = Object.assign({}, this.filters[name] || {}) as any;
      this.filters[name][value] = true;
    } else {
      this.filters[name] = value;
    }
  };

  @action
  removeFilter = (name: keyof IFilters, valueToRemove?: number): void => {
    if (name === 'space_features' || name === 'site_features') {
      delete (this.filters[name] || {})[valueToRemove];
    } else {
      delete this.filters[name];
    }
  };

  @action
  applyFilters = (): void => {
    const { site_features: siteFeats, space_features: spaceFeats, ...params } = this.filters;
    const {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      move_in, move_out, address, lat, lon, country_id, city_id, district_id,
    } = Router.query;
    const query = {
      ...params,
      address,
      lat,
      lon,
      country_id,
      city_id,
      district_id,
      move_in: undefined,
      move_out: undefined,
      site_features: Object.keys(siteFeats || {}).map((i) => parseInt(i, 10)),
      space_features: Object.keys(spaceFeats || {}).map((i) => parseInt(i, 10)),
    };
    this.offset = 0;
    this.sites = [];
    this.featuredSites = [];

    if (move_in) {
      query.move_in = move_in;
    }

    if (move_out) {
      query.move_out = move_out;
    }

    Router.push({ query: pickBy(query, identity), pathname: '/search' });
    this.clearSites();
    this.fetchFeaturedSites();
    this.fetchSites();
    this.fetchSiteMarkers();
    scrollTop();
  };

  @action
  resetFilters = (): void => {
    this.featuredRadius = this.SEARCH_RADIUS[0];
    this.radius = this.SEARCH_RADIUS[0];
    this.filters = {};
    this.sites = [];
    this.featuredSites = [];
  };

  @action
  toggleFilterPopup = (state: 'ACTIVE' | 'CLOSED'): void => {
    this.isFilterPopupActive = state === 'ACTIVE';
  };

  @action
  setDates = (key: 'moveInDate' | 'moveOutDate', date: Dayjs): void => {
    this[key] = date;
    const map = {
      moveInDate: 'move_in',
      moveOutDate: 'move_out',
    };

    if (date) {
      Router.push({
        query: {
          ...Router.query as any,
          [map[key]]: date.format('DD-MM-YYYY'),
        },
        pathname: Router.pathname,
      });
    }
  };

  @computed
  get isFiltersApplied(): boolean {
    return !!Object.keys(this.filters).length;
  }
}
