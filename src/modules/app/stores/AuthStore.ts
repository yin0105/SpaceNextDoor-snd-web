import { ApolloClient } from '@apollo/client';
import {
  makeObservable, observable, action, computed, runInAction, toJS,
} from 'mobx';
import Router from 'next/router';
import CleverTapReact from 'clevertap-react';

// eslint-disable-next-line import/no-cycle
import { initializeApollo } from '../../../apollo';
import { Roles } from '../../host-reservations/contants/role';
import { PROFILE } from '../../shared/queries/query';
import { ProfileQuery, ProfileQuery_profile as User } from '../../shared/queries/__generated__/ProfileQuery';

export const AUTH_STORE_KEY = 'auth';
export const AUTH_TOKEN_KEY = 'snd_access_token';
export const AUTH_REFRESH_TOKEN_KEY = 'snd_refresh_token';
export const USER_ROLE = 'user_role';

class AuthStore {
  constructor() {
    makeObservable(this);
    this.apollo = initializeApollo();
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem(AUTH_TOKEN_KEY);
      this.authorization = token && token !== 'undefined' ? token : '';

      this.role = localStorage.getItem(USER_ROLE);
      this.getProfile();
    }
  }

  private apollo: ApolloClient<any>;

  @observable authLoading = false;

  @observable authorization: string | undefined;

  @observable user: User | undefined;

  @observable role: string = null;

  @computed get isAuthenticated() {
    return !!this.authorization;
  }

  @action
  getProfile = async (): Promise<void> => {
    if (!this.authorization) {
      this.authorization = null;
      this.user = null;
      return;
    }

    this.authLoading = true;
    const result = await this.apollo.query<ProfileQuery>({ query: PROFILE });

    if (result) {
      runInAction(() => {
        this.authLoading = false;
        this.user = result?.data?.profile;
        CleverTapReact.profile({
          Site: {
            Name: `${this.user.first_name} ${this.user.last_name || ''}`,
            Identity: this.user.id,
            Email: this.user.email,
            Phone: this.user.phone_number,
            Photo: this.user.image_url,
          },
        });
      });
    } else {
      this.authLoading = false;
      this.logout();
    }
  };

  @action async setToken(token, refreshToken, loadProfile = true): Promise<void> {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    localStorage.setItem(AUTH_REFRESH_TOKEN_KEY, refreshToken);
    this.authorization = `Bearer ${token}`;

    //
    if (!this.user && loadProfile) {
      await this.getProfile();
    }
  }

  @computed get getToken(): string | null {
    if (this.authorization) {
      return this.authorization.match(/(?:Bearer\s+)?(\w+\.\w+\.\w+)/)[1];
    }
    return null;
  }

  @computed get getUserFullName(): string {
    if (this.user?.first_name && this.user?.last_name) {
      return `${this.user.first_name} ${this.user.last_name}`;
    }
    return '';
  }

  @computed get profile(): User {
    const user = toJS(this.user);

    if (!user) {
      return null;
    }

    return user;
  }

  @action logout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_ROLE);
    this.authorization = null;
    this.user = null;

    CleverTapReact.logout();
  };

  @action handleRoleChange = (role: string) => {
    this.role = role;
    localStorage.setItem(USER_ROLE, role);
    Router.push(Roles.HOST ? '/host/listings' : '/');
  };
}

export default AuthStore;
