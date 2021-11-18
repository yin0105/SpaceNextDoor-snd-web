import {
  makeStyles, TableBody, TableCell, TableRow, Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  tableCell: {
    borderBottom: `1px dashed ${theme.palette.grey[50]}`,
    padding: '6px 24px 15px 16px',
  },
  borderNull: {
    borderBottom: '0px',
    padding: '6px 24px 15px 16px',
  },
  tableBodyText: {
    color: theme.palette.grey[100],
  },
}));

type Price = {
  size: string,
  averagePrice: number,
  lowestPrice: number
};

type Prices = Price[];

type Props = {
  prices: Prices
};

const TableBodyComponent = (props: Props) => {
  const classes = useStyles();
  const { prices } = props;
  return (
    <TableBody>
      {prices.map((price, i) => {
        const last = i + 1 === prices.length;
        return (
          <TableRow key={price.size}>
            <TableCell className={last ? classes.borderNull : classes.tableCell}>
              <Typography variant="body2" className={classes.tableBodyText}>{price.size}</Typography>
            </TableCell>
            <TableCell className={last ? classes.borderNull : classes.tableCell} align="center">
              <Typography variant="body2" className={classes.tableBodyText}>
                {price.averagePrice}
                $
              </Typography>
            </TableCell>
            <TableCell className={last ? classes.borderNull : classes.tableCell} align="right">
              <Typography variant="body2" className={classes.tableBodyText}>
                {price.lowestPrice}
                $
              </Typography>
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
};

export default TableBodyComponent;
