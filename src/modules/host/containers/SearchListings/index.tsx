import { useCallback, useState } from 'react';
import { inject, observer } from 'mobx-react';
import debounce from 'lodash/debounce';
import { Box } from '@material-ui/core';
import HostListsStore from '../../stores/HostListingsStore';
import SearchInput from '../../../../components/SearchInput';
import usePageTranslation from '../../../../hooks/usePageTranslation';

interface ISearchProps {
  hostListsStore?: HostListsStore;
}

const SearchListings: React.FunctionComponent<ISearchProps> = ({
  hostListsStore,
}) => {
  const { fetchLists } = hostListsStore;
  const [search, setSearch] = useState('');

  const debouncedQuery = useCallback(debounce((s: string) => {
    fetchLists(s !== '' && s !== null ? { searchKeyword: `%${s || '$'}%` } : {});
  }, 500), []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    debouncedQuery(e.target.value);
  };

  const { t } = usePageTranslation('hostListings', 'SearchListings');

  return (
    <Box>
      <SearchInput
        value={search}
        onChange={handleInputChange}
        placeholder={t('placeholder')}
      />
    </Box>
  );
};

export default inject('hostListsStore')(observer(SearchListings));
