import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    color: 'black',
    backgroundColor: theme.palette.background.paper,
    paddingTop: '25px',
    paddingBottom: '60px',
    '& .MuiTab-wrapper': {
      fontWeight: 500,
      fontSize: '22px',
      lineHeight: '30px',
      '@media(max-width: 856px)': {
        fontSize: '18px',
      },
    },
    '& .MuiTab-fullWidth': {
      flexGrow: 0,
      padding: '0px',
    },
    '& .Mui-selected': {
      color: ' #00A0E3',
    },
    '& .MuiBox-root': {
      padding: 0,
    },
    '& .makeStyles-tableHead-32 th': {
      paddingLeft: 0,
    },
    '& .MuiTab-root': {
      minWidth: 'auto',
      margin: 0,
      padding: 0,
      marginRight: '67px',
      paddingRight: '10px',
      paddingBottom: '15px',
      textTransform: 'capitalize',
      '@media(max-width: 856px)': {
        marginRight: '50px',
      },
    },
    '& .MuiTabs-flexContainer': {
      display: 'block',
      borderBottom: '2px solid #f0f0f0',
    },
  },
  maincontainer: {
    color: 'rgba(0, 0, 0, 1)',
    flexGrow: 0,
    boxShadow: 'none',
  },
  inputWrapper: {
    margin: '35px 0',
    display: 'none', // Hiding search input. Need to implement it in the next version :)
  },
}));

export default useStyles;
