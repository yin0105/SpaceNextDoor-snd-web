import axios, { AxiosResponse } from 'axios';
import { IESResponse } from 'pages/api/es';

export interface IParams {
  query: any
  fields: string[]
  _source: string[]
  sort?: any[]
  from: number
  size: number
}

const search = async (params: IParams) => {
  const response: AxiosResponse<IESResponse> = await axios.post('/api/es', params);
  return response;
};

const elasticSearch = { search };

export default elasticSearch;
