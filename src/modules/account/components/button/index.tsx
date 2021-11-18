import React from 'react';
import { Button, Box } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Image from '../../../../components/Image';
import usePageTranslation from '../../../../hooks/usePageTranslation';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& .MuiButton-contained': {
      margin: '33px 1px',
      backgroundColor: theme.palette.background.default,
      boxShadow: 'none',
      fontSize: '10px',
      lineHeight: '20px',
      '&:hover': {
        backgroundColor: 'rgba(0,0,0,0.1)',
      },
    },
  },
}));

const DeleteButton: React.FC = () => {
  const classes = useStyles();
  const { t } = usePageTranslation('hostAccount', 'Button');

  return (
    <Box className={classes.root}>
      <Button
        variant="contained"
        color="default"
        startIcon={<Image name="delete" />}
      >
        {t('delete')}
      </Button>
    </Box>
  );
};

export default DeleteButton;
