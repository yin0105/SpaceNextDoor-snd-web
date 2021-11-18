import { Box, makeStyles, Theme } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import usePageTranslation from '../../../../hooks/usePageTranslation';
import ListItems from './ListItems';

const useStyles = makeStyles((theme: Theme) => ({
  details: {
    borderBottom: '1px solid #E9E9E9',
    [theme.breakpoints.down('xs')]: {
      '& :first-child': {
        fontWeight: 600,
        paddingBottom: '5px',
      },
    },
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    '& > div': {
      fontSize: '16px',
      lineHeight: '23px',
      color: theme.palette.grey[200],
      padding: '18px 0',
      maxWidth: '300px',
    },
    '& .MuiRating-root.Mui-disabled': {
      fontSize: '24px',
      '& .MuiSvgIcon-fontSizeInherit': {
        fill: '#fff',
        stroke: '#FD9942',
        strokeWidth: '3px',
        marginLeft: '9px',
      },
    },
    '& MuiBox-root-53': {
      padding: '0px',
    },
  },
  rightItem: {
    textAlign: 'right',
  },
  title: {
    fontWeight: 600,
    fontSize: '16px',
    lineHeight: '23px',
    paddingBottom: '10px',
  },
  paidlist: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingBottom: '6px',
    fontSize: '16px',
    color: theme.palette.grey[200],
  },
  downloadLink: {
    textAlign: 'right',
    paddingTop: '8px',
  },
  downloadBtn: {
    padding: '14px 0px',
    color: theme.palette.primary.main,
    fontWeight: 600,
    fontSize: '16px',
    lineHeight: '23px',
    textAlign: 'right',
    textDecoration: 'none',
  },
  value: {
    [theme.breakpoints.up('sm')]: {
      textAlign: 'right',
    },
  },
  listItem: {
    borderBottom: `1px solid ${theme.palette.grey[50]}`,
    paddingBottom: '20px',
  },
}));

interface IProps {
  name: string;
  value?: any;
  isListItems?: boolean;
  listItems?: any[];
}

const ItemDetail: React.FC<IProps> = ({
  name,
  value,
  isListItems,
  listItems,
}) => {
  const classes = useStyles();

  const RatingIcon = (
    <Box component="fieldset" borderColor="transparent" pr="0">
      <Rating name="disabled" value={2} disabled />
    </Box>
  );
  const { t } = usePageTranslation('hostListings', 'ItemDetail');
  return (
    <>
      {
        isListItems
          ? <ListItems listItems={listItems} classes={classes} name={name} />
          : (
            <Box className={classes.details}>
              <div>{name}</div>
              <div className={classes.value}>{name === t('value') ? RatingIcon : (value || 'N/A')}</div>
            </Box>
          )
      }
    </>
  );
};

export default ItemDetail;
