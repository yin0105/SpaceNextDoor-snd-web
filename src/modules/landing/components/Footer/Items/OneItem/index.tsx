import { Box, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '15px',
  },
  headerBox: {
    display: 'flex',
  },
  circle: {
    position: 'relative',
    width: '48px',
    backgroundColor: 'black',
    color: '#FFFFFF',
    borderRadius: '50%',
  },
  circlePadding: {
    paddingTop: '100%',
  },
  circleNumb: {
    position: 'absolute',
    top: '0px',
    left: '0px',
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleBox: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '20px',
  },
  descriptionBox: {
    marginTop: '22px',
    paddingRight: '50px',
    [theme.breakpoints.down('sm')]: {
      paddingRight: 0,
    },
  },

}));

type Item = {
  title: string,
  description: string
};

type Props = {
  item: Item,
  i: number
};

const OneItem = (props: Props) => {
  const classes = useStyles();
  const { item: { title, description }, i } = props;
  return (
    <Box className={classes.root}>
      <Box className={classes.headerBox}>
        <Box className={classes.circle}>
          <Box className={classes.circlePadding} />
          <Box className={classes.circleNumb}>{i}</Box>

        </Box>
        <Box className={classes.titleBox}>
          <Typography>{title}</Typography>
        </Box>
      </Box>
      <Box className={classes.descriptionBox}>
        <Typography>
          {description}
        </Typography>
      </Box>
    </Box>
  );
};

export default OneItem;
