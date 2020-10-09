import {createMuiTheme, responsiveFontSizes} from "@material-ui/core/styles";

let theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1a1a1d',
      contrastText: '#fff',
    },
    secondary: {
      main: '#c3073f',
      contrastText: '#fff',
    },
  },
  typography: {
    "fontFamily": "system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji",
    "fontSize": 14,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500
  }
});
theme = responsiveFontSizes(theme);

export default theme;
