import { Box } from '@material-ui/core';
import { useQuery } from '@apollo/client';

import { PlatformFeaturesQuery, PlatformFeaturesQueryVariables, PlatformFeaturesQuery_feature_categories_edges } from '../../queries/__generated__/PlatformFeaturesQuery';
import { PLATFORM_FEATURES_QUERY } from '../../queries/query';
import { PlatformFeatureType } from '../../../../typings/graphql.types';

interface IProps {
  children(d: PlatformFeaturesQuery_feature_categories_edges[]): JSX.Element;
}

const PlatformFeaturesContainer: React.FunctionComponent<IProps> = ({ children }) => {
  const query = useQuery<PlatformFeaturesQuery, PlatformFeaturesQueryVariables>(
    PLATFORM_FEATURES_QUERY,
    {
      variables: {
        type: { _in: [PlatformFeatureType.SITE, PlatformFeatureType.SPACE] },
      },
    },
  );
  const types = query?.data?.feature_categories?.edges || [];

  return (
    <Box>
      {children(types)}
    </Box>
  );
};

export default PlatformFeaturesContainer;
