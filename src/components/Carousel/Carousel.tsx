/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */
/* eslint-disable react/display-name */
import Glide from '@glidejs/glide';
import React, {
  useImperativeHandle, useEffect, useRef, forwardRef,
} from 'react';

import '@glidejs/glide/dist/css/glide.core.css';

type DivProps = JSX.IntrinsicElements['div'];
type LiProps = JSX.IntrinsicElements['li'];

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // extends React's HTMLAttributes
    options?: any;
  }
}

export const Carousel = forwardRef<HTMLElement, DivProps>(({ options, children }, ref) => {
  const sliderRef = useRef();
  useImperativeHandle(ref, () => sliderRef.current);

  useEffect(() => {
    const slider = new Glide(sliderRef.current, options);
    slider.mount();
    return () => slider.destroy();
  }, [options]);

  return (
    <div className="glide" ref={sliderRef}>
      <div className="glide__track" data-glide-el="track">
        <ul className="glide__slides">{children}</ul>
      </div>
      <div className="glide__bullets" data-glide-el="controls[nav]">
        {/* TODO: we need to make this dynamic, and controlable */}
        <span className="glide__bullet" data-glide-dir="=0" />
        <span className="glide__bullet" data-glide-dir="=1" />
      </div>
    </div>
  );
});

export const Slide = forwardRef<HTMLLIElement, LiProps>(({ children }, ref) => (
  <li className="glide__slide" ref={ref}>
    {children}
  </li>
));
