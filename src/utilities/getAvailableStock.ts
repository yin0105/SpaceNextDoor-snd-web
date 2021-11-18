import axios, { AxiosResponse } from 'axios';
import { FILTER_BY_STOCK } from 'config';

import { IStockResponse } from './getAvailableSites';

interface IParams {
  site_ids: number[];
  move_in_date: string;
  move_out_date?: string;
}

const getAvailableStock = async (params: IParams) => {
  const res: AxiosResponse<IStockResponse> = await axios.post(FILTER_BY_STOCK, params);
  return res;
};

export default getAvailableStock;
