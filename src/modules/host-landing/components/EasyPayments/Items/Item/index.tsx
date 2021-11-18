import React, { FC } from 'react';
import { Box, Typography, withStyles } from '@material-ui/core/';

export interface ItemType {
  title: string,
  text: string,
}

interface IProps {
  item: ItemType,
  itemClass: string,
  itemTitleClass: string,
  itemTextClass: string,
}

const Title = withStyles((theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.4rem',
      lineHeight: '2.1rem',
    },
  },
}),
{
  withTheme: true,
})(Typography);

const Text = withStyles((theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.2rem',
      lineHeight: '2rem',
    },
  },
}),
{
  withTheme: true,
})(Typography);

const Item: FC <IProps> = ({
  item, itemClass, itemTitleClass, itemTextClass,
}) => (
  <Box className={itemClass}>
    <Title className={itemTitleClass}>
      {item.title}
    </Title>
    <Text className={itemTextClass}>
      {item.text}
    </Text>
  </Box>
);

export default Item;
