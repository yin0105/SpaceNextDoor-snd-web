import { makeStyles } from '@material-ui/core/styles';
// for inner boxes
const useStylesStep1 = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.up('md')]: {
      padding: 0,
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
    '& .glide__track': {
      overflow: 'visible',
    },
    '& .glide__bullets': {
      display: 'flex',
      marginTop: '-15px',
      justifyContent: 'center',

      '& .glide__bullet': {
        margin: '5px',
        height: '10px',
        width: '10px',
        borderRadius: '50%',
        border: 'none',
        display: 'inline-block',
        backgroundColor: theme.palette.grey[50],
      },
      '& .glide__bullet--active': {
        height: '10px',
        width: '10px',
        borderRadius: '50%',
        display: 'inline-block',
        border: 'none',
        backgroundColor: theme.palette.secondary.main,
      },
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
    '& button.textCancel': {
      fontWeight: 500,
      fontSize: '13px',
      padding: '14px 30px',
      color: '#989898',
    },
  },
}));

const useStyles = makeStyles((theme) => ({
  container: {
    margin: '10px',
    display: 'flex',
    flexDirection: 'column',
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: '12px',
    padding: '20px',
    width: '420px',
    height: '314px',
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-start',
    zIndex: 1,
    boxShadow: '0px 15px 15px rgba(51, 51, 51, 0.1)',
    [theme.breakpoints.down('md')]: {
      width: '274px',
      height: '352px',
      marginBottom: '25px',
      boxShadow: '0px 15px 15px rgba(51, 51, 51, 0.1)',
    },
    '@media screen and (max-width: 424px)': {
      width: '227px',
    },
    '@media screen and (max-width: 374px)': {
      width: '220px',
    },
  },
  containerInactive: {
    boxShadow: 'none',
    border: `1px solid ${theme.palette.grey[50]}`,
    backgroundColor: '#FEFEFE',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '10px',
  },
  blockTitle: {
    fontWeight: 600,
    fontSize: '16px',
    color: '#484451',
    lineHeight: '28px',
  },
  blockDesc: {
    fontWeight: 400,
    [theme.breakpoints.up('sm')]: {
      fontSize: '12px',
    },
    [theme.breakpoints.down('sm')]: {
      width: '68%',
    },
    fontSize: '10px',
    lineHeight: '20px',
  },
  textField: {
    '& .MuiOutlinedInput-root': {
      border: 'none !important',
    },
    '& fieldset': {
      border: 'none',
    },
    '& input': {
      padding: '14px',
    },
  },
  form: {
    padding: '0 40px',
    marginTop: '20px',
    [theme.breakpoints.down('md')]: {
      padding: '0',
      marginTop: '0',
    },
  },
  sizes: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
      gridGap: '1px',
      marginBottom: '0',
    },
    gridGap: '15px',
    marginBottom: '20px',
    '&>.MuiBox-root>p': {
      textTransform: 'uppercase',
      fontWeight: 600,
      fontSize: '12px',
      lineHeight: '40px',
    },
    '& input': {
      border: `1px solid ${theme.palette.grey[50]}`,
      borderRadius: '13px',
      marginRight: '3px',
      textAlign: 'center',
    },
    '& .MuiBox-root .MuiBox-root': {
      display: 'flex',
      alignItems: 'center',
      color: theme.palette.grey[100],
    },
  },
  image: {
    '& img': {
      maxWidth: '210px',
    },
    [theme.breakpoints.up('md')]: {
      marginTop: '3px',
      '& img': {
        maxWidth: '249px',
      },
    },
    marginTop: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  price: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& p.priceNumber': {
      fontWeight: 600,
      fontSize: '30px',
    },
  },
}));
// for index

export { useStyles, useStylesStep1 };
