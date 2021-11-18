import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    padding: '32px',
    paddingBottom: '19px',
  },
  headerTitle: {
    fontSize: '18px',
    lineHeight: '20px',
    fontWeight: 600,
  },
  subtitle: {
    paddingTop: '23px',
    fontWeight: 500,
    fontSize: '18px',
    lineHeight: '30px',
    textAlign: 'center',

  },
  message: {
    textAlign: 'center',
    fontSize: '14px',
    lineHeight: '20px',
    color: '#989898',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    width: '544px',
    height: '288px',
    borderRadius: '15px',
    '&:focus': {
      outline: 'none',
    },
  },
  IconClose: {
    textAlign: 'right',
  },
  alertIcon: {
    textAlign: 'right',
    paddingRight: '16px',
  },
  footer: {
    padding: '32px',
  },
  btn: {
    borderRadius: '100px',
    width: '125px',
    height: '50px',
    textTransform: 'uppercase',
    marginLeft: '13px',
    fontWeight: 'bold',
    fontSize: '13px',

  },
  confrimBtn: {
    backgroundColor: '#00A0E3',
    color: '#FFFFFF',
  },
  cancleBtn: {
    color: '#989898',
  },
}));

export default useStyles;
