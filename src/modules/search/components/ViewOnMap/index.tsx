import {
  Box, Button, makeStyles,
} from '@material-ui/core';
import usePageTranslation from '../../../../hooks/usePageTranslation';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '165px',
    minHeight: '165px',
    maxHeight: '165px',
    padding: '0 30px',
    cursor: 'pointer',
    [theme.breakpoints.down('xs')]: {
      padding: '0',
    },
  },
  image: {
    borderRadius: '15px',
    width: '100%',
    height: '165px',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    color: 'white',
    cursor: 'pointer',
    left: '26.5%',
    height: '50px',
    width: '47%',
    minWidth: 'max-content',
    fontSize: '13px',
    transition: 'background 0.5s ease',
    fontWeight: 700,
    '&:hover': {
      background: '#016e9c',
    },
  },
}));

interface IProps {
  setShowMap: (showMap: boolean) => void;
}

const ViewOnMap: React.FC<IProps> = ({ setShowMap }) => {
  const classes = useStyles();
  const { t } = usePageTranslation('search', 'ViewOnMap');
  return (
    <Box className={classes.root} onClick={() => setShowMap(true)}>
      <div
        className={classes.image}
        style={{ backgroundImage: 'URL("https://static.spacenextdoor.com/icons/defaultMap.svg")' }}
      >
        <Button variant="contained" color="primary" className={classes.button}>
          {t('button')}
        </Button>
      </div>
    </Box>
  );
};

export default ViewOnMap;
