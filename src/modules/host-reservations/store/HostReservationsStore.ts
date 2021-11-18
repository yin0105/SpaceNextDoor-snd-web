import { ApolloClient } from '@apollo/client';
import {
  observable,
  action,
  makeObservable,
  runInAction,
} from 'mobx';
import { initializeApollo } from '../../../apollo';
import { PAGINATION_LIMIT } from '../../../config';
import { BookingsFilter } from '../../../typings/graphql.types';
import { Roles } from '../contants/role';
import { FETCH_RESERVATIONS_QUERY } from '../queries';
import { HostReservationsQuery, HostReservationsQueryVariables, HostReservationsQuery_bookings_edges } from '../queries/__generated__/HostReservationsQuery';

interface IFetchReservationsParams {
  role: Roles;
  filters?: BookingsFilter;
  isLoadMore?: boolean;
}

interface IFetchReservationsParams {
  filters?: BookingsFilter;
  isLoadMore?: boolean;
}

class HostReservationsStore {
  constructor() {
    makeObservable(this);
    this.apollo = initializeApollo();
  }

  private apollo: ApolloClient<any>;

  @observable reservations = [];

  @observable isLoading = false;

  @observable offset = 0;

  @observable total = 0;

  @observable hasMore = false;

  @observable errorMessage = '';

  @action
  resetOffset = () => {
    this.offset = 0;
  };

  @action
  fetchReservations = ({
    filters,
    isLoadMore,
    role,
  }: IFetchReservationsParams = { role: Roles.GUEST }): void => {
    if (!isLoadMore) {
      this.isLoading = true;
      this.reservations = [];
    }

    this.errorMessage = '';

    this.apollo.query<HostReservationsQuery, HostReservationsQueryVariables>({
      query: FETCH_RESERVATIONS_QUERY,
      context: {
        asProvider: role === Roles.HOST,
        asCustomer: role === Roles.GUEST,
      },
      variables: {
        limit: PAGINATION_LIMIT,
        skip: this.offset,
        filters,
      },
    }).then((res: any) => {
      runInAction(() => {
        if (res.errors) {
          this.errorMessage = res.errors?.[0]?.message;
          return;
        }
        const bookings: HostReservationsQuery_bookings_edges[] = res?.data?.bookings?.edges || [];
        this.reservations = isLoadMore ? [...this.reservations, ...bookings] : bookings;
        this.offset = this.reservations.length;
        this.isLoading = false;
        this.total = res?.data?.bookings?.page_info?.total;
        this.hasMore = res?.data?.bookings?.page_info?.has_more;
      });
    }).catch((err: any) => {
      this.isLoading = false;
      this.errorMessage = err.message;
      // eslint-disable-next-line no-console
      console.error(err);
    });
  };
}

export default HostReservationsStore;
