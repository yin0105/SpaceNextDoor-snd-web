import { makeStyles } from '@material-ui/core/styles';
import Header from '../../components/Header';

const useStyles = makeStyles({
  root: {
    paddingTop: '60px',
  },
});

const HostLayout: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <>
      <Header />
      <main className={classes.root}>
        {children}
      </main>
    </>
  );
};

export default HostLayout;
