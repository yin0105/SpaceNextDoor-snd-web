import { ApolloClient } from '@apollo/client';
import {
  observable, action, makeAutoObservable, runInAction,
} from 'mobx';
import { initializeApollo } from '../../../apollo';
import { ONBOARDING_SITES_QUERY } from '../queries';
import { OnboardingSitesQuery, OnboardingSitesQuery_sites_edges, OnboardingSitesQueryVariables } from '../queries/__generated__/OnboardingSitesQuery';

const ONBOARDING_STEP_KEY = '@onboarding_step';

class HostOnboardingSiteStore {
  constructor() {
    makeAutoObservable(this);
    this.apollo = initializeApollo();

    if (typeof window !== 'undefined') {
      this.currentStep = parseInt(localStorage.getItem(ONBOARDING_STEP_KEY), 10) || 0;
    }
  }

  private apollo: ApolloClient<any>;

  @observable stepSavingFunction: () => void;

  @observable site: OnboardingSitesQuery_sites_edges = null;

  @observable currentStep = 0;

  @observable siteId: number = null;

  @action
  nextStep = (): void => {
    this.currentStep += 1;
    localStorage.setItem(ONBOARDING_STEP_KEY, `${this.currentStep}`);
  };

  @action
  prevStep = (): void => {
    this.currentStep = this.currentStep <= 1 ? 1 : (this.currentStep - 1);
    localStorage.setItem(ONBOARDING_STEP_KEY, `${this.currentStep}`);
    this.fetchSite(this.siteId);
  };

  @action
  goToStep = (step: number, fetchAgain = true): void => {
    this.currentStep = step;
    localStorage.setItem(ONBOARDING_STEP_KEY, `${this.currentStep}`);

    if (fetchAgain) {
      this.fetchSite(this.siteId);
    }
  };

  @action
  setStepSavingFunction = (fn: () => void): void => {
    this.stepSavingFunction = fn;
  };

  @action
  fetchSite = (siteId?: number): void => {
    this.apollo.query<OnboardingSitesQuery, OnboardingSitesQueryVariables>({
      query: ONBOARDING_SITES_QUERY,
      context: {
        asProvider: true,
      },
      variables: {
        siteId,
      },
    }).then((result) => {
      runInAction(() => {
        this.siteId = result?.data?.sites?.edges?.[0]?.id;
        this.site = result?.data?.sites?.edges?.[0];
      });
    });
  };

  @action
  setSiteId = (siteId: number): void => {
    this.siteId = siteId;
    this.fetchSite(siteId);
  };
}

export default HostOnboardingSiteStore;

export const ONBOARDING_SITE_STORE = 'store';
