import { Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Grey2Typography from '../../../../../../../../../../components/Typographies/Grey2Typography';
import usePageTranslation from '../../../../../../../../../../hooks/usePageTranslation';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    right: '0px',
    top: '44px',
    minWidth: '150px',
    zIndex: 2,
  },
  container: {
    border: `2px solid ${theme.palette.grey[50]}`,
    borderRadius: '12px',
    backgroundColor: '#FFFFFF',
    '& >div': {
      borderBottom: `1px solid ${theme.palette.grey[50]}`,
    },
    '& >div:last-child': {
      borderBottom: 'none',
    },
  },
  button: {
    padding: '16px 20px',
    display: 'flex',
    justifyContent: 'flex-start',
    textTransform: 'none',
  },
}));

interface IProps {
  changeOpenEdit: () => void;
  deleteOption: () => void;
}

const Actions: React.FC<IProps> = (props) => {
  const classes = useStyles();
  const {
    changeOpenEdit,
    deleteOption,
  } = props;
  const { t } = usePageTranslation('hostOnBoarding', 'Actions');
  return (
    <Box className={classes.root}>
      <Box className={classes.container}>
        <Box>
          <Button fullWidth className={classes.button} onClick={changeOpenEdit}>
            <Grey2Typography variant="h4">
              {t('grey2Typography')}
            </Grey2Typography>
          </Button>
        </Box>
        {/* <Box>
          <Button fullWidth className={classes.button} onClick={deleteOption}>
            <Grey2Typography variant="h4">
              Delete
            </Grey2Typography>
          </Button>
        </Box> */}
      </Box>
    </Box>
  );
};

export default Actions;
