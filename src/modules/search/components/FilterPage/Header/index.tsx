import {
  Box, fade, makeStyles, Typography,
} from '@material-ui/core';
import { inject } from 'mobx-react';
import Image from '../../../../../components/Image';
import usePageTranslation from '../../../../../hooks/usePageTranslation';
import { SitesListStore } from '../../../stores/SitesListStore';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    marginTop: '10px',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    padding: '15px',
    borderBottom: `1px solid ${fade(theme.palette.grey[100], 0.1)}`,
  },
  image: {
    cursor: 'pointer',
    position: 'absolute',
    marginTop: '3px',
    left: '24px',
  },
}));

interface IProps {
  sitesStore?: SitesListStore;
}

const Header: React.FC<IProps> = ({ sitesStore }) => {
  const classes = useStyles();
  const { t } = usePageTranslation('search', 'Header');
  return (
    <Box className={classes.root}>
      <Typography variant="h2">
        {t('typography')}
      </Typography>
      <Box className={classes.image} onClick={() => sitesStore.toggleFilterPopup('CLOSED')}>
        <Image name="close" folder="SearchLocation" />
      </Box>
    </Box>
  );
};

export default inject('sitesStore')(Header);
