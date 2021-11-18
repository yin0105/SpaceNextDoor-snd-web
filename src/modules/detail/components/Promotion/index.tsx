import React from 'react';
import { Skeleton } from '@material-ui/lab';
import {
  Box,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import Image from '../../../../components/Image';
import TooltipInfo from '../StickyBookWidget/TooltipInfo';
import usePageTranslation from '../../../../hooks/usePageTranslation';
import {
  GetPublicPromotionsQuery_promotions_edges,
  GetPublicPromotionsQuery_promotions_edges_customer_buys,
} from '../../../checkout/queries/__generated__/GetPublicPromotionsQuery';

interface IProps {
  promotionData:
  GetPublicPromotionsQuery_promotions_edges[] |
  GetPublicPromotionsQuery_promotions_edges_customer_buys[];
  loading: boolean;
}

const Promotion: React.FC<IProps> = ({ promotionData, loading }) => {
  const useStyles = makeStyles((theme) => ({
    promotionBox: {
      maxWidth: '232px',
      padding: '16px 0 0 0',
    },
    promotion: {
      position: 'relative',
      display: 'flex',
      background: theme.palette.success.main,
      color: '#ffffff',
      textTransform: 'uppercase',
      fontSize: 10,
      fontWeight: 700,
      padding: '6px 11px 6px 10px;',
      borderTopLeftRadius: '20px',
      borderBottomLeftRadius: '20px',
      marginBottom: '9px',
      [theme.breakpoints.up('sm')]: {
        fontSize: 12,
      },
    },
    promotionText: {
      fontSize: 10,
      fontWeight: 700,
      [theme.breakpoints.up('sm')]: {
        fontSize: 12,
      },
    },
    triangle: {
      position: 'absolute',
      right: 0,
      top: '2px',
      borderRight: 'solid 12px rgb(255, 255, 255)',
      borderBottom: 'solid 17px transparent',
      borderTop: 'solid 14px transparent',
    },
    shoppingIcon: {
      marginRight: '5px',
      [theme.breakpoints.up('sm')]: {
        marginRight: '6px',
      },
    },
  }));
  const classes = useStyles();
  const { t } = usePageTranslation('details', 'Promotion');
  return (
    loading ? (
      <>
        <Grid item xs={3} sm={6}>
          <Skeleton height={32} width={232} animation="wave" variant="text" />
        </Grid>
        <Grid item xs={3} sm={6}>
          <Skeleton height={32} width={232} animation="wave" variant="text" />
        </Grid>
        <Grid item xs={3} sm={6}>
          <Skeleton height={32} width={232} animation="wave" variant="text" />
        </Grid>
      </>
    ) : (
      !!promotionData.length && (
      <Box className={classes.promotionBox}>
        <Typography component="div" className={classes.promotion}>
          <Image name="shopping" folder="DetailPage" className={classes.shoppingIcon} />
          <Typography className={classes.promotionText}>
            {t('typography1', { count: promotionData?.length })}
          </Typography>
          <Box className={classes.triangle} />
        </Typography>
        {promotionData?.map(
          (item) => (
            <TooltipInfo showPromoName key={item.id} item={item} />
          ),
        )}
      </Box>
      )
    )
  );
};

export default Promotion;
