const delayFn = (time: number, fn:()=>void):void => {
  setTimeout(() => {
    fn();
  }, time);
};

export default delayFn;
