import { RESIZER_URL } from '../config';

interface IImageOptions {
  width: number;
}

export const getResizedURL = (url: string, options: IImageOptions): string => {
  const splitUrl = url.split('/');
  const base = splitUrl[2];
  const key = splitUrl.slice(3).join('/');
  const resizeOptions = {
    bucket: base,
    key,
    edits: {
      resize: {
        width: options.width,
        fit: 'cover',
      },
    },
  };

  return `${RESIZER_URL}/${btoa(JSON.stringify(resizeOptions))}`;
};
