import React, { FC } from 'react';
import { Box, makeStyles, Typography } from '@material-ui/core';
import Grey2Typography from '../../../../../../components/Typographies/Grey2Typography';
import Image from '../../../../../../components/Image';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '30px 14px 9px',
    margin: '20px 30px 12px',
    border: `1px solid ${theme.palette.grey[50]}`,
    borderRadius: '20px',
    minHeight: '340px',
    width: '260px',
    background: '#ffffff',
    [theme.breakpoints.up('md')]: {
      margin: '0',
    },
    [theme.breakpoints.only('xs')]: {
      margin: '0 auto 12px',
      width: '230px',
      minHeight: '310px',
    },
  },
  step: {
    marginBottom: '10px',
  },
  titleBox: {
    marginTop: '12px',

    '& h2': {
      fontWeight: 700,
    },
  },
  orangeLine: {
    marginTop: '10px',
    padding: '0 25px',
    border: `1px solid ${theme.palette.secondary.main}`,
    borderRadius: '20px',
  },
  descriptionBox: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
  },
  description: {
    textAlign: 'center',

    [theme.breakpoints.up('sm')]: {
      fontSize: '1.4rem',
    },
  },
}));

interface IProps {
  title: string;
  description: string;
  stepId: number;
}

const OneItem: FC<IProps> = ({ title, description, stepId }) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box>
        <Image name={`step${stepId}`} folder="DetailPage" />
      </Box>
      <Box className={classes.titleBox}>
        <Typography variant="h2">
          {title}
        </Typography>
      </Box>
      <Box className={classes.orangeLine} />
      <Box className={classes.descriptionBox}>
        <Grey2Typography variant="body2" className={classes.description}>{description}</Grey2Typography>
      </Box>
    </Box>
  );
};

export default OneItem;
