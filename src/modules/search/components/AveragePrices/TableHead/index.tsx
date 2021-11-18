import {
  makeStyles, TableCell, TableHead, TableRow, Typography,
} from '@material-ui/core';
import usePageTranslation from '../../../../../hooks/usePageTranslation';

const useStyles = makeStyles((theme) => ({
  tableCell: {
    borderBottom: '0px',
  },
}));

const TableHeadComponent = () => {
  const classes = useStyles();
  const { t } = usePageTranslation('search', 'TableHead');
  return (
    <TableHead>
      <TableRow>
        <TableCell className={classes.tableCell}>
          <Typography variant="body2">{t('cell1')}</Typography>
        </TableCell>
        <TableCell className={classes.tableCell} align="center">
          <Typography variant="body2">{t('cell2')}</Typography>
        </TableCell>
        <TableCell className={classes.tableCell} align="right">
          <Typography variant="body2">{t('cell3')}</Typography>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default TableHeadComponent;
