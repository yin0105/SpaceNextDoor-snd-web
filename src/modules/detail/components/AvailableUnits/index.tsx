import {
  Box, Button, makeStyles, Theme, Typography, useMediaQuery,
} from '@material-ui/core';
import DayJS from 'components/DayJS';
import { inject, observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import DatePicker from '../../../../components/DatePicker';
import SpaceSelector from './SpaceSelector';
import { SitesListStore, SITES_STORE_KEY } from '../../../search/stores/SitesListStore';
import Grey2Typography from '../../../../components/Typographies/Grey2Typography';
import usePageTranslation from '../../../../hooks/usePageTranslation';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: '40px',
    paddingBottom: '40px',
    [theme.breakpoints.only('xs')]: {
      paddingBottom: '25px',
      paddingTop: '25px',
    },
  },
  dateContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  date: {
    color: theme.palette.grey[200],
    fontWeight: 600,
    paddingLeft: '5px',
  },
  changeDate: {
    color: theme.palette.grey[200],
    fontSize: theme.typography.body2.fontSize,
    fontWeight: 600,
    paddingLeft: '10px',
    textDecoration: 'underline',
    textTransform: 'none',
    cursor: 'pointer',
    position: 'relative',
    top: '-1px',
  },
  buttonsRow: {
    display: 'flex',
  },
  priceButton: {
    backgroundColor: theme.palette.secondary.light,
    borderRadius: '100px',
    paddingLeft: '20px',
    paddingRight: '20px',
    color: theme.palette.secondary.dark,
    fontWeight: 700,
    marginLeft: '200px',
  },
}));

interface IProps {
  siteId: number;
  spaceId: number;
  [SITES_STORE_KEY]?: SitesListStore;
}

const AvailableUnits: React.FC<IProps> = ({ siteId, sitesStore, spaceId }) => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.only('xs'));
  const classes = useStyles();
  const { moveInDate, moveOutDate } = sitesStore;
  const [showPicker, setShowPicker] = useState(true);
  const currentLocale = useRouter().locale;
  const [selectedDate, setDate] = useState(moveInDate || DayJS());

  useEffect(() => {
    setShowPicker(!moveInDate);
  }, [moveInDate]);

  const { t } = usePageTranslation('details', 'AvailableUnits');
  return (
    <Box className={classes.root}>
      <Box ml={8} mr={8}>
        <Typography variant={isMobile ? 'h5' : 'h3'}>
          {t('title')}
        </Typography>
        <br />

        {showPicker && (
          <Box>
            <DatePicker
              value={selectedDate}
              minValue={DayJS().add(1, 'day')}
              onChange={(d) => {
                setDate(d);
              }}
            />
            <Box className={classes.buttonsRow}>
              <Button
                className={classes.priceButton}
                onClick={() => {
                  sitesStore.setDates('moveInDate', selectedDate);
                  setShowPicker(false);
                }}
              >
                {t('priceButton')}
              </Button>
            </Box>
          </Box>
        )}
      </Box>
      {!showPicker && (
        <Box>
          <Box ml={8} mr={8}>
            <Grey2Typography className={classes.dateContainer}>
              {t('grey2')}
              <span className={classes.date}>{moveInDate && moveInDate.locale(currentLocale).format('DD MMM YYYY')}</span>
              <Button
                variant="text"
                className={classes.changeDate}
                onClick={() => setShowPicker(true)}
              >
                {t('changeDate')}
              </Button>
            </Grey2Typography>
          </Box>
          <SpaceSelector
            siteId={siteId}
            spaceId={spaceId}
            moveInDate={moveInDate}
            moveOutDate={moveOutDate}
          />
        </Box>
      )}
    </Box>
  );
};

export default inject(SITES_STORE_KEY)(observer(AvailableUnits));
