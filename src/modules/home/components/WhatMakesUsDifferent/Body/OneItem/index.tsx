import { Box, makeStyles } from '@material-ui/core';
import Title from './Title';
import Description from './Description';
import Image from '../../../../../../components/Image';

const useStyles = makeStyles((theme) => ({
  root: {
    border: '1.5px solid #E9E9E9',
    borderRadius: '22px',
    minHeight: '210px',
    position: 'relative',
    padding: '10px 5px 10px 10px',
    height: '100%',
    [theme.breakpoints.up('md')]: {
      padding: '90px 40px',
    },
  },
  imgBox: {
    position: 'absolute',
    top: '15px',
    left: '15px',
    [theme.breakpoints.up('md')]: {
      top: '70px',
      left: '60px',
      marginBottom: '200px',
      transform: 'scale(2.7, 2.7)',
    },
  },
  titleContainer: {
    [theme.breakpoints.up('md')]: {
      marginTop: '30px',
    },
  },
}));

type Props = {
  img: any,
  title: string,
  description: string
};

const OneItem = (props: Props) => {
  const { img, title, description } = props;
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box className={classes.imgBox}>
        <Image name={img} folder="Homepage" />
      </Box>
      <Box className={classes.titleContainer}>
        <Title title={title} />
      </Box>
      <Description description={description} />
    </Box>
  );
};

export default OneItem;
