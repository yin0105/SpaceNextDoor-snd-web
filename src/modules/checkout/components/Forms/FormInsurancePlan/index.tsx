import React from 'react';
import { inject, observer } from 'mobx-react';
import { Box } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import usePageTranslation from 'hooks/usePageTranslation';
import ProgressLayout from '../ProgressLayout';
import InsurancePlan from './InsurancePlan';
import handleSubmit from '../../../../../utilities/handleSubmit';
import Info from '../Info';
import { BookingStore, BOOKING_STORE } from '../../../stores/BookingStore';
import { BOOKING_INSURANCES_QUERY } from '../../../queries';
import { BookingInsurancesQuery } from '../../../queries/__generated__/BookingInsurancesQuery';
import { useCurrentCountry } from '../../../../../utilities/market';

interface IProps {
  step: number;
  bookingStore?: BookingStore;
}

const FormInsurancePlan: React.FC<IProps> = (props) => {
  const {
    step,
    bookingStore: { currentStep, setCurrentStep, insurance },
  } = props;
  const { t } = usePageTranslation('checkout', 'FormInsurancePlan');
  const { data: result } = useQuery<BookingInsurancesQuery>(
    BOOKING_INSURANCES_QUERY, { variables: { country: useCurrentCountry().name } },
  );
  const variants = (result?.insurances?.edges || []);

  const coveredAmount = insurance?.covered_amount;
  const currencySign = insurance?.country?.currency_sign;
  const pricePerDay = insurance?.price_per_day;

  const data = insurance
    ? [
      { title: t('titleP1', { coveredAmount, currencySign, pricePerDay }), value: '' },
    ]
    : [{ title: t('titleP2'), value: '' }];
  return (
    <Box>
      <form onSubmit={handleSubmit(setCurrentStep, currentStep + 1)}>
        <ProgressLayout step={step} title={t('progressLayoutTitle')}>
          {step < currentStep ? (
            <Info data={data} />
          )
            : (
              <InsurancePlan variants={variants} />
            )}
        </ProgressLayout>
      </form>
    </Box>
  );
};

export default inject(BOOKING_STORE)(observer(FormInsurancePlan));
