import { ApolloClient } from '@apollo/client';
import {
  observable,
  action,
  runInAction,
  makeObservable,
} from 'mobx';
import {
  HostListingSitesQuery_sites_edges,
  HostListingSitesQuery,
  HostListingSitesQueryVariables,
} from '../queries/__generated__/HostListingSitesQuery';
import { initializeApollo } from '../../../apollo';
import { GET_SITES_QUERY } from '../queries';

interface IFetchLists {
  searchKeyword?: string;
  isLoadMore?: boolean;
}

class HostListsStore {
  constructor() {
    makeObservable(this);
    this.apollo = initializeApollo();
  }

  private apollo: ApolloClient<any>;

  @observable lists: HostListingSitesQuery_sites_edges[] = [];

  @observable total = 0;

  @observable offset = 0;

  @observable hasMore = false;

  @observable isLoading = false;

  @action
  fetchLists = ({ isLoadMore, searchKeyword }: IFetchLists): void => {
    if (!isLoadMore || searchKeyword) {
      this.isLoading = true;
      this.offset = 0;
    }

    const variables: HostListingSitesQueryVariables = {
      limit: 15,
      offset: this.offset,
    };

    if (searchKeyword) {
      variables.search = searchKeyword;
    }

    this.apollo.query<HostListingSitesQuery, HostListingSitesQueryVariables>({
      query: GET_SITES_QUERY,
      context: {
        asProvider: true,
      },
      variables,
    }).then((result) => {
      runInAction(() => {
        const sites: HostListingSitesQuery_sites_edges[] = result?.data?.sites?.edges || [];
        this.isLoading = false;
        this.lists = isLoadMore ? this.lists.concat(sites) : sites;
        this.offset = this.lists.length;
        this.total = result?.data?.sites?.page_info?.total;
        this.hasMore = result?.data?.sites?.page_info?.has_more;
      });
    });
  };
}

export default HostListsStore;
