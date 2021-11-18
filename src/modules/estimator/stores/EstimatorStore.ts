import { ApolloClient } from '@apollo/client';
import {
  observable,
  action,
  makeObservable,
  runInAction,
  computed,
} from 'mobx';

import { initializeApollo } from '../../../apollo';
import { GET_SPACE_CATEGORIES } from '../queries';
import { GetSpaceCategoriesQuery } from '../queries/__generated__/GetSpaceCategoriesQuery';
import { FixedCountry } from '../../../typings/graphql.types';

export interface ICategoryItem {
  id: number;
  name_en?: string;
  width: number;
  height: number;
  dimension: number;
  count?: number;
  isStackable?: boolean;
}

export interface IEstimatorCategory {
  id: number;
  name_en: string;
  icon: string;
  items: ICategoryItem[];
}

export interface ICategorySelectedItem extends ICategoryItem {
  catId: number;
}

const ONE_CM_INTO_SQFT = 0.00107639;
const ONE_CM_INTO_SQM = 0.0001;
// In Japan, the size of a room is often measured by the number of tatami mats (-畳, -jō),
// about 1.653 square meters (for a standard Nagoya size tatami
const ONE_CM_INTO_TATAMI = 0.0000605;

class EstimatorStore {
  constructor() {
    makeObservable(this);
    this.apollo = initializeApollo();

    if (typeof window !== 'undefined') {
      this.getCategories();
    }
  }

  private apollo: ApolloClient<any>;

  @observable categories: IEstimatorCategory[] = [];

  @observable loading = false;

  @observable categoryId = 1;

  @observable selectedItems: ICategorySelectedItem[] = [];

  @observable filterStr = '';

  @observable selectedSpaceTypeId = 0;

  @observable currentCountry: FixedCountry = FixedCountry.Singapore;

  @action
  getCategories = (): void => {
    this.loading = true;
    this.apollo.query<GetSpaceCategoriesQuery>({
      query: GET_SPACE_CATEGORIES,
    }).then((result) => {
      runInAction(() => {
        this.loading = false;
        const categories = result?.data?.space_categories?.edges || [];
        this.categories = categories.map((category) => ({
          ...category,
          items: category.items.map((item) => ({
            ...item,
            isStackable: false,
            count: 0,
          })),
        }));
      });
    });
  };

  @action
  selectCategory = (id: number): void => {
    this.categoryId = id;
  };

  @computed
  get items(): ICategoryItem[] {
    if (!this.categories?.length) {
      return [];
    }

    return this.categories
      .find((_category, i) => _category.id === this.categoryId)
      .items
      .filter((item) => !!item.name_en.toLocaleLowerCase().match(new RegExp(this.filterStr, 'g')));
  }

  @computed
  get itemsDimension(): number {
    let multiplier = ONE_CM_INTO_SQFT; // Singapore
    if (this.currentCountry === FixedCountry.Thailand) {
      multiplier = ONE_CM_INTO_SQM;
    }
    if (this.currentCountry === FixedCountry.Japan) {
      multiplier = ONE_CM_INTO_TATAMI;
    }
    return this.selectedItems.reduce((totalSqFt, item) => {
      const itemSqFtVal = item.height * item.width * multiplier * item.count;
      return parseFloat((itemSqFtVal + totalSqFt).toFixed(2));
    }, 0);
  }

  @action
  selectItem = (selectedItemId: number, count: number): void => {
    let item;
    this.items.forEach((_item) => {
      if (_item.id === selectedItemId) {
        item = _item;
      }
    });
    const filter = (_item) => _item.catId === this.categoryId && _item.id === selectedItemId;
    const existing = this.selectedItems.find(filter);
    if (existing) {
      if (count <= 0) {
        this.removeSelectedItem(existing.catId, selectedItemId);
        this.updateCounter(existing.catId, selectedItemId, 0);
      } else {
        this.selectedItems = this.selectedItems.map((itm) => ({
          ...itm,
          count: (itm.catId === this.categoryId && itm.id === selectedItemId) ? count : itm.count,
        }));
        this.updateCounter(existing.catId, selectedItemId, count);
      }
    } else if (count > 0) {
      this.selectedItems = this.selectedItems.concat({
        ...item, count, catId: this.categoryId,
      });
      this.updateCounter(this.categoryId, selectedItemId, count);
    }
  };

  private updateCounter = (catId: number, selectedItemId: number, count = 0): void => {
    this.categories = this.categories.map((category, i) => {
      if (selectedItemId === -1) {
        const items = category.items.map((_item) => ({
          ..._item,
          count: 0,
        }));
        return {
          ...category,
          items,
        };
      }

      if (category.id === catId) {
        const items = category.items.map((_item, _i) => {
          if (selectedItemId === _item.id) {
            return {
              ..._item,
              count,
            };
          }

          return { ..._item, count: _item.count };
        });

        return {
          ...category,
          items,
        };
      }

      return category;
    });
  };

  @action
  addCustomItem = (item: ICategoryItem): void => {
    let currentCategory;
    this.categories.forEach((category) => {
      if (category.id === this.categoryId) {
        currentCategory = category;
      }
    });
    currentCategory.items.push(item);
    this.selectedItems = this.selectedItems.concat({
      ...item,
      catId: this.categoryId,
    });
  };

  @action
  removeSelectedItem = (catId: number, selectedItemId: number): void => {
    this.selectedItems = this.selectedItems.filter(
      (item) => item.catId !== catId || (item.catId === catId && item.id !== selectedItemId),
    );
    this.updateCounter(catId, selectedItemId, 0);
  };

  @action
  clearSelectedItems = (): void => {
    this.selectedItems = [];
    this.updateCounter(-1, -1, 0);
  };

  @action
  searchItems = (str: string): void => {
    this.filterStr = str;
  };

  @action
  setSpaceTypeId = (id: number): void => {
    this.selectedSpaceTypeId = id;
  };

  @action
  setCurrentCountry = (countryName: FixedCountry): void => {
    this.currentCountry = countryName;
  };
}

export default EstimatorStore;

export const ESTIMATOR_STORE = 'estimatorStore';
