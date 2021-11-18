import { createMuiTheme } from '@material-ui/core/styles';

const defaultTheme = {
  spacing: 2,
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '.typeform-popup a.typeform-close': {
          top: -22,
          right: -22,
          width: 17,
          height: 17,
          textIndent: -100,
          overflow: 'hidden',
          background: 'url(data:image/gif;base64,R0lGODlhEQARAIAAAODn7P///yH5BAEHAAEALAAAAAARABEAAAIqBIKpab3v3EMyVHWtWZluf0za0XFNKDJfCq5i5JpomdUxqKLQVmInqyoAADs=)',
        },
        '.typeform-popup div.typeform-iframe-wrapper': {
          minWidth: 'auto',
        },
      },
    },
  },
  palette: {
    primary: {
      light: '#007FAF',
      main: '#00A0E3',
      dark: '#007FAF',
    },
    secondary: {
      main: '#EA5B21',
      light: '#FFD8C8',
    },
    error: {
      main: '#E53535',
    },
    warning: {
      main: '#FDDD48',
    },
    success: {
      main: '#06C270',
    },
    grey: {
      50: '#E9E9E9',
      100: '#989898',
      200: '#333333',
      300: '#888888',
    },
    background: {
      default: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: 'Poppins',
    h1: {
      fontWeight: 700,
      fontSize: '3rem',
      lineHeight: '35px',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2.2rem',
      lineHeight: '30px',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.8rem',
      lineHeight: '20px',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.6rem',
      lineHeight: '18px',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.4rem',
      lineHeight: '18px',
    },
    body1: {
      fontWeight: 400,
      fontSize: '1.4rem',
      lineHeight: '20px',
    },
    body2: {
      fontWeight: 400,
      fontSize: '1.2rem',
      lineHeight: '2rem',
    },
    caption: {
      fontWeight: 400,
      fontSize: '1rem',
      lineHeight: '20px',
    },
  },
};

const thaiTheme = {
  spacing: defaultTheme.spacing,
  overrides: defaultTheme.overrides,
  palette: defaultTheme.palette,
  typography: { ...defaultTheme.typography, fontFamily: 'Prompt' },
};

export const MuiTheme = createMuiTheme(defaultTheme);
export const ThaiTheme = createMuiTheme(thaiTheme);
