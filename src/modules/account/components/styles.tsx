import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingTop: '15px',
    paddingBottom: '30px',

  },
  title: {
    fontSize: '18px',
    fontWeight: 600,
    lineHeight: '38px',
    color: theme.palette.grey[200],
    marginBottom: '5px',

  },
  input: {
    minWidth: '300px',
  },
  saveBtn: {
    width: '122px !important',
    height: '50px',
    color: theme.palette.background.default,
    lineHeight: '50px',
    fontWeight: 'bold',
    fontSize: '13px',
  },
  cancelBtn: {
    width: '122px',
    height: '50px',
    lineHeight: '50px',
    marginLeft: '10px',
    border: 'none',
    fontWeight: 'normal',
    fontSize: '13px',
    color: theme.palette.grey[100],
  },
  container: {
    paddingTop: '15px',
  },
  successText: {
    color: `${theme.palette.success.main} !important`,
    marginTop: '10px',
  },
  errorText: {
    color: theme.palette.error.main,
    marginTop: '10px',
  },
}));

export default useStyles;
