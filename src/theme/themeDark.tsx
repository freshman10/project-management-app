import { createTheme } from '@mui/material';

export const themeDark = createTheme({
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
    mode: 'dark',
    primary: {
      light: '#81d4fa',
      main: '#2196f3',
      dark: '#0277bd',
      contrastText: '#fff',
    },
    secondary: {
      light: 'whitesmoke',
      main: 'whitesmoke',
      dark: '#042642',
      contrastText: '#fff',
    },
    info: {
      light: '#fff',
      main: '#0c3c67',
      dark: '#ff8f00',
      contrastText: '#fff',
    },
    grey: {
      200: '#E5E4E2',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background:
            'linear-gradient(9deg, rgba(4,38,66,1) 0%, rgba(9,75,116,1) 39%, rgba(12,113,170,1) 100%)',
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
          color: 'whiteSmoke',
          fontWeight: 600,
          lineHeight: 1.27,
          textAlign: 'center',
        },
        h5: {
          fontWeight: 300,
          color: 'whiteSmoke',
        },
        h6: {
          color: 'lightGray',
        },
        subtitle1: {
          fontSize: '1.1rem',
          fontWeight: 600,
          color: '#042641',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { backgroundColor: '#e9f3f5' },
      },
    },
  },
});
