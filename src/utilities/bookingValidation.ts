import { Dayjs } from 'dayjs';

export const isMoveInDateValid = (moveIn: Dayjs, moveOut: Dayjs): boolean => (
  moveIn.isBefore(moveOut) || moveIn.isSame(moveOut, 'day')
);

export const isMoveOutDateValid = (moveIn: Dayjs, moveOut: Dayjs): boolean => (
  moveOut.isAfter(moveIn) || moveOut.isSame(moveIn, 'day')
);

export const isValidEmail = (email = ''): boolean => (
  !!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
);
