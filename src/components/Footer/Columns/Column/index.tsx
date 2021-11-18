import React, { FC, useState } from 'react';
import {
  Box, Typography, Collapse, makeStyles,
} from '@material-ui/core/';

interface LinkType {
  title: string,
  address: string,
}

export interface ColumnType {
  header: string,
  links: LinkType[],
}

interface IProps {
  column: ColumnType,
  columnClass: string,
  columnHeaderClass: string,
  columnLinkClass: string,
}

const useStyles = makeStyles((theme) => ({
  mobile: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  desktop: {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  link: {
    textDecoration: 'none',
    color: '#333333',
  },
}));

const Column: FC<IProps> = ({
  column: { header, links }, columnClass, columnHeaderClass, columnLinkClass,
}) => {
  const classes = useStyles();
  const [opened, setOpened] = useState(false);
  return (
    <Box className={columnClass}>
      <Typography onClick={() => setOpened(!opened)} className={`${columnHeaderClass} ${opened ? 'opened' : ''}`}>
        {header}
      </Typography>
      <Collapse in={opened} timeout="auto" unmountOnExit className={classes.mobile}>
        {links.map((link, index) => (
          <a className={classes.link} href={link.address} rel="noreferrer" target="_blank" key={index}>
            <Typography className={columnLinkClass}>
              {link.title}
            </Typography>
          </a>
        ))}
      </Collapse>
      <Box className={classes.desktop}>
        {links.map((link, index) => (
          <a className={classes.link} href={link.address} rel="noreferrer" target="_blank" key={index}>
            <Typography className={columnLinkClass}>
              {link.title}
            </Typography>
          </a>
        ))}
      </Box>
    </Box>
  );
};

export default Column;
