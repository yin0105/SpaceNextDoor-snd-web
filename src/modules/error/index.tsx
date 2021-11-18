import {
  Box, makeStyles, Typography, useMediaQuery, Theme,
} from '@material-ui/core';
import Link from 'next/link';
import React from 'react';
import PrimaryButton from '../../components/Buttons/PrimaryButton';
import Image from '../../components/Image';
import Grey2Typography from '../../components/Typographies/Grey2Typography';
import usePageTranslation from '../../hooks/usePageTranslation';
import { HomeLayout } from '../../layouts/MainLayout';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '88vh',
    overflowY: 'hidden',
    [theme.breakpoints.down('sm')]: {
      height: '92vh',
      justifyContent: 'initial',
    },
  },
  errorMessage: {
    textAlign: 'center',
    marginTop: '6vh',
    fontSize: '14px',
    lineHeight: '20px',
    [theme.breakpoints.down('sm')]: {
      marginTop: '60px',
    },
    [theme.breakpoints.up('xl')]: {
      marginTop: '60px',
    },
  },
  button: {
    fontSize: '1.1em',
    color: 'white',
    width: '147px',
    height: '50px',
    marginTop: '6vh',
    [theme.breakpoints.down('sm')]: {
      marginTop: '60px',
      marginBottom: '159px',
    },
  },
}));

interface IProps {
  title: string;
  message: string;
  name: string;
  mobWidth?: string;
  desktopWidth?: string;
}

const Error: React.FC<IProps> = ({
  title, message, name, mobWidth, desktopWidth,
}) => {
  const classes = useStyles();
  const { t } = usePageTranslation('error', 'Error');
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const style = {
    width: isMobile ? mobWidth || '62%' : desktopWidth || '23%',
  };
  return (
    <HomeLayout>
      <Box className={classes.root}>
        <Image folder="Errors" name={`illus${name}`} />
        <Typography variant="h1" className="">{title}</Typography>
        <Grey2Typography style={style} className={classes.errorMessage}>{message}</Grey2Typography>

        <Link href="/">
          <PrimaryButton className={classes.button}>{t('button')}</PrimaryButton>
        </Link>
      </Box>
    </HomeLayout>
  );
};

export default Error;
