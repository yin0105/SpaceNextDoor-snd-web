import ClevertapReact from 'clevertap-react';
import { APP_ENV } from '../config';

declare const window: any;
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const track = (event: string, data: any): void => {
  if (typeof window === 'undefined') {
    return;
  }
  if (APP_ENV !== 'prod') {
    return;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  window && window.dataLayer && window.dataLayer.push({ event, data });
};

export const pageview = (url: string): void => {
  if (typeof window === 'undefined') {
    return;
  }

  if (APP_ENV !== 'prod') {
    return;
  }

  ClevertapReact.event('pageview', { page: url });

  window.dataLayer.push({
    event: 'pageview',
    page: url,
  });
};

export const enhancedTrack = (data: any): void => {
  if (typeof window === 'undefined') {
    return;
  }
  if (APP_ENV !== 'prod') {
    return;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  window && window.dataLayer && window.dataLayer.push({ ecommerce: null });
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  window && window.dataLayer && window.dataLayer.push(data);
};
