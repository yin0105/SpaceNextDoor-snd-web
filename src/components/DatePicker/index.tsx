/* eslint-disable max-classes-per-file */
import 'date-fns';
import thLocale from 'date-fns/locale/th';
import jpLocale from 'date-fns/locale/ja';
import enLocale from 'date-fns/locale/en-US';

import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  DatePicker as DatePickerComponent,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DayJS, { Dayjs } from 'dayjs';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { MuiPickersOverrides } from '@material-ui/pickers/typings/overrides';
import { useRouter } from 'next/router';

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

const defaultMaterialTheme = createMuiTheme({
  palette: {
    primary: COLORS,
  },
  overrides: {
    MuiPickersCalendarHeader: {
      daysHeader: {
        display: 'none',
      },
      switchHeader: {
        margin: '0px !important',
      },
    },
    MuiTypography: {
      alignCenter: {
        color: '#484451',
        fontWeight: 600,
        fontSize: '12px',
      },
      colorInherit: {
        fontSize: '12px',
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
    MuiPickersStaticWrapper: {
      staticWrapperRoot: {
        height: 'auto',
      },
    },
    MuiPickersBasePicker: {
      pickerView: {
        padding: '0px !important',
      },
      pickerViewLandscape: {
        minHeight: '200px',
        padding: '0px !important',
      },
    },
    MuiPickersCalendar: {
      transitionContainer: {
        margin: '0px !important',
      },
    },
  },
});

interface IProps {
  onChange: (date?: Dayjs) => void;
  value: Dayjs;
  minValue: Dayjs;
}

const DatePicker: React.FC<IProps> = (props) => {
  const { locale } = useRouter();
  const {
    value, onChange, minValue,
  } = props;

  return (
    <MuiPickersUtilsProvider utils={localeUtilsMap[locale]} locale={localeMap[locale]}>
      <ThemeProvider theme={defaultMaterialTheme}>
        <DatePickerComponent
          orientation="landscape"
          variant="static"
          openTo="date"
          value={value}
          onChange={(d) => onChange(DayJS(d))}
          disableToolbar
          disablePast
          color="secondary"
          minDate={minValue}
        />
      </ThemeProvider>
    </MuiPickersUtilsProvider>
  );
};

export default DatePicker;
