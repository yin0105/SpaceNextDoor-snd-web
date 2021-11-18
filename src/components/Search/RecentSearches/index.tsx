import {
  makeStyles,
  Typography,
  Box,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { useRouter } from 'next/router';

import Image from '../../Image';
import useRecentSearches from '../../../modules/search/hooks/useRecentSearches';
import usePageTranslation from '../../../hooks/usePageTranslation';
import { getTranslatedPlace } from '../../../utilities/locations';

const useStyles = makeStyles({
  root: {
    margin: '0 -16px',
  },
  title: {
    fontWeight: 600,
    padding: '0px 16px',
    fontSize: '1.2rem',
    lineHeight: '50px',
    textTransform: 'uppercase',
    color: '#333333',
  },
  listItem: {
    padding: '10px 16px',
    margin: 0,
    width: '100%',
  },
  listItemText: {
    paddingLeft: '15px',
  },
});

const RecentSearches: React.FC<any> = ({ onClick }) => {
  const classes: any = useStyles();
  const [recentSearches] = useRecentSearches([]);
  const router = useRouter();

  const { t } = usePageTranslation('search', 'RecentSearches');

  return (
    <Box className={classes.root}>
      <Typography variant="h2" className={classes.title}>{t('title')}</Typography>
      {recentSearches.map((location, i) => (
        <ListItem
          key={`${location?.city?.id}_${i}`}
          button
          className={classes.listItem}
        >
          <Image name="location" folder="SearchLocation" />
          <ListItemText
            className={classes.listItemText}
            primary={getTranslatedPlace(location, router?.locale)}
            onClick={(e) => {
              e.preventDefault();
              if (onClick) {
                onClick(location);
              }
            }}
          />
        </ListItem>
      ))}
    </Box>
  );
};

export default RecentSearches;
