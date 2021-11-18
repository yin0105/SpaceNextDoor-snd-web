import { makeStyles } from '@material-ui/core';
import React from 'react';
import { ReactSVG } from 'react-svg';

interface IImageProps {
  folder?: string;
  name: string;
  asInlineEl?: boolean;
  extension?: string;
  fullWidth?: unknown;
  onClick?: () => void;
  className?: string;
}

const defaultProps = {
  folder: '',
  extension: '',
  fullWidth: '',
};

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

const Image: React.FC<IImageProps> = ({
  folder,
  name,
  extension,
  fullWidth,
  onClick = () => {},
  className = '',
  asInlineEl,
}: IImageProps) => {
  const classes = useStyles();

  const ext = extension || 'svg';
  const filepath = folder
    ? `/images/${folder}/${name}.${ext}`
    : `/images/${name}.${ext}`;

  return asInlineEl ? (
    <ReactSVG
      className={`${fullWidth ? classes.root : ''} ${className}`}
      src={filepath}
      style={{ display: 'initial' }}
      alt={name}
      onClick={() => onClick()}
      role="presentation"
    />
  ) : (
    <img
      className={`${fullWidth ? classes.root : ''} ${className}`}
      src={filepath}
      alt={name}
      style={{ display: 'initial' }}
      onClick={() => onClick()}
      onKeyPress={() => { }}
      role="presentation"
    />
  );
};

Image.defaultProps = defaultProps;

export default Image;
