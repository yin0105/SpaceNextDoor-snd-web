import { Box, makeStyles, Typography } from '@material-ui/core';
import gql from 'graphql-tag';
import { useCurrentCountry } from 'utilities/market';
import Dimensions from '../../../../components/Dimensions';
import { FragmentedFunction } from '../../../../typings/shared';
import { SpaceItemFragment } from './__generated__/SpaceItemFragment';

const useStyles = makeStyles((theme) => ({
  oneVariant: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    border: '1px solid #E9E9E9',
    borderRadius: '15px',
    padding: '0 14px',
    marginBottom: '6px',
    cursor: 'pointer',
  },
  variantDescription: {
    color: '#888888',
  },
  boxBeforePrice: {
    padding: '10px 20px 5px 0',
    margin: '5px 0',
    flex: 1,
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
    },
  },
}));

type Props = SpaceItemFragment & {
  onClick?(): void;
};

type SpaceItemType = FragmentedFunction<React.FunctionComponent<Props>, 'space'>;

const SpaceItem: SpaceItemType = ({
  size, size_unit, prices, features, onClick, width, length,
}) => {
  const classes = useStyles();

  const currentCountry = useCurrentCountry();

  return (
    <Box className={classes.oneVariant} onClick={onClick}>
      <Box className={classes.boxBeforePrice}>
        <Box>
          <Typography variant="h4">
            {size}
            &nbsp;
            {size_unit}
            <Dimensions
              width={width}
              length={length}
              unit={currentCountry.sizeUnitLength}
            />
          </Typography>
        </Box>
        <Box>
          <Typography variant="body2" className={classes.variantDescription}>
            {features.map((f) => f.name_en).slice(0, 3).join(', ')}
          </Typography>
        </Box>
      </Box>
      <Box>
        <Typography variant="h2" className={classes.price}>
          {prices[0]?.currency_sign}
          {prices[0]?.price_per_month?.toFixed(2)}
        </Typography>
      </Box>
    </Box>
  );
};

SpaceItem.fragments = {
  space: gql`
    fragment SpaceItemFragment on Space {
      id
      size
      size_unit
      length
      width
      available_units
      features {
        name_en
        name_th
        name_jp
        name_kr
      }
      prices {
        currency_sign
        price_per_month
        type
      }
    }
  `,
};

export default SpaceItem;
