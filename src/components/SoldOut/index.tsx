import { Box, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import usePageTranslation from '../../hooks/usePageTranslation';
import Image from '../Image';
import Grey2Typography from '../Typographies/Grey2Typography';

const useStyles = makeStyles((theme) => ({
  soldOutBox: {
    border: `1px solid ${theme.palette.grey[50]}`,
    borderRadius: '21px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    padding: '105px 15px',
    '& img': {
      position: 'relative',
      top: '3px',
      marginRight: '5px',
    },
    '& h4': {
      marginBottom: '3px',
    },
  },
}));

interface IProps {
  label?: string;
}

const SoldOut: React.FC<IProps> = ({ label }) => {
  const classes = useStyles();
  const { t } = usePageTranslation('details', 'SoldOut');
  return (
    <Box className={classes.soldOutBox}>
      <Typography color="error" variant="h4">
        <Image folder="SearchLocation" name="time" />
        {t('error')}
      </Typography>
      <Grey2Typography>{label || t('grey2')}</Grey2Typography>
    </Box>
  );
};

export default SoldOut;
