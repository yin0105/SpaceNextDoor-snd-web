import {
  Box,
  makeStyles,
  Theme,
  Typography,
  useMediaQuery,
  Button,
} from '@material-ui/core';
import { TypeformPopup } from 'components/Buttons';
import usePageTranslation from 'hooks/usePageTranslation';
import Image from '../../Image';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    position: 'relative',
    margin: '5px auto 10px',
    padding: '10px 15px',
    textAlign: 'center',
    zIndex: 1,
    backgroundColor: '#FFFFFF',
    [theme.breakpoints.up('sm')]: {
      width: '500px',
      textAlign: 'center',
    },
  },
  imageWrapper: {
    width: '200px',
    margin: 'auto',
    '& img': {
      maxWidth: '100%',
    },
  },
  text: {
    letterSpacing: 0.5,
  },
}));

const SearchEmptyState: React.FunctionComponent = () => {
  const classes = useStyles();
  const { t } = usePageTranslation('search', 'EmptyState');
  return (
    <Box className={classes.root}>
      <Box mb={15}>
        <Box className={classes.imageWrapper}>
          <Image
            folder="SearchLocation"
            name="location_empty_state"
            extension="png"
          />
        </Box>
        <Typography variant="h3" align="center">
          {t('typography1')}
        </Typography>
      </Box>

      <Typography variant="body1" className={classes.text}>
        {t('typography2')}
      </Typography>
    </Box>
  );
};

interface IProps {
  width?: string;
  onMap?: boolean;
  handleClick: () => void;
}

export const SitesEmptyState: React.FunctionComponent<IProps> = ({
  width,
  onMap = false,
  handleClick,
}) => {
  const classes = useStyles();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const { t } = usePageTranslation('search', 'EmptyState');

  const clearFiltersButton = (
    <Button
      color="primary"
      style={{ fontSize: '1.4rem', textTransform: 'none', fontWeight: 400 }}
      onClick={handleClick}
      id="SitesEmptyState_clearAllFilters"
    >
      {t('clearFilters')}
    </Button>
  );

  const onMapStyles = {
    width: width ?? 'inherit',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '98%',
    marginLeft: '16px',
  };

  return (
    <Box className={classes.root} style={onMap ? onMapStyles : {}}>
      <Box mb={15}>
        <Box className={classes.imageWrapper}>
          <Image
            folder="SearchLocation"
            name="site_empty_state"
            extension="png"
          />
        </Box>
        <Typography variant="h3" align="center">
          {t('typography3')}
        </Typography>
      </Box>

      <Typography variant="body1" className={classes.text}>
        {t('typography4')}
      </Typography>
      {onMap && (
        <Typography variant="body1" className={classes.text}>
          {t('clearFiltersTypography')}
        </Typography>
      )}
      <Box style={!isMobile ? { display: 'flex', flexFlow: 'column' } : {}}>
        {onMap && isMobile && clearFiltersButton}
        <TypeformPopup label={t('primaryButton')} />
        {onMap && !isMobile && clearFiltersButton}
      </Box>
    </Box>
  );
};

export default SearchEmptyState;
