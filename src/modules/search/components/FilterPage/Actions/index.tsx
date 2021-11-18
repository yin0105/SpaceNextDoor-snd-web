import { Box, makeStyles, Typography } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import PrimaryButton from '../../../../../components/Buttons/PrimaryButton';
import WhiteTypography from '../../../../../components/Typographies/WhiteTypography';
import usePageTranslation from '../../../../../hooks/usePageTranslation';
import { SitesListStore } from '../../../stores/SitesListStore';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '0 24px 20px',
  },
  resetBox: {
    display: 'flex',
    alignItems: 'center',
  },
  reset: {
    color: theme.palette.primary.main,
  },
  buttonBox: {
    width: '135px',
  },
  buttonText: {
    fontWeight: 700,
    fontSize: '1.3rem',
  },
}));

interface IProps {
  sitesStore?: SitesListStore;
}

const Actions: React.FC<IProps> = ({ sitesStore }) => {
  const classes = useStyles();
  const { t } = usePageTranslation('search', 'Actions');
  return (
    <Box className={classes.root}>
      <Box id="resetFilters" className={classes.resetBox} onClick={() => sitesStore.resetFilters()}>
        <Typography className={classes.reset}>
          {t('typography')}
        </Typography>
      </Box>
      <Box className={classes.buttonBox}>
        <PrimaryButton
          onClick={() => {
            sitesStore.applyFilters();
            sitesStore.toggleFilterPopup('CLOSED');
          }}
          id="applyFilters"
        >
          <WhiteTypography className={classes.buttonText}>
            {t('whiteTypography')}
          </WhiteTypography>
        </PrimaryButton>
      </Box>
    </Box>
  );
};

export default inject('sitesStore')(observer(Actions));
