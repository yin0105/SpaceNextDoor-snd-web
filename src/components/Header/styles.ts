import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    height: '82px',
    backgroundColor: '#FFFFFF',
    backdropFilter: 'blur(40px)',
    boxShadow: 'none',
    borderBottom: '2px solid #f5f5f5',
    boxSizing: 'border-box',
  },
  togglebtn: {
    cursor: 'pointer',
  },
  logoImage: {
    height: '52px',
    paddingRight: '20px',
  },
  menuLink: {
    position: 'relative',
    padding: ' 32px 26px',
    color: '#333333',
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '0.5px',
    fontWeight: 400,
    transition: '0.3s all',
    '&::before': {
      position: 'absolute',
      content: '""',
      backgroundColor: '#EA5B21',
      height: '2px',
      width: '100%',
      bottom: 0,
      left: 0,
      visibility: 'hidden',
      opacity: 0,
    },
    '&:hover, &.link__active': {
      color: '#EA5B21',
      textDecoration: 'none',
      '&::before': {
        visibility: 'visible',
        opacity: 1,
      },
    },
  },
  button: {
    padding: '0px',
    width: '150px',
    height: '37px',
    borderRadius: '5.89671px',
    fontSize: '9.58216px',
    fontWeight: 'bold',
    lineHeight: '23px',
    letterSpacing: '0.01em',
  },
  Dropbutton: {
    width: '150px',
    marginRight: '38px',
    color: '#333333',
    justifyContent: 'space-around',
    border: '0.737089px solid #E9E9E9',
    boxSizing: 'border-box',
  },
  createListButton: {
    color: '#fff',
    boxShadow: 'none',
    textTransform: 'uppercase',
    background: '#EA5B21',
    margin: '0px 11px',
    '&:hover': {
      backgroundColor: '#FF9056',
      boxShadow: 'none',
    },
  },
  grow: {
    flexGrow: 1,
  },
  Navitems: {
    flex: 1,
    padding: '0px 32px',
    justifyContent: 'space-between',
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
}));

export default useStyles;
