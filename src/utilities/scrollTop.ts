const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t + b;
  const nT = t - 1;
  return (-c / 2) * (nT * (nT - 2) - 1) + b;
};

export const scrollTo = (element: HTMLElement, to = 0, duration = 1000): void => {
  const start = element.scrollTop;
  const change = to - start;
  const increment = 20;
  let currentTime = 0;

  const animateScroll = (() => {
    currentTime += increment;

    const val = easeInOutQuad(currentTime, start, change, duration);

    element.scrollTop = val;

    if (currentTime < duration) {
      setTimeout(animateScroll, increment);
    }
  });

  animateScroll();
};

export const scrollTop = (ms = 100): void => {
  scrollTo(document.documentElement, ms);
};
