import React from 'react';
import {
  Box,
  FormControlLabel,
  List,
  ListItem,
  makeStyles,
  Typography,
} from '@material-ui/core';
import StyledCheckbox from '../../../../../../../components/Checkbox';
import usePageTranslation from '../../../../../../../hooks/usePageTranslation';

const useStyles = makeStyles((theme) => ({
  mainBox: {
    maxWidth: '630px',
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      padding: '0',
    },
  },
  list: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  listItem: {
    padding: '0',
    width: 'auto',
    marginRight: '30px',
  },
  formBox: {
    marginTop: '42px',
  },
}));

const CustomCheckbox = ({ label }) => {
  const classes = useStyles();
  return (
    <ListItem className={classes.listItem}>
      <FormControlLabel
        control={(
          <StyledCheckbox />
        )}
        label={label}
      />
    </ListItem>
  );
};

const Checkboxes: React.FC = () => {
  const classes = useStyles();
  const { t } = usePageTranslation('hostOnBoarding', 'Checkboxes');
  return (
    <Box className={classes.mainBox}>
      <Box>
        <Typography variant="h3">
          {t('typography')}
        </Typography>
      </Box>
      <Box>
        <List className={classes.list}>
          <CustomCheckbox label={t('customCheckbox1')} />
          <CustomCheckbox label={t('customCheckbox2')} />
          <CustomCheckbox label={t('customCheckbox3')} />
        </List>
      </Box>
    </Box>
  );
};

export default Checkboxes;
