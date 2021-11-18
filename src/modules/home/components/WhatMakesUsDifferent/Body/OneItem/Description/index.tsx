import { Box, makeStyles, Typography } from '@material-ui/core';

type Props = {
  description: string
};

const useStyles = makeStyles((theme) => ({
  description: {
    whiteSpace: 'pre-line',
    [theme.breakpoints.up('md')]: {
      fontSize: '20px',
      lineHeight: '30px',
    },
  },
}));

const Description = (props: Props) => {
  const classes = useStyles();
  const { description } = props;
  return (
    <Box pt={5}>
      <Typography variant="body2" className={classes.description}>
        {description}
      </Typography>
    </Box>
  );
};

export default Description;
