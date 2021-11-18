/* eslint no-underscore-dangle: 0 */

// ----------------------
// This function is used after getting the response from Stock Service
// to filter out the sites that who's stock is not available
// ----------------------

import axios from 'axios';
import { IElasticSite, IESResponse } from 'pages/api/es';
import { FILTER_BY_STOCK } from 'config';

interface IParams {
  site_ids: number[];
  move_in_date: string;
  move_out_date?: string;
}
export interface IStockResponse {
  sites: {
    id: number;
    spaces: {
      id: number;
      available_until?: string;
      available_units: number;
    }[]
  }[]
}

const getAvailableSites = async (
  elasticResponse: IESResponse,
  params: IParams,
  forMarkers = false,
): Promise<IElasticSite[]> => {
  const availableStock: IStockResponse = (await axios.post(FILTER_BY_STOCK, params)).data;

  const sites = elasticResponse.hits.hits.filter((site) => {
    const filter = availableStock.sites.filter(
      (s) => (s.id === site._source?.id || s.id === site.fields.id?.[0]),
    );
    if (!!filter.length && !forMarkers) {
      const spaces = [...site.inner_hits.spaces.hits.hits];
      let newSpaces = spaces.map((ns) => ns._source);

      newSpaces = newSpaces.filter((sp) => {
        const res = filter[0].spaces.filter((s) => s.id === sp.id);
        return !!res.length;
      });
      site._source.spaces = newSpaces.filter((s) => s !== undefined);
    }
    return !!filter.length;
  });

  return sites.filter((site) => site !== undefined);
};

export default getAvailableSites;
