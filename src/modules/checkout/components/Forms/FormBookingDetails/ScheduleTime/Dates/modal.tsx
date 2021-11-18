import 'date-fns';
import React, { useState } from 'react';
import { Box, makeStyles, Typography } from '@material-ui/core';
import {
  DatePicker,
} from '@material-ui/pickers';
import Modal from '@material-ui/core/Modal';
import DayJS, { Dayjs } from 'dayjs';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { MuiPickersOverrides } from '@material-ui/pickers/typings/overrides';
import Grey2Typography from '../../../../../../../components/Typographies/Grey2Typography';
import WhiteTypography from '../../../../../../../components/Typographies/WhiteTypography';
import PrimaryButton from '../../../../../../../components/Buttons/PrimaryButton';
import Image from '../../../../../../../components/Image';
import CustomColor from './customColor';
import usePageTranslation from '../../../../../../../hooks/usePageTranslation';

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

const defaultMaterialTheme = createMuiTheme({
  palette: {
    primary: CustomColor,
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

    '& img': {
      cursor: 'pointer',
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
  clearDatePicker: (name: string, date: Dayjs) => void;
  confirmDatePicker: (name: string, date: Dayjs) => void;
  date: Dayjs;
  minDate: Dayjs;
  maxDate?: Dayjs;
  title: string;
  description: string;
  name: string;
  toggleModal: (name: string) => void,
}

const Dates: React.FC<IProps> = (props) => {
  const classes = useStyles();
  const {
    title, description, isOpen, date, minDate, maxDate,
    name, clearDatePicker, confirmDatePicker, toggleModal,
  } = props;
  const [pickerDate, setPickerDate] = useState(date || minDate);

  const onChange = (e) => {
    setPickerDate(DayJS(e));
  };

  const onClear = () => {
    if (name === 'moveInDate') {
      clearDatePicker(name, minDate);
      setPickerDate(minDate);
      return;
    }

    clearDatePicker(name, undefined);
    setPickerDate(null);
  };

  const onConfirm = () => {
    confirmDatePicker(name, pickerDate);
  };

  const { t } = usePageTranslation('checkout', 'DatesModal');
  return (
    <Modal
      open={isOpen}
      className={classes.modelContainer}
    >
      <Box className={classes.modelContent}>
        <Box
          className={classes.modalRow}
        >
          <Typography variant="caption" className={classes.title}>
            {title}
          </Typography>
          <Image
            name="close"
            onClick={() => toggleModal(name)}
          />
        </Box>
        <Box>
          <Grey2Typography variant="body2">
            {description}
          </Grey2Typography>
        </Box>
        <Box>
          <ThemeProvider theme={defaultMaterialTheme}>
            <DatePicker
              orientation="landscape"
              variant="static"
              openTo="date"
              value={pickerDate && pickerDate.format()}
              onChange={onChange}
              disableToolbar
              disablePast
              color="secondary"
              minDate={minDate.format()}
              maxDate={(maxDate && maxDate.format()) || undefined}
            />
          </ThemeProvider>
        </Box>
        {maxDate && name !== 'moveInDate' && (
          <Box mt={5} mb={5}>
            <Grey2Typography variant="body2">
              {t('availability')}
              &nbsp;
              {maxDate.format('DD MMMM YYYY')}
            </Grey2Typography>
          </Box>
        )}
        <Box className={classes.modalRow}>
          <Grey2Typography
            variant="caption"
            className={classes.clearText}
            onClick={onClear}
          >
            {t('grey2Typography')}
          </Grey2Typography>
          <Box>
            <PrimaryButton
              fullWidth
              className={classes.confirmBtn}
              onClick={onConfirm}
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

export default Dates;
