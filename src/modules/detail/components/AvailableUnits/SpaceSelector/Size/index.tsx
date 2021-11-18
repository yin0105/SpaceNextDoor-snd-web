import {
  Box, makeStyles, Typography,
} from '@material-ui/core';
import DayJS from 'components/DayJS';
import LocaleData from 'dayjs/plugin/localeData';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import * as gtag from 'utilities/gtag';
import { getTranslatedName, useCurrentCountry } from 'utilities/market';
import { ISpace } from 'shared/interfaces';
import Dimensions from '../../../../../../components/Dimensions';
import { PriceType } from '../../../../../../typings/graphql.types';
import Image from '../../../../../../components/Image';
import usePageTranslation from '../../../../../../hooks/usePageTranslation';

DayJS.extend(LocaleData);

const useStyles = makeStyles((theme) => ({
  oneVariant: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    border: '1px solid #E9E9E9',
    borderRadius: '15px',
    padding: '10px 20px',
    marginBottom: '10px',
    cursor: 'pointer',
    height: '86px',
    [theme.breakpoints.down('sm')]: {
      padding: '10px 5px',
      paddingTop: '16px',
    },
  },
  hasDate: {
    position: 'relative',
    paddingTop: '37px',

    [theme.breakpoints.down('sm')]: {
      paddingTop: '27px',
    },
  },
  active: {
    border: `1px solid ${theme.palette.primary.main}`,
    boxShadow: '0px 15px 40px rgba(51, 51, 51, 0.1)',
  },
  variantDescription: {
    color: '#888888',

    [theme.breakpoints.down('sm')]: {
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      display: 'block',
      maxWidth: '85px',
      overflow: 'hidden',
    },
  },
  icon: {
    marginRight: '3px',
    '& img': {
      width: '66px',
      [theme.breakpoints.down('sm')]: {
        width: '50px',
      },
    },
  },
  boxBeforePrice: {
    margin: '5px 0',
    flex: 2,

    [theme.breakpoints.down('sm')]: {
      maxWidth: '50%',
    },
  },
  stockDate: {
    top: 0,
    left: 0,
    height: '27px',
    lineHeight: '27px',
    position: 'absolute',
    color: 'white',
    background: 'linear-gradient(270deg, #FF7556 29.96%, #FA395B 63.89%, #DA2A3D 86.61%)',
    borderTopLeftRadius: '14px',
    padding: '0 30px 0 20px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
      padding: '0 20px 0 10px',
    },

    '& img': {
      position: 'relative',
      top: '1px',
      marginRight: '5px',
    },
    '& span': {
      fontWeight: 700,
    },
    '&::after': {
      content: '""',
      display: 'block',
      position: 'absolute',
      width: 0,
      height: 0,
      right: '-7px',
      top: '6px',
      transform: 'rotate(-90deg)',
      borderStyle: 'solid',
      borderWidth: '0 14px 14px 14px',
      borderColor: 'transparent transparent white transparent',
    },
  },
  price: {
    color: theme.palette.primary.light,
    padding: '0 20px',
    minWidth: '130px',
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
      padding: '0',
      paddingLeft: '15px',
      minWidth: '100px',
      fontSize: theme.typography.h3.fontSize,
      marginRight: '5px',
    },
  },
}));

interface IProps {
  space: ISpace;
  isSelected: boolean;
  onToggle(isSelected: boolean): void;
  selectedSpace: ISpace;
  siteId: number;
}

const Size: React.FC<IProps> = ({
  isSelected, onToggle, space, selectedSpace, siteId,
}) => {
  const { t } = usePageTranslation('details', 'Size');
  const currentLocale = useRouter().locale;
  const currentCountry = useCurrentCountry();
  const classes = useStyles();
  const price = (space?.prices || []).filter((p) => p.type === PriceType.BASE_PRICE)[0];

  const handleClick = () => {
    if (selectedSpace?.id !== space.id) {
      gtag.enhancedTrack({
        event: 'addToCart',
        ecommerce: {
          add: {
            products: [{
              id: siteId,
              price: space.prices?.[0]?.price_per_month,
              quantity: 1,
            }],
          },
        },
      });
      if (selectedSpace) {
        gtag.enhancedTrack({
          event: 'removeFromCart',
          ecommerce: {
            remove: {
              products: [{
                id: siteId,
                price: space.prices?.[0]?.price_per_month,
                quantity: 1,
              }],
            },
          },
        });
      }
    }
    onToggle(true);
  };
  return (
    <Box
      className={clsx(
        classes.oneVariant,
        space.stock_available_until && classes.hasDate,
        isSelected && classes.active,
      )}
      onClick={handleClick}
    >
      {space.stock_available_until && (
        <Box className={classes.stockDate}>
          <Image folder="DetailPage" name="calendar" extension="svg" />
          {t('availability')}
          &nbsp;
          <span>{DayJS(space.stock_available_until).locale(currentLocale).format('DD MMMM YYYY')}</span>
        </Box>
      )}
      <Box className={classes.icon}>
        <img src={space?.space_type?.icon} alt={String(space?.size)} />
      </Box>
      <Box className={classes.boxBeforePrice}>
        <Box>
          <Typography variant="h4">
            {space.size}
            &nbsp;
            {space.size_unit}

            <Dimensions
              width={space.width}
              length={space.length}
              unit={currentCountry.sizeUnitLength}
            />
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption" className={classes.variantDescription}>
            {space.features.map((f) => getTranslatedName(f, 'name', currentLocale)).slice(0, 3).join(', ')}
          </Typography>
        </Box>
      </Box>
      <Box>
        <Typography variant="h2" className={classes.price}>
          {price?.currency}
          {price?.price_per_month?.toFixed(2)}
        </Typography>
      </Box>
    </Box>
  );
};

export default Size;
