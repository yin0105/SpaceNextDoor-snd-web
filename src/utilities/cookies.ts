export const setCookieUtil = (name: string, value: string, days?: number) => {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = `;expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${value || ''}${expires}; path=/`;
};

export const getCookieUtil = (cookieName: string) => {
  const results = document.cookie.match(`(^|;) ?${cookieName}=([^;]*)(;|$)`);

  if (results) return results[2];
  return null;
};
