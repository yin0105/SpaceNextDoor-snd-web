import {
  action, makeAutoObservable, observable, runInAction,
} from 'mobx';
import { ApolloClient } from '@apollo/client';

import { initializeApollo } from '../../../apollo';
import {
  GET_PUBLIC_PROMOTIONS,
} from '../queries';
import { GetPublicPromotionsQuery, GetPublicPromotionsQuery_promotions_edges } from '../queries/__generated__/GetPublicPromotionsQuery';

export const PROMOTION_STORE_KEY = 'promotionStore';

export class PromotionStore {
  constructor() {
    makeAutoObservable(this);
    this.apollo = initializeApollo();
  }

  private apollo: ApolloClient<any>;

  @observable publicPromotions: GetPublicPromotionsQuery_promotions_edges[] = null;

  @action
  fetchPublicPromotions = (): void => {
    this.apollo.query<GetPublicPromotionsQuery>({
      query: GET_PUBLIC_PROMOTIONS,
      context: {
        asCustomer: true,
      },
    }).then((result) => {
      runInAction(() => {
        this.publicPromotions = result?.data?.promotions?.edges;
      });
    });
  };
}
