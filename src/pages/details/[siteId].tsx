import { Box } from '@material-ui/core';
import { useRouter } from 'next/router';
import { Provider as MobxProvider } from 'mobx-react';
import React, { useState } from 'react';

import Details from '../../modules/detail';
import { HomeLayout } from '../../layouts/MainLayout';
import SiteDetailStore from '../../modules/detail/stores/SiteDetailStore';

const Detail: React.FunctionComponent = () => {
  const router = useRouter();
  const [store] = useState(new SiteDetailStore());
  const siteId = parseInt(router.query?.siteId as string, 10);
  const spaceId = parseInt(router.query?.space_id as string, 10);

  return (
    <MobxProvider store={store}>
      <Box>
        <HomeLayout noHeader>
          <Details siteId={siteId} spaceId={spaceId} />
        </HomeLayout>
      </Box>
    </MobxProvider>
  );
};

export default Detail;
