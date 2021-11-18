import React, { FC } from 'react';
import { Box, Typography, makeStyles } from '@material-ui/core';
import usePageTranslation from '../../../../../hooks/usePageTranslation';

interface IProps {
  isPopupContent?: boolean;
}

const useStyles = makeStyles((theme) => ({
  header: {
    [theme.breakpoints.up('md')]: {
      fontSize: '34px',
      marginBottom: '50px',
    },
  },
  secondary: {
    color: theme.palette.secondary.main,
  },
}));

const Header: FC<IProps> = ({ isPopupContent }) => {
  const classes = useStyles();
  const { t } = usePageTranslation('home', 'SquareGuides');
  return (
    <Box>
      <Typography variant="h3" className={classes.header}>
        {!isPopupContent && (
        <>
          <span className={classes.secondary}>{t('span')}</span>
          {' '}
          {t('typography')}
        </>
        )}
        {isPopupContent && t('typography2')}
      </Typography>
    </Box>
  );
};

export default Header;
