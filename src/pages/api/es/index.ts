// --------------------
// Elastic Search Proxy
// --------------------
import { Client } from '@elastic/elasticsearch';
import Joi from 'joi';
import {
  PriceType, SpaceSizeUnit, SpaceStatus, StockManagementType,
} from 'typings/graphql.types';

const ELASTIC_SEARCH_URL = process.env.REACT_APP_ELASTIC_SEARCH_URL;

interface IShardsResponse {
  total: number;
  successful: number;
  failed: number;
  skipped: number;
}
interface Ilocalized {
  en: string;
  jp: string;
  kr: string;
  th: string;

}

interface IESSpace {
  id?: number;
  name?: string,
  size?: number,
  height?: number,
  width?: number,
  length?: number,
  size_unit?: SpaceSizeUnit,
  description?: string,
  status?: SpaceStatus,
  available_units?: number,
  total_units?: number,
  space_type?: number,
  price?: {
    pre_day?: number,
    pre_week: number,
    pre_month?: number,
    pre_year?: number,
    currency?: string,
    currency_sign?: string,
    type?: PriceType,
    start_date?: string | null,
    end_date?: string | null
  },
  features?: number[]
}

interface ISource {
  id?: number;
  name?: Ilocalized;
  description?: Ilocalized;
  property_type?: number;
  is_featured?: boolean;
  images?: string[];
  status?: SpaceStatus;
  stock_management_type?: StockManagementType;
  total_active_spaces?: number;
  address?: {
    country_id?: number;
    district_id?: number;
    city_id?: number;
    street?: string;
    postal_code?: string;
    geo_location?: {
      lon?: number;
      lat?: number;
    }
  };
  features?: number[],
  spaces?: IESSpace[]
}
export interface IElasticSite {
  _index: string;
  _type: string;
  _id: string;
  _score: number;
  _source?: ISource;
  fields: {
    [key: string]: any
  },
  inner_hits?: {
    spaces: {
      hits: {
        hits: {
          sort: number[]
          _id: number
          _index: string
          _nested: {
            field: string,
            offset: number
          }
          field: string
          offset: number
          _score: any
          type: string
          _source?: IESSpace
        }[]
      }
    }
  }
}

export interface IESResponse {
  took: number;
  timed_out: boolean;
  _shards: IShardsResponse;
  hits: {
    total: {
      value: number;
      relation: string;
    };
    max_score: number;
    hits: IElasticSite[];
  };
}

export interface ISearchbody {
  query: any;
  fields: string[];
  _source: string[];
  sort: any[];
  from: number;
  size: number;
}

const client = new Client({
  node: ELASTIC_SEARCH_URL,
});

const requestSchema = Joi.object({
  query: Joi.object().required(),
  fields: Joi.array().items(Joi.string()).required(),
  _source: Joi.array().items(Joi.string()).required(),
  sort: Joi.array(),
  from: Joi.number().required(),
  size: Joi.number().required(),
}).required();

export default async (req, res) => {
  const { error } = requestSchema.validate(req.body);
  if (error) {
    res.status(400);
    res.json({
      error: 'Bad Request',
      message: 'Invalid data',
      statusCode: 400,
    });
    return;
  }
  try {
    const response = await client.search<IESResponse, ISearchbody>({
      body: req.body,
    });
    res.json(response.body);
  } catch (err) {
    res.status(err.statusCode || 500);
    res.json({
      error: err.name,
      message: err.message,
      statusCode: err.statusCode || 500,
    });
  }
};
