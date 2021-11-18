import {
  Box, fade, makeStyles, Typography, Grid, useMediaQuery, Theme,
} from '@material-ui/core';
import sort from 'lodash/sortBy';
import clsx from 'clsx';
import { useEffect, useState, Children } from 'react';
import { useCurrentCountry } from 'utilities/market';
import { ISpaceType } from 'shared/interfaces';

import Image from '../../../../../../components/Image';
import SoldOut from '../../../../../../components/SoldOut';
import usePageTranslation from '../../../../../../hooks/usePageTranslation';

const useStyles = makeStyles((theme) => ({
  unitsFilter: {
    position: 'relative',
    padding: '20px 35px',
    paddingLeft: '40px',
    margin: '0 -24px',
    display: 'flex',
    backgroundColor: fade(theme.palette.grey[50], 0.5),
    borderTopRightRadius: '21px',
    borderTopLeftRadius: '21px',
    marginBottom: '30px',

    [theme.breakpoints.down('sm')]: {
      padding: '20px 15px',
      paddingLeft: '25px',
      margin: '0 -19px',
    },
  },
  pill: {
    cursor: 'pointer',
    background: 'white',
    padding: '5px 5px',
    display: 'flex',
    textAlign: 'center',
    flexDirection: 'column',
    marginRight: '10px',
    minWidth: '85px',
    width: '100px',
    borderRadius: '12px',
    userSelect: 'none',

    '& p:first-child': {
      fontWeight: 700,
    },

    '& p:last-child': {
      [theme.breakpoints.down('sm')]: {
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        display: 'block',
        maxWidth: '85px',
        overflow: 'hidden',
      },
    },
  },
  pillActive: {
    background: theme.palette.secondary.main,
    color: 'white',
  },
  arrow: {
    position: 'absolute',
    height: '24px',
    width: '24px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '3px',
    borderRadius: '50px',
    background: fade(theme.palette.grey[200], 0.4),
    top: '36%',
    cursor: 'pointer',
  },
  arrowRight: {
    right: '10px',
  },
  arrowLeft: {
    left: '10px',
  },
}));

interface IProps {
  onSelect(id: number): void;
  types: ISpaceType[];
}

const Filter: React.FC<IProps> = ({ onSelect, children, types }) => {
  const classes = useStyles();
  const { sizeUnit } = useCurrentCountry();
  const [selectedId, setSelected] = useState(null);
  const [page, setPage] = useState(0);
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.only('xs'));
  const ITEMS_TO_SHOW = isMobile ? 3 : 4;
  const hasLeft = page !== 0;
  const count = Children.count(children);
  const hasRight = (
    Math.ceil(types.length / ITEMS_TO_SHOW) !== (page + 1)
  );
  const items = sort(
    (types), (t) => t.size_from,
  ).slice(page * ITEMS_TO_SHOW, ITEMS_TO_SHOW * (page + 1));
  const { t } = usePageTranslation('details', 'Filters');
  useEffect(() => {
    setSelected(items[0]?.id);
    onSelect(items[0]?.id);
  }, [types]);

  return (
    <>
      <Box className={classes.unitsFilter}>
        {hasLeft && (
          <Box
            className={clsx(classes.arrow, classes.arrowLeft)}
            onClick={() => {
              setPage(page - 1);
            }}
          >
            <Image folder="DetailPage" name="arrow-left" />
          </Box>
        )}
        {items.map(({
          id, size_from, size_to, name_en,
        }) => (
          <Box
            key={id}
            className={clsx(classes.pill, selectedId === id && classes.pillActive)}
            onClick={() => {
              setSelected(id);
              onSelect(id);
            }}
          >
            <Typography variant="body2">{name_en.toUpperCase()}</Typography>
            <Typography variant="body2">
              {size_from}
              {' '}
              -
              {' '}
              {size_to}
              {' '}
              {sizeUnit}
            </Typography>
          </Box>
        ))}
        {hasRight && (
          <Box
            className={clsx(classes.arrow, classes.arrowRight)}
            onClick={() => {
              setPage(page + 1);
            }}
          >
            <Image folder="DetailPage" name="arrow-right" />
          </Box>
        )}
      </Box>
      <Box mt={10}>
        <Grid container>
          {children}
        </Grid>
      </Box>
      {!count && (
        <SoldOut label={t('soldout')} />
      )}
    </>
  );
};

export default Filter;
