import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => createStyles({
  accordion: {
    boxShadow: 'none',
  },
  accordionContent: {
    margin: 0,
  },
  dividerLine: {
    background: theme.palette.grey[50],
    height: '1px',
    marginBottom: '20px',
  },
  divider: {
    height: '2px',
    marginTop: '20px',
  },
  getHelpButton: {
    background: '#FF9056',
    borderRadius: '120px',
    height: '43px',
    fontSize: '15.6px',
    fontWeight: 'bold',
    lineHeight: '23px',
    letterSpacing: '0.01em',
  },
  searchWrapper: {
    marginBottom: '40px',
    display: 'none',
  },
  lineBreak: {
    height: '2px',
    marginTop: '40px',
  },
  siteSpaces: {
    padding: '25px',
    fontWeight: 600,
  },
}));

export default useStyles;
