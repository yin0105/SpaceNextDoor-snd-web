import React from 'react';
import { ListItemText, ListItemIcon } from '@material-ui/core';
import Image from '../Image';

interface IMenuListProps {
  itemTitle?: string;
  imageName?: string;
  imageFolderName?: string;
}

const MenuListItem: React.FunctionComponent<IMenuListProps> = ({
  itemTitle,
  imageName,
  imageFolderName,
}: IMenuListProps) => (
  <>
    {imageName && (
    <ListItemIcon>
      <Image name={imageName} folder={imageFolderName} />
    </ListItemIcon>
    )}
    <ListItemText primary={itemTitle} />
  </>
);

export default MenuListItem;
