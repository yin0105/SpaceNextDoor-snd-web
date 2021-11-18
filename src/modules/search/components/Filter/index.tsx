import {
  Box,
  makeStyles,
  IconButton,
  MenuItem,
  useMediaQuery,
  Theme,
} from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import clsx from 'clsx';
import Sticky from 'react-stickynode';
import React from 'react';
import Image from '../../../../components/Image';
import { SelectInput, CustomSelect, IconComponent } from '../../../../components/Inputs/MainSelect';
import { SitesListStore } from '../../stores/SitesListStore';
import styles from './Filter.module.css';
import usePageTranslation from '../../../../hooks/usePageTranslation';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    margin: '0 28px',
  },
  searchBox: {
    position: 'relative',
  },
  labelBox: {
    position: 'absolute',
    zIndex: 1,
    top: '20px',
    left: '20px',
  },
  inputSelect: {
    padding: '9px 26px 9px 27px',
    color: theme.palette.grey[100],
  },
  icon: {
    right: '20px',
    top: '10px',
    width: '30px',
    backgroundRepeat: 'no-repeat',
    backgroundImage: 'url(/images/SearchLocation/select.svg)',
  },
  settingBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  settingButton: {
    padding: '8px 0px 8px',
    marginLeft: '16px',
  },
  active: {
    width: '6px',
    height: '6px',
    background: 'red',
    borderRadius: '50px',
    position: 'absolute',
    top: '4px',
    right: '-3px',
  },
}));

interface IProps {
  sitesStore?: SitesListStore;
}

const Filter: React.FC<IProps> = ({ sitesStore }) => {
  const classes = useStyles();
  const { t } = usePageTranslation('search', 'Filter');

  return (
    <Sticky
      enabled={useMediaQuery((theme: Theme) => theme.breakpoints.only('xs'))}
      activeClass={styles.filterbox__sticky_active}
      // onStateChange={({ status }) => setIsFixed(status === Sticky.STATUS_FIXED)}
      innerZ={100}
      top={148}
    >
      <Box className={clsx(classes.root, styles.filterbox__sticky)}>
        <Box flexGrow={1} className={classes.searchBox}>
          <CustomSelect
            fullWidth
            placeholder={t('sort')}
            defaultValue="DEFAULT"
            IconComponent={IconComponent}
            input={<SelectInput placeholder={t('sort')} classes={{ input: classes.inputSelect }} />}
          >
            <MenuItem value="DEFAULT">{t('sort')}</MenuItem>
            <MenuItem value={10}>{t('menuItem1')}</MenuItem>
            <MenuItem value={20}>{t('menuItem2')}</MenuItem>
            <MenuItem value={30}>{t('menuItem3')}</MenuItem>
          </CustomSelect>
        </Box>
        <Box className={classes.settingBox}>
          <IconButton className={classes.settingButton} onClick={() => sitesStore.toggleFilterPopup('ACTIVE')}>
            <Image name="settings" folder="SearchLocation" />
            {sitesStore.isFiltersApplied && (
              <span className={classes.active} />
            )}
          </IconButton>

        </Box>
      </Box>
    </Sticky>
  );
};

export default inject('sitesStore')(observer(Filter));
