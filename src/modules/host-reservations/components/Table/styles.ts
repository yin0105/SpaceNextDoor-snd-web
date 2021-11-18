import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  table: {
    border: '2px solid #E9E9E9',
    marginTop: '37px',
    borderRadius: '15px !important',
    minWidth: 650,
    '& td': {
      padding: '42px 16px',
    },
  },
  link: {
    cursor: 'pointer',
    textDecoration: 'underline',
    color: 'black',
  },
  emptybox: {
    minWidth: '40px',
  },
  btnDetail: {
    width: '100px',
    fontSize: '14px',
    fontWeight: 'normal',
    lineHeight: '20px',
    padding: '10px',
    borderRadius: '10.8897px',
  },
  tableHead: {
    '& th': {
      paddingTop: '38px',
      paddingLeft: '17px',
      paddingBottom: '38px',
      [theme.breakpoints.down('xs')]: {
        fontSize: '16px',
        minWidth: '160px',
        paddingTop: '40px',
      },
      '&:nth-last-child(-n+2)': {
        minWidth: '30px',
      },
      fontWeight: 600,
      fontSize: '18px',
      lineHeight: '20px',
      color: '#333',
    },
  },
  root: {
    borderCollapse: 'inherit',
  },
  menuContainer: {
    '& .MuiPaper-root': {
      borderRadius: '15px',
      border: '2px solid rgba(224, 224, 224, 1)',
      boxShadow: 'none',
    },
    '& .MuiBox-root:nth-child(1)': {
      borderBottom: '0.5px solid rgba(224, 224, 224, 1)',
    },
  },
  btnClass: {
    width: '30px',
  },
  property: {
    minWidth: '250px',
    maxWidth: '155px',
    '& .MuiTypography-caption': {
      fontSize: '15px',
      lineHeight: '23px',
      fontWeight: 600,
    },
    '& .MuiTypography-subtitle2': {
      color: '#333333',
      paddingTop: '5px',
      fontSize: '10px',
    },
    '& p': {
      color: '#333333',
    },
  },
  customer: {
    minWidth: '180px',
    maxWidth: '100px',
    '& .MuiTypography-caption': {
      fontSize: '15px',
      lineHeight: '23px',
      fontWeight: 600,
    },
    '& .MuiTypography-subtitle2': {
      color: '#333333',
      paddingTop: '5px',
      fontSize: '10px',
    },
    '& p': {
      color: '#333333',
    },
  },
  rowItems: {
    fontSize: '15px',
    lineHeight: '23px',
  },
  status: {
    fontWeight: 600,
    '&.completed, &.confirmed': {
      color: theme.palette.success.main,
    },
    '&.cancelled': {
      color: theme.palette.error.main,
    },
  },
  sizeitem: {
    fontWeight: 500,
  },
  subtitle: {
    fontSize: '13px',
  },
  sizeitemColor: {
    color: '#989898',
  },
  box: {
    margin: '30px 0',
    border: '2px solid #E9E9E9',
    borderRadius: '15px',
    height: '186px',
  },
  noReservation: {
    fontSize: '22px',
    color: '#EA5B21',
    fontWeight: 600,
    paddingTop: '45px',
    paddingLeft: '60px',
    [theme.breakpoints.up('xs')]: {
      paddingLeft: '40px !important',
    },
    lineHeight: '30px',
  },
  noReservationMsg: {
    marginTop: '20px',
    paddingLeft: '60px',
    [theme.breakpoints.up('xs')]: {
      paddingLeft: '40px !important',
    },
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '20px',
  },
  tablepagination: {
    '& .MuiPagination-ul': {
      justifyContent: 'center',
      padding: '10px 0px',
    },
  },
}));

export default useStyles;
