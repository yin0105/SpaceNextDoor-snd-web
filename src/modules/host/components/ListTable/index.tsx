import React from 'react';
import { useRouter } from 'next/router';
import { Theme } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useQuery } from '@apollo/client';
import { Skeleton } from '@material-ui/lab';
import {
  makeStyles,
  createStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Box,
  Typography,
} from '@material-ui/core';
import { GET_SPACES_QUERY } from '../../queries';
import { HostSpacesQuery, HostSpacesQueryVariables } from '../../queries/__generated__/HostSpacesQuery';
import usePageTranslation from '../../../../hooks/usePageTranslation';
import { useCurrentCountry, getTranslatedName } from '../../../../utilities/market';

const useStyles = makeStyles((theme: Theme) => createStyles({
  tableContainer: {
    padding: '0 15px',
  },
  table: {
    minWidth: 650,
  },
  td: {
    minWidth: '120px',
    paddingTop: '31px',
    paddingBottom: '47px',
    '&.tdfeat': {
      width: '304px',
      textAlign: 'center',
    },
    '&.active': {
      color: 'green',
    },
    '&.draft': {
      color: '#555',
    },
    '&.ready_to_review, &.rejected, &.in_active': {
      color: 'red',
    },
  },
  tableCell: {
    position: 'relative',
  },
  tablecellItem: {
    position: 'absolute',
    top: '52px',
    fontSize: '12px',
    color: ' #989898',
    fontWeight: 400,
  },
  row: {
    '& > td:nth-child(-n + 4)': {
      color: '#333333',
      fontSize: '16px',
      fontWeight: 600,
    },
    '&:last-child td': {
      borderBottom: 'none',
    },
  },
  action: {
    color: `${theme.palette.primary.main} !important`,
    textDecoration: 'underline',
    cursor: 'pointer',
  },
  loader: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-around',
  },
}));

interface IProps {
  siteId: number;
}

const ListTable: React.FC<IProps> = ({ siteId }) => {
  const classes = useStyles();
  const router = useRouter();
  const { data, loading } = useQuery<HostSpacesQuery, HostSpacesQueryVariables>(GET_SPACES_QUERY, {
    variables: {
      limit: 500,
      offset: 0,
      siteId,
      country: useCurrentCountry().name,
    },
  });
  const { t } = usePageTranslation('hostListings', 'ListTable');
  const { t: commonT } = usePageTranslation('common', 'SiteBookingStatus');
  const list = (data?.spaces?.edges || []);

  if (loading) {
    return (
      <Box className={classes.loader} flexDirection="column">
        <Box className={classes.loader}>
          <Skeleton variant="text" width="15%" height="30px" animation="wave" />
          <Skeleton variant="text" width="15%" height="30px" animation="wave" />
          <Skeleton variant="text" width="15%" height="30px" animation="wave" />
          <Skeleton variant="text" width="15%" height="30px" animation="wave" />
          <Skeleton variant="text" width="15%" height="30px" animation="wave" />
          <Skeleton variant="text" width="15%" height="30px" animation="wave" />
        </Box>
        <Box className={classes.loader}>
          <Skeleton variant="text" width="15%" height="30px" animation="wave" />
          <Skeleton variant="text" width="15%" height="30px" animation="wave" />
          <Skeleton variant="text" width="15%" height="30px" animation="wave" />
          <Skeleton variant="text" width="15%" height="30px" animation="wave" />
          <Skeleton variant="text" width="15%" height="30px" animation="wave" />
          <Skeleton variant="text" width="15%" height="30px" animation="wave" />
        </Box>
      </Box>
    );
  }

  if (!list.length && !loading) {
    return <Typography variant="body1">{t('typography')}</Typography>;
  }

  return (
    <TableContainer className={classes.tableContainer}>
      <Table className={classes.table} aria-label="simple table">
        <TableBody>
          {list
            .map((row) => (
              <TableRow key={row.id} className={classes.row}>
                <TableCell
                  style={{ paddingLeft: '0px' }}
                  component="td"
                  className={clsx(classes.td, classes.action)}
                  scope="row"
                  onClick={() => router.push(`/host/listings/space/${row.id}`)}
                >
                  {row.id}
                </TableCell>
                <TableCell align="left" className={classes.td} component="td">
                  {row.name || 'N/A'}
                </TableCell>
                <TableCell
                  align="left"
                  className={[classes.td, classes.tableCell].join(' ')}
                  component="td"
                >
                  {row.size}
                  {' '}
                  {row.size_unit}
                  <Box
                    component="span"
                    className={classes.tablecellItem}
                    display="block"
                  >
                    {row.space_type?.name_en || 'N/A'}
                    {' '}
                    {t('tableCell3')}
                  </Box>
                </TableCell>
                <TableCell align="left" className={classes.td}>
                  x
                  {' '}
                  {row.total_units}
                </TableCell>
                <TableCell align="left" className={`${classes.td} tdfeat`}>
                  {row?.features
                    ?.map((feature) => getTranslatedName(feature, 'name', router.locale))
                    .join(', ') || t('tableCell5')}
                </TableCell>
                <TableCell
                  align="right"
                  className={clsx(classes.td, row.status.toLowerCase())}
                >
                  {commonT(row.status)}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListTable;
