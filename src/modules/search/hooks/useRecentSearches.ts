import {
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import { SearchLocationItemFragment as Search } from '../../../components/Search/Popup/__generated__/SearchLocationItemFragment';

const useRecentSearches = (searchItems: Search[]): [Search[], Dispatch<SetStateAction<Search>>] => {
  const [recentSearches, setRecentSearches] = useState(() => (
    JSON.parse(localStorage.getItem('recentSearches')) || searchItems
  ));

  const addRecentSearches = (item: Search) => {
    const matchedIndex = recentSearches.findIndex(
      (sr: any) => sr?.district?.id === item?.district?.id && sr?.city?.id === item?.city?.id,
    );
    if (matchedIndex === -1) {
      const items: Search[] = [item, ...recentSearches];
      setRecentSearches(items);
      localStorage.setItem('recentSearches', JSON.stringify(items, null, 2));
    }
  };

  return [recentSearches, addRecentSearches];
};

export default useRecentSearches;
