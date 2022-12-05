import { createTheme } from '@mui/material';

export const themeLight = createTheme({
  breakpoints: {
    values: {
      xs: 320,
      sm: 600,
      md: 860,
      lg: 1200,
      xl: 1536,
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  palette: {
    mode: 'light',
    primary: {
      light: '#81d4fa',
      main: '#014771',
      dark: '#0277bd',
      contrastText: '#fff',
    },
    secondary: {
      light: '#707090',
      main: '#b7bec7',
      dark: '#eef2f9',
      contrastText: '#fff',
    },
    info: {
      light: '#ff897a',
      main: '#4ebef0',
      dark: '#ff2408',
      contrastText: '#063d55',
    },
    grey: {
      200: '#293133',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background:
            'linear-gradient(153deg, rgba(234,246,251,1) 0%, rgba(212,237,249,1) 60%, rgba(78,190,240,1) 100%)',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          margin: 0,
          paddingTop: 0,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          variant: 'contained',
          background: 'linear-gradient(45deg, #FF6753 30%, #FF8F50 90%)',
          borderRadius: 10,
          border: 0,
          color: 'white',
          height: 48,
          padding: '0 30px',
          boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        },
      },
    },
    MuiIcon: {
      styleOverrides: {
        root: {
          color: 'red',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h1: {
          fontWeight: 600,
          lineHeight: 1.27,
          letterSpacing: '-0.06em',
          color: 'white',
          textAlign: 'left',
        },
        h2: {
          color: '#577DB8',
          fontWeight: 600,
          lineHeight: 1.27,
          textAlign: 'center',
        },
        h5: {
          fontWeight: 300,
          color: '#4F4F4F',
        },
        h6: {
          color: '#4F4F4F',
        },
        subtitle1: {
          fontSize: '1.1rem',
          fontWeight: 600,
        },
      },
    },
  },
});
