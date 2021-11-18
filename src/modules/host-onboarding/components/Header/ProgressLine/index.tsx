import { Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '14px',
    width: '100%',
    borderRadius: '20px',
    backgroundColor: '#F4F5F3',
    padding: '4px 0',
    position: 'relative',
  },
  line: {
    position: 'absolute',
    top: '0px',
    left: '0px',
    height: '100%',
    borderRadius: '20px',
    backgroundColor: theme.palette.primary.main,

  },
}));

interface IProps {
  step: number;
  totalSteps?: number;
}

const ProgressLine: React.FC<IProps> = (props) => {
  const classes = useStyles();
  const { step, totalSteps = 10 } = props;
  const width = `${(step / totalSteps) * 100}%`;

  return (
    <Box className={classes.root}>
      <Box className={classes.line} width={width} />
    </Box>
  );
};

export default ProgressLine;
