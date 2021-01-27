import { createMuiTheme } from '@material-ui/core/styles';
import deepmerge from "deepmerge";

const theme = {
    spacing: 12,
    palette: {
      text: {},
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

const themeKO = {
    typography: {
      fontFamily: "Spoqa Han Sans Neo, sans-serif",
    },
  };

  const getTheme = (languageKey = "en-US") => {
    return createMuiTheme(languageKey === "en-US" ? theme : deepmerge(theme, themeKO));
  };

export default createMuiTheme(theme);