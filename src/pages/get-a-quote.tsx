import React, { useState } from 'react';
import { Provider as MobxProvider } from 'mobx-react';

import { QuotationsStore } from 'modules/quotations/stores/QuotationsStore';
import QuotationFlow from 'modules/quotations';
import EstimatorStore from 'modules/estimator/stores/EstimatorStore';
import { PromotionStore } from 'modules/checkout/stores/PromotionStore';

const Quotation = () => {
  const [quotationStore] = useState(new QuotationsStore());
  const [estimatorStore] = useState(new EstimatorStore());
  const [promotionStore] = useState(new PromotionStore());

  return (
    <MobxProvider
      quotationsStore={quotationStore}
      estimatorStore={estimatorStore}
      promotionStore={promotionStore}
    >
      <QuotationFlow />
    </MobxProvider>
  );
};

export default Quotation;
