import { useState } from 'react';
import {
  Box, Hidden, IconButton, makeStyles, Typography,
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { inject, observer } from 'mobx-react';
import DayJS from 'components/DayJS';
import LocaleData from 'dayjs/plugin/localeData';
import { useRouter } from 'next/router';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import dynamic from 'next/dynamic';
import Grey2Typography from '../../Typographies/Grey2Typography';
import Image from '../../Image';
import { SitesListStore, SITES_STORE_KEY } from '../../../modules/search/stores/SitesListStore';
import usePageTranslation from '../../../hooks/usePageTranslation';

const DatePicker = dynamic(() => import(/* webpackChunkName: "DatePicker"  */'../../DatePickerPopup'), { ssr: false });

DayJS.extend(LocaleData);

const useStyles = makeStyles((theme) => ({
  dates: {
    display: 'flex',
    flexDirection: 'row',
    padding: '10px 0',
  },
  oneDate: {
    cursor: 'pointer',
    position: 'relative',
    width: '100%',
    '&:last-child': {
      borderLeft: '1px solid #E1E0E3',
    },
    padding: '0 8px 0 15px',
    [theme.breakpoints.down('sm')]: {
      padding: '0 8px 0 8px',
    },
  },
  oneDateHeader: {
    fontWeight: 600,
  },
  oneDateDescription: {},
  moveInImg: {
    position: 'absolute',
    right: '2px',
    top: '0px',
  },
  moveOutImg: {
    position: 'absolute',
    right: '-30px',
    top: '0px',
    [theme.breakpoints.down('md')]: {
      right: '2px',
    },
  },
}));

interface IProps {
  [SITES_STORE_KEY]?: SitesListStore;
}

const Dates: React.FunctionComponent<IProps> = ({ sitesStore }) => {
  const classes = useStyles();
  const { locale } = useRouter();
  const [activeMoveInPopup, setMoveInPopup] = useState(false);
  const [activeMoveOutPopup, setMoveOutPopup] = useState(false);
  const { moveInDate, moveOutDate } = sitesStore;
  const { t } = usePageTranslation('search', 'Dates');
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Box className={classes.dates}>
        {activeMoveInPopup && (
        <DatePicker
          isOpen={activeMoveInPopup}
          title={t('title1')}
          description={t('desc1')}
          minValue={DayJS().add(1, 'day')}
          value={moveInDate}
          onConfirm={(d) => {
            sitesStore.setDates('moveInDate', d);
            setMoveInPopup(false);
          }}
          onClose={() => setMoveInPopup(false)}
        />
        )}

        {activeMoveOutPopup && (
        <DatePicker
          isOpen={activeMoveOutPopup}
          title={t('title2')}
          description={t('desc2')}
          minValue={moveInDate && DayJS(moveInDate).add(1, 'day')}
          value={moveOutDate}
          onConfirm={(d) => {
            sitesStore.setDates('moveOutDate', d);
            setMoveOutPopup(false);
          }}
          onClose={() => setMoveOutPopup(false)}
        />
        )}
        <Box id="openMoveInDateModal" className={classes.oneDate} onClick={() => setMoveInPopup(true)}>
          <Box>
            <Typography variant="caption" className={classes.oneDateHeader}>
              {t('caption1')}
            </Typography>
          </Box>
          <Box className={classes.oneDateDescription}>
            <Grey2Typography variant="body1">
              {moveInDate ? moveInDate.locale(locale).locale(locale).format('DD-MMMM') : t('grey2Typography1')}
            </Grey2Typography>
          </Box>
          <Box className={classes.moveInImg}>
            <IconButton onClick={() => setMoveInPopup(true)}>
              <Image name="calendar" folder="SearchLocation" />
            </IconButton>
          </Box>
        </Box>
        <Box id="openMoveOutDateModal" className={classes.oneDate} onClick={() => setMoveOutPopup(true)}>
          <Box>
            <Typography variant="caption" className={classes.oneDateHeader}>
              {t('caption2')}
            </Typography>
          </Box>
          <Box className={classes.oneDateDescription}>
            <Hidden smUp>
              <Grey2Typography variant="body1">
                {moveOutDate ? moveOutDate.locale(locale).format('DD-MMMM') : t('grey2Typography2')}
              </Grey2Typography>
            </Hidden>
            <Hidden only="xs">
              <Grey2Typography variant="body1">
                {moveOutDate ? moveOutDate.locale(locale).format('DD-MMMM') : t('grey2Typography3')}
              </Grey2Typography>
            </Hidden>
          </Box>
          <Box className={classes.moveOutImg}>
            <IconButton disabled={!moveInDate} onClick={() => setMoveOutPopup(true)}>
              <Image name="calendar" folder="SearchLocation" />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </MuiPickersUtilsProvider>
  );
};

export default inject(SITES_STORE_KEY)(observer(Dates));
