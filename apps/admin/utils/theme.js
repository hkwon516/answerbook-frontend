import { createMuiTheme } from "@material-ui/core/styles";

let theme = {
  spacing: 12,
  palette: {
    primary: {
      main: "#000",
    },
    secondary: {
      main: "#FFBD2F",
    },
  },
  typography: {
    fontFamily: "Montserrat, Helvetica, Arial, sans-serif",
    h4: {
      fontSize: "2.25rem",
      fontWeight: 700,
      letterSpacing: 0,
    },
    button: {
      fontWeight: 700,
    },
  },
};

const getTheme = (languageKey = "en-US") => {
  return createMuiTheme(theme);
};

export default getTheme;
