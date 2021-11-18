/* eslint prefer-destructuring: 0 */
import { ApolloClient } from '@apollo/client';
import { initializeApollo } from 'apollo';
import {
  action, makeAutoObservable, observable, runInAction,
} from 'mobx';
import { FixedCountry, QuotationPayload } from 'typings/graphql.types';
import elasticSearch, { IParams } from 'utilities/elasticSearch';
import getAvailableStock from 'utilities/getAvailableStock';
import { IDistrict } from 'utilities/searchByLocation';
import Router from 'next/router';

import DayJS, { Dayjs } from 'dayjs';
import useCheckoutPrice, { IPromotion } from 'modules/checkout/hooks/useCheckoutPrice';
import usePaymentSchedule from 'modules/checkout/hooks/usePaymentSchedule';
import { PaymentSchedule_paymentSchedule } from 'modules/checkout/queries/__generated__/PaymentSchedule';
import countries from '../../../../public/locations.json';
import { CREATE_QUOTATION_MUTATION, PLATFORM_SPACE_TYPES_QUERY } from '../queries/query';
import {
  PlatformSpaceTypes,
  PlatformSpaceTypesVariables,
  PlatformSpaceTypes_space_types_edges,
} from '../queries/__generated__/PlatformSpaceTypes';
import { createQuotation, createQuotationVariables } from '../queries/__generated__/createQuotation';

interface IInput {
  value: string;
  errorMessage: string;
}

export interface IQuotationDetails {
  districtIds?: number[];
  spaceTypeId?: number;
  fullName: IInput;
  email: IInput;
  countryCode: string;
  phoneNumber: IInput;
  moveInDate: Dayjs;
  promoCode?: IInput;
  promotionId?: IInput;
  siteId?: number;
  spaceId?: number;
}

export const QUOTATIONS_STORE_KEY = 'quotationsStore';

export class QuotationsStore {
  constructor() {
    makeAutoObservable(this);
    this.apollo = initializeApollo();
    this.initializeData();
  }

  private apollo: ApolloClient<any>;

  @observable totalSteps = 4;

  @observable currentStep = 1;

  @observable quotationDetails: IQuotationDetails = {
    districtIds: [0],
    spaceTypeId: 0,
    moveInDate: DayJS().add(1, 'day'),
    fullName: { value: '', errorMessage: '' },
    email: { value: '', errorMessage: '' },
    phoneNumber: { value: '', errorMessage: '' },
    countryCode: '',
    siteId: undefined,
    spaceId: undefined,
    promotionId: { value: undefined, errorMessage: '' },
    promoCode: { value: undefined, errorMessage: '' },
  };

  @observable estimatedSpaceTypeId = 0;

  @observable districts: IDistrict[] = [];

  @observable spaceTypes: PlatformSpaceTypes_space_types_edges[] = [];

  @observable allSpaceTypes: PlatformSpaceTypes_space_types_edges[] = [];

  @observable showEstimator = false;

  @observable error: string;

  @observable isSuccess = false;

  @observable isLoading = false;

  @observable promotionError: string = null;

  private initializeData() {
    if (typeof window === 'undefined') {
      return;
    }

    const params = Router.query as any;
    if (params.move_in) this.quotationDetails.moveInDate = DayJS(params.move_in as string, 'DD-MM-YYYY');
    if (params.site_id) this.quotationDetails.siteId = +params.site_id;
    if (params.space_id) this.quotationDetails.spaceId = +params.space_id;
    if (params.spaceType_id) this.quotationDetails.spaceTypeId = +params.spaceType_id;
    if (params.district_id) this.quotationDetails.districtIds = [+params.district_id];
    if (this.quotationDetails.siteId || this.quotationDetails.spaceId) {
      if (this.quotationDetails.spaceTypeId) {
        this.currentStep = 3;
        return;
      }
      this.currentStep = 2;
    }
  }

  @action
  setCurrentStep = (val: number) => {
    if (val <= 0) {
      this.currentStep = 1;
    } else this.currentStep = val;
  };

  @action
  setShowEstimator = (val: boolean) => {
    this.showEstimator = val;
  };

  @action
  setError = (val: string) => {
    this.error = val;
  };

  @action
  setPromotionError = (val: string) => {
    this.promotionError = val;
  };

  @action
  setQuotationDetails = (
    property: keyof IQuotationDetails,
    value: any,
    err = '',
  ): void => {
    if (
      typeof this.quotationDetails[property] === 'object'
      && !(this.quotationDetails[property] instanceof DayJS)
      && !(value instanceof DayJS)
      && !Array.isArray(value)
    ) {
      (this.quotationDetails[property] as any) = { value, errorMessage: err };
    } else {
      (this.quotationDetails[property] as any) = value;
    }
  };

  @action
  setEstimatedSpaceTypeId = (val: number) => {
    this.estimatedSpaceTypeId = val;
  };

  // For districts, we first get the sites for the whole country, only their ids and district ids
  // then we pass these site ids to stock service to get only those sites that are available
  // because we only want those districts which have sites/spaces so we can get a quotation
  // back for them

  @action
  getDistricts = async (args: { countryId: number; moveInDate: string }) => {
    const { countryId, moveInDate } = args;
    this.isLoading = true;
    const params: IParams = {
      query: {
        bool: {
          must: [
            {
              match: {
                status: 'ACTIVE',
              },
            },
            {
              match: {
                'address.country_id': countryId,
              },
            },
            {
              nested: {
                path: 'spaces',
                query: {
                  bool: {
                    must: [
                      {
                        match: {
                          'spaces.status': 'ACTIVE',
                        },
                      },
                    ],
                    must_not: [
                      {
                        match: {
                          stock_management_type: 'AFFILIATE',
                        },
                      },
                    ],
                  },
                },
              },
            },
          ],
        },
      },
      fields: [],
      // eslint-disable-next-line
      _source: ["id", "address.district_id"],
      from: 0,
      size: 10000,
    };
    try {
      const res = await elasticSearch.search(params);
      // eslint-disable-next-line
      const siteIds = res.data.hits.hits.map((hit) => hit._source?.id);

      const stock = await getAvailableStock({
        site_ids: siteIds,
        move_in_date: moveInDate,
      });

      const sites = res.data.hits.hits.filter((site) => {
        const availableSites = stock.data.sites.filter(
          // eslint-disable-next-line
          (s) => s.id === site._source?.id
        );
        return !!availableSites.length;
      });

      const locations = countries.filter((country) => country.id === countryId);
      const districts: IDistrict[] = [];

      locations.forEach((location) => {
        location.cities.forEach((city) => {
          city.districts.forEach((district) => {
            for (let i = 0; i < sites.length; i += 1) {
              const site = sites[i];
              // eslint-disable-next-line
              if (site._source.address.district_id === district.id) {
                districts.push(district);
                break;
              }
            }
          });
        });
      });

      this.districts = districts;
    } catch (error) {
      console.log(error);
    }
    this.isLoading = false;
  };

  // For space types, we get them all but for their startin price, we send district ids
  // then we filter out those which dont have any spaces
  @action
  getSpaceTypes = (args: { country: FixedCountry }) => {
    const { country } = args;
    this.isLoading = true;
    let districtIds = [...this.quotationDetails.districtIds];
    if (districtIds.indexOf(0) === 0 && districtIds.length === 1) {
      districtIds = this.districts.map((district) => district.id);
    }
    this.apollo
      .query<PlatformSpaceTypes, PlatformSpaceTypesVariables>({
      query: PLATFORM_SPACE_TYPES_QUERY,
      variables: {
        country,
        districtIds: districtIds.filter((id) => id !== 0),
      },
    })
      .then((res) => {
        const spaceTypes = [...res.data.space_types?.edges]
          .map((s) => ({
            ...s,
          }))
          .sort((a, b) => a.size_to - b.size_to);

        this.allSpaceTypes = spaceTypes;
        this.spaceTypes = spaceTypes.filter((st) => !!st.spaces?.edges?.length);
        this.isLoading = false;
      })
      .catch((err) => {
        this.isLoading = false;
        console.log(err);
      });
  };

  @action
  getQuotationVariables = (): QuotationPayload => {
    const {
      fullName, email, countryCode, phoneNumber, districtIds,
      spaceId, spaceTypeId, siteId, promoCode, promotionId, moveInDate,
    } = this.quotationDetails;
    const spaceIndex = fullName.value.indexOf(' ');
    const firstName = spaceIndex < 0 ? fullName.value : fullName.value.slice(0, spaceIndex);
    const lastName = spaceIndex < 0 ? '' : fullName.value.slice(
      spaceIndex,
      fullName.value.length,
    );
    const phone = `${countryCode}${(phoneNumber.value || '').replaceAll(
      ' ',
      '',
    )}`;

    let ids = [...districtIds];
    if (ids.indexOf(0) === 0 && ids.length === 1) {
      ids = this.districts.map((district) => district.id);
    }
    const payload: QuotationPayload = {
      move_in_date: DayJS(moveInDate, 'DD-MM-YYYY').format('YYYY-MM-DD'),
      first_name: firstName,
      last_name: lastName,
      phone_number: phone,
      email: email.value,
      preferred_language: Router.locale,
    };
    if (ids.length) payload.district_ids = ids.filter((id) => id !== 0);
    if (spaceTypeId) payload.space_type_id = spaceTypeId;
    if (siteId) payload.site_id = siteId;
    if (spaceId) payload.space_id = spaceId;
    if (promoCode) payload.promo_code = promoCode?.value;
    if (promotionId) payload.promotion_id = +promotionId?.value;
    return payload;
  };

  @action
  createQuotation = async (): Promise<void> => {
    if (this.currentStep === this.totalSteps) {
      this.isLoading = true;
      const payload = this.getQuotationVariables();
      try {
        const response = await this.apollo.mutate<createQuotation, createQuotationVariables>({
          mutation: CREATE_QUOTATION_MUTATION,
          variables: {
            payload,
          },
        });
        runInAction(() => {
          this.isSuccess = response.data?.createQuotation?.success;
        });
      } catch (error) {
        this.error = error.message;
      }
      this.isLoading = false;
    }
  };
}
