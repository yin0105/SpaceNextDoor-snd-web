import { useMutation } from '@apollo/client';
import { Dayjs } from 'dayjs';
import { useEffect } from 'react';
import { PickupServiceDetailsCheckoutPricePayload, TaxEntityType, TaxType } from '../../../typings/graphql.types';

import { CALCULATE_PRICE } from '../queries';
import { CalculateBookingPrice, CalculateBookingPriceVariables } from '../queries/__generated__/CalculateBookingPrice';

interface IProps {
  spaceId: number;
  moveInDate: Dayjs;
  moveOutDate?: Dayjs;
  serviceId?: number;
  insuranceId?: number;
  promoId?: number;
  promoCode: string;
  quotationItemId?: number;
  pickupDetails?: PickupServiceDetailsCheckoutPricePayload;
}

export interface IPromotion {
  id: number;
  name_en: string;
  code: string;
}

export interface IAppliedTax {
  name_en: string;
  entity_type: TaxEntityType;
  amount: number;
  type: TaxType;
  value: number;
}

interface IResult {
  insurance: number;
  total: number;
  subTotal: number;
  services: number;
  deposit: number;
  discountedAmount: number;
  appliedPromotion?: IPromotion
  promotionError?: string;
  currencySign?: string
  appliedPublicPromotion?: IPromotion
  totalTax: number;
  appliedTax: IAppliedTax[]
}

const useCheckoutPrice = ({
  spaceId,
  moveInDate,
  moveOutDate,
  serviceId,
  insuranceId,
  promoCode,
  promoId,
  quotationItemId,
  pickupDetails,
}: IProps): IResult => {
  const [calculate, data] = useMutation<CalculateBookingPrice, CalculateBookingPriceVariables>(
    CALCULATE_PRICE,
  );
  useEffect(() => {
    calculate({
      variables: {
        spaceId,
        moveInDate,
        moveOutDate,
        insuranceId: insuranceId || undefined,
        serviceId: serviceId || undefined,
        promoCode: promoCode || undefined,
        promotionId: promoId || undefined,
        quotationItemId: quotationItemId || undefined,
        pickupDetails,
      },
    })
      .catch((e) => {
        console.log(e.message);
      });
  }, [
    spaceId, serviceId, insuranceId,
    quotationItemId,
    moveInDate, moveOutDate, promoCode,
    promoId, pickupDetails?.pick_up_location?.lat,
    pickupDetails?.pick_up_location?.lng,
    pickupDetails?.schedule_at,
    pickupDetails?.additional_requirements?.mover_count,
  ]);

  const promotionError = data?.data?.calculateCheckOutPrice?.promotion_error || null;
  const appliedPromotion = data?.data?.calculateCheckOutPrice?.applied_promotion || null;

  return {
    insurance: data?.data?.calculateCheckOutPrice?.insurance_price || 0,
    services: data?.data?.calculateCheckOutPrice?.service_price || 0,
    total: data?.data?.calculateCheckOutPrice?.payable_amount || 0,
    subTotal: data?.data?.calculateCheckOutPrice?.sub_total_amount || 0,
    deposit: data?.data?.calculateCheckOutPrice?.deposit_amount || 0,
    discountedAmount: data?.data?.calculateCheckOutPrice?.discounted_amount || 0,
    currencySign: data?.data?.calculateCheckOutPrice?.currency_sign || '',
    appliedPublicPromotion: data?.data?.calculateCheckOutPrice?.public_promotion,
    appliedPromotion,
    promotionError,
    totalTax: data?.data?.calculateCheckOutPrice?.total_tax,
    appliedTax: data?.data?.calculateCheckOutPrice?.applied_taxes,
  };
};

export default useCheckoutPrice;
