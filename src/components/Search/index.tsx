import Sticky from 'react-stickynode';
import { useState } from 'react';
import { inject, observer } from 'mobx-react';
import {
  Box, fade, Grid, Hidden, IconButton, makeStyles, Typography,
} from '@material-ui/core';
import clsx from 'clsx';
import Image from '../Image';
import { SitesListStore } from '../../modules/search/stores/SitesListStore';
import usePageTranslation from '../../hooks/usePageTranslation';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    margin: '5px 10px 10px',
    padding: '10px 15px',
    borderRadius: '30px',
    boxShadow: '0px 15px 40px 0px rgba(233, 233, 233, 1)',
    zIndex: 1,
    backgroundColor: '#FFFFFF',
    height: '93.63px',
    maxHeight: '93.63px',
    minHeight: '93.63px',
    [theme.breakpoints.up('sm')]: {
      borderRadius: 0,
      boxShadow: 'none',
      borderBottom: `1px solid ${fade(theme.palette.grey[50], 0.7)}`,
      margin: '0 -200px !important',
      padding: '15px 200px !important',
    },
    [theme.breakpoints.down('xs')]: {
      height: '163.63px',
      maxHeight: '163.63px',
      minHeight: '163.63px',
    },
  },
  pill: {
    background: theme.palette.grey[200],
    height: '36px',
    padding: '0 10px',
    borderRadius: '15px',
    position: 'fixed',
    bottom: '30px',
    zIndex: 12,
    right: 0,
    left: 0,
    width: '100px',
    margin: 'auto',
  },
  pillText: {
    color: 'white',
    marginLeft: '5px',
    width: 40,
  },
  pillButton: {
    height: '36px',
  },
  active: {
    width: '6px',
    height: '6px',
    background: 'red',
    borderRadius: '50px',
    position: 'absolute',
    top: '4px',
    right: '40px',
  },
  searchbox__sticky: {
    margin: 0,
    borderRadius: 0,
    transition: ' all 0.2s ease-in-out',
    paddingLeft: '22px',
    paddingRight: '22px',
    boxShadow: 'none !important',
  },
}));

interface IProps {
  sitesStore?: SitesListStore;
}

const Search: React.FunctionComponent<IProps> = ({ children, sitesStore }) => {
  const [isFixed, setIsFixed] = useState(false);
  const classes = useStyles();
  const { t } = usePageTranslation('search', 'Search');
  return (
    <>
      <Sticky
        enabled
        // activeClass={styles.searchbox__sticky_active}
        onStateChange={({ status }) => setIsFixed(status === Sticky.STATUS_FIXED)}
        innerZ={100}
        top={0}
      >
        <Box className={clsx(classes.root, classes.searchbox__sticky)}>
          {children}
        </Box>
      </Sticky>
      {isFixed && (
        <Hidden smUp>
          <Box className={clsx(classes.pill, 'animate__animated animate__pulse')}>
            <Grid container>
              <Grid item xs={6}>
                <IconButton
                  className={classes.pillButton}
                  onClick={() => sitesStore.toggleFilterPopup('ACTIVE')}
                >
                  {sitesStore.isFiltersApplied && (
                    <span className={classes.active} />
                  )}
                  <Image extension="svg" folder="SearchLocation" name="filter_white" />
                  <Typography className={classes.pillText} variant="caption">{t('typography')}</Typography>
                </IconButton>
              </Grid>
            </Grid>
          </Box>
        </Hidden>
      )}
    </>
  );
};

export default inject('sitesStore')(observer(Search));
