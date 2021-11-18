import { useRouter } from 'next/router';
import SpaceEdit from '../../../modules/host-onboarding/components/Main/Forms/SpaceEdit';

const Space: React.FC = () => {
  const router = useRouter();
  const spaceId = Number(router.query.spaceId) || null;

  return (
    <SpaceEdit spaceId={spaceId} />
  );
};

export default Space;
