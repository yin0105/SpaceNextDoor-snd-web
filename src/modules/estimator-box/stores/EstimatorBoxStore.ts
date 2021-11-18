import {
  observable,
  action,
  makeObservable,
  computed,
} from 'mobx';
import { FixedCountry } from 'typings/graphql.types';

const ONE_CM_INTO_SQFT = 0.00107639;
const ONE_CM_INTO_SQM = 0.0001;
// In Japan, the size of a room is often measured by the number of tatami mats (-畳, -jō),
// about 1.653 square meters (for a standard Nagoya size tatami
const ONE_CM_INTO_TATAMI = 0.0000605;

export interface IBoxItem {
  width: number;
  height: number;
  depth: number;
}

const STANDARD_BOX:IBoxItem = {
  width: 41,
  height: 41,
  depth: 51,
};

class EstimatorBoxStore {
  constructor() {
    makeObservable(this);
  }

  @observable currentStep: 1|2|3 = 1;

  @observable isStandardBox = true;

  @observable customBoxItem :IBoxItem = STANDARD_BOX;

  @observable boxCount = 1;

  @observable currentCountry: FixedCountry = FixedCountry.Singapore;

  @observable selectedSpaceTypeId = 0;

  @computed
  get itemsDimension(): number {
    let multiplier = ONE_CM_INTO_SQFT; // Singapore
    if (this.currentCountry === FixedCountry.Thailand) {
      multiplier = ONE_CM_INTO_SQM;
    }
    if (this.currentCountry === FixedCountry.Japan) {
      multiplier = ONE_CM_INTO_TATAMI;
    }
    const { width, height } = this.isStandardBox ? STANDARD_BOX : this.customBoxItem;
    const itemSqFtVal = height * width * multiplier * this.boxCount;
    return parseFloat((itemSqFtVal).toFixed(2));
  }

  @action
  setSelectedBoxItem = (item: IBoxItem): void => {
    this.customBoxItem = item;
  };

  @action
  setIsStandardBox = (isUse: boolean): void => {
    this.isStandardBox = isUse;
  };

  @action
  setCurrentCountry = (countryName: FixedCountry): void => {
    this.currentCountry = countryName;
  };

  @action
  incrementCurrentStep = (step: number): void => {
    this.currentStep += step;
  };

  @action
  incrementBoxCount = (count: number): void => {
    if (this.boxCount + count < 1) this.boxCount = 1;
    else this.boxCount += count;
  };

  @action
  setBoxCount = (value: number): void => {
    this.boxCount = value || 1;
  };

  @action
  setSpaceTypeId = (id: number): void => {
    this.selectedSpaceTypeId = id;
  };
}

export default EstimatorBoxStore;
export const ESTIMATOR_BOX_STORE = 'estimatorBoxStore';
