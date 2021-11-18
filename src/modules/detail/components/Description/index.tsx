import React, { useState } from 'react';
import {
  Box, makeStyles, Typography, fade, useMediaQuery, Theme,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import usePageTranslation from 'hooks/usePageTranslation';
import PrimaryTypography from '../../../../components/Typographies/PrimaryTypography';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '10px',
    borderBottom: `1px solid ${fade(theme.palette.grey[100], 0.1)}`,
    paddingBottom: '40px',
    [theme.breakpoints.only('xs')]: {
      paddingBottom: '25px',
    },
  },
  readMoreBox: {
    marginTop: '12px',
    '& :hover': {
      cursor: 'pointer',
    },
  },
  loader: {
    backgroundColor: theme.palette.grey[50],
    borderRadius: '10px',
  },
  description: {
    color: '#948EA2',
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.6rem',
      lineHeight: '2.5rem',
    },
  },
}));

interface IProps {
  description: string;
  loading: boolean;
}

const Description: React.FC<IProps> = ({ description, loading }) => {
  const classes = useStyles();
  const { t } = usePageTranslation('details', 'Description');
  const Loader = () => (
    <>
      <Skeleton variant="text" animation="wave" className={classes.loader} width="90%" height={25} />
      <Skeleton variant="text" animation="wave" className={classes.loader} width="80%" height={25} />
      <Skeleton variant="text" animation="wave" className={classes.loader} width="70%" height={25} />
      <Skeleton variant="text" animation="wave" className={classes.loader} width="60%" height={25} />
    </>
  );

  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.only('xs'));
  const descriptionLength = isMobile ? 103 : 145;
  const [isReadMore, setIsReadMore] = useState<boolean>(true);

  const showDescription = () => (
    // eslint-disable-next-line no-nested-ternary
    description ? (description?.length < descriptionLength)
      ? description
      : (isReadMore ? `${description?.slice(0, descriptionLength)}...` : description) : '');

  return (
    <Box className={classes.root}>
      <Box>
        {loading && <Loader />}
        {!loading && (
          <Typography variant="body2" className={classes.description}>
            <span>{showDescription()}</span>
          </Typography>
        )}
      </Box>
      {description?.length > descriptionLength && (
        <Box className={classes.readMoreBox} role="button" tabIndex={0} onClick={() => setIsReadMore(!isReadMore)}>
          <PrimaryTypography variant="body2">
            {isReadMore ? t('readMore') : t('showLess')}
          </PrimaryTypography>
        </Box>
      )}
    </Box>
  );
};

export default Description;
