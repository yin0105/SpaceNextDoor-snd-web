import * as Sentry from '@sentry/nextjs';

import { APP_ENV, SENTRY_DNS } from '../config';
import { version } from '../../package.json';

export const init = (): void => {
  if (typeof window === 'undefined') {
    return;
  }

  Sentry.init({
    dsn: SENTRY_DNS,
    release: `web-app@${version}`,
    debug: false,
    environment: APP_ENV || 'local',
  });
};
