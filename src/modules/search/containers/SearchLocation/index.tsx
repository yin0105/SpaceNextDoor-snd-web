import { useCallback, useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import debounce from 'lodash/debounce';
import { inject, observer } from 'mobx-react';
import { useCurrentCountry } from 'utilities/market';
import { SitesListStore } from '../../stores/SitesListStore';
import { SEARCH_LOCATIONS_QUERY } from '../../queries/query';
import { SearchLocationsQuery, SearchLocationsQueryVariables } from '../../queries/__generated__/SearchLocationsQuery';
import SearchPopup from '../../../../components/Search/Popup';

interface IProps {
  sitesStore?: SitesListStore
  isOpen: boolean;
  onClose(): void;
  onMap?: boolean
}

const SearchLocationContainer: React.FC<IProps> = ({
  isOpen, onClose, onMap = false, sitesStore,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const country = useCurrentCountry();
  const [query, result] = useLazyQuery<SearchLocationsQuery, SearchLocationsQueryVariables>(
    SEARCH_LOCATIONS_QUERY,
  );
  const debouncedQuery = useCallback(
    debounce((s: string) => {
      query({
        variables: {
          search: s ? { _iLike: `%${s}%` } : undefined,
          country: { _eq: country?.name },
        },
      });
      setIsLoading(false);
    }, 500), [],
  );

  useEffect(() => {
    query({
      variables: {
        country: { _eq: country?.name },
      },
    });
  }, [isOpen]);

  const locations = result.data?.locations?.edges || [];
  // set country id
  sitesStore.setCountryId(locations?.[0]?.country?.id);

  return (
    <SearchPopup
      isOpen={isOpen}
      onClose={onClose}
      onMap={onMap}
    // loading={result.loading}
    // onSearch={(str) => debouncedQuery(str)}
    // locations={locations}
    // isLoading={isLoading}
    // setIsLoading={setIsLoading}
    />
  );
};

export default inject('sitesStore')(observer(SearchLocationContainer));
