import React from 'react';
import {
  makeStyles,
  Theme,
  Typography,
  Box,
} from '@material-ui/core';
import Image from '../Image';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: '10px 0px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    marginTop: '15px',
    fontSize: '16px',
    color: theme.palette.grey[500],
  },
  items: {
    display: 'flex',
    width: '35px',
    alignItems: 'center',
    height: '35px',
    justifyContent: 'center',
    boxSizing: 'border-box',
    lineHeight: '34px',
    borderRadius: '50px',
    backgroundColor: theme.palette.grey[50],
    margin: '0px 5px',
    '&.disabled': {
      pointerEvents: 'none',
      opacity: '0.5',
    },
  },
  pagenumber: {
    backgroundColor: theme.palette.primary.light,
    textAlign: 'center',
    color: '#ffffff',
  },
  box: {
    margin: '25px 0',
  },
}));

interface IProps{
  handleChange: any,
  total: number;
  offset: number;
  pageNumber: number;
}
const Pagination:React.FC<IProps> = ({
  handleChange,
  total,
  offset,
  pageNumber,
}) => {
  const classes = useStyles();

  const showResult = () => `Showing ${offset + 1} to ${offset + 3} ${total} entries`;

  return (
    <Box className={classes.box}>
      <Typography className={classes.title} variant="caption" display="block" gutterBottom>
        { showResult() }
      </Typography>
      <div className={classes.root}>
        <div
          className={`${classes.items} ${pageNumber > 1 ? '' : 'disabled'}`}
          onClick={() => handleChange('prev')}
          aria-hidden="true"
        >
          <Image name="backRoundIcon" folder="DetailPage" />
        </div>
        <div className={`${classes.items} ${classes.pagenumber}`}>{ pageNumber }</div>
        <div
          className={`${classes.items} ${(offset + 3) < total ? '' : 'disabled'}`}
          onClick={() => handleChange('next')}
          aria-hidden="true"
        >
          <Image name="forwardRoundIcon" folder="DetailPage" />
        </div>
      </div>
    </Box>
  );
};

export default Pagination;
