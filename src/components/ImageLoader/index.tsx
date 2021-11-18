import {
  useState, cloneElement, Children, useMemo,
} from 'react';

interface IProps {
  placeholder: JSX.Element;
  loading?: boolean;
}

const ImageLoader: React.FunctionComponent<IProps> = ({ placeholder, loading, children }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const img = useMemo(
    () => (
      children
        ? cloneElement(Children.only(children) as any, { onLoad: () => setIsLoaded(true) })
        : null
    ),
    [isLoaded, children],
  );

  return (
    <>
      {img}
      {((!isLoaded || loading) || !children) && placeholder}
    </>
  );
};

export default ImageLoader;
