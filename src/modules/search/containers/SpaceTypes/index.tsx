import { Box } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { useCurrentCountry } from 'utilities/market';
import { PLATFORM_SPACE_TYPES_QUERY } from '../../queries/query';
import { SpaceTypesQuery, SpaceTypesQueryVariables, SpaceTypesQuery_space_types_edges } from '../../queries/__generated__/SpaceTypesQuery';

interface IProps {
  children(d: SpaceTypesQuery_space_types_edges[]): JSX.Element;
}

const SpaceTypesContainer: React.FunctionComponent<IProps> = ({ children }) => {
  const query = useQuery<SpaceTypesQuery, SpaceTypesQueryVariables>(PLATFORM_SPACE_TYPES_QUERY, {
    variables: {
      country: useCurrentCountry().name,
    },
  });
  const types = query?.data?.space_types?.edges || [];

  return (
    <Box>
      {children(types)}
    </Box>
  );
};

export default SpaceTypesContainer;
