import { createTheme } from "@mui/material/styles";

export const brand = {
  forest: "#074225",
  green: "#074225",
  greenDeep: "#074225",
  ivory: "#F7F9E8",
  lime: "#EEF3CD",
  limeStrong: "#8EC640",
  ink: "#073821",
  moss: "#8EC640",
  mint: "#EEF3CD",
  signal: "#8EC640",
  clay: "#F26433",
  orange: "#F26433",
  orangeDeep: "#C84D27",
  lavender: "#E8DCEB",
  cobalt: "#074225",
  sky: "#E8DCEB",
  line: "rgba(7, 66, 37, 0.14)",
  fontHeadline:
    'var(--font-headline, "Rubik Local", "Rubik", -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif)',
  fontBody:
    'var(--font-body, "Rubik Local", "Rubik", -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif)',
};

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: brand.forest,
      contrastText: brand.ivory,
    },
    secondary: {
      main: brand.clay,
      contrastText: "#ffffff",
    },
    background: {
      default: brand.ivory,
      paper: brand.ivory,
    },
    text: {
      primary: brand.ink,
      secondary: "rgba(7, 66, 37, 0.62)",
    },
    divider: brand.line,
    brand,
  },
  typography: {
    fontFamily: brand.fontBody,
    fontWeightLight: 400,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontFamily: brand.fontHeadline,
      fontWeight: 700,
      letterSpacing: 0,
      lineHeight: 0.94,
    },
    h2: {
      fontFamily: brand.fontHeadline,
      fontWeight: 700,
      letterSpacing: 0,
      lineHeight: 1,
    },
    h3: {
      fontFamily: brand.fontHeadline,
      fontWeight: 700,
      letterSpacing: 0,
      lineHeight: 1.05,
    },
    h4: {
      fontFamily: brand.fontHeadline,
      fontWeight: 700,
    },
    h5: {
      fontFamily: brand.fontHeadline,
      fontWeight: 700,
    },
    h6: {
      fontFamily: brand.fontHeadline,
      fontWeight: 700,
    },
    subtitle1: {
      fontFamily: brand.fontBody,
      fontWeight: 600,
    },
    subtitle2: {
      fontFamily: brand.fontBody,
      fontWeight: 600,
    },
    body1: {
      fontFamily: brand.fontBody,
      fontWeight: 400,
    },
    body2: {
      fontFamily: brand.fontBody,
      fontWeight: 400,
    },
    caption: {
      fontFamily: brand.fontBody,
      fontWeight: 400,
    },
    overline: {
      fontFamily: brand.fontBody,
      fontWeight: 600,
    },
    button: {
      fontFamily: brand.fontBody,
      fontWeight: 600,
      textTransform: "none",
      letterSpacing: 0,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "*": {
          boxSizing: "border-box",
        },
        html: {
          scrollBehavior: "smooth",
          background: brand.ivory,
        },
        body: {
          margin: 0,
          minWidth: 320,
          fontFamily: brand.fontBody,
          color: brand.ink,
          background: brand.ivory,
        },
        "button, a": {
          WebkitTapHighlightColor: "transparent",
        },
        "::selection": {
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
          boxShadow: "none",
          minHeight: 48,
          paddingInline: 24,
          lineHeight: 1.2,
          transition:
            "transform 180ms ease, background-color 180ms ease, border-color 180ms ease, box-shadow 180ms ease",
          "&:hover": {
            transform: "translateY(-1px)",
          },
          "&:active": {
            transform: "scale(0.985)",
          },
          "&.Mui-disabled": {
            transform: "none",
          },
          "&:focus-visible": {
            outline: `3px solid ${brand.limeStrong}`,
            outlineOffset: 3,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          minWidth: 44,
          minHeight: 44,
          transition: "transform 160ms ease, background-color 160ms ease",
          "&:active": {
            transform: "scale(0.94)",
          },
          "&:focus-visible": {
            outline: `3px solid ${brand.limeStrong}`,
            outlineOffset: 3,
          },
        },
      },
    },
    MuiStack: {
      defaultProps: {
        useFlexGap: true,
      },
    },
  },
});
