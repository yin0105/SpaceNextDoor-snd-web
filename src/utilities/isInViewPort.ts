// eslint-disable-next-line consistent-return
const isInViewport = (el: HTMLElement): boolean => {
  const rect = el?.getBoundingClientRect();
  if (rect) {
    return (
      rect.top >= 0
      && rect.left >= 0
      && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
      && rect.right <= (window.innerWidth || document.documentElement.clientWidth)

    );
  }
};

export default isInViewport;
