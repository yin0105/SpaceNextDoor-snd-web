import { Box, makeStyles, Typography } from '@material-ui/core';
import { getTranslatedName } from 'utilities/market';
import { useRouter } from 'next/router';
import usePageTranslation from '../../../../hooks/usePageTranslation';
import { ListSpaceQuery_space } from '../../queries/__generated__/ListSpaceQuery';
import ItemDetail from '../ItemDetail';

const useStyles = makeStyles({
  root: {},
  status: {
    color: '#06C270',
    textTransform: 'capitalize',
    fontWeight: 600,
    fontSize: '16px',
    lineHeight: '18px',
    marginBottom: 0,
  },
});

interface IProps {
  item: ListSpaceQuery_space;
}

const Details: React.FC<IProps> = ({
  item,
}) => {
  const classes = useStyles();
  const { locale } = useRouter();
  const { t } = usePageTranslation('hostListings', 'Details');
  const { t: commonT } = usePageTranslation('common', 'SiteBookingStatus');
  return (
    <Box className={classes.root}>
      <Typography variant="h6" gutterBottom className={classes.status}>
        {commonT(item?.status)}
      </Typography>
      <ItemDetail name={t('itemDetailName1')} value={item.id} />
      <ItemDetail name={t('itemDetailName2')} value={item?.name || 'N/A'} />
      <ItemDetail
        name={t('itemDetailName3')}
        value={`${item.width.toFixed(2)} x ${item.height.toFixed(2)} x ${item.length.toFixed(2)}`}
      />
      <ItemDetail name={t('itemDetailName4')} value={`${item.size} ${item.size_unit}`} />
      <ItemDetail name={t('itemDetailName5')} value={item.total_units} />
      <ItemDetail
        name={t('itemDetailName6')}
        value={`${item?.prices[0]?.price_per_month || 'N/A'}${item?.prices[0]?.currency_sign || 'N/A'}`}
      />
      <ItemDetail name={t('itemDetailName7')} value={item?.features?.map((feat: any) => getTranslatedName(feat, 'name', locale)).join(', ') || 'N/A'} />
      {/* <ItemDetail name="Unit location" value="N/A" /> */}
    </Box>
  );
};

export default Details;
