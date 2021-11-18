import {
  action, computed, makeAutoObservable, observable, runInAction,
} from 'mobx';
import DayJS, { Dayjs } from 'dayjs';
import Router from 'next/router';
import { ApolloClient, FetchResult } from '@apollo/client';
import { isValidPhoneNumber } from 'libphonenumber-js';
import CustomParse from 'dayjs/plugin/customParseFormat';
import ClevertapReact from 'clevertap-react';
import { IDynamicAdsParam } from 'typings/dynamic-ads.type';
import { getCountry } from 'utilities/market';
import getAvailableStock from 'utilities/getAvailableStock';
import { GetSpaceQuery, GetSpaceQueryVariables, GetSpaceQuery_spaces_edges } from '../queries/__generated__/GetSpaceQuery';
import { initializeApollo } from '../../../apollo';
import {
  CREATE_BOOKING,
  CREATE_ORDER,
  GET_BOOKING_QUERY,
  GET_SPACE_BY_ID,
  GET_BOOKING_BY_ID,
  PAY_BOOKING,
  UPDATE_BOOKING,
} from '../queries';
import { FixedCountry, PriceType } from '../../../typings/graphql.types';
import { isMoveInDateValid, isMoveOutDateValid, isValidEmail } from '../../../utilities/bookingValidation';
import { CreateBooking, CreateBookingVariables } from '../queries/__generated__/CreateBooking';
import { PayBooking, PayBookingVariables } from '../queries/__generated__/PayBooking';
import { BookingServicesQuery_services_edges } from '../queries/__generated__/BookingServicesQuery';
import { CreateOrder, CreateOrderVariables } from '../queries/__generated__/CreateOrder';
import { GetBookingQuery, GetBookingQueryVariables, GetBookingQuery_booking } from '../queries/__generated__/GetBookingQuery';
import { GetBookingDetailsQuery, GetBookingDetailsQueryVariables } from '../queries/__generated__/GetBookingDetailsQuery';
import { BookingInsurancesQuery_insurances_edges } from '../queries/__generated__/BookingInsurancesQuery';
import { UpdateBooking, UpdateBookingVariables } from '../queries/__generated__/UpdateBooking';
import * as gtag from '../../../utilities/gtag';
import { checkTime } from '../../../utilities/checkTime';

DayJS.extend(CustomParse);

interface IInput {
  value: string;
  errorMessage: string;
}

interface IBookingDetails {
  autoRenewal: boolean;
  fullName: IInput;
  email: IInput;
  countryCode: string;
  countryName: FixedCountry;
  phoneNumber: IInput;
  moveInDate: Dayjs;
  moveOutDate: Dayjs;
  promoCode: IInput;
  promoId: number;
}

interface IPrice {
  currency: string;
  value: number;
}

interface ISlot {
  time: number;
  label: string;
}

export const BOOKING_STORE = 'bookingStore';

export const TIMER_KEY = '@bookings_timer';

export class BookingStore {
  constructor(defaultLocale = 'en-US', locale = 'en-US') {
    makeAutoObservable(this);
    this.apollo = initializeApollo();
    this.defaultLocale = defaultLocale;
    this.locale = locale;
    this.initializeVariables();
    this.generateSlots();
  }

  private apollo: ApolloClient<any>;

  private defaultLocale: string;

  private locale: string;

  @observable currentStep = 0;

  @observable startTimer = true;

  @observable timerFinished = false;

  @observable bookingId: number = null;

  @observable availableUntil: Dayjs = null;

  @observable spaceId: number = null;

  @observable serviceId = 0;

  @observable isAvailable: boolean = undefined;

  @observable insuranceId = 0;

  @observable bookingError = '';

  @observable paymentError = '';

  @observable isProcessing = false;

  @observable space: GetSpaceQuery_spaces_edges = null;

  @observable service: BookingServicesQuery_services_edges = null;

  @observable insurance: BookingInsurancesQuery_insurances_edges = null;

  @observable serviceSlots: ISlot[] = null;

  @observable booking: GetBookingQuery_booking = null;

  @observable bookingDetails = {
    autoRenewal: true,
    fullName: { value: '', errorMessage: '' },
    email: { value: '', errorMessage: '' },
    phoneNumber: { value: '', errorMessage: '' },
    moveInDate: DayJS().add(1, 'day'),
    moveOutDate: undefined, // DayJS().add(30, 'day'),
    countryCode: '',
    countryName: FixedCountry.Singapore,
    promoCode: { value: '', errorMessage: '' },
    promoId: null,
  };

  @observable pickUpDetails = {
    address: { value: '', err: '' },
    lat: { value: null, err: '' },
    lng: { value: null, err: '' },
    longitude: null,
    time: { value: 13, err: '' },
    moverCount: { value: 0, err: '' },
  };

  initializeVariables(): void {
    let params = {} as any;

    if (typeof window !== 'undefined') {
      params = Router.query as any;
      const timer = parseInt(localStorage.getItem(TIMER_KEY), 10);
      // Only start the timer on page refresh, if booking was created
      this.timerFinished = params.booking_id && timer <= 0;
      this.startTimer = params.booking_id && !!timer;
    }
    this.bookingDetails.countryName = getCountry(this.defaultLocale).name;
    this.bookingDetails.countryCode = getCountry(this.defaultLocale).phoneCode;
    this.bookingDetails.moveInDate = params.move_in ? DayJS(params.move_in as string, 'DD-MM-YYYY') : this.bookingDetails.moveInDate;
    this.bookingDetails.moveOutDate = params.move_out ? DayJS(params.move_out as string, 'DD-MM-YYYY') : undefined;
    this.availableUntil = params.available_until ? DayJS(params.available_until as string, 'DD-MM-YYYY') : undefined;
    this.bookingDetails.autoRenewal = !params.move_out;
    this.bookingId = parseInt(params?.booking_id as string, 10) || null;
    this.spaceId = parseInt(params?.space_id as string, 10) || null;
    this.currentStep = this.bookingId ? 1 : 0;
  }

  generateSlots(): void {
    const startTime = 8;
    const endTime = 20;
    const slots: ISlot[] = [];
    const getAmPm = (t: number) => (t < 12 ? 'AM' : 'PM');
    for (let i = startTime; i < endTime; i += 1) {
      slots.push({
        time: i,
        label: `${i}:00 ${getAmPm(i)} - ${i + 1}:00 ${getAmPm(i + 1)}`,
      });
    }

    this.serviceSlots = slots;
  }

  private resetTimer() {
    localStorage.removeItem(TIMER_KEY);
    this.startTimer = true;
    this.timerFinished = false;
  }

  @computed
  get subTotal(): IPrice {
    const price = (this.space?.prices || []).filter((p) => p.type === PriceType.BASE_PRICE)[0];

    return {
      currency: price?.currency_sign || '$',
      value: price?.price_per_month || 0,
    };
  }

  @computed
  get total(): IPrice {
    const price = (this.space?.prices || []).filter((p) => p.type === PriceType.BASE_PRICE)[0];
    const servicePrice = this.pickupServicesTotal.value;

    return {
      currency: price?.currency_sign || '$',
      value: servicePrice + (price?.price_per_month || 0),
    };
  }

  @computed
  // eslint-disable-next-line class-methods-use-this
  get pickupServicesTotal(): IPrice {
    return {
      currency: '$',
      value: this.service?.fixed_price || 0,
    };
  }

  @computed
  // eslint-disable-next-line class-methods-use-this
  get insuranceTotal(): IPrice {
    return {
      currency: '$',
      value: 0,
    };
  }

  @action
  fetchSpace = (spaceId: number, quotationId: string | undefined): void => {
    this.apollo.query<GetSpaceQuery, GetSpaceQueryVariables>({
      query: GET_SPACE_BY_ID,
      variables: {
        id: spaceId,
        country: this.bookingDetails.countryName,
        quotationId,
        isQIdSet: typeof quotationId !== 'undefined',
      },
    })
      .then((result) => {
        if (!result?.data?.spaces?.edges?.[0]) {
          Router.push('/404');
          return;
        }

        runInAction(() => {
          this.space = result?.data?.spaces?.edges?.[0];
          if (this.space?.quotation?.move_in_date) {
            this.setBookingDetails('moveInDate', DayJS(this.space?.quotation?.move_in_date));
            if (this.space?.quotation?.promotion?.code) {
              this.applyPromoCode(this.space?.quotation?.promotion?.code);
            }
            if (this.space?.quotation?.public_promotion?.id) {
              this.setBookingDetails('promoId', this.space?.quotation?.public_promotion?.id);
            }
          }
        });
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  @action
  checkAvailability = async (): Promise<void> => {
    const { data } = await getAvailableStock({
      site_ids: [this.space?.site?.id],
      move_in_date: this.bookingDetails?.moveInDate.format('YYYY-MM-DD'),
    });
    const { spaces } = data.sites[0];
    let isAvailable = false;
    for (let i = 0; i < spaces.length; i += 1) {
      if (this.space?.id === spaces[i].id && !!this.space?.available_units) {
        if (!spaces[i].available_until) {
          isAvailable = true;
          break;
        }
        const availableUntil = spaces[i].available_until;
        if (this.bookingDetails.moveInDate.format('YYYY-MM-DD') < availableUntil) {
          isAvailable = true;
          break;
        }
      }
    }
    runInAction(() => {
      this.isAvailable = isAvailable;
    });
  };

  @action
  populateBookingData = (): void => {
    if (!this.bookingId) {
      return;
    }

    this.apollo.query<GetBookingDetailsQuery, GetBookingDetailsQueryVariables>({
      query: GET_BOOKING_QUERY,
      context: {
        asCustomer: true,
      },
      variables: {
        bookingId: this.bookingId,
      },
    }).then((result) => {
      runInAction(() => {
        this.booking = result?.data?.booking;
        this.bookingDetails = {
          ...this.bookingDetails,
          autoRenewal: result?.data?.booking?.auto_renewal,
          moveInDate: DayJS(result?.data?.booking?.move_in_date),
          moveOutDate: DayJS(result?.data?.booking?.move_out_date),
          email: { value: result?.data?.booking?.customer?.email, errorMessage: '' },
          fullName: { value: result?.data?.booking?.customer?.first_name, errorMessage: '' },
          phoneNumber: { value: result?.data?.booking?.customer_phone_number, errorMessage: '' },
        };
      });
    });
  };

  setProcessing = (isProcessing: boolean): void => {
    this.isProcessing = isProcessing;
  };

  createOrder = async (): Promise<FetchResult> => {
    const order = {
      address: this.pickUpDetails?.address?.value,
      bookingId: this.bookingId,
      serviceId: this.serviceId,
      time: `${this.bookingDetails.moveInDate
        .format(`YYYY-MM-DDT${checkTime(this.pickUpDetails.time.value)}:00:00.000`)}Z`,
      lat: this.pickUpDetails?.lat?.value,
      lng: this.pickUpDetails?.lng?.value,
      additional_requirements: { mover_count: this.pickUpDetails.moverCount.value },
    };
    this.isProcessing = true;

    try {
      const result = await this.apollo.mutate<CreateOrder, CreateOrderVariables>({
        mutation: CREATE_ORDER,
        variables: order,
      });

      runInAction(() => {
        this.isProcessing = false;
      });

      if (result.errors) {
        this.paymentError = result.errors[0]?.message;
        return null;
      }

      return result;
    } catch (e) {
      runInAction(() => {
        this.isProcessing = false;
        this.paymentError = e.message;
      });
      throw new Error(e.message);
    }
  };

  @action
  createBooking = async (): Promise<CreateBooking> => {
    const details = this.bookingDetails;
    const name = details.fullName.value;
    const email = details.email.value;
    const phone = `${details.countryCode}${(details.phoneNumber.value || '').replaceAll(' ', '')}`;
    const moveInDate = details?.moveInDate;
    const moveOutDate = details?.moveOutDate;
    const autoRenewal = details?.autoRenewal;

    if (name.length < 3) {
      this.setBookingDetails('fullName', name, 'invalidFullName');
      return null;
    }

    if (!isValidEmail(email)) {
      this.setBookingDetails('email', email, 'invalidEmail');
      return null;
    }

    if (!isValidPhoneNumber(phone)) {
      this.setBookingDetails('phoneNumber', details?.phoneNumber.value, 'invalidPhoneNumber');
      return null;
    }

    if (
      !autoRenewal
      && (
        !isMoveInDateValid(moveInDate, moveOutDate)
        || !isMoveOutDateValid(moveInDate, moveOutDate)
      )
    ) {
      this.bookingError = 'bookingError';
      return null;
    }

    const booking: CreateBookingVariables = {
      autoRenewal,
      spaceID: this.space?.id,
      siteID: this.space?.site?.id,
      quotationItemId: this.space?.quotation?.items[0].id,
      name,
      email,
      phoneNumber: phone,
      moveInDate,
      moveOutDate,
      promoCode: details.promoCode.value ? details.promoCode.value : undefined,
      promoId: details.promoId?.value ? details.promoId.value : undefined,
      preferredLanguage: Router.locale,
    };

    if (autoRenewal) {
      delete booking.moveOutDate;
    }

    this.isProcessing = true;
    try {
      const result = await this.apollo.mutate<CreateBooking, CreateBookingVariables>({
        mutation: CREATE_BOOKING,
        variables: booking,
      });

      runInAction(() => {
        this.isProcessing = false;

        if (result.errors) {
          this.bookingError = result.errors?.[0]?.message;
          return;
        }

        this.resetTimer();
        this.currentStep += 1;
        this.bookingId = result.data?.createBooking?.id || null;
        this.booking = result?.data?.createBooking;
      });

      return result?.data;
    } catch (e) {
      this.bookingError = e.message;
      this.isProcessing = false;
      throw new Error(e.message);
    }
  };

  updateBooking = async (): Promise<FetchResult> => {
    if (!this.insuranceId) {
      return null;
    }

    this.isProcessing = true;
    try {
      const result = await this.apollo.mutate<UpdateBooking, UpdateBookingVariables>({
        mutation: UPDATE_BOOKING,
        context: {
          asCustomer: true,
        },
        variables: {
          bookingId: this.bookingId,
          insuranceId: this.insuranceId,
        },
      });

      runInAction(() => {
        this.isProcessing = false;
      });

      if (result.errors) {
        this.paymentError = result.errors[0]?.message;
        return null;
      }

      this.fetchBooking(this.bookingId);

      return result;
    } catch (e) {
      runInAction(() => {
        this.isProcessing = false;
        this.paymentError = e.message;
      });
      throw new Error(e.message);
    }
  };

  @action
  payBooking = (token: string, quotationId?: string): void => {
    this.isProcessing = true;
    this.paymentError = '';

    this.apollo.mutate<PayBooking, PayBookingVariables>({
      mutation: PAY_BOOKING,
      variables: {
        cardToken: token,
        bookingId: this.bookingId,
      },
    }).then(({ data, errors }) => {
      runInAction(() => {
        this.isProcessing = false;
      });

      if (errors && errors.length) {
        runInAction(() => {
          this.paymentError = errors[0]?.message;
        });
        return;
      }

      if (!data?.payBooking?.success) {
        runInAction(() => {
          this.paymentError = 'paymentError';
        });
        return;
      }

      const trackingPayload = {
        bookingId: this.bookingId,
        bookingStatus: 'CONFIRMED',
        spaceId: this.booking.original_space.id,
        spaceSize: this.booking.space_size,
        spaceSizeUnit: this.booking.space_size_unit,
        siteName: this.booking.site_name,
        siteId: this.booking.original_site.id,
        insuranceName: this?.booking?.insurance?.name_en || '',
        insuranceAmount: this?.booking?.renewals?.[0]?.insurance_amount || 0,
        currency: this.booking.currency,
        userId: this.booking.customer.id,
        customerName: this.booking.customer.first_name,
        customerPhone: this.booking.customer.phone_number || this.booking.customer_phone_number || '',
        customerEmail: this.booking.customer.email || '',
        baseAmount: this.booking.base_amount,
        subTotalAmount: this.booking.sub_total_amount,
        depositAmount: this.booking.deposited_amount,
        totalAmount: this.booking.total_amount,
        discountAmount: this.booking.discount_amount,
        country: getCountry(this.defaultLocale).name,
        quotationId: this.booking.quotation_item?.quotation?.uuid,
        platform: 'WEB',
      };

      const dynamicAdsParams: IDynamicAdsParam = {
        content_type: ['home_listing', 'product'],
        listing_type: 'for_rent_by_agent',
        content_ids: `${this.booking.original_site.id}`,
        currency: getCountry(this.defaultLocale).currency,
        availability: 'for_rent',
        country: getCountry(this.defaultLocale).name,
      };

      gtag.track('Purchase', dynamicAdsParams);
      ClevertapReact.event('Charged', trackingPayload);

      Router.push({
        pathname: '/checkout/confirmation',
        query: { booking_id: this.bookingId },
      });
    }).catch((e) => {
      runInAction(() => {
        this.paymentError = e.message;
        this.isProcessing = false;
      });
    });
  };

  @action
  fetchBooking = (bookingId: number): void => {
    this.apollo.query<GetBookingQuery, GetBookingQueryVariables>({
      query: GET_BOOKING_BY_ID,
      context: {
        asCustomer: true,
      },
      variables: {
        id: bookingId,
      },
    })
      .then((result) => {
        runInAction(() => {
          this.booking = result?.data?.booking;
        });
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  @action
  setCurrentStep = (currentStep: number): void => {
    this.currentStep = currentStep;
  };

  @action
  applyPromoCode = async (code: string): Promise<any> => {
    this.bookingDetails.promoCode = { value: code, errorMessage: '' };
  };

  @action
  removePromoCode = (): void => {
    this.bookingDetails.promoCode = { value: '', errorMessage: '' };
  };

  @action
  setError = (err: string): void => {
    this.bookingError = err;
  };

  @action
  setTimerFinishedState = (state: boolean): void => {
    this.timerFinished = state;
  };

  @action
  setPaymentError = (err: string): void => {
    this.paymentError = err;
  };

  @action
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setBookingDetails = (property: keyof IBookingDetails, value: any, err = ''): void => {
    if (
      typeof this.bookingDetails[property] === 'object'
      && !(this.bookingDetails[property] instanceof DayJS)
      && !(value instanceof DayJS)
    ) {
      (this.bookingDetails[property] as any) = { value, errorMessage: err };
    } else {
      (this.bookingDetails[property] as any) = value;
    }
  };

  @action
  setPickupDetails = (
    property: 'time' | 'address' | 'lat' | 'lng' | 'moverCount',
    value: number | string,
    err = '',
  ): void => {
    (this.pickUpDetails[property] as any) = { value, err };
  };

  @action
  selectService = (id: number, service: BookingServicesQuery_services_edges): void => {
    this.serviceId = id;
    this.service = service;
    const trackingPayload = {
      bookingId: this.booking.id,
      userId: this.booking.customer.id,
      customerName: this.booking.customer.first_name,
      customerPhone: this.booking.customer.phone_number,
      customerEmail: this.booking.customer.email,
      siteId: this.booking.original_site.id,
      siteName: this.booking.site_name,
      spaceSizeUnit: this.booking.space_size_unit,
      spaceSize: this.booking.space_size,
      serviceId: id,
      serviceName: service?.title_en || 'Don\'t Need Service',
      serviceAmount: service?.fixed_price,
      baseAmount: this.booking.base_amount,
      depositAmount: this.booking.deposited_amount,
      discountAmount: this.booking.discount_amount,
      subTotalAmount: this.booking.sub_total_amount,
      totalAmount: this.booking.total_amount,
      currency: this.booking.currency,
      platform: 'WEB',
      country: getCountry(this.defaultLocale).name,
    };

    gtag.track('select_service', trackingPayload);
    ClevertapReact.event('set_service', trackingPayload);
  };

  @action
  setInsurancePlan = (id: number, insurance: BookingInsurancesQuery_insurances_edges): void => {
    this.insurance = insurance;
    this.insuranceId = id;

    if (this.booking) {
      const trackingPayload = {
        bookingId: this.bookingId,
        bookingStatus: this.booking.status,
        insuranceName: insurance?.name_en,
        insuranceDailyPrice: insurance?.price_per_day,
        currency: this.booking.currency,
        userId: this.booking.customer.id,
        customerName: this.booking.customer.first_name,
        customerPhone: this.booking.customer.phone_number || '',
        customerEmail: this.booking.customer.email || '',
        siteName: this.booking.site_name,
        siteId: this.booking.original_site.id,
        spaceSizeUnit: this.booking.space_size_unit,
        spaceSize: this.booking.space_size,
        baseAmount: this.booking.base_amount,
        depositAmount: this.booking.deposited_amount || 0,
        discountAmount: this.booking.discount_amount || 0,
        subTotalAmount: this.booking.sub_total_amount || 0,
        totalAmount: this.booking.total_amount + insurance.price_per_day * 30 || 0,
        country: getCountry(this.defaultLocale).name,
        platform: 'WEB',
      };

      gtag.track('set_insurance', trackingPayload);
      ClevertapReact.event('set_insurance', trackingPayload);
    }
  };
}
