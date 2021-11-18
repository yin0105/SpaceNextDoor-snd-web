type IStorageToken = {
  accessToken: string;
  refreshToken: string;
};

type IRequestTokenResponse = IStorageToken & {
  tokenType: string;
  expiresAt: string;
};

export type { IStorageToken, IRequestTokenResponse };
