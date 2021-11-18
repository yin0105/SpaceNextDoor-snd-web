export const setLocalStorage = (key:string, value:any):void => {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(key, value);
  }
};

export const getLocalStorage = (key:string):any => {
  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem(key);
  }
  return undefined;
};
