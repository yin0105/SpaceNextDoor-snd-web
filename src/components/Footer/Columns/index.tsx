import React, { FC } from 'react';
import { Box, makeStyles } from '@material-ui/core/';
import { useCurrentCountry } from 'utilities/market';
import usePageTranslation from '../../../hooks/usePageTranslation';

import Column from './Column';

import { getLinks } from './country.link';

const useStyles = makeStyles((theme) => ({
  columns: {
    borderBottom: '0.1000rem solid #98989853',
    paddingBottom: '1.0000rem',
    marginBottom: '3.0000rem',
    [theme.breakpoints.up('md')]: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
      gridColumnGap: '10px',
      paddingBottom: '3.0000rem',
      marginBottom: '3.3000rem',
    },
  },
  column: { marginBottom: '1.6000rem' },
  columnHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1.8000rem',
    fontWeight: 600,
    fontSize: '1.4rem',
    lineHeight: '1.8rem',
    position: 'relative',
    [theme.breakpoints.up('md')]: { marginBottom: '1.5000rem', fontSize: '16px', lineHeight: '18px' },
    [theme.breakpoints.down('sm')]: {
      '&:before': {
        content: 'url("/images/Host/arrow-down.svg")',
        fillColor: theme.palette.grey[200],
        position: 'absolute',
        right: 0,
        zIndex: 1,
      },
      '&.opened:before': {
        transform: 'rotate(180deg)',
      },
    },
  },
  columnLink: {
    cursor: 'pointer',
    fontSize: '1.2rem',
    lineHeight: '3rem',
    marginBottom: '0.4000rem',
    [theme.breakpoints.up('md')]: { marginBottom: '0.8000rem', fontSize: '1.4rem', lineHeight: '3.5rem' },
  },
}));

const Columns: FC = () => {
  const { name } = useCurrentCountry();
  const classes = useStyles();
  const { t } = usePageTranslation('footer', 'Columns');
  return (
    <Box className={classes.columns}>
      {getLinks(t)?.[name].map((column, index) => (
        <Column
          key={index}
          column={column}
          columnClass={classes.column}
          columnHeaderClass={classes.columnHeader}
          columnLinkClass={classes.columnLink}
        />
      ))}
    </Box>
  );
};

export default Columns;
