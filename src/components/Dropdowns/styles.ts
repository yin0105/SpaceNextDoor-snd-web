import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => createStyles({
  button: {
    padding: '0px',
    height: '37px',
    borderRadius: '5.89671px',
    fontSize: '9.58216px',
    fontWeight: 'bold',
    lineHeight: '23px',
    letterSpacing: '0.01em',
  },

  listitems: {
    padding: '15px 25px',

  },
  divider: {
    width: '165px',
    margin: '5px auto',
  },
  btnClass: {
    width: '',
    border: 'none',
  },
}));

export default useStyles;
