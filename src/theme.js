import { createTheme } from '@mui/material/styles';

export const brand = {
  forest: '#074225',
  green: '#074225',
  greenDeep: '#074225',
  ivory: '#EEF3CD',
  lime: '#EEF3CD',
  limeStrong: '#8EC640',
  ink: '#073821',
  moss: '#8EC640',
  mint: '#EEF3CD',
  signal: '#8EC640',
  clay: '#F26433',
  orange: '#F26433',
  orangeDeep: '#C84D27',
  lavender: '#E8DCEB',
  cobalt: '#074225',
  sky: '#E8DCEB',
  line: 'rgba(7, 66, 37, 0.14)',
  fontHeadline: 'var(--font-headline, "Caprasimo", "Belwe Bold", "Belwe", "Cooper Black", Georgia, serif)',
  fontBody: 'var(--font-body, "Rubik", -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif)',
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
      paper: brand.ivory,
    },
    text: {
      primary: brand.ink,
      secondary: 'rgba(7, 66, 37, 0.62)',
    },
    divider: brand.line,
    brand,
  },
  typography: {
    fontFamily: brand.fontBody,
    h1: {
      fontFamily: brand.fontHeadline,
      fontWeight: 800,
      letterSpacing: 0,
      lineHeight: 0.94,
    },
    h2: {
      fontFamily: brand.fontHeadline,
      fontWeight: 800,
      letterSpacing: 0,
      lineHeight: 1,
    },
    h3: {
      fontFamily: brand.fontHeadline,
      fontWeight: 800,
      letterSpacing: 0,
      lineHeight: 1.05,
    },
    button: {
      fontFamily: brand.fontBody,
      fontWeight: 800,
      textTransform: 'none',
      letterSpacing: 0,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          boxSizing: 'border-box',
        },
        html: {
          scrollBehavior: 'smooth',
          background: brand.ivory,
        },
        body: {
          margin: 0,
          minWidth: 320,
          fontFamily: brand.fontBody,
          color: brand.ink,
          background: brand.ivory,
        },
        'button, a': {
          WebkitTapHighlightColor: 'transparent',
        },
        '::selection': {
          color: brand.ivory,
          backgroundColor: brand.forest,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 999,
          boxShadow: 'none',
          minHeight: 48,
          paddingInline: 24,
          transition:
            'transform 180ms ease, background-color 180ms ease, border-color 180ms ease, box-shadow 180ms ease',
          '&:hover': {
            transform: 'translateY(-1px)',
          },
          '&:focus-visible': {
            outline: `3px solid ${brand.limeStrong}`,
            outlineOffset: 3,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&:focus-visible': {
            outline: `3px solid ${brand.limeStrong}`,
            outlineOffset: 3,
          },
        },
      },
    },
  },
});
