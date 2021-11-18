import { Box, Divider, makeStyles } from '@material-ui/core';
import Header from './Header';
import Body from './Body';

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: '22px',
    backgroundColor: '#FFFFFF',
    border: `1px solid ${theme.palette.grey[50]}`,
    [theme.breakpoints.up('md')]: {
      borderRadius: '44px',
    },
  },
}));

type Info = {
  fullName: string,
  stars: number,
  live: string,
  description: string
};

type Props = {
  info: Info
};

const OneCard = (props: Props) => {
  const classes = useStyles();
  const {
    info: {
      fullName,
      stars,
      live,
      description,
    },
  } = props;
  const headerInfo = {
    fullName,
    stars,
    live,
  };
  const bodyInfo = {
    description,
  };
  return (
    <Box className={classes.root} p={14} mt={10} mb={6}>
      <Header headerInfo={headerInfo} />
      <Divider light />
      <Body bodyInfo={bodyInfo} />
    </Box>
  );
};

export default OneCard;
