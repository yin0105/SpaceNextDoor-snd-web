import React, { useEffect, useState } from 'react';
import {
  Box,
  FormControlLabel,
  makeStyles,
  RadioGroup,
} from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import { useRouter } from 'next/router';
import { GetPublicPromotionsQuery_promotions_edges } from 'modules/checkout/queries/__generated__/GetPublicPromotionsQuery';
import { getTranslatedName } from 'utilities/market';
import {
  QuotationsStore,
  QUOTATIONS_STORE_KEY,
} from 'modules/quotations/stores/QuotationsStore';
import PaymentSchedule from 'modules/checkout/components/PaymentSchedule';
import usePaymentSchedule from 'modules/checkout/hooks/usePaymentSchedule';
import useCheckoutPrice from 'modules/checkout/hooks/useCheckoutPrice';
import Grey3Typography from '../../../../../../components/Typographies/Grey3Typography';
import {
  PromotionStore,
  PROMOTION_STORE_KEY,
} from '../../../../../checkout/stores/PromotionStore';
import StyledRadio from '../../../../../../components/RadioButton';
import PromoCodeInput from './PromoCode';
import usePageTranslation from '../../../../../../hooks/usePageTranslation';
import { filterPromotions } from '../../../../../../utilities/promotions';
import TooltipInfo from '../../../../../detail/components/StickyBookWidget/TooltipInfo';
import { capitalizeFirstLetter } from '../../../../../../utilities/capitalizeFirstLetter';

interface IProps {
  [PROMOTION_STORE_KEY]?: PromotionStore;
  [QUOTATIONS_STORE_KEY]?: QuotationsStore;
}

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: '400px',
    [theme.breakpoints.up('sm')]: {
      border: '1px solid #06C270',
      borderRadius: '30px',
      paddingBottom: '20px',
      width: '400px',
    },
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '5px',
    background: '#e6f9f1',
    borderRadius: '30px 30px 0 0',
    padding: '15px 20px',
    [theme.breakpoints.down('sm')]: {
      padding: '15px 26px',
      borderRadius: '0',
      width: '100vw',
      marginLeft: '-15px',
    },
  },
  root: {
    marginRight: '0',
  },
  label: {
    color: theme.palette.grey[100],
  },
  infoIcon: {
    marginLeft: '6px',
    marginTop: '7px',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  error: {
    color: 'red',
    fontSize: '12px',
  },
  padding: {
    padding: '0 20px',
    [theme.breakpoints.down('sm')]: {
      padding: '0',
    },
  },
  radioGroups: {
    paddingLeft: '10px',
  },
}));

const Promotions: React.FC<IProps> = ({ promotionStore, quotationsStore }) => {
  const {
    quotationDetails, setQuotationDetails,
    promotionError, setPromotionError,
  } = quotationsStore;
  const { locale } = useRouter();
  const [publicPromos, setPublicPromos] = useState<
  GetPublicPromotionsQuery_promotions_edges[]
  >([]);
  const { siteId } = quotationDetails;
  const { t } = usePageTranslation('checkout', 'Promotions');

  const promoId = +quotationDetails.promotionId.value;
  const promoCode = quotationDetails.promoCode.value;

  const paymentSchedule = usePaymentSchedule({
    spaceId: quotationDetails.spaceId,
    moveInDate: quotationDetails.moveInDate,
    promoId,
  });

  const {
    appliedPromotion,
    promotionError: promoError, subTotal,
  } = useCheckoutPrice({
    spaceId: quotationDetails.spaceId,
    moveInDate: quotationDetails.moveInDate,
    promoId,
    promoCode,
  });

  useEffect(() => {
    if (!promoError && !appliedPromotion && promoId && promoCode && subTotal) {
      setPromotionError(t('promoError'));
    } else {
      setPromotionError(promoError);
    }
  }, [promoError, appliedPromotion, subTotal]);

  useEffect(() => {
    promotionStore?.fetchPublicPromotions();
  }, []);

  const changePromo = (value) => {
    setQuotationDetails('promotionId', value);
  };

  useEffect(() => {
    if (siteId) {
      setPublicPromos(
        filterPromotions(promotionStore?.publicPromotions, siteId),
      );
    }
  }, [promotionStore?.publicPromotions, siteId]);

  const classes = useStyles();

  return (
    <Box>
      <Box mb={8} className={classes.container}>
        {publicPromos?.length > 0 && (
          <>
            <Box className={classes.header}>
              <Box>
                <Grey3Typography variant="h5">
                  {t('grey3Typography')}
                </Grey3Typography>
              </Box>
            </Box>
            <Box className={classes.padding}>
              <Box>
                <RadioGroup
                  className={classes.radioGroups}
                  aria-label="promoId"
                  name="customized-radios"
                >
                  {publicPromos.map((promo, index) => (
                    <Box
                      id={`promo${index}`}
                      key={index}
                      display="flex"
                      alignItems="center"
                    >
                      <FormControlLabel
                        control={(
                          <StyledRadio
                            value={promo.id}
                            checked={
                              +quotationDetails.promotionId.value === promo.id
                            }
                            onChange={() => changePromo(promo.id)}
                          />
                        )}
                        label={capitalizeFirstLetter(
                          getTranslatedName(promo, 'name', locale),
                        )}
                        classes={{ root: classes.root, label: classes.label }}
                      />
                      <TooltipInfo
                        className={classes.infoIcon}
                        key={promo.id}
                        item={promo}
                      />
                    </Box>
                  ))}
                  <FormControlLabel
                    control={(
                      <StyledRadio
                        value={null}
                        checked={quotationDetails.promotionId.value === null}
                        onChange={() => changePromo(null)}
                      />
                    )}
                    label={t('label')}
                    classes={{ root: classes.root, label: classes.label }}
                  />
                </RadioGroup>
              </Box>
            </Box>
          </>
        )}

        <Box className={classes.padding}>
          <PromoCodeInput
            promotionError={promotionError || ''}
            appliedPromotion={appliedPromotion}
          />
        </Box>
      </Box>
      {!!paymentSchedule.length && (
        <PaymentSchedule
          paymentSchedule={paymentSchedule}
          onGoingPrice={subTotal}
          moveOutDateSelected={false}
        />
      )}
    </Box>
  );
};

export default inject(
  QUOTATIONS_STORE_KEY,
  PROMOTION_STORE_KEY,
)(observer(Promotions));
