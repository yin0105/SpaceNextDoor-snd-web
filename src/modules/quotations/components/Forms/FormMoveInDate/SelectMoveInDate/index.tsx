import 'date-fns';
import thLocale from 'date-fns/locale/th';
import jpLocale from 'date-fns/locale/ja';
import enLocale from 'date-fns/locale/en-US';
import DateFnsUtils from '@date-io/date-fns';
import React from 'react';
import {
  Box, makeStyles, useMediaQuery, Theme,
} from '@material-ui/core';
import {
  DatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DayJS, { Dayjs } from 'dayjs';
import { useRouter } from 'next/router';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { MuiPickersOverrides } from '@material-ui/pickers/typings/overrides';
import usePageTranslation from 'hooks/usePageTranslation';
import Grey2Typography from '../../../../../../components/Typographies/Grey2Typography';

const localeMap = {
  'en-US': enLocale,
  th: thLocale,
  ja: jpLocale,
};

const localeUtilsMap = {
  'en-US': DateFnsUtils,
  th: DateFnsUtils,
  ja: DateFnsUtils,
};

/**
 * Fix datepicker type issue:
 *  -ref: https://github.com/mui-org/material-ui-pickers/issues/1414#issuecomment-562042571
 */
type OverridesNameToClassKey = {
  [P in keyof Required<MuiPickersOverrides>]: keyof MuiPickersOverrides[P];
};

type CustomType = {
  MuiPickersBasePicker: {
    pickerView: {
      padding?: string;
    };
  };
  MuiPickersStaticWrapper: {
    staticWrapperRoot: {
      height?: string;
    }
  }
};
declare module '@material-ui/core/styles/overrides' {
  /* eslint-disable */
  interface ComponentNameToClassKey extends OverridesNameToClassKey { }
  export interface ComponentNameToClassKey extends CustomType { }
  /* eslint-enable */
}

const COLORS = {
  50: '#333333',
  100: '#333333',
  200: '#333333',
  300: '#333333',
  400: '#333333',
  500: '#333333',
  600: '#333333',
  700: '#333333',
  800: '#333333',
  900: '#333333',
  A100: '#333333',
  A200: '#333333',
  A400: '#333333',
  A700: '#333333',
};

const useStyles = makeStyles((theme) => ({
  modelContent: {
    padding: '20px',
    '&:focus': {
      outline: 'none',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '0',
    },
  },
  modalRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      marginTop: '30px',
      marginLeft: '12px',
    },
  },
  clearText: {
    cursor: 'pointer',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '12px',
    lineHeight: '20px',
    letterSpacing: '0.5px',
    paddingTop: '10px',
  },
}));

interface IProps {
  onChange: (date?: Dayjs) => void;
  value: Dayjs;
  minValue: Dayjs;
  showPromotions: boolean;
}

const SelectMoveInDate: React.FC<IProps> = (props) => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const defaultMaterialTheme = createMuiTheme({
    palette: {
      primary: COLORS,
    },
    overrides: {
      MuiPickersCalendarHeader: {
        daysHeader: {
          maxHeight: 'max-content',
        },
        switchHeader: {
          margin: '0px !important',
          padding: isMobile ? '0 15apx' : '0 85px',
        },
        dayLabel: {
          fontSize: '14px',
          fontWeight: 600,
          color: '#000',
          margin: isMobile ? '6px' : '12px',
        },
      },
      MuiTypography: {
        alignCenter: {
          color: '#484451',
          fontWeight: 600,
          fontSize: '14px',
        },
        colorInherit: {
          fontSize: isMobile ? '14px' : '16px',
          fontStyle: 'normal',
        },
      },
      MuiSvgIcon: {
        root: {
          width: '20px',
          height: '20px',
          color: '#00A0E3 ',
        },
      },
      MuiIconButton: {
        root: {
          margin: isMobile ? '6px !important' : '12px !important',
        },
      },
      MuiPickersStaticWrapper: {
        staticWrapperRoot: {
          height: 'auto',
          alignItems: 'center',
        },
      },
      MuiPickersBasePicker: {
        pickerView: {
          padding: '0px !important',
          maxWidth: 'max-content',
        },
        pickerViewLandscape: {
          minHeight: '350px',
          padding: '0px !important',
        },
      },

      MuiPickersCalendar: {
        transitionContainer: {
          margin: '0px !important',
          width: isMobile ? '100vw' : '600px',
          minHeight: isMobile ? '290px' : '380px',
        },
      },
    },
  });

  const { locale } = useRouter();
  const classes = useStyles();
  const {
    value, minValue, onChange, showPromotions,
  } = props;

  const { t } = usePageTranslation('checkout', 'DatePickerPopup');

  if (!showPromotions) {
    defaultMaterialTheme.overrides.MuiPickersCalendarHeader.switchHeader['& button'] = {
      transform: 'scale(1.5)',
      top: '230px',
      '&:nth-of-type(1)': {
        right: '75px',
      },
      '&:nth-of-type(2)': {
        left: '75px',
      },
    };
  }

  return (
    <Box>
      <Box className={classes.modelContent} style={!isMobile && showPromotions ? { marginLeft: '-130px' } : {}}>
        <Box>
          <MuiPickersUtilsProvider utils={localeUtilsMap[locale]} locale={localeMap[locale]}>
            <ThemeProvider theme={defaultMaterialTheme}>
              <DatePicker
                orientation="landscape"
                variant="static"
                openTo="date"
                value={value}
                onChange={(d) => onChange(DayJS(d))}
                disableToolbar
                disablePast
                color="secondary"
                minDate={minValue}
                id="sss"
              />
            </ThemeProvider>
          </MuiPickersUtilsProvider>
        </Box>

      </Box>
      <Box className={classes.modalRow}>
        <Grey2Typography
          variant="caption"
          className={classes.clearText}
          onClick={() => onChange(minValue)}
          id="clearDate"
        >
          {t('grey2Typography')}
        </Grey2Typography>
      </Box>
    </Box>
  );
};

export default SelectMoveInDate;
