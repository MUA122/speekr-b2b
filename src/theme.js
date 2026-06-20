import { createTheme } from '@mui/material/styles';

export const brand = {
  forest: '#004225',
  ivory: '#F7F9E8',
  ink: '#071C14',
  moss: '#0C6B43',
  mint: '#AAFFC8',
  signal: '#D7F36A',
  clay: '#D96B42',
  cobalt: '#355CFF',
  sky: '#7DD7F7',
  line: 'rgba(0, 66, 37, 0.14)',
};

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: brand.forest,
      contrastText: brand.ivory,
    },
    secondary: {
      main: brand.clay,
      contrastText: '#ffffff',
    },
    background: {
      default: brand.ivory,
      paper: '#FFFFFF',
    },
    text: {
      primary: brand.ink,
      secondary: 'rgba(7, 28, 20, 0.72)',
    },
  },
  typography: {
    fontFamily: '"Inter", Arial, sans-serif',
    h1: {
      fontFamily: '"Sora", "Inter", Arial, sans-serif',
      fontWeight: 800,
      letterSpacing: 0,
      lineHeight: 0.98,
    },
    h2: {
      fontFamily: '"Sora", "Inter", Arial, sans-serif',
      fontWeight: 750,
      letterSpacing: 0,
    },
    h3: {
      fontFamily: '"Sora", "Inter", Arial, sans-serif',
      fontWeight: 700,
      letterSpacing: 0,
    },
    button: {
      fontWeight: 750,
      textTransform: 'none',
      letterSpacing: 0,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          boxShadow: 'none',
          minHeight: 44,
          paddingInline: 20,
        },
      },
    },
  },
});
