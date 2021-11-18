import React, { FC } from 'react';
import { Box, Typography } from '@material-ui/core';

interface IProps {
  name: string,
  className: string,
  textClass: string,
  onClick: () => void,
  icon: string,
}

const Item: FC<IProps> = ({
  name, textClass, onClick, className, icon,
}) => (
  <Box onClick={onClick} className={className}>
    <Box>
      <img src={icon} alt={name} />
      <Typography variant="h5" className={textClass}>
        {name}
      </Typography>
    </Box>
  </Box>
);

export default Item;
