import {
  Dispatch, SetStateAction, useEffect, useState,
} from 'react';

// eslint-disable-next-line import/no-cycle
export default function useTimer(time: number): [number, Dispatch<SetStateAction<number>>] {
  const [seconds, setSeconds] = useState(time);
  useEffect(() => {
    let timer;
    if (seconds > 0) {
      timer = setTimeout(() => setSeconds(seconds - 1), 1000);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [seconds]);

  return [seconds, setSeconds];
}
