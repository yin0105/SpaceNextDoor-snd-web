import { Dispatch, useEffect, useState } from 'react';

interface IProps {
  isShow: boolean;
  setDelayTime: Dispatch<any>;
}

export function useDelay(): IProps {
  const [delayTime, setDelayTime] = useState(null);
  const [isShow, setIsShow] = useState(false);

  const lazzyCallBack = () => {
    setIsShow(true);
    setTimeout(() => {
      setIsShow(false);
    }, delayTime);
  };

  useEffect(() => {
    lazzyCallBack();
  }, [delayTime]);

  return { isShow, setDelayTime };
}
