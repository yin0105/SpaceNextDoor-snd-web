import React, { FC, useState } from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react';

// eslint-disable-next-line import/no-cycle
import Item from './Item';
// eslint-disable-next-line import/no-cycle
import AddCustom from './AddCustom';
// eslint-disable-next-line import/no-cycle
import List from './List';
// eslint-disable-next-line import/no-cycle
import AddCustomForm from './AddCustomForm';
import RecommendedStorage from './RecommendedStorage';
// import SearchInput from './SearchInput';
import EstimatorStore, { ESTIMATOR_STORE, ICategoryItem } from '../../stores/EstimatorStore';
import { useCurrentCountry } from '../../../../utilities/market';

interface IProps {
  [ESTIMATOR_STORE]?: EstimatorStore
  hideRecommended?: boolean;
  maxHeight?: string;
}

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: '34px',
    padding: '0 26px',
    [theme.breakpoints.up('sm')]: {
      padding: 0,
    },
  },
  greed: {
    [theme.breakpoints.up('sm')]: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr',
      gridGap: '10px',
    },
  },
  greedRight: {
    '&>.MuiBox-root': {
      [theme.breakpoints.up('sm')]: {
        height: '100%',
      },
    },
  },
  items: {
    marginBottom: '20px',
    [theme.breakpoints.up('sm')]: {
      marginBottom: '10px',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
    },
  },
  addCustomContainer: {
    position: 'relative',
  },
}));

const Items: FC<IProps> = ({
  estimatorStore: {
    items,
    selectedItems,
    selectItem,
    removeSelectedItem,
    clearSelectedItems,
    addCustomItem,
    itemsDimension,
    setSpaceTypeId,
    setCurrentCountry,
  },
  hideRecommended = false,
  maxHeight,
}) => {
  const classes = useStyles();
  const [addingItem, setAddingItem] = useState(false);
  setCurrentCountry(useCurrentCountry()?.name);

  const addItem = (item: ICategoryItem) => {
    addCustomItem(item);
    setAddingItem(false);
  };

  return (
    <Box className={classes.container}>
      <Box className={classes.greed}>
        <Box>
          {/* Might add it later, currently not working for Thai */}
          {/* <SearchInput /> */}
          <Box className={classes.items}>
            {!!items.length && items.map((item, index) => (
              <Item
                item={item}
                key={index}
                selectItem={selectItem}
              />
            ))}
          </Box>
          {!hideRecommended && (
          <>
            <Box className={classes.addCustomContainer}>
              <AddCustom onClick={() => setAddingItem(true)} />
              {addingItem && <AddCustomForm setAddingItem={setAddingItem} onAdd={addItem} />}
            </Box>
            <RecommendedStorage size={itemsDimension} setSpaceTypeId={setSpaceTypeId} />
          </>
          )}
        </Box>
        <Box className={classes.greedRight}>
          <List
            clearAll={clearSelectedItems}
            clearOne={removeSelectedItem}
            items={selectedItems}
            itemsDimension={itemsDimension}
            maxHeight={maxHeight}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default inject(ESTIMATOR_STORE)(observer(Items));
