import React from 'react';
import { Box } from '@material-ui/core';
import { useRouter } from 'next/router';

import Subtotal from './Subtotal';
import Total from './Total';
import usePageTranslation from '../../../../hooks/usePageTranslation';
import { IAppliedTax } from '../../hooks/useCheckoutPrice';
import { TaxType } from '../../../../typings/graphql.types';
import { getTranslatedName } from '../../../../utilities/market';

interface IPromotion {
  code: string;
  name_en: string;
}

interface IProps {
  total: number;
  subTotal: number;
  services: number;
  insurance: number;
  deposit: number;
  discountedAmount: number;
  appliedPromotion: IPromotion;
  currencySign: string;
  appliedTax: IAppliedTax[]
  totalTax?: number;
}

const PriceInfo: React.FC<IProps> = ({
  total,
  subTotal,
  services,
  insurance,
  deposit,
  discountedAmount,
  appliedPromotion,
  currencySign,
  appliedTax,
  totalTax,
}) => {
  const { locale } = useRouter();
  const { t } = usePageTranslation('checkout', 'PriceInfo');
  let taxTitle = '';
  const taxes = appliedTax || [];
  if (taxes.length) {
    taxTitle = `${getTranslatedName(taxes[0], 'name', locale)}(${taxes[0].value}${taxes[0].type === TaxType.PERCENTAGE ? '%' : currencySign})`;
  }

  return (
    <Box mt={11} mb={8}>
      <Subtotal title={t('title1')} price={`${currencySign}${subTotal.toFixed(2)}`} />
      <Subtotal title={t('title2')} price={`${currencySign}${deposit.toFixed(2)}`} />

      {discountedAmount > 0 && !appliedPromotion?.code
        && <Subtotal title={t('title3')} price={`-${currencySign}${discountedAmount.toFixed(2)}`} />}

      {discountedAmount > 0 && !!appliedPromotion?.code
        && (
          <Subtotal
            title={`${t('title4')} (${appliedPromotion?.code})`}
            price={`-${currencySign}${discountedAmount.toFixed(2)}`}
          />
        )}

      <Subtotal title={t('title5')} price={`${currencySign}${services.toFixed(2)}`} />

      <Subtotal title={t('title6')} price={`${currencySign}${insurance.toFixed(2)}`} />

      {(totalTax > 0) && (
        <Subtotal title={taxTitle} price={`${currencySign}${totalTax.toFixed(2)}`} />
      )}

      <Total price={`${currencySign}${total.toFixed(2)}`} />
    </Box>
  );
};

export default PriceInfo;
