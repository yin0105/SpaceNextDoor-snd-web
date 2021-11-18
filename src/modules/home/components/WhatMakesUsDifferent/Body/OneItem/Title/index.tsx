import { Box, Typography, makeStyles } from '@material-ui/core';

type Props = {
  title: string
};

const useStyles = makeStyles((theme) => ({
  title: {
    [theme.breakpoints.up('md')]: {
      fontSize: '24px',
      marginBottom: '20px',
    },
  },
}));

const Title = (props: Props) => {
  const classes = useStyles();
  const { title } = props;
  return (
    <Box pt={18}>
      <Typography variant="h4" className={classes.title}>
        {title}
      </Typography>
    </Box>
  );
};

export default Title;
