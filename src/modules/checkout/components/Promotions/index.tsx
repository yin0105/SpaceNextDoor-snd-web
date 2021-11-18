import React, { useEffect, useState } from 'react';
import {
  Box,
  FormControlLabel,
  makeStyles,
  RadioGroup,
  Typography,
} from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import { useRouter } from 'next/router';
import * as gtag from 'utilities/gtag';
import { GetPublicPromotionsQuery_promotions_edges } from 'modules/checkout/queries/__generated__/GetPublicPromotionsQuery';
import { getTranslatedName } from 'utilities/market';
import Grey3Typography from '../../../../components/Typographies/Grey3Typography';
import { BookingStore, BOOKING_STORE } from '../../stores/BookingStore';
import { PromotionStore, PROMOTION_STORE_KEY } from '../../stores/PromotionStore';
import StyledRadio from '../../../../components/RadioButton';
import PromoCodeInput from './PromoCode';
import { IPromotion } from '../../hooks/useCheckoutPrice';
import usePageTranslation from '../../../../hooks/usePageTranslation';
import { filterPromotions } from '../../../../utilities/promotions';
import TooltipInfo from '../../../detail/components/StickyBookWidget/TooltipInfo';
import { capitalizeFirstLetter } from '../../../../utilities/capitalizeFirstLetter';

interface IProps {
  [BOOKING_STORE]?: BookingStore;
  [PROMOTION_STORE_KEY]?: PromotionStore
  appliedPromotion: IPromotion;
  promotionError: string;
  appliedPublicPromotion: IPromotion;
  total: number;
}

const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.up('sm')]: {
      border: '1px solid #06C270',
      borderRadius: '30px',
      paddingBottom: '20px',
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
      width: '100%',
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

const Promotions: React.FC<IProps> = ({
  promotionStore,
  bookingStore,
  appliedPromotion,
  promotionError,
  appliedPublicPromotion,
  bookingStore: {
    bookingDetails,
  },
  total,
}) => {
  const { locale } = useRouter();
  const [publicPromos, setPublicPromos] = useState<GetPublicPromotionsQuery_promotions_edges[]>([]);
  const changePromo = (value) => {
    if (value !== bookingStore.bookingDetails.promoId) {
      const selectedPromo = promotionStore?.publicPromotions.find((promo) => promo.id === value);
      if (selectedPromo) {
        gtag.enhancedTrack({
          event: 'promotionClick',
          ecommerce: {
            promoClick: {
              promotions: [{
                promoId: selectedPromo.id,
                promoName: selectedPromo.name_en,
              }],
            },
          },
        });
      }
    }
    bookingStore.setBookingDetails('promoId', value);
  };

  useEffect(() => {
    const siteId = bookingStore?.space?.site?.id;
    if (siteId) {
      setPublicPromos(filterPromotions(promotionStore?.publicPromotions, siteId));
    }
  }, [bookingStore?.space?.site?.id, promotionStore?.publicPromotions]);

  const { t } = usePageTranslation('checkout', 'Promotions');
  const classes = useStyles();
  useEffect(() => {
    if (publicPromos.length) {
      const trackingPayload = [];
      for (let i = 0; i < publicPromos.length; i += 1) {
        trackingPayload.push({
          id: publicPromos[i].id,
          name: publicPromos[i].name_en,
        });
      }
      gtag.enhancedTrack({
        ecommerce: {
          promoView: {
            promotions: trackingPayload,
          },
        },
      });
    }
  }, [publicPromos]);
  return (
    <Box>
      <Box minHeight="40px">
        {!!bookingStore.bookingDetails.promoId?.value && (!appliedPublicPromotion?.id && !!total
          && <Typography className={classes.error}>{t('error')}</Typography>)}
      </Box>
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
                <RadioGroup className={classes.radioGroups} aria-label="promoId" name="customized-radios">
                  {publicPromos.map((promo, index) => (
                    <Box id={`promo${index}`} key={index} display="flex" alignItems="center">
                      <FormControlLabel
                        control={(
                          <StyledRadio
                            value={promo.id}
                            checked={bookingDetails?.promoId?.value === promo.id}
                            onChange={() => changePromo(promo.id)}
                          />
                        )}
                        label={capitalizeFirstLetter(getTranslatedName(promo, 'name', locale))}
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
                        checked={bookingDetails?.promoId?.value === null}
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
          <PromoCodeInput promotionError={promotionError} appliedPromotion={appliedPromotion} />
        </Box>
      </Box>
    </Box>
  );
};

export default inject(BOOKING_STORE, PROMOTION_STORE_KEY)(observer(Promotions));
