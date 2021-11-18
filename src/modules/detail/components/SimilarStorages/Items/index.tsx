import { Box, makeStyles } from '@material-ui/core';
import OneItem from './OneItem';
import { SimilarStorageQuery_sites_edges } from '../../../queries/__generated__/SimilarStorageQuery';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '18px',

    [theme.breakpoints.down('lg')]: {
      padding: '0 10px',
      display: 'flex',
    },
  },
}));

interface IProps {
  similarStorages: SimilarStorageQuery_sites_edges[]
}

const Items: React.FC<IProps> = (props) => {
  const { similarStorages } = props;
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      {similarStorages.map((storage) => (
        <OneItem
          key={storage.id}
          similarStorage={storage}
        />
      ))}
    </Box>
  );
};

export default Items;
