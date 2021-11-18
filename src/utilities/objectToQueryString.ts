// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const objToQueryStr = (obj: any): string => {
  // Only 1 level deep for now
  let queryStr = '';

  Object.keys(obj).forEach((key) => {
    if (queryStr !== '') {
      queryStr += '&';
    }

    queryStr += `${key}=${encodeURIComponent(obj[key])}`;
  });

  return queryStr;
};
