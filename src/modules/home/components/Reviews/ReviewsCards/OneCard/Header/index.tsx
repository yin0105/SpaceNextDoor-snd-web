import { Box, makeStyles, Typography } from '@material-ui/core';
import Image from '../../../../../../../components/Image';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('md')]: {
      height: '81px',
    },
  },
  live: {
    color: theme.palette.grey[100],
  },
  name: {
    [theme.breakpoints.up('md')]: {
      fontSize: '24px',
      lineHeight: '30px',
    },
  },
  rate: {
    [theme.breakpoints.up('md')]: {
      paddingTop: '7px',
    },
  },
}));

type HeaderInfo = {
  fullName: string,
  stars: number,
  live: string
};

type Props = {
  headerInfo: HeaderInfo
};

const Header = (props: Props) => {
  const { headerInfo: { fullName, stars, live } } = props;
  const classes = useStyles();
  return (
    <Box display="flex" justifyContent="space-between" pb={8} className={classes.root}>
      <Box display="flex" flexDirection="column">
        <Box>
          <Typography variant="h3" className={classes.name}>
            {fullName}
          </Typography>
        </Box>
        <Box className={classes.rate}>
          <Image name="ratingFromPerson" folder="Homepage" />
        </Box>
      </Box>
      <Box>
        <Typography variant="caption" className={classes.live}>
          {live}
        </Typography>
      </Box>
    </Box>
  );
};

export default Header;
