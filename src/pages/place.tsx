import React, { useState } from 'react';
import { Provider as MobxProvider } from 'mobx-react';
import { SitesListStore } from 'modules/search/stores/SitesListStore';
import PlacesForm from 'modules/search/components/Forms/PlacesForm/index';
import { HomeLayout } from '../layouts/MainLayout';

const Places = () => {
  const [siteStore] = useState(new SitesListStore());

  return (
    <MobxProvider sitesStore={siteStore}>
      <HomeLayout>
        <PlacesForm />
      </HomeLayout>
    </MobxProvider>
  );
};

export default Places;
