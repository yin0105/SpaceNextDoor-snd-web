import {
  Box, fade, Grid, Hidden, makeStyles, Typography,
} from '@material-ui/core';
import clsx from 'clsx';
import { getResizedURL } from 'utilities/imageResizer';

const useStyles = makeStyles((theme) => ({
  root: {
    border: `1px solid ${fade(theme.palette.primary.main, 0.5)}`,
    borderRadius: '14px',
    cursor: 'pointer',
    [theme.breakpoints.up('sm')]: {
      background: 'white',
      border: `2px solid ${theme.palette.grey[50]}`,
      padding: '9px 30px',
    },
    maxWidth: '300px',
  },
  rootActive: {
    backgroundColor: theme.palette.primary.main,
    '& $title': {
      color: '#FFFFFF',
    },
    '& $description': {
      color: '#FFFFFF',
    },
    [theme.breakpoints.up('sm')]: {
      background: 'white',
      padding: '13px 30px',
      boxShadow: '0px 15px 40px rgba(51, 51, 51, 0.1)',
      border: `1px solid ${theme.palette.primary.main} !important`,
      '& $title': {
        color: theme.palette.primary.main,
      },
      '& $description': {
        color: theme.palette.primary.main,
      },
    },
  },
  titleBox: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '6px',
  },
  title: {
    color: fade(theme.palette.primary.main, 0.5),
    fontWeight: 700,
    [theme.breakpoints.up('sm')]: {
      color: theme.palette.grey[100],
      fontSize: theme.typography.h4.fontSize,
    },
  },
  descriptionBox: {
    display: 'flex',
    justifyContent: 'center',
  },
  description: {
    color: fade(theme.palette.primary.main, 0.5),
    fontSize: '12px',
    [theme.breakpoints.up('sm')]: {
      color: theme.palette.grey[100],
      fontSize: theme.typography.h4.fontSize,
    },
  },
  iconWrapper: {
    '& img': {
      width: '85px',
      height: '85px',
    },
  },
}));

interface IProps {
  id: number;
  title: string;
  unit: string;
  icon: string;
  range_start: number;
  range_end: number;
  isSelected: boolean;
  onSelect(id: number): void;
  htmlId: string;
}

const Option: React.FC<IProps> = ({
  title, unit, range_end, range_start, onSelect, icon, id, isSelected, htmlId,
}) => {
  const classes = useStyles();

  return (
    <Box
      className={clsx(classes.root, isSelected && classes.rootActive)}
      onClick={() => onSelect(id)}
      id={htmlId}
    >
      <Grid container alignItems="center">
        <Hidden only="xs">
          <Grid item sm={5} lg={5} xl={5}>
            <Box className={classes.iconWrapper}>
              <img src={getResizedURL(icon, { width: 85 })} alt={title} loading="lazy" />
            </Box>
          </Grid>
        </Hidden>
        <Grid item xs={12} sm={7} lg={7} xl={7}>
          <Box className={classes.titleBox}>
            <Typography className={classes.title}>
              {title}
            </Typography>
          </Box>
          <Box className={classes.descriptionBox}>
            <Typography className={classes.description}>
              {`${range_start} - ${range_end}`}
              &nbsp;
              {unit}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Option;
