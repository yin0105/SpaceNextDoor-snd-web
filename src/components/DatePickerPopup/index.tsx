import 'date-fns';
import thLocale from 'date-fns/locale/th';
import jpLocale from 'date-fns/locale/ja';
import enLocale from 'date-fns/locale/en-US';
import DateFnsUtils from '@date-io/date-fns';
import React, { useState } from 'react';
import {
  Box, IconButton, makeStyles, Typography,
} from '@material-ui/core';
import {
  DatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import Modal from '@material-ui/core/Modal';
import DayJS, { Dayjs } from 'dayjs';
import { useRouter } from 'next/router';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { MuiPickersOverrides } from '@material-ui/pickers/typings/overrides';
import usePageTranslation from 'hooks/usePageTranslation';
import Grey2Typography from '../Typographies/Grey2Typography';
import WhiteTypography from '../Typographies/WhiteTypography';
import PrimaryButton from '../Buttons/PrimaryButton';
import Image from '../Image';

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

const useStyles = makeStyles((theme) => ({

  modelContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 600,
    fontSize: '14px',
  },
  btnLink: {
    fontWeight: 600,
    cursor: 'pointer',
  },
  modelContent: {
    padding: '20px',
    backgroundColor: 'white',
    margin: '10vw 5px 0px 5px',
    minWidth: '300px',
    height: 'fit-content',
    borderRadius: '10px',
    '&:focus': {
      outline: 'none',
    },
    [theme.breakpoints.down('xs')]: {
      margin: '30vw 5px 0px 5px',
    },
    [theme.breakpoints.down('sm')]: {
      margin: '30vw 5px 0px 5px',
    },
    [theme.breakpoints.down('md')]: {
      margin: '50vw 5px 0px 5px',
    },
  },
  modalRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
  },
  close: {
    position: 'absolute',
    right: '-8px',
    top: '-8px',
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
  confirmBtn: {
    width: '100px',
    height: '40px',
  },
  confirmButtonText: {
    fontWeight: 700,
    fontSize: '13px',
    textTransform: 'uppercase',
  },

}));

interface IProps {
  isOpen: boolean;
  onConfirm: (date?: Dayjs) => void;
  value: Dayjs;
  minValue: Dayjs;
  title: string;
  description: string;
  onClose: () => void,
}

const DatePickerPopup: React.FC<IProps> = (props) => {
  const { locale } = useRouter();
  const classes = useStyles();
  const {
    title, description, isOpen, value, onConfirm, onClose, minValue,
  } = props;
  const [pickerDate, setPickerDate] = useState(value || minValue);
  const { t } = usePageTranslation('checkout', 'DatePickerPopup');
  const onChange = (e) => {
    setPickerDate(e);
  };

  return (
    <Modal
      open={isOpen}
      className={classes.modelContainer}
    >
      <Box className={classes.modelContent}>
        <Box className={classes.modalRow}>
          <Typography variant="caption" className={classes.title}>
            {title}
          </Typography>
          <IconButton onClick={onClose} className={classes.close}>
            <Image name="close" />
          </IconButton>
        </Box>
        <Box>
          <Grey2Typography variant="body2">
            {description}
          </Grey2Typography>
        </Box>
        <Box>
          <MuiPickersUtilsProvider utils={localeUtilsMap[locale]} locale={localeMap[locale]}>
            <ThemeProvider theme={defaultMaterialTheme}>
              <DatePicker
                orientation="landscape"
                variant="static"
                openTo="date"
                value={pickerDate}
                onChange={onChange}
                disableToolbar
                disablePast
                color="secondary"
                minDate={minValue}
                id="sss"
              />
            </ThemeProvider>
          </MuiPickersUtilsProvider>
        </Box>

        <Box className={classes.modalRow}>
          <Grey2Typography
            variant="caption"
            className={classes.clearText}
            onClick={() => onConfirm(null)}
            id="clearDate"
          >
            {t('grey2Typography')}
          </Grey2Typography>
          <Box>
            <PrimaryButton
              fullWidth
              className={classes.confirmBtn}
              onClick={() => onConfirm(DayJS(pickerDate))}
              id="confirmDate"
            >
              <WhiteTypography className={classes.confirmButtonText}>
                {t('whiteTypography')}
              </WhiteTypography>
            </PrimaryButton>
          </Box>
        </Box>
      </Box>
    </Modal>

  );
};

export default DatePickerPopup;
