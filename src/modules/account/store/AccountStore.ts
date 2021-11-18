import { ApolloClient, FetchResult } from '@apollo/client';
import {
  makeObservable, action, observable, runInAction,
} from 'mobx';

// eslint-disable-next-line import/no-cycle
import { initializeApollo } from '../../../apollo';
import { GET_BANKS_QUERY, UPDATE_PROFILE_MUTATION } from '../queries';
import { PROFILE } from '../../shared/queries/query';
import { ProfileQuery } from '../../shared/queries/__generated__/ProfileQuery';
import { getBanks_banks_edges } from '../queries/__generated__/getBanks';
import { updateProfileVariables, updateProfile } from '../queries/__generated__/updateProfile';

class AccountStore {
  constructor() {
    makeObservable(this);
    this.apollo = initializeApollo();
  }

  @observable banks: getBanks_banks_edges[] = [];

  @observable profile:any = {
    id: null,
    first_name: null,
    last_name: null,
    email: null,
    phone_number: null,
    image_url: null,
    facebook_user_id: null,
    google_user_id: null,
    provider: null,
    customer: null,
  };

  @observable validationErrorMessages = {
    fullNameErrorMessage: '',
    emailErrorMessage: '',
  };

  @observable errorMessage = '';

  @observable isPersonalDetailEdit = false;

  @observable isLoginDetailsEdit = false;

  @observable isSuccess = false;

  private apollo: ApolloClient<any>;

  @action getBanks = () => {
    this.apollo.query({
      query: GET_BANKS_QUERY,
    }).then((res) => {
      runInAction(() => {
        this.banks = res?.data?.banks?.edges || [];
      });
    }).catch((error) => {
      console.error(error);
    });
  };

  @action getProfile = () => {
    this.apollo.query<ProfileQuery>({
      query: PROFILE,
    }).then((result) => {
      runInAction(() => {
        this.profile = result?.data?.profile;
      });
    }).catch((error) => {
      console.error(error);
    });
  };

  @action updateUserDetails = async (): Promise<void> => {
    const response = await this.apollo.mutate<updateProfile, updateProfileVariables>({
      mutation: UPDATE_PROFILE_MUTATION,
      variables: {
        payload: {
          first_name: this.profile.first_name,
          last_name: this.profile.last_name,
          email: this.profile.email,
        },
      },
    });
    if (response.errors) {
      this.errorMessage = response.errors[0]?.message;
    }

    runInAction(() => {
      this.isSuccess = true;
      setTimeout(() => {
        this.isSuccess = false;
      }, 1000);
    });
  };

  @action setFirstName = (val:string):void => {
    this.profile.first_name = val;
  };

  @action setLastName = (val:string):void => {
    this.profile.last_name = val;
  };

  @action setEmail = (val:string):void => {
    this.profile.email = val;
  };

  @action setValidationMessage = (key:string, str: string):void => {
    this.validationErrorMessages[key] = str;
  };

  @action setIsPersonalDetailEdit = ():void => {
    this.isPersonalDetailEdit = true;
  };
}

export const ACCOUNT_STORE_KEY = 'accountStore';

export default AccountStore;
