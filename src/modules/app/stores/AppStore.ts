import { makeObservable, observable, action } from 'mobx';

type SerializedStore = {
  title: string;
  content: string;
};

export class AppStore {
  constructor() {
    makeObservable(this);
  }

  @observable title: string | undefined;

  hydrate(serializedStore: SerializedStore): void {
    this.title = serializedStore.title != null ? serializedStore.title : '';
  }

  @action changeTitle(newTitle: string): void {
    this.title = newTitle;
  }
}

export async function fetchInitialStoreState(): Promise<any> {
  // You can do anything to fetch initial store state
  return { title: 'Hamza' };
}
