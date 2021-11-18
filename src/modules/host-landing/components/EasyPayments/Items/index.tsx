import React, { FC } from 'react';
import { Box, makeStyles } from '@material-ui/core/';
import Item, { ItemType } from './Item';
import usePageTranslation from '../../../../../hooks/usePageTranslation';

const useStyles = makeStyles((theme) => ({
  items: {
    [theme.breakpoints.up('md')]: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gridColumnGap: '7rem',
    },
  },
  item: {
    marginBottom: '4.3rem',
    [theme.breakpoints.up('md')]: {
      marginBottom: '4.6rem',
    },
  },
  itemTitle: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1.9rem',
    fontWeight: 600,
    fontSize: '1.4rem',
    lineHeight: '2.1rem',
    [theme.breakpoints.up('md')]: {
      marginTop: '2rem',
      marginBottom: '4rem',
      fontSize: '1.6rem',
    },
  },
  itemText: {},
}));

const Items: FC = () => {
  const classes = useStyles();
  const { t } = usePageTranslation('hostLanding', 'Items');
  const items: ItemType[] = [
    {
      title: t('title1'),
      text: t('text1'),
    },
    {
      title: t('title2'),
      text: t('text2'),
    },
    {
      title: t('title3'),
      text: t('text3'),
    },

  ];

  return (
    <Box className={classes.items}>
      {items.map((item, index) => (
        <Item
          key={index}
          item={item}
          itemClass={classes.item}
          itemTitleClass={classes.itemTitle}
          itemTextClass={classes.itemText}
        />
      ))}
    </Box>
  );
};

export default Items;
