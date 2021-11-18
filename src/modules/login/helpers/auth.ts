import {
  AUTH_TOKEN_KEY,
  AUTH_REFRESH_TOKEN_KEY,
} from 'modules/app/stores/AuthStore';
import { IStorageToken } from '../types';

/**
 * Get tokens from local storage.
 *
 * @returns IStorageToken
 */
const getAuthStorageTokens = (): IStorageToken => {
  const accessToken = localStorage.getItem(AUTH_TOKEN_KEY);
  const refreshToken = localStorage.getItem(AUTH_REFRESH_TOKEN_KEY);

  return {
    accessToken,
    refreshToken,
  };
};

/**
 * Set tokens to local storage.
 *
 * @param tokens
 */
const setAuthStorageTokens = (tokens: IStorageToken): void => {
  localStorage.setItem(AUTH_TOKEN_KEY, tokens.accessToken);
  localStorage.setItem(AUTH_REFRESH_TOKEN_KEY, tokens.refreshToken);
};

/**
 * Remove tokens to local storage.
 */
const removeAuthStorageTokens = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_REFRESH_TOKEN_KEY);
};

export {
  getAuthStorageTokens,
  setAuthStorageTokens,
  removeAuthStorageTokens,
};
