import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import usePageTranslation from 'hooks/usePageTranslation';
import { GET_FEATURE_CATEGORIES, UPDATE_SPACE, GET_SPACE_QUERY } from '../queries/query';
import { updateSpace, updateSpaceVariables } from '../queries/__generated__/updateSpace';
import { getSpace, getSpaceVariables } from '../queries/__generated__/getSpace';
import { PlatformFeatureType } from '../../../../../../typings/graphql.types';
import { FeatureCategoriesQuery, FeatureCategoriesQueryVariables } from '../queries/__generated__/FeatureCategoriesQuery';
import EditingSizeOption2 from '../FormMeasurementsSpace/EditingSizeOption2';
import { useCurrentCountry } from '../../../../../../utilities/market';

interface IProps {
  spaceId?: number;
}

const SpaceEdit: React.FC<IProps> = ({
  spaceId,
}) => {
  const [isOpen] = useState(true);
  const router = useRouter();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { t } = usePageTranslation('hostOnBoarding', 'FormSpace');
  const [updateSpaceMutation] = useMutation<updateSpace, updateSpaceVariables>(UPDATE_SPACE);
  const { loading, data } = useQuery<getSpace, getSpaceVariables>(
    GET_SPACE_QUERY,
    { variables: { spaceId } },
  );

  const [option, setOption] = useState<any>({
    name: t('defaultSpaceName'),
    sizeUnit: useCurrentCountry().sizeUnit,
    width: '2.50',
    depth: '4.00',
    height: '1.00',
    unit: '1',
    price: '1',
    checkedFeatures: [],
  });

  useEffect(() => {
    const spaceData: any = data?.space || {};
    if (spaceData) {
      setOption({
        id: spaceData?.id,
        name: spaceData?.name,
        height: spaceData?.height,
        width: spaceData?.width,
        depth: spaceData?.length,
        sizeUnit: spaceData?.size_unit,
        price: spaceData?.prices?.[0]?.price_per_month,
        unit: spaceData?.total_units,
        checkedFeatures: spaceData?.features?.map((item) => item.id),
        status: spaceData?.status,
      });
    }
  }, [data]);

  const { sizeUnit } = useCurrentCountry();
  const handleSubmit = async (items) => {
    const item = items[0];
    setOption(items[0]);
    setIsLoading(true);
    setError('');
    try {
      if (spaceId) {
        await updateSpaceMutation({
          variables: {
            spaceId,
            payload: {
              name: item.name,
              height: Number(item.height),
              width: Number(item.width),
              length: Number(item.depth),
              size_unit: sizeUnit,
              price_per_month: Number(item.price),
              total_units: Number(item.unit),
              features_id: item.checkedFeatures,
            },
          },
        });
        router.push(`/host/listings/space/${spaceId}`);
      }
    } catch (e) {
      setIsLoading(false);
      setError(e?.message);
      return;
    }
    setIsLoading(false);
  };

  const query = useQuery<FeatureCategoriesQuery, FeatureCategoriesQueryVariables>(
    GET_FEATURE_CATEGORIES,
    {
      variables: {
        offset: 0,
        limit: 10,
        type: PlatformFeatureType.SPACE,
        isActive: true,
      },
      fetchPolicy: 'network-only',
    },
  );
  const features = query.data?.feature_categories?.edges || [];

  return (
    <EditingSizeOption2
      features={features}
      isOpen={isOpen}
      changeOpen={() => { }}
      options={[option]}
      setOptions={handleSubmit}
      index={0}
      spaceId={spaceId}
      isLoading={loading || isLoading}
      apiError={error}
    />
  );
};

export default SpaceEdit;
