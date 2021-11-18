import React, { FC, useState } from 'react';
import { Box, makeStyles, MenuItem } from '@material-ui/core/';
import { breakpoints } from '@material-ui/system';
import WhiteTypography from '../../../../../components/Typographies/WhiteTypography';
import {
  CustomSelect,
  SelectInput,
} from '../../../../../components/Inputs/MainSelect';
import SecondaryTypography from '../../../../../components/Typographies/SecondaryTypography';
import Image from '../../../../../components/Image';
import usePageTranslation from '../../../../../hooks/usePageTranslation';

const useStyles = makeStyles((theme) => ({
  container: {
    textAlign: 'center',
  },
  selectBox: {
    marginTop: '18px',
    position: 'relative',
    marginBottom: '35px',
    [theme.breakpoints.up('md')]: {
      maxWidth: '645px',
      margin: '35px auto',
    },
  },
  selectLabel: {
    position: 'absolute',
    display: 'block',
    top: '20px',
    left: '15px',
    zIndex: 1,
  },
  hidden: {
    display: 'none',
  },
  inputSelect: {
    padding: '21px 26px 17px 12px',
    backgroundColor: '#ffffff',
    [theme.breakpoints.up('md')]: {
      fontSize: '50px',
      padding: '11px 16px 12px 12px',
      marginBottom: '60px',
    },
  },
  icon: {
    color: theme.palette.secondary.main,
    position: 'absolute',
    right: '20px',
  },
  mainText: {
    display: 'flex',
    alignItems: 'baseline',
    paddingBottom: '35px',
    marginBottom: '30px',
    borderBottom: '2px solid #ffffff',
    [theme.breakpoints.up('md')]: {
      justifyContent: 'center',
    },
  },
  smallText: {
    fontSize: '22px',
    lineHeight: '30px',
    [theme.breakpoints.up('md')]: {
      fontSize: '50px',
      lineHeight: '50px',
    },
  },
  bigText: {
    fontSize: '70px',
    fontWeight: 600,
    lineHeight: '28px',
    [theme.breakpoints.up('md')]: {
      fontSize: '180px',
    },
  },
  image: {
    textAlign: 'center',
    marginBottom: '30px',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  header: {
    [theme.breakpoints.up('md')]: {
      fontSize: '50px',
      lineHeight: '50px',
    },
  },
  placeholder: {
    [theme.breakpoints.up('md')]: {
      fontSize: '45px',
      marginTop: '15px',
    },
  },
}));

const WouldYouClean: FC = () => {
  const classes = useStyles();
  const [basement, setBasement] = useState(null);
  const { t } = usePageTranslation('home', 'WouldYouClean');
  return (
    <Box className={classes.container}>
      <WhiteTypography variant="h2" className={classes.header}>
        {t('whiteTypography1')}
      </WhiteTypography>

      <Box className={classes.selectBox}>
        <Box className={basement ? classes.hidden : classes.selectLabel}>
          <SecondaryTypography className={classes.placeholder}>
            {t('secondaryTypography')}
          </SecondaryTypography>
        </Box>
        <CustomSelect
          labelId="demo"
          fullWidth
          IconComponent={() => (
            <Box className={classes.icon}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.2071 15.7071C11.8166 16.0976 11.1834 16.0976 10.7929 15.7071L4.79289 9.70711C4.40237 9.31658 4.40237 8.68342 4.79289 8.29289C5.18342 7.90237 5.81658 7.90237 6.20711 8.29289L11.5 13.5858L16.7929 8.29289C17.1834 7.90237 17.8166 7.90237 18.2071 8.29289C18.5976 8.68342 18.5976 9.31658 18.2071 9.70711L12.2071 15.7071Z"
                  fill="currentColor"
                />
              </svg>
            </Box>
          )}
          input={<SelectInput classes={{ input: classes.inputSelect }} />}
          value={basement}
          onChange={(e) => setBasement(e.target.value)}
        >
          <MenuItem value="">
            <em>{t('menuItem1')}</em>
          </MenuItem>
          <MenuItem value={10}>{t('menuItem2')}</MenuItem>
          <MenuItem value={20}>{t('menuItem3')}</MenuItem>
          <MenuItem value={30}>{t('menuItem4')}</MenuItem>
        </CustomSelect>
      </Box>

      <Box className={classes.mainText}>
        <WhiteTypography className={classes.bigText}>
          $2,340
        </WhiteTypography>
        <WhiteTypography className={classes.smallText}>
          {t('whiteTypography2')}
        </WhiteTypography>
      </Box>

      <Box className={classes.image}>
        <Image name="host-a-space" folder="Homepage" />
      </Box>
    </Box>
  );
};

export default WouldYouClean;
