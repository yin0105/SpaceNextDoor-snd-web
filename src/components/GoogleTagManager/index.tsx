import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import * as gtm from '../../utilities/gtag';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const GoogleTagManager = ({ children }) => {
  const router = useRouter();
  const ref = useRef(false);

  useEffect(() => {
    if (!ref.current && router.asPath) {
      if (!(router.asPath.includes('search') && !router.asPath.includes('total_results'))) {
        gtm.pageview(router.asPath);
      }
      // Made true so that it wont fire twice on same route
      ref.current = true;
    }
    return () => {
      // When route is changed i.e. current component is unmounted, it starts with false
      ref.current = false;
    };
  }, [router.asPath]);

  return children;
};

export default GoogleTagManager;
