import {
  Box,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import DayJS from 'dayjs';
import usePageTranslation from '../../../../hooks/usePageTranslation';
import ItemDetail from '../../../host/components/ItemDetail';
import { ReservationDetailQuery_booking } from '../../queries/__generated__/ReservationDetailQuery';

const useStyles = makeStyles((theme: Theme) => (
  {
    root: {
      paddingBottom: '60px',
    },
    status: {
      textTransform: 'capitalize',
      fontWeight: 600,
      fontSize: '16px',
      lineHeight: '18px',
      marginBottom: 0,
      '&.completed, &.confirmed': {
        color: theme.palette.success.main,
      },
      '&.cancelled': {
        color: theme.palette.error.main,
      },
    },
  }
));

interface IProps {
  item?: ReservationDetailQuery_booking;
}

const Details: React.FC<IProps> = ({
  item = {},
}) => {
  const classes = useStyles();
  const { t } = usePageTranslation('hostReservation', 'Details');

  const getCurrencySign = () => item?.currency_sign || '';
  const orderTotalAmount = item?.orders?.[0]?.total_amount || 0;
  const listItems = [
    {
      name: t('listItemsName1'),
      value: `${getCurrencySign()} ${item?.renewals?.[0]?.sub_total_amount || 0}`,
    },
    {
      name: t('listItemsName2'),
      value: `${getCurrencySign()} ${item?.orders?.[0]?.order_pick_up_service?.amount || 0}`,
    },
    {
      name: t('listItemsName3'),
      value: `${getCurrencySign()} ${item?.renewals?.[0]?.insurance_amount || 0}`,
    },
    {
      name: t('listItemsName4'),
      value: `${getCurrencySign()} ${item?.renewals?.[0]?.deposit_amount || 0}`,
    },
    {
      name: t('listItemsName5'),
      value: `${getCurrencySign()} ${item?.renewals?.[0]?.discount_amount || 0}`,
    },
    {
      name: t('listItemsName6'),
      value: `${getCurrencySign()} ${item?.renewals?.[0]?.total_amount + orderTotalAmount}`,
    },
  ];

  return (
    <Box className={classes.root}>
      <Typography
        variant="h6"
        gutterBottom
        className={`${classes.status} ${item?.status?.toLowerCase()}`}
      >
        {item?.status}
      </Typography>
      <ItemDetail
        name={(`
        ${item?.site_name || ''}
        ${item?.space_size || ''} 
        ${item?.space_size_unit || ''}
        `).trim() || 'N/A'}
        value={' '}
      />
      <ItemDetail
        name={t('itemDetailName1')}
        value={(`
          ${item?.site_name || ''}
          ${item?.site_address?.street || ''}
          ${item?.site_address?.postal_code || ''}
          ${item?.site_address?.country?.name_en || ''}
        `).trim() || 'N/A'}
      />
      <ItemDetail name={t('itemDetailName2')} value={item?.site_name} />
      <ItemDetail
        name={t('itemDetailName3')}
        value={(`
          ${item?.space_size || ''} 
          ${item?.space_size_unit || ''}`).trim() || 'N/A'}
      />
      <ItemDetail name={t('itemDetailName4')} value={item?.id} />
      <ItemDetail name={t('itemDetailName5')} value={item?.move_in_date ? DayJS(item?.move_in_date).format('D MMM, YYYY') : ''} />
      <ItemDetail name={t('itemDetailName6')} value={item?.move_out_date ? DayJS(item?.move_out_date).format('D MMM, YYYY') : ''} />
      <ItemDetail
        name={t('itemDetailName7')}
        value={`
        ${item?.customer?.last_name || ''}
        ${item?.customer?.first_name || ''}
        ${item?.customer?.email || ''}
        ${item?.customer?.phone_number || ''}`}
      />
      {/* <ItemDetail name="Review" /> */}
      <ItemDetail name={t('itemDetailName8')} isListItems listItems={listItems} />
      {/* <ItemDetail name="Transaction by"
      value={item?.transactions?.[0]?.card_brand_name || 'N/A'} /> */}
    </Box>
  );
};

export default Details;
