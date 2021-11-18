import { Box, Typography } from '@material-ui/core';

interface IProps {
  listItems: {
    name: string;
    value: string | number;
  }[];
  classes: any;
  name: string;
}

const RenderList: React.FC<IProps> = ({ listItems, classes, name }) => (
  <Box className={classes.listItem}>
    <Typography paragraph className={classes.title}>{name}</Typography>
    {listItems?.map((item: any, index) => (
      <div key={`${item.name}_${index}`} className={classes.paidlist}>
        <div>{item.name}</div>
        <div className={classes.rightItem}>{item.value}</div>
      </div>
    ))}
    {/* <div className={classes.downloadLink}>
        <a href="/" onClick={invoiceDownloadHanlder}
        className={classes.downloadBtn}>Download Invoice</a>
      </div> */}
  </Box>
);
export default RenderList;
