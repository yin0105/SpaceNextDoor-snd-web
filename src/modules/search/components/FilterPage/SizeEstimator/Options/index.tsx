import {
  Grid, Theme, useMediaQuery,
} from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useInView } from 'react-intersection-observer';
import { getTranslatedName } from 'utilities/market';
import SpaceTypesContainer from '../../../../containers/SpaceTypes';
import { SpaceTypesQuery_space_types_edges } from '../../../../queries/__generated__/SpaceTypesQuery';
import { SitesListStore } from '../../../../stores/SitesListStore';
import Option from './Option';

interface IProps {
  sitesStore?: SitesListStore;
  data: SpaceTypesQuery_space_types_edges[];
}

const WrappedOptions: React.FC<IProps> = inject('sitesStore')(observer(({ sitesStore, data }) => {
  const isAutoApplied = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));
  const { locale } = useRouter();
  const [viewed, setViewed] = useState(false);
  const { ref, inView } = useInView({ threshold: 0 });
  useEffect(() => {
    if (!viewed && inView) {
      setViewed(true);
    }
  }, [inView]);
  return (
    <Grid container spacing={6}>
      {data.map((type, i) => (
        <Grid key={type.name_en} item xs={4} sm={12} lg={12} xl={12}>
          <div ref={ref}>
            {viewed && (
            <Option
              id={type.id}
              htmlId={`size${i + 1}`}
              title={getTranslatedName(type, 'name', locale)}
              isSelected={sitesStore.filters.space_type === type.id}
              onSelect={(id) => {
                // If its already selected, remove it, otherwise select it
                if (sitesStore.filters.space_type === id) {
                  sitesStore.removeFilter('space_type');
                } else {
                  sitesStore.setFilter('space_type', id);
                }

                if (isAutoApplied) {
                  sitesStore.applyFilters();
                }
              }}
              icon={type.icon}
              range_end={type.size_to}
              range_start={type.size_from}
              unit={type.unit}
            />
            )}
          </div>
        </Grid>
      ))}
    </Grid>
  );
}));

const Options: React.FunctionComponent = () => (
  <SpaceTypesContainer>
    {(data) => (
      <WrappedOptions data={data} />
    )}
  </SpaceTypesContainer>
);

export default Options;
