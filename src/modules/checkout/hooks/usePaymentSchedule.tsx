import { useMutation } from '@apollo/client';
import { Dayjs } from 'dayjs';
import { useEffect } from 'react';

import { PAYMENT_SCHEDULE } from '../queries';
import { PaymentSchedule, PaymentScheduleVariables, PaymentSchedule_paymentSchedule } from '../queries/__generated__/PaymentSchedule';

interface IProps {
  spaceId: number;
  moveInDate: Dayjs;
  moveOutDate?: Dayjs;
  serviceId?: number;
  insuranceId?: number;
  promoId: number;
  promoCode?: string;
  quotationItemId?: number;
}

export type IPaymentSchedule = PaymentSchedule_paymentSchedule;

const usePaymentSchedule = ({
  spaceId,
  moveInDate,
  moveOutDate,
  serviceId,
  insuranceId,
  promoCode,
  promoId,
  quotationItemId,
}: IProps): IPaymentSchedule[] => {
  const [calculate, data] = useMutation<PaymentSchedule, PaymentScheduleVariables>(
    PAYMENT_SCHEDULE,
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
      },
    })
      .catch((e) => {
        console.log(e.message);
      });
  }, [quotationItemId, spaceId,
    serviceId, insuranceId,
    moveInDate, moveOutDate, promoCode, promoId]);

  return data?.data?.paymentSchedule || [];
};

export default usePaymentSchedule;
