import React, { useEffect, useRef, useState } from 'react';
import { inject } from 'mobx-react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box, LinearProgress, Typography, withStyles,
} from '@material-ui/core';
import { BookingStore, BOOKING_STORE, TIMER_KEY } from '../../stores/BookingStore';
import Image from '../../../../components/Image';
import usePageTranslation from '../../../../hooks/usePageTranslation';

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[50],

    [theme.breakpoints.down('sm')]: {
      borderRadius: 0,
    },
  },
  bar: {
    borderRadius: 5,
    background: `linear-gradient(270deg, ${theme.palette.secondary.main}, #FF9056)`,
  },
}))(LinearProgress);

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '400px',
    border: `1px solid ${theme.palette.secondary.main}`,
    borderRadius: '15px',
    marginTop: '20px',
    padding: '18px 35px 25px 35px',

    [theme.breakpoints.down('sm')]: {
      marginTop: '0',
      zIndex: 9,
      width: '100%',
      border: 'none',
      padding: '20px 0 0 0',
      position: 'fixed',
      background: 'white',
      top: 0,
      left: 0,
      right: 0,
    },
  },
  header: {
    display: 'flex',
    position: 'relative',
    alignItems: 'center',

    [theme.breakpoints.down('sm')]: {
      padding: '0 25px',
    },

    '& img': {
      marginRight: '10px',
    },
  },
  time: {
    position: 'absolute',
    right: 0,
    fontWeight: 800,
    color: theme.palette.secondary.main,

    [theme.breakpoints.down('sm')]: {
      right: '25px',
    },
  },
  progress: {
    marginTop: '20px',

    [theme.breakpoints.down('sm')]: {
      marginTop: '10px',
    },
  },
}));

interface IProps {
  bookingStore?: BookingStore;
}

const useInterval = (callback: () => any, delay: number) => {
  const savedCallback = useRef<() => any>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }

    return () => 0;
  }, [delay]);
};

const Timer: React.FC<IProps> = (props) => {
  const classes = useStyles();
  const { bookingStore } = props;
  const totalTime = 900; // seconds
  // Since we have to start the timer from where it was left, even on page refresh
  const [timerSeconds, setTimer] = useState(() => (
    parseInt(localStorage.getItem(TIMER_KEY), 10) || totalTime
  ));
  const setTimerSeconds = (num: number) => {
    setTimer(num);
    localStorage.setItem(TIMER_KEY, num.toString(10));
  };

  useInterval(() => setTimerSeconds(Math.max(0, timerSeconds - 1)), 1000);

  const formatSeconds = (seconds: number) => {
    const format = (val: number) => `0${Math.floor(val)}`.slice(-2);
    const minutes = (seconds % 3600) / 60;

    return [minutes, seconds % 60].map(format).join(':');
  };

  useEffect(() => {
    if (timerSeconds <= 0) {
      bookingStore.setTimerFinishedState(true);
    }
  }, [timerSeconds]);
  const { t } = usePageTranslation('checkout', 'Timer');
  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        <Image folder="CheckoutPage" name="timer-lg" />
        <Typography variant="h5">{t('typography')}</Typography>
        <Typography variant="h5" className={classes.time}>
          -
          {formatSeconds(timerSeconds)}
        </Typography>
      </Box>
      <Box className={classes.progress}>
        <BorderLinearProgress variant="determinate" value={((timerSeconds / totalTime) * 100)} />
      </Box>
    </Box>
  );
};

export default inject(BOOKING_STORE)(Timer);
