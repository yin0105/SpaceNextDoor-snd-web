import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.up('sm')]: {
      padding: 0,
    },
    marginBottom: '34px',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '40px',
    },
  },
  divider: {
    marginTop: '50px',
    marginBottom: '50px',
    [theme.breakpoints.down('md')]: {
      marginTop: '25px',
      marginBottom: '25px',
    },
  },
  header: {
    padding: '0 27px',
    marginBottom: '15px',
    [theme.breakpoints.up('md')]: {
      padding: '0',
      display: 'flex',
      alignStep1: 'center',
      justifyContent: 'space-between',
      marginBottom: '40px',
    },
  },
  blockTitle: {
    fontWeight: 600,
    fontSize: '16px',
    color: '#333333',
    lineHeight: '18px',
    [theme.breakpoints.up('md')]: {
      fontWeight: 600,
      fontSize: '18px',
      color: '#333333',
      lineHeight: '20px',
    },
  },
  boxSelection: {
    height: '430px',
    [theme.breakpoints.up('md')]: {
      height: '360px',
      margin: 'auto',
    },
  },
  boxSelectionFlex: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      height: '360px',
    },
    [theme.breakpoints.down('md')]: {
      padding: '0 27px',
    },
    justifyContent: 'center',
  },
  boxCounterResult: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    border: '1.5px solid #E9E9E9',
    [theme.breakpoints.up('md')]: {
      border: 'none',
      height: '100%',
      width: '528px',
    },
    [theme.breakpoints.down('md')]: {
      width: '197px',
      height: '221px',
    },
    boxSizing: 'border-box',
    borderRadius: '22px',
    marginBottom: '30px',
  },
  boxCounterBody: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
    },
  },
  recommendedContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  link: {
    textDecoration: 'none !important',
  },
  recommendedInner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    fontWeight: 400,
    fontSize: '12px',
    color: '#9E9E9E',
    lineHeight: '20px',
    [theme.breakpoints.up('md')]: {
      fontWeight: 400,
      fontSize: '16px',
      color: '#9E9E9E',
      lineHeight: '20px',
    },
  },
  boxLabel: {
    fontWeight: 400,
    lineHeight: '20px',
    fontSize: '16px',
    color: '#333333',
    [theme.breakpoints.up('md')]: {
      fontSize: '18px',
    },
  },
  guideDesc: {
    fontWeight: 400,
    lineHeight: '20px',
    color: '#9E9E9E',
    fontSize: '14px',
    [theme.breakpoints.up('md')]: {
      fontSize: '16px',
    },
  },
  boxCounter: {
    display: 'flex',
    alignItems: 'center',
    height: '107px',
    width: '270px',
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
      justifyContent: 'flex-end',
      width: '420px',
      height: '274px',
    },
    '& .MuiInputBase-formControl': {
      borderRadius: '12px',
    },
  },
  boxCounterColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'flex-end',
    },
  },
  counterNumber: {
    fontWeight: 600,
    fontSize: '48px',
    [theme.breakpoints.up('md')]: {
      fontSize: '68px',
      marginBottom: '23px',
    },
    color: `${theme.palette.primary.main}`,
    lineHeight: '30px',
    marginBottom: '10px',
  },
  counterNumberSmall: {
    fontSize: '25px',
    [theme.breakpoints.up('md')]: {
      fontSize: '35px',
    },
  },
  boxResult: {
    maxWidth: '684px',
    border: `1px solid ${theme.palette.grey[50]}`,
    margin: '30px auto',
    padding: '50px 0',
    borderRadius: '22px',
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '30px 0',
      width: '197px',
    },
  },
  boxCounterInput: {
    '& input': {
      textAlign: 'center',
      fontWeight: 600,
      width: '103px',
      padding: '0',
      height: '70px',
      fontSize: '22px',
      [theme.breakpoints.up('md')]: {
        fontWeight: 600,
        fontSize: '60px',
        textAlign: 'center',
        height: '131px',
        width: '193px',
      },
    },
    '& input[type=number]::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
    '& input[type=number]::-webkit-outer-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
  },
  boxCounterInputSmall: {
    '& input': {
      fontSize: '15px',
      [theme.breakpoints.up('md')]: {
        fontSize: '35px',
      },
    },
  },
  textBoxes: {
    fontWeight: 400,
    fontSize: '16px',
  },
  boxImage: {
    width: '216.74px',
    margin: '15px',
    [theme.breakpoints.up('md')]: {
      width: '307.26px',
    },
  },
  boxImageSmall: {
    width: '128px',
    [theme.breakpoints.up('md')]: {
      width: '226px',
    },
  },
  button: {
    [theme.breakpoints.up('sm')]: {
      padding: '0 30px 0 0',
      marginTop: '15px',
    },
    '& button': {
      [theme.breakpoints.up('sm')]: {
        padding: '14px 50px',
      },
    },
    '& button.textWhite': {
      fontWeight: 700,
      width: '125px',
      fontSize: '13px',
      borderRadius: '15px',
      padding: '14px 30px',
      color: '#FFFFFF',
    },
    '& button.btnEstimate': {
      [theme.breakpoints.up('md')]: {
        width: '244px',
      },
      width: '155px',
    },
    '& button.btnFindStorage': {
      [theme.breakpoints.up('md')]: {
        width: '332px',
      },
      width: '174px',
    },
    '& button.textBack': {
      fontWeight: 500,
      fontSize: '13px',
      padding: '14px 30px',
      color: `${theme.palette.primary.main}`,
    },
  },

  stickyButtonsBox: {
    position: 'fixed',
    background: 'white',
    width: '100%',
    zIndex: 99,
    bottom: 0,
    borderBottom: `1px solid ${fade(theme.palette.grey[100], 0.1)}`,
    marginLeft: '0px',
    marginRight: '-28px',
    padding: '15px 28px 15px',
    borderTopRightRadius: '25px',
    borderTopLeftRadius: '25px',
    boxShadow: '0px 9px 40px rgba(51, 51, 51, 0.1)',
    '& button.textWhite': {
      fontWeight: 700,
      width: '125px',
      fontSize: '13px',
      color: '#FFFFFF',
    },
    '& button.btnFindStorage': {
      [theme.breakpoints.up('md')]: {
        width: '332px',
      },
      width: '174px',
    },
    '& button.textBack': {
      fontWeight: 500,
      fontSize: '13px',
      padding: '14px 0px',
      color: `${theme.palette.primary.main}`,
    },
  },
}));
export default useStyles;
